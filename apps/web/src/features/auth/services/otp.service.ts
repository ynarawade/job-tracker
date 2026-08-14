import { ApiError } from "@/lib/api/ApiError";
import { redis } from "@repo/redis";
import crypto from "node:crypto";

const OTP_TTL_SECONDS = 300; // 5 min for prod.
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_LIMIT = 3;
const OTP_RESEND_WINDOW_SECONDS = 900; // 15 min

type OtpPurpose = "signin" | "signup";

interface PendingAuthData {
  email: string;
  purpose: OtpPurpose;
  first_name?: string;
  last_name?: string;
}

// Generate 6-digit numeric OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Returns OtpKey in one const format eg:- opt:98765437 (otp:phone_number)
const otpKey = (email: string, purpose: OtpPurpose) =>
  `otp:${purpose}:${email}`;

// Returns key for attempts
const otpAttemptsKey = (email: string, purpose: OtpPurpose) =>
  `otp:attempts:${purpose}:${email}`;

const otpLimitKey = (email: string) => `otp:resend-count:${email}`;

const hashOtp = (otp: string): string =>
  crypto.createHash("sha256").update(otp).digest("hex");

// used during email verification and acc creation in signup
const pendingAuthKey = (pendingAuthId: string) =>
  `pending-auth:${pendingAuthId}`;

// Rate-limiter
async function checkResendLimit(email: string): Promise<void> {
  const count = await redis.incr(otpLimitKey(email));

  if (count === 1) {
    await redis.expire(otpLimitKey(email), OTP_RESEND_WINDOW_SECONDS);
  }

  if (count > OTP_RESEND_LIMIT) {
    throw new ApiError(429, "Too many OTP requests. Try again later.");
  }
}

// Creates the pending-auth record and returns the opaque id to put in the cookie.
export const createPendingAuth = async (
  data: PendingAuthData
): Promise<string> => {
  const pendingAuthId = crypto.randomUUID();

  await redis.set(
    pendingAuthKey(pendingAuthId),
    JSON.stringify(data),
    "EX",
    OTP_TTL_SECONDS
  );

  return pendingAuthId;
};

export const getPendingAuth = async (
  pendingAuthId: string
): Promise<PendingAuthData> => {
  const raw = await redis.get(pendingAuthKey(pendingAuthId));

  if (!raw) {
    throw new ApiError(400, "Session expired. Please start again.");
  }

  return JSON.parse(raw) as PendingAuthData;
};

export const deletePendingAuth = async (
  pendingAuthId: string
): Promise<void> => {
  await redis.del(pendingAuthKey(pendingAuthId));
};

// Issue OTP and store in redis
export const issueOtp = async (email: string, purpose: OtpPurpose) => {
  // check if limit is exceeded or not.
  await checkResendLimit(email);
  // generate opt
  const otp = generateOTP();

  // store in redis
  await redis.set(otpKey(email, purpose), hashOtp(otp), "EX", OTP_TTL_SECONDS); // expiry to 30s just for demo .
  // delete any old attempts
  await redis.del(otpAttemptsKey(email, purpose));

  return otp; // returning plain otp so system can mail it to user via resend.
};

export const verifyOtp = async (
  email: string,
  purpose: OtpPurpose,
  submittedOtp: string
) => {
  // check if otp exist
  const storedHasedOtp = await redis.get(otpKey(email, purpose));
  if (!storedHasedOtp) {
    throw new ApiError(400, "OTP expired or invalid. Request a new one.");
  }

  // increment attempts for the user
  const attempts = await redis.incr(otpAttemptsKey(email, purpose)); // 1
  await redis.expire(otpAttemptsKey(email, purpose), OTP_TTL_SECONDS); // expire the attempt after 30s for demo.

  // check if attempts exceed max limits
  if (attempts > OTP_MAX_ATTEMPTS) {
    await redis.del(otpKey(email, purpose), otpAttemptsKey(email, purpose));
    throw new ApiError(400, "Too many incorrect attempts. Request a new OTP.");
  }

  // check if opt matches
  if (hashOtp(submittedOtp) !== storedHasedOtp) {
    throw new ApiError(400, "Incorrect OTP");
  }

  await redis.del(otpKey(email, purpose), otpAttemptsKey(email, purpose));
};

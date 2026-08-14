"use server";

import { sendOtpEmail } from "@/email/resend";
import {
  deletePendingAuth,
  getPendingAuth,
  issueOtp,
  verifyOtp,
} from "@/features/auth/services/otp.service";
import { createSession } from "@/features/auth/services/session.service";
import { signAccessToken } from "@/features/auth/services/token.service";
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "@/features/auth/validators/auth.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { ApiError } from "@/lib/api/ApiError";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { validate } from "@/lib/api/validate";
import { clearPendingAuthCookie, getPendingAuthCookie } from "@/lib/cookie";
import { prisma } from "@repo/db";
import { cookies } from "next/headers";

async function issueSessionCookies(userId: string) {
  const { sessionId, refreshToken } = await createSession(userId);
  const accessToken = signAccessToken({ userId, sessionId });

  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 min, matches access token expiry
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches session TTL
  });
}

const verifyOtpAction = actionHandler(async (formData: VerifyOtpFormValues) => {
  // Step1: Validate data
  const { otp } = validate(verifyOtpSchema, formData);
  // Step2 : Get auth id form cookie
  const pendingAuthId = await getPendingAuthCookie();
  if (!pendingAuthId) {
    throw new ApiError(400, "Session expired. Please start again.");
  }

  // Step3: Get real data form redis
  const { email, purpose, first_name, last_name } =
    await getPendingAuth(pendingAuthId);

  //Step4:  Verify otp
  await verifyOtp(email, purpose, otp);

  // Step 5: Resolve the user — create on signup, fetch on signin
  let userId: string;

  if (purpose === "signup") {
    if (!first_name || !last_name) {
      throw new ApiError(400, "Missing signup details. Please sign up again.");
    }

    const user = await prisma.user.create({
      data: {
        email,
        aut_method: "EMAIL",
        email_verified: true,
        profiles: {
          create: {
            first_name,
            last_name,
          },
        },
      },
    });
    userId = user.id;
  } else {
    // signin: look up existing user,
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(404, "No account found with this email");
    }
    userId = user.id;
  }

  // Step 6: Create session (overwrites any existing session for this user)
  // and set access/refresh token cookies
  await issueSessionCookies(userId);

  // Step 7: Clean up the pending-auth record — no longer needed
  await deletePendingAuth(pendingAuthId);
  await clearPendingAuthCookie();

  return createApiResponse(200, "OTP verified successfully", {});
});

const resendOtpAction = actionHandler(async () => {
  // Step 1: Get pending auth id from cookie — no form data needed,
  // everything we need (email, purpose) is already stashed in Redis
  const pendingAuthId = await getPendingAuthCookie();
  if (!pendingAuthId) {
    throw new ApiError(400, "Session expired. Please start again.");
  }

  // Step 2: Look up email + purpose from the pending auth record
  const { email, purpose } = await getPendingAuth(pendingAuthId);

  // Step 3: Issue a fresh OTP (rate-limited internally via checkResendLimit)
  const otp = await issueOtp(email, purpose);

  // Step 4: Send it
  await sendOtpEmail(email, otp, purpose);

  return createApiResponse(200, "A new verification code has been sent");
});

export { resendOtpAction, verifyOtpAction };

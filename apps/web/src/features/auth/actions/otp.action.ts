"use server";

import { sendOtpEmail } from "@/email/resend";
import {
  deletePendingAuth,
  getPendingAuth,
  issueOtp,
  verifyOtp,
} from "@/features/auth/services/otp.service";
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

const verifyOtpAction = actionHandler(async (formData: VerifyOtpFormValues) => {
  // Step1: Validate data
  const { otp } = validate(verifyOtpSchema, formData);
  // Step2 : Get auth id form cookie
  const pendingAuthId = await getPendingAuthCookie();
  if (!pendingAuthId) {
    throw new ApiError(400, "Session expired. Please start again.");
  }
  const { email, purpose, first_name, last_name } =
    await getPendingAuth(pendingAuthId);

  // Step2: verify otp
  await verifyOtp(email, purpose, otp);
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

    // create session/JWT for `user` here
  } else {
    // signin: look up existing user, create session/JWT
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(404, "No account found with this email");
    }

    // TODO: create session/JWT for `user` here
  }

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

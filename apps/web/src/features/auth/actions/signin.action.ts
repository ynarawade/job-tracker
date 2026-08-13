"use server";

import { prisma } from "@repo/db";

import { sendOtpEmail } from "@/email/resend";
import { issueOtp } from "@/features/auth/services/otp.service";
import { signInSchema } from "@/features/auth/validators/auth.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { ApiError } from "@/lib/api/ApiError";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { validate } from "@/lib/api/validate";

const loginAction = actionHandler(async (formData: { email: string }) => {
  // Step1: Validate data
  const { email } = validate(signInSchema, formData);
  // Step2: Check if account exist
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExist) {
    throw new ApiError(404, "No account found with this email");
  }

  // Step 3: Issue OTP (rate-limited internally) and send it
  const otp = await issueOtp(email, "signin");
  await sendOtpEmail(email, otp, "signin");

  return createApiResponse(200, "OTP sent to your email", { email });
});

export default loginAction;

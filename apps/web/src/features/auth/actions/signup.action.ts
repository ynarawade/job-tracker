"use server";

import { prisma } from "@repo/db";

import { sendOtpEmail } from "@/email/resend";
import { issueOtp } from "@/features/auth/services/otp.service";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/features/auth/validators/auth.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { ApiError } from "@/lib/api/ApiError";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { validate } from "@/lib/api/validate";

const signUpAction = actionHandler(async (formData: SignUpFormValues) => {
  // Step1: Validate data
  const { email, firstName, lastName } = validate(signUpSchema, formData);
  // Step2: Check if account exist
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (userExist) {
    throw new ApiError(409, "Email already in use");
  }

  // Step 3: Issue OTP (rate-limited internally) and send it to user
  const otp = await issueOtp(email, "signup", {
    first_name: firstName,
    last_name: lastName,
  });
  await sendOtpEmail(email, otp, "signup");

  return createApiResponse(200, "OTP sent to your email", { email });
});

export default signUpAction;

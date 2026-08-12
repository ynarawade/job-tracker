"use server";

import { prisma } from "@repo/db";

import {
  signUpSchema,
  type SignUpFormValues,
} from "@/features/auth/validators/auth.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { ApiError } from "@/lib/api/ApiError";
import ApiResponse from "@/lib/api/ApiResponse";
import { validate } from "@/lib/api/validate";

const signUpAction = actionHandler(async (formData: SignUpFormValues) => {
  // Step1: Validate data
  const { email, firstName, lastName } = validate(signUpSchema, formData);
  // Step2: Check if account exist
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExist) {
    throw new ApiError(409, "Email already in use");
  }

  //Step3: issue an otp and send to user mail
  // Step 3: Issue OTP (rate-limited internally) and send it
  // const otp = await issueOtp(email, "login");
  // await sendOtpEmail(email, otp);

  return new ApiResponse(200, "OTP sent to your email", { email });
});

export default signUpAction;

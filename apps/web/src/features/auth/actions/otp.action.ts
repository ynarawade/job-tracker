"use server";

import { verifyOtp } from "@/features/auth/services/otp.service";
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "@/features/auth/validators/auth.schema";
import { actionHandler } from "@/lib/api/ActionHandler";
import { createApiResponse } from "@/lib/api/ApiResponse";
import { validate } from "@/lib/api/validate";

interface verifyOtpActionProps {
  formData: VerifyOtpFormValues;
  purpose: "signup" | "signin";
}

const verifyOtpAction = actionHandler(
  async ({ formData, purpose }: verifyOtpActionProps) => {
    // Step1: Validate data
    const { otp } = validate(verifyOtpSchema, formData);

    // Step2: verify otp
    await verifyOtp("", purpose, otp);

    //Step3 : Generate user account if purpose is signup. else just create auth tokens.
    if (purpose === "signup") {
      // const userData = await getUserMetadata("");
      // const user = await prisma.user.create({
      //   data: {
      //     first_name:
      //   },
      // });
    }

    return createApiResponse(200, "OTP verified successfully", {});
  }
);

export default verifyOtpAction;

import { z } from "zod";

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),

  email: z.email("Enter a valid email address"),
});

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
});
const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit verification code")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema, verifyOtpSchema };
export type { SignInFormValues, SignUpFormValues, VerifyOtpFormValues };

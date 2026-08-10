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

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema };
export type { SignInFormValues, SignUpFormValues };

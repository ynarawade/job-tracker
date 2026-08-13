import OtpEmail from "@/email/templates/otp.template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const FROM_ADDRESS = "Cadence <onboarding@resend.dev>";

export async function sendOtpEmail(
  to: string,
  otp: string,
  purpose: "signup" | "signin"
): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject:
      purpose === "signup"
        ? "Verify your email for Cadence"
        : "Your Cadence sign-in code",
    react: OtpEmail({ otp, purpose }),
  });

  if (error) {
    // Let the caller decide how to surface this — throwing a plain Error here,
    // actionHandler's catch-all will turn it into a generic 500 ApiResponse.
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}

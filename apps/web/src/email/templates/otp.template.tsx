import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "react-email";

interface OtpEmailProps {
  otp: string;
  purpose: "signup" | "signin";
  expiryMinutes?: number;
}

const brandTeal = "#5c8374"; // --primary

export function OtpEmail({ otp, purpose, expiryMinutes = 5 }: OtpEmailProps) {
  const heading =
    purpose === "signup" ? "Verify your email" : "Your sign-in code";

  return (
    <Html>
      <Head />
      <Preview>Your Cadence verification code is {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>Cadence</Text>

          <Section style={card}>
            <Heading style={heading_}>{heading}</Heading>
            <Text style={paragraph}>
              {purpose === "signup"
                ? "Enter this code to finish creating your account."
                : "Enter this code to sign in to your account."}
            </Text>

            <Section style={otpBox}>
              <Text style={otpText}>{otp}</Text>
            </Section>

            <Text style={muted}>
              This code expires in {expiryMinutes} minutes. If you didn&apos;t
              request this, you can safely ignore this email.
            </Text>
          </Section>

          <Text style={footer}>Cadence — track your job search, quietly.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default OtpEmail;

const main = {
  backgroundColor: "#f9f8f6", // --background
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  padding: "40px 0",
};

const container = {
  maxWidth: "440px",
  margin: "0 auto",
};

const logo = {
  fontSize: "18px",
  fontWeight: 700,
  color: brandTeal,
  textAlign: "center" as const,
  marginBottom: "24px",
  letterSpacing: "-0.02em",
};

const card = {
  backgroundColor: "#fcfcfc", // --card
  borderRadius: "20px",
  padding: "40px 36px",
  border: "1px solid #e5e5e4", // --border
};

const heading_ = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#1c1917", // --foreground
  margin: "0 0 12px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#716e69", // --muted-foreground
  textAlign: "center" as const,
  margin: "0 0 28px",
};

const otpBox = {
  backgroundColor: "#f2f1ee", // --muted
  borderRadius: "14px",
  padding: "20px",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const otpText = {
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "8px",
  color: brandTeal,
  margin: 0,
  fontFamily: "'JetBrains Mono', monospace",
};

const muted = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#a8a29e", // between muted-foreground and border, for de-emphasis
  textAlign: "center" as const,
  margin: 0,
};

const footer = {
  fontSize: "12px",
  color: "#a8a29e",
  textAlign: "center" as const,
  marginTop: "24px",
};

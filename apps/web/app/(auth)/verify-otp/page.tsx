"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "@/features/auth/validators/auth.schema";
import { toast } from "sonner";

async function dummyVerifyOtpAction(
  values: VerifyOtpFormValues
): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return { success: true };
}

async function dummyResendOtpAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}

function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const purpose = searchParams.get("purpose") ?? "signup";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onTouched",
  });

  const otp = watch("otp");

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (otp.length === 6 && !isSubmitting) {
      handleSubmit(onSubmit)();
    }
  }, [otp]);

  async function onSubmit(values: VerifyOtpFormValues) {
    setIsSubmitting(true);

    try {
      const result = await dummyVerifyOtpAction(values);

      if (!result.success) {
        setError("otp", {
          message: result.error ?? "Invalid verification code",
        });
        return;
      }

      router.push("/dashboard");
    } catch {
      toast.error("Couldn't reach the server. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);

    try {
      const result = await dummyResendOtpAction();

      if (!result.success) {
        toast.error(result.error ?? "Couldn't resend the code.");
        return;
      }

      setResendCooldown(30);
      setValue("otp", "");
      toast.success("A new verification code has been sent.");
    } catch {
      toast.error("Couldn't reach the server. Try again.");
    } finally {
      setIsResending(false);
    }
  }

  const backHref = purpose === "signin" ? "/signin" : "/signup";

  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md border-border bg-card shadow-none">
        <CardContent className="px-10 pt-10">
          <div>
            <Link
              href={backHref}
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back
            </Link>

            <h1 className="font-heading text-4xl font-medium tracking-[-0.035em] text-foreground">
              Check your email.
            </h1>

            <p className="mt-4 max-w-90 text-[14px] leading-[1.65] text-muted-foreground">
              We sent a 6-digit verification code to{" "}
              <span className="font-medium text-foreground">
                {email ?? "your email address"}
              </span>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="mb-3 block text-[12px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                Verification code
              </label>

              <InputOTP
                id="otp"
                maxLength={6}
                value={otp}
                disabled={isSubmitting}
                onChange={(value) => {
                  setValue("otp", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
                aria-invalid={!!errors.otp}
              >
                <InputOTPGroup className="w-full">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-12 flex-1 rounded-lg border-border bg-background text-[18px] shadow-none first:rounded-l-lg last:rounded-r-lg m-0.5"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {errors.otp && (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className="group h-11 w-full rounded-lg bg-primary text-[14px] font-medium text-primary-foreground shadow-none hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify code
                  <ArrowLeft className="size-4 rotate-180 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-7 text-center">
            <p className="text-[13px] text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                disabled={isResending || resendCooldown > 0 || isSubmitting}
                onClick={handleResend}
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResending
                  ? "Sending…"
                  : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend code"}
              </button>
            </p>
          </div>
        </CardContent>

        <CardFooter className="mt-10 justify-center px-10 pb-10">
          <p className="text-[13px] text-muted-foreground">
            Wrong email?{" "}
            <Link
              href={backHref}
              className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Go back
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default VerifyOtp;

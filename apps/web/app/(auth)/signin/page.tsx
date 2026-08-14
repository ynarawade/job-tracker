"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import loginAction from "@/features/auth/actions/signin.action";
import {
  signInSchema,
  type SignInFormValues,
} from "@/features/auth/validators/auth.schema";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: SignInFormValues) {
    setIsSubmitting(true);

    try {
      const result = await loginAction(values);

      if (!result.success) {
        // Field-level errors (validation failures) — map onto the form
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach(({ field, message }) => {
            setError(field as keyof SignInFormValues, { message });
          });
          return;
        }
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push(`/verify-otp`);
    } catch {
      toast.error("Couldn't reach the server. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-5 py-10">
      <Card className="w-full max-w-115.5 gap-0 rounded-2xl border border-border bg-card py-0 shadow-[0_12px_35px_rgba(28,25,23,0.06)]">
        <CardContent className="px-10 pb-0 pt-10 sm:px-10">
          <div className="mb-9">
            <h1 className="font-heading text-[42px] leading-[1.02] tracking-tight text-foreground">
              Keep every
              <br />
              application on track.
            </h1>

            <p className="mt-4 max-w-90 text-[14px] leading-[1.65] text-muted-foreground">
              Document every role you apply to, and never forget a follow-up
              again.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Field data-invalid={!!errors.email}>
              <FieldLabel
                htmlFor="email"
                className="mb-1.5 text-[12px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                Email address
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                {...register("email")}
                className="h-11.5 rounded-lg border-border bg-background px-4 text-[14px] shadow-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20"
              />

              {errors.email && (
                <FieldError className="mt-1.5 text-xs">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="group h-11 w-full rounded-lg bg-primary text-[14px] font-medium text-primary-foreground shadow-none hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending code…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            className="h-11.5 w-full rounded-lg border-border bg-transparent text-[14px] font-medium shadow-none hover:bg-muted"
            onClick={() => {}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.93-4.2 2.93-7.4Z"
              />
              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.37l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.5Z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.58A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.09.31-1.58V7.9H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.1l3.25-2.52Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.39c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.4l3.25 2.52C7.31 8.11 9.46 6.39 12 6.39Z"
              />
            </svg>
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center px-10 pb-10  mt-10">
          <p className="text-[14px] text-muted-foreground">
            New here?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default SignInPage;

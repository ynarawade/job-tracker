import clsx from "clsx";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx("relative py-20 sm:py-24 lg:py-32", className)}
    >
      {children}
    </section>
  );
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 backdrop-blur-xl",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-[var(--landing-accent)] shadow-[0_0_12px_var(--landing-accent)]" />
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={clsx(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

      <h2
        className={clsx(
          "mt-5 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-[3.35rem]",
          centered && "mx-auto"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={clsx(
            "mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-white/50 sm:text-base",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

type StatusPillProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "success" | "warning";
  className?: string;
};

export function StatusPill({
  children,
  tone = "default",
  className,
}: StatusPillProps) {
  const tones = {
    default: "border-white/10 bg-white/[0.05] text-white/55",
    accent:
      "border-[var(--landing-accent)]/20 bg-[var(--landing-accent)]/10 text-[var(--landing-accent-strong)]",
    success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

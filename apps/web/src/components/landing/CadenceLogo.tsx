import clsx from "clsx";
import Link from "next/link";

type CadenceLogoProps = {
  className?: string;
};

export function CadenceLogo({ className }: CadenceLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Cadence home"
      className={clsx("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-[1.04]">
        <span className="flex h-4 items-end gap-[3px]">
          <span className="h-2 w-[3px] rounded-full bg-white/55" />
          <span className="h-4 w-[3px] rounded-full bg-white" />
          <span className="h-2.5 w-[3px] rounded-full bg-[var(--landing-accent)]" />
          <span className="h-3 w-[3px] rounded-full bg-white/75" />
        </span>

        <span className="absolute inset-x-1/4 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--landing-accent)] to-transparent opacity-80" />
      </span>

      <span className="text-[17px] font-semibold tracking-[-0.035em] text-white">
        Cadence
      </span>
    </Link>
  );
}

import {
  BriefcaseBusiness,
  Building2,
  Check,
  CircleDollarSign,
  Clock3,
  Link2,
  MapPin,
  Sparkles,
} from "lucide-react";
import * as motion from "motion/react-client";

const extractedFields = [
  {
    icon: BriefcaseBusiness,
    label: "Role",
    value: "Product Engineer",
  },
  {
    icon: Building2,
    label: "Company",
    value: "Linear",
  },
  {
    icon: MapPin,
    label: "Work mode",
    value: "Remote · India",
  },
  {
    icon: CircleDollarSign,
    label: "Experience",
    value: "3–5 years",
  },
];

export function JobIntelligenceDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[var(--landing-accent)]/10 blur-[90px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.9,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#080808]/70 shadow-[0_32px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-4">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/10" />
            <span className="size-2 rounded-full bg-white/[0.07]" />
          </div>

          <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-2">
            <Link2 className="size-3.5 shrink-0 text-white/35" />

            <span className="truncate text-[11px] text-white/35">
              linkedin.com/jobs/view/product-engineer-482…
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.65,
              duration: 0.5,
            }}
            className="mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="relative grid size-8 place-items-center rounded-xl bg-[var(--landing-accent)]/10 text-[var(--landing-accent-strong)]">
                <Sparkles className="size-4" />

                <motion.span
                  animate={{
                    opacity: [0.2, 0.7, 0.2],
                    scale: [0.9, 1.15, 0.9],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl border border-[var(--landing-accent)]/30"
                />
              </span>

              <div>
                <p className="text-xs font-medium text-white">
                  Cadence Intelligence
                </p>

                <p className="mt-0.5 text-[10px] text-white/35">
                  Job understood in seconds
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
              <Check className="size-3" />
              Parsed
            </span>
          </motion.div>

          <div className="grid gap-2 sm:grid-cols-2">
            {extractedFields.map((field, index) => {
              const Icon = field.icon;

              return (
                <motion.div
                  key={field.label}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.85 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5"
                >
                  <div className="flex items-center gap-2 text-white/35">
                    <Icon className="size-3.5" />
                    <span className="text-[10px] uppercase tracking-[0.12em]">
                      {field.label}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] font-medium text-white/85">
                    {field.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] text-white/35">Application created</p>

                <p className="mt-1 text-sm font-medium text-white/90">
                  Product Engineer · Linear
                </p>
              </div>

              <span className="rounded-full border border-[var(--landing-accent)]/20 bg-[var(--landing-accent)]/10 px-2.5 py-1 text-[10px] font-medium text-[var(--landing-accent-strong)]">
                Applied
              </span>
            </div>

            <div className="my-3 h-px bg-white/[0.06]" />

            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <Clock3 className="size-3.5" />

              <span>Follow-up automation</span>

              <span className="ml-auto rounded-full bg-white/[0.06] px-2 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white/40">
                Coming soon
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: 16,
          y: 10,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          delay: 1.65,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-white/10 bg-[#111]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block lg:-right-8"
      >
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30">
          Next action
        </p>

        <p className="mt-1 text-xs font-medium text-white/80">
          Follow up in 3 days
        </p>
      </motion.div>
    </div>
  );
}

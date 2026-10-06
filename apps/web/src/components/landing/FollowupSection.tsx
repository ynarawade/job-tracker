import { Check, Clock3, Mail, Send, Sparkles } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import {
  Container,
  Section,
  StatusPill,
} from "@/components/landing/primitives";

const timeline = [
  {
    icon: Check,
    title: "Application submitted",
    description: "Cadence knows when you applied.",
    status: "Done",
  },
  {
    icon: Clock3,
    title: "Follow-up window",
    description: "The right moment to reconnect is approaching.",
    status: "Day 3",
  },
  {
    icon: Sparkles,
    title: "Personalized email",
    description: "A follow-up generated from the role and application context.",
    status: "Coming soon",
  },
  {
    icon: Send,
    title: "Send to recruiter",
    description: "Review manually or automate delivery when you're ready.",
    status: "Coming soon",
  },
] as const;

export function FollowUpSection() {
  return (
    <Section id="follow-ups">
      <Container>
        <div className="relative overflow-hidden rounded-[34px] border border-[var(--landing-accent)]/15 bg-[var(--landing-accent)]/[0.045] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-[340px] rounded-full bg-[var(--landing-accent)]/10 blur-[100px]" />

          <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <div>
                <StatusPill tone="accent">
                  Core workflow · In progress
                </StatusPill>

                <h2 className="mt-6 max-w-xl text-balance text-3xl font-medium leading-[1.04] tracking-[-0.05em] text-white sm:text-4xl lg:text-[3.5rem]">
                  The application doesn&apos;t end when you click{" "}
                  <span className="text-[var(--landing-accent-strong)]">
                    Apply.
                  </span>
                </h2>

                <p className="mt-5 max-w-lg text-pretty text-[15px] leading-7 text-white/45 sm:text-base">
                  Cadence is being built to carry the application forward:
                  remember when to follow up, understand the role context,
                  prepare the message and eventually send it directly to the
                  recruiter.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 text-xs text-white/40">
                  <Mail className="size-4 text-[var(--landing-accent)]" />
                  Automatic recruiter email follow-ups are coming next.
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[26px] border border-white/[0.08] bg-black/25 p-4 sm:p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/85">
                      Follow-up sequence
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Product Engineer · Linear
                    </p>
                  </div>

                  <StatusPill tone="accent">Next core feature</StatusPill>
                </div>

                <div className="space-y-2">
                  {timeline.map((item, index) => {
                    const Icon = item.icon;
                    const future = index >= 2;

                    return (
                      <div
                        key={item.title}
                        className="relative flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3.5"
                      >
                        <div
                          className={[
                            "relative z-10 grid size-9 shrink-0 place-items-center rounded-xl border",
                            future
                              ? "border-white/[0.08] bg-white/[0.035] text-white/35"
                              : "border-[var(--landing-accent)]/15 bg-[var(--landing-accent)]/[0.08] text-[var(--landing-accent-strong)]",
                          ].join(" ")}
                        >
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p
                              className={[
                                "text-xs font-medium",
                                future ? "text-white/60" : "text-white/85",
                              ].join(" ")}
                            >
                              {item.title}
                            </p>

                            <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/25">
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] leading-5 text-white/30">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/25">
                    Example draft
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/45">
                    Hi Sarah — I wanted to follow up on my application for the
                    Product Engineer role. I&apos;m especially interested in the
                    product infrastructure work mentioned in the role and would
                    love to continue the conversation…
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

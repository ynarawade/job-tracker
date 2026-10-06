import { ArrowDown, FileText, Link2, Sparkles } from "lucide-react";

import { WORKFLOW_STEPS } from "@/lib/landing/content";

import { Reveal } from "@/components/landing/Reveal";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/landing/primitives";

export function WorkflowSection() {
  return (
    <Section id="workflow">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="From posting to pipeline"
            title={
              <>
                Paste the job.
                <br />
                Cadence understands the rest.
              </>
            }
            description="Stop manually copying company names, roles, descriptions and requirements into spreadsheets. Cadence turns messy job postings into useful structured context."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
          <Reveal delay={0.08}>
            <div className="h-full rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/85">
                    Add opportunity
                  </p>

                  <p className="mt-1 text-[11px] text-white/35">
                    URL or job description
                  </p>
                </div>

                <span className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50">
                  <Link2 className="size-4" />
                </span>
              </div>

              <div className="mt-7 rounded-2xl border border-white/[0.08] bg-[#080808] p-4">
                <div className="flex items-center gap-2 text-white/30">
                  <Link2 className="size-3.5" />

                  <span className="truncate text-xs">
                    https://jobs.example.com/product-engineer
                  </span>
                </div>
              </div>

              <div className="my-4 flex justify-center">
                <ArrowDown className="size-4 text-white/20" />
              </div>

              <div className="rounded-2xl border border-[var(--landing-accent)]/15 bg-[var(--landing-accent)]/[0.055] p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[var(--landing-accent-strong)]" />

                  <p className="text-xs font-medium text-white/80">
                    Extracting useful context
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    ["Role", "Product Engineer"],
                    ["Company", "Acme"],
                    ["Location", "Remote"],
                    ["Experience", "3–5 years"],
                    ["Skills", "React · TypeScript · Node.js"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-xl bg-black/25 px-3 py-2.5"
                    >
                      <span className="text-[10px] uppercase tracking-[0.1em] text-white/25">
                        {label}
                      </span>

                      <span className="text-right text-[11px] font-medium text-white/65">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-white/30">
                <FileText className="size-3.5" />
                Original JD remains attached to the application
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3">
            {WORKFLOW_STEPS.map((step, index) => (
              <Reveal key={step.number} delay={0.08 + index * 0.08}>
                <article className="group grid gap-5 rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.13] hover:bg-white/[0.035] sm:grid-cols-[72px_1fr] sm:p-6">
                  <div className="font-mono text-[11px] tracking-[0.18em] text-[var(--landing-accent)]">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.025em] text-white/90">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                      {step.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

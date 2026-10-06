import {
  BarChart3,
  FileSearch,
  ScanSearch,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { INTELLIGENCE_FEATURES } from "@/lib/landing/content";

import { Reveal } from "@/components/landing/Reveal";
import {
  Container,
  Section,
  SectionHeading,
  StatusPill,
} from "@/components/landing/primitives";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  "Resume analysis": FileSearch,
  "ATS match score": BarChart3,
  "Missing skills": ScanSearch,
  "Interview intelligence": Sparkles,
};

export function CareerIntelligenceSection() {
  return (
    <Section id="intelligence" className="border-t border-white/[0.06]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Beyond tracking"
            title={
              <>
                One application layer.
                <br />
                More intelligence over time.
              </>
            }
            description="The core experience starts with job understanding, tracking and follow-ups. Resume and ATS intelligence can build on top of the same job context later."
          />
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {INTELLIGENCE_FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.title] ?? Sparkles;

            return (
              <Reveal key={feature.title} delay={0.06 + index * 0.06}>
                <article className="group h-full rounded-[26px] border border-white/[0.07] bg-white/[0.018] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-white/45 transition-colors group-hover:text-[var(--landing-accent-strong)]">
                      <Icon className="size-[18px]" />
                    </span>

                    <StatusPill>{feature.badge}</StatusPill>
                  </div>

                  <h3 className="mt-8 text-lg font-medium tracking-[-0.025em] text-white/85">
                    {feature.title}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

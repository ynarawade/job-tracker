import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { APP_HREF } from "@/lib/landing/content";

import { Reveal } from "@/components/landing/Reveal";
import { Container, Section } from "@/components/landing/primitives";

export function FinalCta() {
  return (
    <Section id="start" className="pt-6 sm:pt-10 lg:pt-14">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[34px] border border-white/[0.09] bg-white/[0.025] px-5 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--landing-accent)]/15 blur-[100px]" />

            <div className="relative">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--landing-accent)]">
                Your next application
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.2rem]">
                Build momentum,
                <br />
                not spreadsheets.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-7 text-white/40 sm:text-base">
                Give Cadence the job posting. Keep the context, application and
                next action in one place.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={APP_HREF}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(255,255,255,0.16)] sm:w-auto"
                >
                  Open Cadence
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="#workflow"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-6 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white sm:w-auto"
                >
                  Explore the workflow
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

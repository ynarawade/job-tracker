import { ArrowRight, CalendarDays, LayoutList, Search } from "lucide-react";

import { PIPELINE_ITEMS } from "@/lib/landing/content";

import { Reveal } from "@/components/landing/Reveal";
import {
  Container,
  Section,
  SectionHeading,
  StatusPill,
} from "@/components/landing/primitives";

function getTone(
  tone: (typeof PIPELINE_ITEMS)[number]["tone"]
): "default" | "accent" | "success" | "warning" {
  switch (tone) {
    case "primary":
      return "accent";
    case "success":
      return "success";
    case "warning":
      return "warning";
    default:
      return "default";
  }
}

export function TrackingSection() {
  return (
    <Section id="product" className="border-y border-white/6 bg-white/[0.012]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Application tracking"
            title={
              <>
                Your job search deserves
                <br className="hidden sm:block" /> better than a spreadsheet.
              </>
            }
            description="Every role becomes part of one clear application pipeline with the context you need to decide what deserves your attention next."
          />
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#090909] shadow-[0_36px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.04]">
                  <LayoutList className="size-4 text-white/55" />
                </span>

                <div>
                  <p className="text-xs font-medium text-white/85">
                    Applications
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/30">
                    Your active job search
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-9 flex-1 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 sm:w-[200px]">
                  <Search className="size-3.5 text-white/25" />

                  <span className="text-[11px] text-white/25">
                    Search applications
                  </span>
                </div>

                <button
                  type="button"
                  aria-label="Application calendar"
                  className="grid size-9 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-white/35"
                >
                  <CalendarDays className="size-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {PIPELINE_ITEMS.map((item) => (
                <div
                  key={`${item.company}-${item.role}`}
                  className="group grid gap-3 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-[1fr_auto] sm:items-center sm:px-5"
                >
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-[10px] font-semibold text-white/55">
                        {item.company.slice(0, 1)}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-white/85">
                          {item.role}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-white/30">
                          {item.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pl-[42px] sm:justify-end sm:pl-0">
                    <StatusPill tone={getTone(item.tone)}>
                      {item.status}
                    </StatusPill>

                    <span className="min-w-[110px] text-right text-[10px] text-white/25">
                      {item.meta}
                    </span>

                    <ArrowRight className="hidden size-3.5 text-white/15 transition-transform group-hover:translate-x-0.5 group-hover:text-white/40 sm:block" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid border-t border-white/[0.07] sm:grid-cols-3">
              {[
                ["12", "Active"],
                ["3", "Need attention"],
                ["2", "Interviews"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={[
                    "px-5 py-5",
                    index > 0
                      ? "border-t border-white/[0.06] sm:border-l sm:border-t-0"
                      : "",
                  ].join(" ")}
                >
                  <p className="text-2xl font-medium tracking-[-0.045em] text-white">
                    {value}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/25">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

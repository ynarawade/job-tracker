"use client";

import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { ArrowRight, Check, Inbox, Link2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Paste a link, get the whole role",
    body: "Drop any job posting URL. Cadence reads the title, company, location, salary and deadline, then files it for you.",
  },
  {
    icon: Inbox,
    title: "Status that updates itself",
    body: "Cadence watches your inbox for replies, rejections and interview invites, and moves each application along quietly.",
  },
  {
    icon: Sparkles,
    title: "Follow-ups already written",
    body: "When a thread goes cold, an AI-drafted nudge in your own voice is waiting. Read it, tweak it, send it.",
  },
];

const steps = [
  { n: "01", t: "Add the posting", d: "One URL. No forms, no copy-paste." },
  {
    n: "02",
    t: "Connect your inbox",
    d: "Read-only. Cadence only looks at hiring threads.",
  },
  {
    n: "03",
    t: "Keep the cadence",
    d: "Timed reminders and drafts land before momentum dies.",
  },
];

const pipeline = [
  {
    label: "Applied",
    company: "Northwind",
    role: "Backend Engineer",
    day: "Day 12",
    tone: "muted",
  },
  {
    label: "Replied",
    company: "Halcyon Labs",
    role: "Platform Engineer",
    day: "Day 4",
    tone: "primary",
  },
  {
    label: "Interview",
    company: "Ferrous",
    role: "Staff Engineer",
    day: "Tue 10:00",
    tone: "accent",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex size-7 items-end justify-center gap-[3px] rounded-md bg-primary px-1.5 pb-2">
            <span className="h-1.5 w-[3px] rounded-full bg-primary-foreground/80" />
            <span className="h-2.5 w-[3px] rounded-full bg-primary-foreground" />
            <span className="h-1 w-[3px] rounded-full bg-primary-foreground/60" />
          </span>
          <span className="font-heading text-xl tracking-tight">Cadence</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeModeToggle />
          <a
            href="#start"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start tracking
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Job search, on a rhythm
            </span>
            <h1 className="mt-6 font-heading text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Job hunting is hard enough. Tracking it shouldn't be.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Cadence automatically logs your applications, updates their status
              from your inbox, and writes your follow-ups — quietly, in the
              background.
            </p>

            <form
              id="start"
              className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@work.com"
                aria-label="Email address"
                className="h-11 flex-1 rounded-lg border border-input bg-card px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get early access
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {[
                "Free while in beta",
                "Read-only inbox access",
                "No credit card",
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Pipeline Mockup */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-32px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Pipeline
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  3 active
                </span>
              </div>
              <ul className="divide-y divide-border">
                {pipeline.map((row) => (
                  <li
                    key={row.company}
                    className="flex items-center gap-4 py-4"
                  >
                    <span
                      className={
                        "size-2 shrink-0 rounded-full " +
                        (row.tone === "primary"
                          ? "bg-primary"
                          : row.tone === "accent"
                            ? "bg-chart-2"
                            : "bg-muted-foreground/40")
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{row.role}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {row.company}
                      </p>
                    </div>
                    <span className="rounded-md bg-secondary px-2 py-1 text-[11px] text-secondary-foreground">
                      {row.label}
                    </span>
                    <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
                      {row.day}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 rounded-xl bg-accent p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-foreground">
                  Draft ready
                </p>
                <p className="mt-2 text-sm leading-relaxed text-accent-foreground/90">
                  “Hi Maya — following up on the Platform Engineer role. Still
                  very interested, and happy to share more on the migration work
                  we discussed.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border bg-card/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Less admin. More interviews.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {features.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="mt-4 text-base font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            Three steps, then it runs itself.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="border-t border-border pt-5">
                <span className="font-mono text-xs tracking-[0.18em] text-primary">
                  {s.n}
                </span>
                <h3 className="mt-3 text-base font-medium">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="rounded-2xl border border-border bg-accent px-8 py-14 text-center">
            <h2 className="font-heading text-3xl tracking-tight text-accent-foreground sm:text-4xl">
              Keep the cadence going.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-accent-foreground/80">
              Join the beta and let Cadence handle the remembering.
            </p>
            <a
              href="#start"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get early access
              <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <span className="font-heading text-sm text-foreground">Cadence</span>
          <span>
            © {new Date().getFullYear()} Cadence. Built for serious job seekers.
          </span>
        </div>
      </footer>
    </div>
  );
}

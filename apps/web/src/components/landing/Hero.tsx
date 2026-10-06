import { ArrowRight, Check, ChevronDown } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { APP_HREF } from "@/lib/landing/content";

import { JobIntelligenceDemo } from "./job-intelligence-demo";
import { Container, Eyebrow } from "./primitives";

const proofItems = [
  "AI job extraction",
  "Structured tracking",
  "Follow-ups next",
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/6">
      {/* Background video */}
      <div className="absolute inset-0 -z-30 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="landing-hero-video h-full w-full object-cover opacity-70"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Base cinematic dark overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-black/50" />

      {/* Left-to-right contrast overlay */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.64)_38%,rgba(5,5,5,0.28)_72%,rgba(5,5,5,0.4)_100%)]" />

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.04)_0%,rgba(5,5,5,0.08)_50%,rgba(5,5,5,0.55)_82%,#050505_100%)]" />

      {/* Cadence green atmosphere */}
      <div className="pointer-events-none absolute left-[4%] -top-48 -z-10 size-152 rounded-full bg-(--landing-accent)/[0.14] blur-[140px]" />

      <div className="pointer-events-none absolute -right-48 top-[20%] -z-10 size-128 rounded-full bg-white/4 blur-[130px]" />

      {/* Grid */}
      <div className="landing-grid pointer-events-none absolute inset-0 -z-10 opacity-45" />

      {/* Subtle top edge light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

      <Container className="relative grid min-h-dvh items-center gap-14 pb-14 pt-30 sm:pb-20 sm:pt-33 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:pb-24 lg:pt-34">
        {/* Hero copy */}
        <div className="relative z-10 max-w-170">
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
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Eyebrow>AI job application command center</Eyebrow>
          </motion.div>

          <h1 className="mt-7 text-balance text-[clamp(3rem,7vw,5.9rem)] font-medium leading-[0.94] tracking-[-0.065em] text-white">
            <motion.span
              initial={{
                opacity: 0,
                y: 32,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.85,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              Keep every
            </motion.span>

            <motion.span
              initial={{
                opacity: 0,
                y: 32,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.85,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              application{" "}
              <span className="text-(--landing-accent-strong)">moving.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-7 max-w-147.5 text-pretty text-base leading-7 text-white/55 sm:text-[17px] sm:leading-8"
          >
            Paste a job URL or job description. Cadence understands the role,
            turns it into a structured application and keeps your entire job
            search organized from one place.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href={APP_HREF}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black shadow-[0_0_36px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_0_48px_rgba(255,255,255,0.24)]"
            >
              Open Cadence
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="#workflow"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-black/20 px-6 text-[14px] font-medium text-white/75 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/8 hover:text-white"
            >
              See how it works
              <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>

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
              duration: 0.7,
              delay: 0.62,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2"
          >
            {proofItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/40"
              >
                <span className="grid size-4 place-items-center rounded-full border border-white/15 bg-black/20 backdrop-blur-lg">
                  <Check className="size-2.5 text-(--landing-accent-strong)" />
                </span>

                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Product UI */}
        <div className="relative z-10">
          <JobIntelligenceDemo />
        </div>

        {/* Mobile scroll hint */}
        <motion.a
          href="#workflow"
          aria-label="Scroll to workflow"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1.5,
          }}
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/25 transition-colors hover:text-white/50 lg:flex"
        >
          Scroll to explore
          <motion.span
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="size-3.5" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}

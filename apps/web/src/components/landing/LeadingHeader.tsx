import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { APP_HREF, NAV_ITEMS } from "@/lib/landing/content";

import { CadenceLogo } from "@/components/landing/CadenceLogo";
import { MobileNav } from "@/components/landing/MobileNav";
import { Container } from "@/components/landing/primitives";

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/[0.14] backdrop-blur-2xl backdrop-saturate-150">
      <Container className="flex h-18 items-center justify-between">
        <CadenceLogo />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/[0.14] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-white/55 transition-all duration-300 hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={APP_HREF}
            className="group hidden h-10 items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 text-[13px] font-semibold text-black shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white md:inline-flex"
          >
            Open Cadence
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

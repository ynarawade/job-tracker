import Link from "next/link";

import { NAV_ITEMS } from "@/lib/landing/content";

import { CadenceLogo } from "@/components/landing/CadenceLogo";
import { Container } from "@/components/landing/primitives";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06]">
      <Container className="flex flex-col gap-8 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CadenceLogo />

          <p className="mt-3 text-[11px] text-white/25">
            Built for job searches that deserve better systems.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:items-end">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-medium text-white/30 transition-colors hover:text-white/70"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-[10px] text-white/20">
            © {new Date().getFullYear()} Cadence
          </p>
        </div>
      </Container>
    </footer>
  );
}

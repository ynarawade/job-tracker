"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { APP_HREF, NAV_ITEMS } from "@/lib/landing/content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="cadence-mobile-navigation"
        onClick={() => setOpen((current) => !current)}
        className="relative z-[70] grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl transition-colors hover:bg-white/[0.1] md:hidden"
      >
        {open ? (
          <X className="size-[18px]" />
        ) : (
          <Menu className="size-[18px]" />
        )}
      </button>

      {open ? (
        <div
          id="cadence-mobile-navigation"
          className="fixed inset-0 z-[60] md:hidden"
        >
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-4 top-20 overflow-hidden rounded-[26px] border border-white/10 bg-[#0c0c0c]/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-[15px] font-medium text-white/65 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-white/10" />

              <Link
                href={APP_HREF}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-black transition-transform active:scale-[0.98]"
              >
                Open Cadence
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

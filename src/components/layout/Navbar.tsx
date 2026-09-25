"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { VivahLookLogo } from "@/components/brand/VivahLookLogo";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNavbarAuth, NavbarAuth } from "@/components/auth/NavbarAuth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Occasions", href: "/#occasions" },
  { label: "Catalog", href: "/#outfits" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

/** Editorial header with VivahLook branding, desktop navigation, Try Free pill, and mobile drawer. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors">
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Brand Logo */}
        <VivahLookLogo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-foreground",
                  active
                    ? "text-foreground font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NavbarAuth />
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full hover:opacity-95 transition-all shadow-sm hover:shadow-md"
          >
            <span>Try Free</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground md:hidden hover:bg-muted/50 transition-colors"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background/98 backdrop-blur-lg md:hidden",
          open ? "block animate-fade-in" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-3 py-6">
          <Link
            href="/studio"
            onClick={closeMenu}
            className="w-full text-center py-3 bg-primary text-primary-foreground font-semibold rounded-full text-sm shadow-md"
          >
            Try VivahLook Free →
          </Link>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted/60 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-border/60">
            <MobileNavbarAuth onNavigate={closeMenu} />
          </div>
        </Container>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

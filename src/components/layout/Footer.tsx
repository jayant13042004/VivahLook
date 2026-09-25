import Link from "next/link";
import { VivahLookLogo } from "@/components/brand/VivahLookLogo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-surface">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand Column (2 cols) */}
        <div className="lg:col-span-2 flex flex-col items-start">
          <VivahLookLogo size="md" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
              🇮🇳 Designed for Indian Weddings
            </span>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: "Wedding Studio", href: "/studio" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "Wedding Occasions", href: "/#occasions" },
              { label: "Couture Catalog", href: "/#outfits" },
              { label: "Before & After", href: "/#transformation" },
              { label: "Look Packs", href: "/#pricing" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Trust */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground">
            Legal & Trust
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "About VivahLook", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "FAQ", href: "/#faq" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Occasions Direct */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground">
            Ceremonies
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: "Haldi Outfits", href: "/studio" },
              { label: "Mehendi Couture", href: "/studio" },
              { label: "Sangeet Glam", href: "/studio" },
              { label: "Wedding Day Regal", href: "/studio" },
              { label: "Reception Modern", href: "/studio" },
              { label: "Wedding Guest", href: "/studio" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Copyright Bar */}
      <div className="border-t border-border/60 bg-muted/20">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.</p>
          <p>Photos processed privately · Never sold or trained on</p>
        </Container>
      </div>
    </footer>
  );
}

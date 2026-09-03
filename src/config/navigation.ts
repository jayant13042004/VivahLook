/**
 * Navigation links — used by Navbar and Footer.
 * Keep labels short; add/remove routes here when adding pages.
 */

import { modulesConfig } from "@/config/modules";

export type NavItem = {
  label: string;
  href: string;
  /** Hide from primary navbar (still usable in footer / sitemap). */
  footerOnly?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy", footerOnly: true },
  { label: "Terms & Conditions", href: "/terms", footerOnly: true },
];

/** Public nav including optional modules (e.g. Blog). */
export function getMainNav(): NavItem[] {
  const items = [...mainNav];
  if (modulesConfig.blog) {
    items.splice(1, 0, { label: "Blog", href: "/blog" });
  }
  if (modulesConfig.seoProfile) {
    items.push(
      { label: "Tools", href: "/tools" },
      { label: "Topics", href: "/topics" },
    );
  }
  return items;
}

export function getAllNavItems(): NavItem[] {
  return [...getMainNav(), ...legalNav];
}

export const allNavItems: NavItem[] = getAllNavItems();

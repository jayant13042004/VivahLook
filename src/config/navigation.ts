/**
 * Navigation links — VivahLook.
 */

import { modulesConfig } from "@/config/modules";

export type NavItem = {
  label: string;
  href: string;
  footerOnly?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Try Free", href: "/studio" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/faq" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy", footerOnly: true },
  { label: "Terms & Conditions", href: "/terms", footerOnly: true },
  { label: "About", href: "/about", footerOnly: true },
  { label: "Contact", href: "/contact", footerOnly: true },
];

export function getMainNav(): NavItem[] {
  const items = [...mainNav];
  if (modulesConfig.blog) {
    items.push({ label: "Blog", href: "/blog" });
  }
  return items;
}

export function getAllNavItems(): NavItem[] {
  return [...getMainNav(), ...legalNav];
}

export const allNavItems: NavItem[] = getAllNavItems();

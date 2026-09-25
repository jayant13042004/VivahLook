/**
 * Navigation links — VivahLook.
 */

export type NavItem = {
  label: string;
  href: string;
  footerOnly?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Occasions", href: "/#occasions" },
  { label: "Outfits", href: "/#outfits" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy", footerOnly: true },
  { label: "Terms & Conditions", href: "/terms", footerOnly: true },
  { label: "About", href: "/about", footerOnly: true },
  { label: "Contact", href: "/contact", footerOnly: true },
];

export function getMainNav(): NavItem[] {
  return [...mainNav];
}

export function getAllNavItems(): NavItem[] {
  return [...mainNav, ...legalNav];
}

export const allNavItems: NavItem[] = getAllNavItems();

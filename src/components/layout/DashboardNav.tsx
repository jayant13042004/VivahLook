"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { modulesConfig } from "@/config/modules";
import { cn } from "@/lib/utils";

type DashboardNavProps = {
  className?: string;
  showAdmin?: boolean;
};

/** Sub-navigation for signed-in area. */
export function DashboardNav({ className, showAdmin }: DashboardNavProps) {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/billing", label: "Billing" },
    ...(showAdmin && modulesConfig.admin
      ? [{ href: "/admin", label: "Admin" }]
      : []),
  ];

  return (
    <nav
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Account"
    >
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "border-border bg-muted text-foreground"
                : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

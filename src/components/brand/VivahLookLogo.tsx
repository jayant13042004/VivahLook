import Link from "next/link";
import { cn } from "@/lib/utils";

type VivahLookLogoProps = {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

export function VivahLookLogo({
  className,
  showTagline = true,
  size = "md",
  href = "/",
}: VivahLookLogoProps) {
  const content = (
    <div className={cn("inline-flex flex-col items-start leading-none", className)}>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "font-display font-bold tracking-tight text-foreground transition-colors",
            size === "sm" && "text-xl",
            size === "md" && "text-2xl",
            size === "lg" && "text-3xl",
          )}
          style={{ letterSpacing: "-0.02em" }}
        >
          VivahLook
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mb-0.5" />
      </div>
      {showTagline && (
        <span
          className={cn(
            "font-sans uppercase font-medium text-muted-foreground/80 tracking-[0.20em] mt-0.5",
            size === "sm" && "text-[9px]",
            size === "md" && "text-[10px]",
            size === "lg" && "text-xs",
          )}
        >
          See Your Wedding Look
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group inline-flex items-center transition-opacity hover:opacity-90"
        aria-label="VivahLook — See Yourself in Your Perfect Wedding Look"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function VivahLookMonogram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold text-lg shadow-sm border border-accent/30",
        className,
      )}
      aria-label="VivahLook Monogram"
    >
      <span>V</span>
    </div>
  );
}

// Backward compatibility aliases
export const VaaraaLogo = VivahLookLogo;
export const VaaraaMonogram = VivahLookMonogram;

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type VivahLookLogoProps = {
  className?: string;
  showTagline?: boolean;
  showMark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

/**
 * Sacred Ribbon Knot Mark (Gathbandhan)
 * The official authentic satin silk & champagne gold intertwining 'V' mark.
 */
export function SacredRibbonIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/brand/vivahlook-ribbon.png"
      alt="VivahLook Ribbon Knot"
      width={120}
      height={96}
      priority
      className={cn("object-contain shrink-0 select-none", className)}
    />
  );
}

export function VivahLookLogo({
  className,
  showTagline = true,
  showMark = true,
  size = "md",
  href = "/",
}: VivahLookLogoProps) {
  const content = (
    <div className={cn("inline-flex items-center gap-2.5 leading-none select-none", className)}>
      {/* Sacred Ribbon Knot Monogram */}
      {showMark && (
        <div
          className={cn(
            "relative flex items-center justify-center shrink-0",
            size === "sm" && "w-7 h-7",
            size === "md" && "w-10 h-10",
            size === "lg" && "w-13 h-13",
          )}
        >
          <SacredRibbonIcon
            className={cn(
              "w-full h-full drop-shadow-[0_2px_8px_rgba(139,26,43,0.15)]",
            )}
          />
        </div>
      )}

      {/* Typography Lockup */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "font-display font-bold tracking-tight text-foreground transition-colors",
              size === "sm" && "text-lg",
              size === "md" && "text-2xl",
              size === "lg" && "text-3xl",
            )}
            style={{ letterSpacing: "-0.01em" }}
          >
            Vivah<span className="text-accent font-semibold">Look</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mb-0.5" />
        </div>
        {showTagline && (
          <span
            className={cn(
              "font-sans uppercase font-medium text-muted-foreground/80 tracking-[0.20em] mt-0.5",
              size === "sm" && "text-[8px]",
              size === "md" && "text-[9px]",
              size === "lg" && "text-[11px]",
            )}
          >
            See Yourself in Your Perfect Wedding Look
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group inline-flex items-center transition-opacity hover:opacity-95"
        aria-label="VivahLook — See Yourself in Your Perfect Wedding Look"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Centered Official Lockup (Full Ribbon + VIVAHLOOK Serif Wordmark)
 */
export function VivahLookFullLogo({
  className,
  width = 240,
  height = 240,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/images/brand/vivahlook-official-logo.png"
      alt="VivahLook — See Yourself in Your Perfect Wedding Look"
      width={width}
      height={height}
      priority
      className={cn("object-contain rounded-2xl", className)}
    />
  );
}

export function VivahLookMonogram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border shadow-xs p-1",
        className,
      )}
      aria-label="VivahLook Monogram"
    >
      <SacredRibbonIcon className="w-full h-full" />
    </div>
  );
}

// Backward compatibility aliases
export const VaaraaLogo = VivahLookLogo;
export const VaaraaMonogram = VivahLookMonogram;

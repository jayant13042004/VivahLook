import Link from "next/link";
import { cn } from "@/lib/utils";

type VivahLookLogoProps = {
  className?: string;
  showTagline?: boolean;
  showMark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
};

/**
 * Sacred Ribbon Knot Vector Mark (Gathbandhan)
 * Intertwining bridal crimson silk & groom champagne gold ribbons forming 'V'.
 */
export function SacredRibbonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        {/* Crimson Silk Gradients */}
        <linearGradient id="vlCrimsonFront" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="40%" stopColor="#8E1426" />
          <stop offset="80%" stopColor="#630B19" />
          <stop offset="100%" stopColor="#450510" />
        </linearGradient>
        <linearGradient id="vlCrimsonHighlight" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#F0485E" />
          <stop offset="50%" stopColor="#C41E3A" />
          <stop offset="100%" stopColor="#8E1426" />
        </linearGradient>
        <linearGradient id="vlCrimsonFold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A0610" />
          <stop offset="60%" stopColor="#7E0E20" />
          <stop offset="100%" stopColor="#AA192E" />
        </linearGradient>

        {/* Champagne Gold Silk Gradients */}
        <linearGradient id="vlGoldFront" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFF2CE" />
          <stop offset="30%" stopColor="#E5C163" />
          <stop offset="65%" stopColor="#C4952D" />
          <stop offset="100%" stopColor="#78500C" />
        </linearGradient>
        <linearGradient id="vlGoldHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFF5" />
          <stop offset="40%" stopColor="#F5DC94" />
          <stop offset="100%" stopColor="#B8861B" />
        </linearGradient>
        <linearGradient id="vlGoldBackFold" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#875E0E" />
          <stop offset="60%" stopColor="#B38118" />
          <stop offset="100%" stopColor="#DDBB5F" />
        </linearGradient>

        <filter id="vlShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#vlShadow)">
        {/* 1. Back Gold Fold */}
        <path
          d="M58 35 C64 24, 76 18, 83 20 C85 20.5, 87 23, 86 26 C82 35, 71 52, 62 66 C57 73, 52 79, 48 83 C49 80, 52 68, 55 56 C57 48, 58 41, 58 35 Z"
          fill="url(#vlGoldBackFold)"
        />

        {/* 2. Crimson Silk Ribbon (Left to Vertex) */}
        <path
          d="M20 22 C23 20, 27 22, 29 25 C31 29, 30 33, 26 35 C23 35, 20 31, 19 27 C18.5 24.5, 19 23, 20 22 Z"
          fill="url(#vlCrimsonHighlight)"
        />
        <path
          d="M27 24 C33 26, 38 33, 41 42 C46 54, 49 68, 51 79 C51.5 82, 51 84, 48.5 84.5 C46 85, 43 82, 40 76 C36 67, 30 52, 25 39 C23 34, 21 28, 27 24 Z"
          fill="url(#vlCrimsonFront)"
        />
        <path
          d="M48.5 84.5 C51 84, 53 80, 55 74 C57 66, 59 55, 61 46 C57 56, 52 71, 48 79 C46 83, 47 84.5, 48.5 84.5 Z"
          fill="url(#vlCrimsonFold)"
        />

        {/* 3. Gold Silk Ribbon (Intertwining Right Loop) */}
        <path
          d="M82 20 C85 20.5, 88 23.5, 87 27 C84 37, 74 54, 65 67 C59 76, 54 81, 49 84 C48.5 83, 49 81, 50 78 C54 73, 62 60, 69 49 C74 41, 79 31, 80 25 C80.5 22, 79 21, 82 20 Z"
          fill="url(#vlGoldHighlight)"
        />
        <path
          d="M37 46 C41 40, 48 37, 54 41 C57 43, 58 48, 56 53 C53 60, 48 70, 43 78 C40 82, 38 82, 38.5 80 C40 73, 46 61, 49 54 C50.5 50, 49.5 47, 46 46 C42 45, 38 48, 37 46 Z"
          fill="url(#vlGoldFront)"
        />

        {/* Auspicious Jewel Accent */}
        <circle cx="51" cy="18" r="2.5" fill="url(#vlGoldHighlight)" />
      </g>
    </svg>
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
        <SacredRibbonIcon
          className={cn(
            size === "sm" && "w-7 h-7",
            size === "md" && "w-9 h-9",
            size === "lg" && "w-11 h-11",
          )}
        />
      )}

      {/* Typography Lockup */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-display font-bold tracking-tight text-foreground transition-colors",
              size === "sm" && "text-lg",
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

export function VivahLookMonogram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl bg-surface border border-border shadow-xs",
        className,
      )}
      aria-label="VivahLook Monogram"
    >
      <SacredRibbonIcon className="w-6 h-6" />
    </div>
  );
}

// Backward compatibility aliases
export const VaaraaLogo = VivahLookLogo;
export const VaaraaMonogram = VivahLookMonogram;

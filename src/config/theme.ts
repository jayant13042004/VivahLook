/**
 * Theme tokens — single source of truth for colors.
 *
 * Change these values to rebrand a new project.
 * They are injected as CSS variables on `:root` and `.dark`.
 *
 * Semantic names (not raw color names) keep components theme-agnostic.
 */

export type ThemeModeTokens = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  ring: string;
  success: string;
  warning: string;
  danger: string;
};

export const themeConfig = {
  /** Default when no preference is stored. "system" follows OS. */
  defaultMode: "system" as "light" | "dark" | "system",
  /** CSS class toggled on <html> for dark mode (must match ThemeProvider). */
  darkClass: "dark",
  light: {
    background: "#f3f6f5",
    foreground: "#14201c",
    muted: "#e4ebe8",
    mutedForeground: "#5a6b64",
    surface: "#ffffff",
    surfaceElevated: "#f8faf9",
    border: "#cfd9d4",
    primary: "#0f766e",
    primaryForeground: "#f0fdfa",
    accent: "#0e7490",
    accentForeground: "#ecfeff",
    ring: "#14b8a6",
    success: "#15803d",
    warning: "#a16207",
    danger: "#b91c1c",
  } satisfies ThemeModeTokens,
  dark: {
    background: "#0b1210",
    foreground: "#e8efec",
    muted: "#1a2420",
    mutedForeground: "#9aaba4",
    surface: "#121a17",
    surfaceElevated: "#18211d",
    border: "#2a3631",
    primary: "#2dd4bf",
    primaryForeground: "#042f2e",
    accent: "#22d3ee",
    accentForeground: "#083344",
    ring: "#5eead4",
    success: "#4ade80",
    warning: "#fbbf24",
    danger: "#f87171",
  } satisfies ThemeModeTokens,
} as const;

/** Convert theme tokens into a CSS custom-property block. */
export function tokensToCssVars(tokens: ThemeModeTokens): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `--${cssKey}: ${value};`;
    })
    .join("\n  ");
}

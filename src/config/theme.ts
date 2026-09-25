/**
 * Theme tokens — VivahLook luxury Indian wedding palette.
 *
 * Light: Warm royal ivory, deep wine/burgundy primary, restrained champagne gold accents.
 * Dark: Rich velvet obsidian, rose gold, warm cream text.
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
  defaultMode: "light" as "light" | "dark" | "system",
  darkClass: "dark",
  light: {
    background: "#FAF6F0",
    foreground: "#1C1415",
    muted: "#F4EDE4",
    mutedForeground: "#6E5E58",
    surface: "#FFFFFF",
    surfaceElevated: "#FDFBF7",
    border: "#EAE0D5",
    primary: "#601422",
    primaryForeground: "#FAF6F0",
    accent: "#B8860B",
    accentForeground: "#FAF6F0",
    ring: "#C59B3F",
    success: "#2D6A4F",
    warning: "#B8860B",
    danger: "#901D2E",
  } satisfies ThemeModeTokens,
  dark: {
    background: "#100B0D",
    foreground: "#F7EFE9",
    muted: "#1D1618",
    mutedForeground: "#A99B95",
    surface: "#181113",
    surfaceElevated: "#22191C",
    border: "#33262A",
    primary: "#DF919B",
    primaryForeground: "#230A0F",
    accent: "#D4AF37",
    accentForeground: "#1A1400",
    ring: "#D4AF37",
    success: "#6BBF8A",
    warning: "#E0B44A",
    danger: "#E8757A",
  } satisfies ThemeModeTokens,
} as const;

export function tokensToCssVars(tokens: ThemeModeTokens): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `--${cssKey}: ${value};`;
    })
    .join("\n  ");
}

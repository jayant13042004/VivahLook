"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themeConfig } from "@/config/theme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * Wraps the app with next-themes.
 * Uses class strategy so Tailwind `dark:` variants work with `.dark` on <html>.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeConfig.defaultMode}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

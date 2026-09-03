import {
  themeConfig,
  tokensToCssVars,
} from "@/config/theme";

/**
 * Injects CSS variables from src/config/theme.ts.
 * Keep this in the root layout so one config file drives the whole palette.
 */
export function ThemeStyle() {
  const css = `
:root {
  ${tokensToCssVars(themeConfig.light)}
}

.${themeConfig.darkClass} {
  ${tokensToCssVars(themeConfig.dark)}
}
`.trim();

  return (
    <style
      id="theme-tokens"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}

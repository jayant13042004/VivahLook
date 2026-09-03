import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeStyle } from "@/components/theme/ThemeStyle";
import { modulesConfig } from "@/config/modules";
import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { websiteSchema } from "@/lib/seo/schema";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const display = Sora({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata(),
  applicationName: siteConfig.name,
  keywords: [...seoConfig.defaultKeywords],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <ThemeStyle />
        <Analytics />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        {modulesConfig.seoProfile ? <JsonLd data={websiteSchema()} /> : null}
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

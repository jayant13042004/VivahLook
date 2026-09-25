import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeStyle } from "@/components/theme/ThemeStyle";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});

const serifItalic = Cormorant_Garamond({
  variable: "--font-serif-italic",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "VivahLook — See Yourself in Your Perfect Wedding Look | AI Wedding Try-On",
    description: siteConfig.description,
  }),
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "VivahLook",
    "wedding look",
    "Indian wedding outfit",
    "virtual try on wedding",
    "sherwani",
    "lehenga",
    "saree",
    "wedding fashion",
    "AI wedding",
    "bridal lehenga preview",
    "groom sherwani try on",
    "Indian wedding",
    "Haldi ceremony look",
    "Sangeet outfit",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${serifItalic.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <ThemeStyle />
        <Analytics />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

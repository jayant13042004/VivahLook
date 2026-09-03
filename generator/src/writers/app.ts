import { writeFile } from "../fs.ts";
import { hasAuth, type ProjectConfig } from "../types.ts";

export function writeLayout(outDir: string, config: ProjectConfig) {
  const analyticsImport = config.analytics
    ? `import { Analytics } from "@/components/analytics/Analytics";\n`
    : "";
  const jsonLdImport = config.seoProfile
    ? `import { JsonLd } from "@/components/seo/JsonLd";\n`
    : "";
  const modulesImport = config.seoProfile
    ? `import { modulesConfig } from "@/config/modules";\n`
    : "";
  const schemaImport = config.seoProfile
    ? `import { websiteSchema } from "@/lib/seo/schema";\n`
    : "";
  const analyticsHead = config.analytics ? `\n        <Analytics />` : "";
  const jsonLdBody = config.seoProfile
    ? `\n        {modulesConfig.seoProfile ? <JsonLd data={websiteSchema()} /> : null}`
    : "";

  writeFile(
    outDir,
    "src/app/layout.tsx",
    `import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, JetBrains_Mono } from "next/font/google";
${analyticsImport}${jsonLdImport}import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeStyle } from "@/components/theme/ThemeStyle";
${modulesImport}import { seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
${schemaImport}import { ThemeProvider } from "@/providers/ThemeProvider";
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
      className={\`\${sans.variable} \${display.variable} \${mono.variable} h-full antialiased\`}
    >
      <head>
        <ThemeStyle />${analyticsHead}
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">${jsonLdBody}
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
`,
  );
}

export function writeContactActions(outDir: string, config: ProjectConfig) {
  if (config.email) {
    writeFile(
      outDir,
      "src/app/contact/actions.ts",
      `"use server";

import { isEmailConfigured, sendContactEmail } from "@/lib/email/send";

export type ContactActionState = {
  error?: string;
  success?: string;
  delivered?: boolean;
};

export async function sendContactMessage(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return { error: "Enter a valid email." };
  }

  if (!isEmailConfigured()) {
    return {
      success:
        "Thanks — your message was validated. Add RESEND_API_KEY and EMAIL_FROM to send real email.",
      delivered: false,
    };
  }

  try {
    await sendContactEmail({ name, email, message });
    return {
      success: "Thanks — your message was sent.",
      delivered: true,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not send message.",
    };
  }
}
`,
    );
    return;
  }

  writeFile(
    outDir,
    "src/app/contact/actions.ts",
    `"use server";

export type ContactActionState = {
  error?: string;
  success?: string;
  delivered?: boolean;
};

export async function sendContactMessage(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return { error: "Enter a valid email." };
  }

  return {
    success: "Thanks — your message was validated.",
    delivered: false,
  };
}
`,
  );
}

export function writeSitemapLib(outDir: string, config: ProjectConfig) {
  const imports = [
    `import type { MetadataRoute } from "next";`,
    `import { getAllNavItems } from "@/config/navigation";`,
    `import { absoluteUrl } from "@/lib/seo";`,
  ];
  if (config.blog) imports.push(`import { getBlogPosts } from "@/lib/blog/posts";`);
  if (config.seoProfile) {
    imports.push(`import { topicPages } from "@/content/topics";`);
    imports.push(`import { tools } from "@/content/tools";`);
  }

  const postsBlock = config.blog
    ? `
  const posts = getBlogPosts().map((post) => ({
    url: absoluteUrl(\`/blog/\${post.slug}\`),
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
`
    : "";

  const extraBlock = config.seoProfile
    ? `
  const toolUrls = [
    {
      url: absoluteUrl("/tools"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...tools.map((tool) => ({
      url: absoluteUrl(\`/tools/\${tool.slug}\`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const topicUrls = [
    {
      url: absoluteUrl("/topics"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...topicPages.map((topic) => ({
      url: absoluteUrl(\`/topics/\${topic.slug}\`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  const merged = [...nav, ${config.blog ? "...posts, " : ""}...toolUrls, ...topicUrls];
  const byUrl = new Map<string, (typeof merged)[number]>();
  for (const entry of merged) {
    byUrl.set(entry.url, entry);
  }
  return [...byUrl.values()];
`
    : config.blog
      ? `
  return [...nav, ...posts];
`
      : `
  return nav;
`;

  writeFile(
    outDir,
    "src/lib/seo/sitemap.ts",
    `${imports.join("\n")}

/** Single sitemap builder — used by app/sitemap.ts. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const nav = Array.from(new Set(getAllNavItems().map((item) => item.href))).map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "/" ? 1 : 0.7,
    }),
  );
${postsBlock}${extraBlock}}
`,
  );
}

export function writeMiddleware(outDir: string, config: ProjectConfig) {
  if (!hasAuth(config)) return;
  writeFile(
    outDir,
    "src/middleware.ts",
    `import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
`,
  );
}

export function writeNavbar(outDir: string, config: ProjectConfig) {
  const authImport = hasAuth(config)
    ? `import { MobileNavbarAuth, NavbarAuth } from "@/components/auth/NavbarAuth";\n`
    : "";
  const authDesktop = hasAuth(config) ? `\n          <NavbarAuth />` : "";
  const authMobile = hasAuth(config)
    ? `\n          <MobileNavbarAuth onNavigate={closeMenu} />`
    : "";

  writeFile(
    outDir,
    "src/components/layout/Navbar.tsx",
    `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
${authImport}import { cn } from "@/lib/utils";

/** Site header with desktop links + mobile menu. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {getMainNav().map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">${authDesktop}
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block animate-fade-in" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {getMainNav().map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
${authMobile}
        </Container>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
`,
  );
}

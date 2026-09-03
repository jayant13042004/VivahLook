import { profileLabels } from "../defaults.ts";
import { writeFile } from "../fs.ts";
import { hasAuth, hasPayments, type ProjectConfig } from "../types.ts";

export function writeProjectDocs(outDir: string, config: ProjectConfig) {
  writeReadme(outDir, config);
  writeDocumentation(outDir, config);
  writeAiRules(outDir);
  writeProjectContext(outDir, config);
  writeArchitecture(outDir, config);
  writeModulesDoc(outDir, config);
  writeAdapters(outDir);
}

function selectedList(config: ProjectConfig) {
  const items = [`Profile: ${profileLabels[config.profile]}`];
  if (hasAuth(config)) {
    const providers = [
      config.auth.email ? "email" : null,
      config.auth.google ? "Google" : null,
      config.auth.github ? "GitHub" : null,
    ].filter(Boolean);
    items.push(`Auth: ${providers.join(", ")}`);
  } else {
    items.push("Auth: none");
  }
  items.push(
    `Database: ${config.supabase && config.mongodb ? "Supabase + MongoDB" : config.mongodb ? "MongoDB" : config.supabase ? "Supabase" : "none"}`,
  );
  if (hasPayments(config)) {
    items.push(
      `Payments: ${[config.payments.stripe && "Stripe", config.payments.razorpay && "Razorpay"].filter(Boolean).join(", ")}`,
    );
  } else {
    items.push("Payments: none");
  }
  if (config.blog) items.push("Blog");
  if (config.analytics) items.push("Analytics");
  if (config.email) items.push("Email");
  if (config.admin) items.push("Admin");
  if (config.seoProfile) items.push("SEO profile");
  return items;
}

function writeReadme(outDir: string, config: ProjectConfig) {
  writeFile(
    outDir,
    "README.md",
    `# ${config.name}

Generated from LaunchKit. Standalone Next.js app — it does not depend on LaunchKit at runtime.

## Run

\`\`\`bash
npm install
cp .env.example .env.local
npm run dev
\`\`\`

Setup details: \`DOCUMENTATION.md\`. AI coding tools: \`AI_RULES.md\`.
`,
  );
}

function writeDocumentation(outDir: string, config: ProjectConfig) {
  const sections = [
    `# ${config.name} — setup`,
    "",
    `Generated profile: **${profileLabels[config.profile]}**.`,
    "",
    "```bash",
    "npm install",
    "npm run dev",
    "```",
    "",
    "Copy `.env.example` to `.env.local` and fill in keys for the modules you enabled.",
    "",
    "## Included",
    "",
    ...selectedList(config).map((item) => `- ${item}`),
    "",
    "## Customize",
    "",
    "- Branding: `src/config/site.ts`, `src/config/theme.ts`, `src/config/navigation.ts`",
    "- Copy: `src/content/pages.ts`",
    "",
  ];

  if (hasAuth(config) || config.supabase) {
    sections.push(
      "## Auth / Supabase",
      "",
      "1. Create a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.",
      "2. Run `supabase/migrations/001_profiles.sql` in the SQL editor.",
      "3. Auth → URL configuration: Site URL + redirect `http://localhost:3000/auth/callback`.",
    );
    if (config.auth.google) sections.push("4. Enable the Google provider.");
    if (config.auth.github) sections.push("4. Enable the GitHub provider.");
    sections.push("");
  }

  if (hasPayments(config)) {
    sections.push(
      "## Payments",
      "",
      "Requires auth + `SUPABASE_SERVICE_ROLE_KEY` + `supabase/migrations/002_payments.sql`.",
      "Status comes from webhooks (or Razorpay signature verify), not from the success URL.",
      "",
    );
    if (config.payments.stripe) {
      sections.push("Stripe webhook: `/api/payments/stripe/webhook`", "");
    }
    if (config.payments.razorpay) {
      sections.push(
        "Razorpay verify: `/api/payments/razorpay/verify`",
        "Razorpay webhook: `/api/payments/razorpay/webhook`",
        "",
      );
    }
  }

  if (config.blog) {
    sections.push("## Blog", "", "Add Markdown in `src/content/blog/` (title, description, date, published).", "");
  }
  if (config.analytics) {
    sections.push("## Analytics", "", "`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and/or `NEXT_PUBLIC_GA_MEASUREMENT_ID`.", "");
  }
  if (config.email) {
    sections.push("## Email", "", "`RESEND_API_KEY` + `EMAIL_FROM` to send the contact form.", "");
  }
  if (config.admin) {
    sections.push(
      "## Admin",
      "",
      "Run `supabase/migrations/003_admin.sql`. Set `ADMIN_EMAILS` or `profiles.role = 'admin'`. Open `/admin`.",
      "",
    );
  }
  if (config.seoProfile) {
    sections.push(
      "## SEO profile",
      "",
      "Tools: `src/content/tools.ts`. Programmatic topics: `src/content/topics.ts`.",
      "",
    );
  }
  if (config.mongodb) {
    sections.push(
      "## MongoDB",
      "",
      "Optional product data store. Set `MONGODB_URI` and call `getMongoDb()`. Auth/payments stay on Supabase if those modules are on.",
      "",
    );
  }

  writeFile(outDir, "DOCUMENTATION.md", sections.join("\n"));
}

function writeAiRules(outDir: string) {
  writeFile(
    outDir,
    "AI_RULES.md",
    `# AI_RULES.md

Universal rules for any coding agent working in this repo. Code and these files beat training-data defaults.

## Before writing code

1. Inspect existing code in the relevant folder. Do not recreate helpers that already exist.
2. Match this project's architecture (\`ARCHITECTURE.md\`, \`MODULES.md\`).
3. Read Next.js 16 docs in \`node_modules/next/dist/docs/\` before using unfamiliar App Router APIs.
4. Do not add LaunchKit as a dependency. This app is standalone.

## Quality

- TypeScript strict; no \`any\` unless a vendor type forces it.
- \`"use client"\` only when needed. Secrets stay on the server.
- UI: \`Button\`, \`Input\`, \`Section\`, \`PageHeader\`, \`cn()\`. Semantic color tokens.
- Copy/config: \`src/config/*\` and \`src/content/*\`.

## Security

- Never commit real secrets. Examples stay in \`.env.example\`.
- Never import \`createServiceClient\` in Client Components.
- Auth redirects: use \`safeInternalPath\` (a path starting with \`/\` is not enough).
- Webhooks: verify signatures; Stripe needs the raw body. Success URLs are not proof of payment.
`,
  );
}

function writeProjectContext(outDir: string, config: ProjectConfig) {
  writeFile(
    outDir,
    "PROJECT_CONTEXT.md",
    `# PROJECT_CONTEXT.md

**${config.name}** was generated from LaunchKit as a standalone Next.js app.

Selected: ${selectedList(config).join("; ")}.

## Stack

- Next.js 16 (App Router, TypeScript)
- React 19, Tailwind CSS v4
- Path alias \`@/*\` → \`src/*\`

## Conventions

1. Configure in \`src/config/\` and \`src/content/\` instead of scattering strings.
2. Reuse \`src/components/ui/\` and \`SiteShell\`.
3. Missing/placeholder env keys should degrade gracefully.

This project does **not** import LaunchKit at runtime.
`,
  );
}

function writeArchitecture(outDir: string, config: ProjectConfig) {
  const extra = [];
  if (hasAuth(config)) extra.push("Auth: middleware → Supabase cookie client → \`src/lib/auth/session.ts\`.");
  if (hasPayments(config)) extra.push("Billing: signed-in checkout → provider → webhook/verify → service-role writes.");
  if (config.blog) extra.push("Blog: Markdown in \`src/content/blog\` → \`/blog\`.");
  if (config.seoProfile) extra.push("SEO profile: \`/tools\`, \`/topics\`, JSON-LD, richer sitemap.");

  writeFile(
    outDir,
    "ARCHITECTURE.md",
    `# ARCHITECTURE.md

\`\`\`
src/app/        routes
src/config/     site, theme, nav, modules
src/content/    copy
src/lib/        helpers for included modules
src/components/ ui + layout
\`\`\`

${extra.join("\n\n") || "Marketing site only: config + content + UI kit + SEO helpers."}
`,
  );
}

function writeModulesDoc(outDir: string, config: ProjectConfig) {
  const rows = ["| Module | Where |", "| --- | --- |", "| Site / theme / nav | `src/config/` |", "| UI kit | `src/components/ui/` |"];
  if (hasAuth(config)) rows.push("| Auth | `src/lib/auth`, `src/lib/supabase`, `/login` |");
  if (config.mongodb) rows.push("| MongoDB | `src/lib/db/mongodb.ts` |");
  if (hasPayments(config)) rows.push("| Payments | `src/lib/payments`, `/billing` |");
  if (config.blog) rows.push("| Blog | `src/content/blog`, `/blog` |");
  if (config.analytics) rows.push("| Analytics | `src/components/analytics` |");
  if (config.email) rows.push("| Email | `src/lib/email/send.ts` |");
  if (config.admin) rows.push("| Admin | `/admin` |");
  if (config.seoProfile) rows.push("| SEO profile | `src/content/tools.ts`, `src/content/topics.ts` |");

  writeFile(
    outDir,
    "MODULES.md",
    `# MODULES.md

Modules included in this generated project.

${rows.join("\n")}
`,
  );
}

function writeAdapters(outDir: string) {
  writeFile(
    outDir,
    ".cursor/rules/project.mdc",
    `---
description: Project AI context — read before changing code
alwaysApply: true
---

# Cursor adapter

Pointer only.

1. \`AI_RULES.md\`
2. \`PROJECT_CONTEXT.md\`
3. \`ARCHITECTURE.md\` and \`MODULES.md\` as needed
4. Existing code
5. \`DOCUMENTATION.md\` for env/SQL only
`,
  );
  writeFile(
    outDir,
    "CLAUDE.md",
    `# Claude Code adapter

Pointer only.

1. \`AI_RULES.md\`
2. \`PROJECT_CONTEXT.md\`
3. \`ARCHITECTURE.md\` / \`MODULES.md\` as needed
4. Code in \`src/\`
5. \`DOCUMENTATION.md\` for setup
`,
  );
  writeFile(
    outDir,
    "GEMINI.md",
    `# Gemini / Antigravity adapter

Pointer only. Load \`AI_RULES.md\`, then \`PROJECT_CONTEXT.md\`, then \`ARCHITECTURE.md\` / \`MODULES.md\` as needed.
`,
  );
  writeFile(
    outDir,
    ".github/copilot-instructions.md",
    `# Copilot adapter

Follow \`AI_RULES.md\`, \`PROJECT_CONTEXT.md\`, \`ARCHITECTURE.md\`, and \`MODULES.md\`. Inspect \`src/\` before adding files.
`,
  );
}

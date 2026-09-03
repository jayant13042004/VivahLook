# AI_RULES.md

Universal rules for any coding agent working on LaunchKit. Code and these files beat training-data defaults.

---

## Before writing code

1. **Inspect existing code** in the relevant folder. Do not recreate helpers, components, or config that already exist.
2. **Match this repo’s architecture** (`ARCHITECTURE.md`, `MODULES.md`). Same naming, folders, and config-first style.
3. **Read Next.js 16 docs in this repo** (`node_modules/next/dist/docs/`) if the change uses App Router APIs. Do not assume Next 13/14 habits.
4. **Scope to the requested phase/feature.** Do not implement `PLAN.md` future phases unless the user asked.

---

## Quality over token savings

- Prefer a **correct, complete** change over a short but wrong one.
- Make the **smallest change that preserves quality** — don’t refactor unrelated code, and don’t skip error handling, types, or security to “save tokens.”
- If reuse vs. a small new helper is a tradeoff, **reuse wins** unless the existing API is the wrong abstraction.

---

## Coding standards

- TypeScript strict; no `any` unless a vendor type forces it (then isolate it).
- Server vs client: add `"use client"` only when needed (hooks, events, `next-themes`). Keep data fetching and secrets on the server.
- UI: use `Button`, `Input`, `Section`, `PageHeader`, `cn()`. Semantic color tokens, not one-off hex in components.
- Copy/config: update `src/config/*` and `src/content/*` instead of duplicating strings.
- After behavior changes: `npm run build` and `npm run lint` when practical. For UI, verify the affected flow.

---

## Security

- Never commit real secrets. Examples stay in `.env.example`. `.env*` is gitignored except `.env.example`.
- **Never** import `createServiceClient` in Client Components or expose `SUPABASE_SERVICE_ROLE_KEY`.
- Auth redirects: use `safeInternalPath` (or equivalent). A path starting with `/` is not enough (`//evil.com`).
- Webhooks: verify signatures; use the **raw body** for Stripe. Do not mark orders paid only because the user hit a success URL.
- Payments and profile updates must check the **authenticated user** (or a verified provider event).

---

## Product constraints

- **Contact form** sends email when Resend env is set; otherwise validates locally.
- **Admin** is optional (`modulesConfig.admin` + `ADMIN_EMAILS` or `profiles.role`).
- **SEO profile** (tools, topics, site JSON-LD) is optional (`modulesConfig.seoProfile`). Core metadata/sitemap/robots stay on.
- Placeholders in env (`your-anon-key`, `sk_test_your-…`) must be treated as **not configured**.

---

## Documentation

- Human setup stays in **`DOCUMENTATION.md`** (keep it short; update when a phase ships).
- After a completed phase: update `DOCUMENTATION.md`, mark status in `PLAN.md`, and adjust `MODULES.md` / this set if behavior changed.
- Do not copy setup tutorials into `ARCHITECTURE.md`.
- Do not invent extra long markdown files. Tool adapters **only point here**.

---

## Conflicts

If a tool-specific file disagrees with these four documents, **these documents win**, then the code.

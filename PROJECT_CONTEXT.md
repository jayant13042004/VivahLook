# PROJECT_CONTEXT.md

**LaunchKit** (Personal Launch Engine) is a private, reusable website starter. New products should start here so AI work focuses on the unique product, not infrastructure.

Personal use. Not a public framework.

---

## What exists today (Phases 1–6)

| Phase | Capability |
| --- | --- |
| 1 | Next.js App Router UI: design system, light/dark, marketing/legal pages, SEO, loading/error/404 |
| 2 | Supabase auth (email + Google), profiles, dashboard, profile |
| 3 | Stripe + Razorpay: one-time, subscriptions, webhooks, billing status |
| 4 | Tool-agnostic AI context files |
| 5 | Optional modules: blog, analytics, email, admin, GitHub OAuth, Mongo adapter |
| 6 | SEO profile: richer metadata, schema, robots/sitemap, blog markup, tools, programmatic topics |

Later phases (CLI) are **not built**. See `PLAN.md`. Do not implement them unless asked.

---

## Stack (do not casually replace)

- **Next.js 16** (App Router, TypeScript) — APIs differ from older Next.js. Read `node_modules/next/dist/docs/` before using unfamiliar APIs. `AGENTS.md` is the Next.js-generated warning.
- **React 19**, **Tailwind CSS v4** (`@theme inline`, class-based `dark`)
- **Supabase** — auth + Postgres (RLS)
- **Stripe** and **Razorpay** — payments (optional until env is set)

Path alias: `@/*` → `src/*`.

---

## Conventions that affect code quality

1. **Configure, don’t scatter.** Branding, colors, nav, auth redirects, and products live under `src/config/`. Marketing/legal/auth/billing copy lives in `src/content/`. Prefer editing those over hardcoding strings in many components.
2. **Reuse before inventing.** UI primitives: `src/components/ui/`. Layout: `SiteShell`, `Navbar`, `Footer`. Auth session: `src/lib/auth/session.ts`. Payments writes: `src/lib/payments/repository.ts`.
3. **Feature flags via env.** Missing/placeholder keys should degrade gracefully (`isSupabaseConfigured`, `isStripeConfigured`, etc.) — don’t crash public pages.
4. **Human how-to vs AI how-to.** `DOCUMENTATION.md` is the setup/runbook (env, SQL, webhooks). This file plus `ARCHITECTURE.md`, `MODULES.md`, and `AI_RULES.md` are for agents. `PLAN.md` is vision only.

---

## Decisions already made (don’t reverse without a reason)

- **One app, modular features** — not a monorepo of packages (yet).
- **No admin user-management UI** — users edit their own profile.
- **Contact form is UI-only** — no email backend.
- **Payment “success” URLs are not proof of payment.** Status comes from webhooks (and Razorpay signature verify).
- **Service role is server-only** (`SUPABASE_SERVICE_ROLE_KEY`). Never import `src/lib/supabase/service.ts` into Client Components.
- **`src/middleware.ts` still refreshes the Supabase session** and enforces `authConfig` routes. Next.js 16 may warn about a `proxy` rename; don’t migrate unless asked and verified.

---

## Read order for a typical change

1. `AI_RULES.md` — how to change this repo
2. This file — what the project is
3. `ARCHITECTURE.md` and/or `MODULES.md` — where to put work
4. Existing code in the relevant folder
5. `DOCUMENTATION.md` — only for env/SQL/provider setup

# ARCHITECTURE.md

Source of truth is the code. This file records **structure and flows** so agents don’t guess.

---

## Layout of `src/`

```
src/app/                 routes (App Router)
  admin/                 optional admin user list
  blog/                  optional markdown blog
  api/payments/          Stripe + Razorpay HTTP webhooks + Razorpay verify
  auth/                  server actions + OAuth/email callback
  billing/               signed-in billing UI + checkout actions
src/config/              site, theme, navigation, auth, payments, modules
src/content/             copy + blog markdown
src/lib/
  analytics/ email/ blog/ db/  optional modules
```

SQL: `supabase/migrations/` — run in the Supabase SQL editor (not auto-applied by the app).

---

## Request / session flow

1. `src/middleware.ts` → `updateSession` (`src/lib/supabase/middleware.ts`).
2. Refreshes auth cookies via `@supabase/ssr`.
3. If path is in `authConfig.protectedRoutes` and there is no user → redirect `/login?next=…` (`safeInternalPath` on consume).
4. If path is in `guestOnlyRoutes` and there is a user → redirect after-login.
5. If Supabase env is missing/placeholder, middleware does **not** enforce auth (public marketing site still works).

**Clients (do not mix them up):**

| Client | File | Use |
| --- | --- | --- |
| Browser | `src/lib/supabase/client.ts` | Client Components (navbar auth) |
| Server + cookies | `src/lib/supabase/server.ts` | RSC, server actions, user-scoped queries |
| Service role | `src/lib/supabase/service.ts` | Webhooks / payment writes that bypass RLS |

User-facing tables use **RLS**: users `SELECT` their own rows. Payment inserts/updates go through the service role after the user is authenticated in a server action, or after a verified webhook.

---

## Auth data flow

- Email/password + Google + optional GitHub: `src/app/auth/actions.ts`.
- OAuth/email confirm: `GET /auth/callback` exchanges the code for a session.
- Profile row: `public.profiles` (trigger on signup + `ensureProfile` fallback).
- Signed-in UI: `/dashboard`, `/profile`, `/billing`, optional `/admin`.

---

## Payments data flow

1. Signed-in user starts checkout (`src/app/billing/actions.ts` → Stripe session **or** Razorpay order/subscription).
2. A `payments` row is created **pending** (service role).
3. **Stripe:** redirect to Checkout; events go to `/api/payments/stripe/webhook` (raw body + `stripe-signature`).
4. **Razorpay:** client Checkout.js; `/api/payments/razorpay/verify` checks HMAC; webhooks at `/api/payments/razorpay/webhook`.
5. Handlers update `payments`, `billing_subscriptions`, `billing_customers`.
6. Billing page **reads** via the user session (RLS).

Products/amounts: `src/config/payments.ts`. Optional Stripe Price IDs / Razorpay plan IDs via env. Razorpay **subscriptions** require a dashboard plan ID.

---

## UI / theming

- Tokens: `src/config/theme.ts` → `ThemeStyle` injects CSS variables → Tailwind semantic classes (`bg-background`, `bg-primary`, …).
- Dark mode: `next-themes` + `.dark` on `<html>` (`src/app/globals.css` `@custom-variant dark`).
- Root chrome: `layout.tsx` wraps all pages in `ThemeProvider` + `SiteShell`.
- SEO: `buildMetadata()` in `src/lib/seo.ts`; sitemap via `src/lib/seo/sitemap.ts`; robots use `seoConfig.disallow`. Optional JSON-LD / tools / topics when `modulesConfig.seoProfile`.

---

## Adding features (pattern)

| Job | Pattern |
| --- | --- |
| Public page | `src/app/<route>/page.tsx` + `buildMetadata` + optional `navigation.ts` / `content/pages.ts` |
| SEO tool | Row in `src/content/tools.ts` + optional widget; `/tools/[slug]` template |
| Programmatic topic | Row in `src/content/topics.ts`; `/topics/[slug]` template |
| Protected page | Add path to `authConfig.protectedRoutes` + `requireUser` / `requireProfile` |
| New copy | `src/content/` |
| New DB table | Migration + types + RLS; user reads with server client; privileged writes with service client |
| Optional module | Flip `src/config/modules.ts` + env; do not add a parallel stack |

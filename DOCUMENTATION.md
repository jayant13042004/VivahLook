# LaunchKit Documentation

**Status:** Phase 7 complete (Foundation + Auth + Payments + AI context + optional modules + SEO profile + local project CLI)

Quick reference for using and customizing what is built.

- **Humans (setup, env, SQL):** this file
- **AI agents:** `AI_RULES.md` → `PROJECT_CONTEXT.md` → `ARCHITECTURE.md` / `MODULES.md` (code is still the source of truth)
- **Roadmap:** [`PLAN.md`](./PLAN.md)

---

## Quick start

```bash
npm install
npm run dev
```

For auth, copy `.env.example` to `.env.local` and add your Supabase keys (see Phase 2 below).

Open **http://localhost:3000**.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Check code quality |

---

## Phase 1 — Foundation

- Design system, light/dark theme, Navbar, Footer
- Pages: Home, About, Contact, FAQ, Privacy, Terms
- Loading / error / 404 states, basic SEO

**Customize branding:** `src/config/site.ts`, `theme.ts`, `navigation.ts`, `content/pages.ts`

---

## Phase 2 — Auth & database (Supabase)

### What you get

- Email sign-up / sign-in
- Google sign-in
- Protected `/dashboard`, `/profile`, `/billing`
- User profiles stored in Supabase (`profiles` table)
- Navbar shows Sign in or Dashboard when configured

### One-time Supabase setup

**Non-technical (step by step):**

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Paste both into `.env.local` (copy from `.env.example`):
   - macOS/Linux: `cp .env.example .env.local`
   - Windows PowerShell: `Copy-Item .env.example .env.local`
4. In Supabase, open **SQL Editor**, paste and run `supabase/migrations/001_profiles.sql`.
5. For Google login: **Authentication → Providers → Google** (enable + add OAuth credentials).
6. In **Authentication → URL Configuration**, set Site URL to your app URL and add redirect: `http://localhost:3000/auth/callback` (and production URL later).
7. Restart `npm run dev`. Visit `/signup` to create an account.

**Technical:**

| Item | Location |
| --- | --- |
| Env vars | `.env.local` — see `.env.example` |
| DB migration | `supabase/migrations/001_profiles.sql` |
| Auth config | `src/config/auth.ts` (protected routes, redirects) |
| Auth copy | `src/content/auth.ts` |
| Server actions | `src/app/auth/actions.ts` |
| Session helpers | `src/lib/auth/session.ts` |
| Supabase clients | `src/lib/supabase/` |
| Route guard | `src/middleware.ts` |

**Dependencies:** `@supabase/supabase-js`, `@supabase/ssr`

### Routes

| Route | Access |
| --- | --- |
| `/login`, `/signup` | Guests only (signed-in users → dashboard) |
| `/dashboard`, `/profile`, `/billing` | Signed-in only |
| `/auth/callback` | OAuth / email confirmation (automatic) |

### How to change auth behavior

- **Redirects after login/logout:** `src/config/auth.ts` → `redirects`
- **Add a protected route:** add path to `protectedRoutes` in `auth.ts` + create the page
- **Profile fields:** extend `profiles` table + `src/types/database.ts` + `ProfileForm`

### Common mistakes

| Mistake | Fix |
| --- | --- |
| Auth pages say “not configured” | Add Supabase env vars to `.env.local` and restart dev server |
| Google login fails | Enable Google provider + add callback URL in Supabase |
| Profile errors | Run `001_profiles.sql` in Supabase SQL Editor |
| Email signup does nothing | Check Supabase email settings; confirm email if required |
| Build works but auth fails live | Set `NEXT_PUBLIC_SITE_URL` to production domain |
| Looking for admin “user management” | Phase 2 is self-serve profile only (`/profile`) |

---

## Phase 3 — Payments (Stripe + Razorpay)

### What you get

- One-time and subscription checkout
- Stripe Checkout + customer portal
- Razorpay Checkout (orders; subscriptions need a Plan ID)
- Webhooks that update payment status
- Billing page at `/billing` (signed-in)

**Status is confirmed by the provider** (webhook or Razorpay signature). The success URL is not proof of payment.

### Setup

1. Finish Phase 2 (auth + `001_profiles.sql`).
2. In `.env.local` add `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Settings → API → `service_role`). Never expose this in the browser.
3. Run `supabase/migrations/002_payments.sql` in the SQL Editor.
4. Add Stripe and/or Razorpay keys from `.env.example`.
5. Set `NEXT_PUBLIC_SITE_URL` (used for Stripe return URLs).
6. Edit products in `src/config/payments.ts` (amounts, names). Optional: Stripe Price IDs / Razorpay Plan IDs in env.
7. Point webhooks:
   - Stripe: `https://your-domain/api/payments/stripe/webhook`  
     Local: `stripe listen --forward-to localhost:3000/api/payments/stripe/webhook`
   - Razorpay: `https://your-domain/api/payments/razorpay/webhook`
8. Sign in, open **Billing**, try a test checkout.

**Dependencies:** `stripe`, `razorpay`

| Item | Location |
| --- | --- |
| Products / amounts | `src/config/payments.ts` |
| Checkout actions | `src/app/billing/actions.ts` |
| Stripe webhook | `/api/payments/stripe/webhook` |
| Razorpay webhook | `/api/payments/razorpay/webhook` |
| Default provider | `NEXT_PUBLIC_PAYMENT_PROVIDER` (`stripe` or `razorpay`) |

### Common mistakes

| Mistake | Fix |
| --- | --- |
| Checkout says add service role | Add `SUPABASE_SERVICE_ROLE_KEY` |
| Status stays pending | Webhooks not set, or wrong webhook secret |
| Razorpay subscription disabled | Create a plan in Razorpay and set `RAZORPAY_PLAN_PRO` |
| Stripe return URL wrong | Set `NEXT_PUBLIC_SITE_URL` to the real site URL |

---

## Key modules (Phase 1)

### Theme / layout / SEO / contact

- **Theme:** `src/config/theme.ts` + Navbar toggle
- **Nav links:** `src/config/navigation.ts`
- **SEO:** `buildMetadata()` in `src/lib/seo.ts` + `NEXT_PUBLIC_SITE_URL`. Optional extras: `modulesConfig.seoProfile`
- **Contact form:** UI-only (Phase 1) — `src/content/pages.ts` → `contactContent`

### Add a new public page

1. `src/app/your-page/page.tsx` with `buildMetadata()`
2. Add link in `src/config/navigation.ts`
3. Optional copy in `src/content/pages.ts`

---

## Folder map

```
src/config/          site, theme, nav, auth, payments, modules, seo
src/content/         page copy, blog markdown, tools, topics
src/app/             routes (+ blog/, admin/, tools/, topics/)
src/app/api/payments webhooks
src/lib/supabase/    database client
src/lib/payments/    Stripe + Razorpay
src/lib/auth/        session helpers
supabase/migrations/ SQL to run in Supabase
```

---

## Phase 4 — AI context (for coding agents)

Four files, no setup steps:

| File | Use |
| --- | --- |
| `AI_RULES.md` | How agents must change this repo |
| `PROJECT_CONTEXT.md` | Purpose, stack, decisions |
| `ARCHITECTURE.md` | Structure and data flow |
| `MODULES.md` | What to reuse |

Thin adapters (pointers only): `.cursor/rules/launchkit.mdc`, `CLAUDE.md`, `.github/copilot-instructions.md`, `GEMINI.md`.

---

## Phase 5 — Optional modules

Master switch: **`src/config/modules.ts`**. Turn a flag off to hide that feature. Provider keys still live in `.env.local`.

| Module | Enable | Setup |
| --- | --- | --- |
| Blog | `blog: true` | Add `.md` files in `src/content/blog/` (frontmatter: title, description, date, published) |
| Analytics | `analytics: true` | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and/or `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Email | `email: true` | `RESEND_API_KEY` + `EMAIL_FROM` (optional `EMAIL_TO`). Contact form sends mail when set |
| Admin | `admin: true` | Run `003_admin.sql`. Set `ADMIN_EMAILS` or `profiles.role = 'admin'`. Open `/admin` |
| GitHub login | `githubAuth: true` | Enable GitHub in Supabase Auth providers (same callback URL as Google) |
| MongoDB | `database: "mongodb"` | `npm` already includes `mongodb`. Set `MONGODB_URI`. Call `getMongoDb()` for **product** data only |

Auth, profiles, and payments stay on **Supabase** even if Mongo is on.

---

## Phase 6 — SEO / micro-niche profile

Master switch: **`modulesConfig.seoProfile`** in `src/config/modules.ts`. Set `false` on SaaS apps that only need Phase 1 titles, sitemap, and robots.

Always on (any project type):

- Page metadata via `buildMetadata()` (`src/lib/seo.ts`)
- `/sitemap.xml` and `/robots.txt` (private paths listed in `src/config/seo.ts`)
- FAQ JSON-LD on `/faq`; Article JSON-LD + Open Graph on blog posts when the blog module is on

When `seoProfile` is `true`:

- Site-wide Organization / WebSite JSON-LD
- `/tools` and `/tools/[slug]` — add rows in `src/content/tools.ts`
- `/topics` and `/topics/[slug]` — add rows in `src/content/topics.ts` (programmatic pages)
- Those URLs are included in the sitemap and in the main nav

---

## Phase 7 — Project generator (local CLI)

Creates a **standalone** Next.js project with only the modules you pick. The new app has its own `package.json` and `.env.example` and does not import LaunchKit.

```bash
npm install
npm run create
```

The CLI asks for project name, profile, auth, database, payments, optional modules, then a review step.

### Profiles

| Profile | Typical starting point (you can change every option) |
| --- | --- |
| `saas` | Email + Google auth, Supabase, analytics, email, admin |
| `micro-niche` | Blog + SEO profile + analytics, no auth |
| `ai-web-app` | Email + Google auth, Supabase, analytics, email |

### Options (only what exists in LaunchKit)

| Choice | Values |
| --- | --- |
| Auth | `none` or any of `email`, `google`, `github` |
| Database | `none`, `supabase`, `mongodb`, `both` (Mongo is extra product data; auth/payments still use Supabase) |
| Payments | `none` or `stripe` and/or `razorpay` (requires auth + Supabase) |
| Flags | `blog`, `analytics`, `email`, `admin`, `seo` |

Auth, payments, and admin imply Supabase even if you picked `database=none`.

### Non-interactive

```bash
npm run create -- --yes --name "My App" --profile saas --auth email,google --database supabase --payments stripe --out ../my-app
```

`--flags none` turns off optional modules. Omit `--flags` to keep the profile defaults.

After generation: `cd` into the folder, copy `.env.example` to `.env.local`, `npm install`, `npm run dev`.

To add a future module: build it in this repo, then register files and npm packages in `generator/src/catalog.ts`.

---

## After each phase

Test → update this file → remove outdated notes → stay concise. Unbuilt features belong in `PLAN.md` only.

# MODULES.md

Reusable pieces **already in the repo**. Prefer these over new packages or parallel implementations.

Human setup (keys, SQL, dashboard URLs): `DOCUMENTATION.md`.

---

## Foundation (Phase 1)

| Module | What / when | How it connects |
| --- | --- | --- |
| **Site config** `src/config/site.ts` | Name, URL, email, OG | SEO, footer, Stripe return URLs via `siteConfig.url` |
| **Theme** `src/config/theme.ts` | Light/dark tokens | `ThemeStyle` + `ThemeProvider` + `ThemeToggle` |
| **Navigation** `src/config/navigation.ts` | Public nav/footer links | Navbar, Footer, sitemap |
| **UI kit** `src/components/ui/` | Buttons, forms, page chrome, loading/error | All pages |
| **Layout** `SiteShell` | Navbar + main + footer | Root `layout.tsx` |
| **SEO** `src/lib/seo.ts` | `buildMetadata()`, `absoluteUrl()` | Every `page.tsx` that needs titles |
| **Pages copy** `src/content/pages.ts` | Home/about/FAQ/legal/contact text | Marketing/legal routes |
| **Contact form** | Validates locally; emails via Resend when configured | `src/app/contact/actions.ts` |

**Use when:** any new public or interior page. Don’t fork a second button/input style.

---

## Auth & database (Phase 2)

| Module | What / when | How it connects |
| --- | --- | --- |
| **authConfig** `src/config/auth.ts` | Protected vs guest routes, redirects | Middleware + login/signup |
| **Session** `src/lib/auth/session.ts` | `getUser`, `requireUser`, `requireProfile` | Dashboard, profile, billing |
| **Auth actions** `src/app/auth/actions.ts` | Sign in/up/out, Google, profile update | Forms |
| **Supabase clients** `src/lib/supabase/` | Browser / server / middleware / service | See `ARCHITECTURE.md` |
| **profiles** | `001_profiles.sql` + `src/types/database.ts` | Trigger + RLS |
| **NavbarAuth** | Sign in / dashboard / sign out | Hides if Supabase isn’t configured |

**Use when:** adding a signed-in screen — extend `protectedRoutes` and reuse session helpers. Don’t add a second auth library.

---

## Payments (Phase 3)

| Module | What / when | How it connects |
| --- | --- | --- |
| **paymentsConfig** `src/config/payments.ts` | Products, amounts, optional Price/Plan IDs | Pricing UI + checkout |
| **Checkout** `src/app/billing/actions.ts` | Start Stripe or Razorpay | `CheckoutButton` |
| **Repository** `src/lib/payments/repository.ts` | Pending rows, status, subscription, Stripe customer | Service writes; user reads |
| **Stripe** `stripe.ts` + `stripe-webhooks.ts` | Checkout, portal, webhook events | `/api/payments/stripe/webhook` |
| **Razorpay** `razorpay.ts` + `razorpay-webhooks.ts` | Orders, subscriptions, HMAC | verify route + webhook |
| **Billing UI** `/billing` | Plans, history, status | Requires auth; checkout needs service role |

**Use when:** new SKU or provider behavior. Add a product in config first. Don’t treat `?checkout=success` as paid.

---

## Optional modules (Phase 5)

Toggle in `src/config/modules.ts`. Missing env keys keep the feature idle (no crash).

| Module | What / when | How it connects |
| --- | --- | --- |
| **Blog** | Markdown in `src/content/blog/*.md` → `/blog` | Nav + sitemap when `modulesConfig.blog` |
| **Analytics** | Plausible and/or GA4 | `Analytics` in root layout |
| **Email** | Resend for contact form | `src/lib/email/send.ts` + `src/app/contact/actions.ts` |
| **Admin** | `/admin` user list | `requireAdmin`, `ADMIN_EMAILS` or `profiles.role` |
| **GitHub OAuth** | Extra sign-in next to Google | Enable GitHub in Supabase + `modulesConfig.githubAuth` |
| **MongoDB** | Extra product data store | `getMongoDb()` — auth/payments stay on Supabase |

---

## SEO / micro-niche (Phase 6)

Toggle extras with `modulesConfig.seoProfile` (`src/config/modules.ts`). Core `buildMetadata` stays on for every project.

| Module | What / when | How it connects |
| --- | --- | --- |
| **seoConfig** `src/config/seo.ts` | Disallow paths, default keywords | `robots.ts`, root layout keywords |
| **Schema** `src/lib/seo/schema.ts` | JSON-LD builders | `JsonLd` component |
| **Sitemap** `src/lib/seo/sitemap.ts` | Nav + blog + optional tools/topics | `src/app/sitemap.ts` |
| **Tools** | `/tools/[slug]` template | `src/content/tools.ts` + `ToolLayout` |
| **Topics** | Programmatic `/topics/[slug]` | `src/content/topics.ts` |

**Use when:** search-led or micro-niche sites. Turn `seoProfile` off so SaaS builds skip tools/topics.

**Not modules yet:** project CLI (`PLAN.md` Phase 7).

---

## Interactions (short)

```
Public site  →  config + content + ui + layout
     ↓
Auth         →  middleware + supabase (cookie client) + profiles
     ↓
Billing      →  auth session → checkout actions → provider → webhook/verify
               → service-role writes → RLS reads on /billing
```

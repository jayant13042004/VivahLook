# LaunchKit Reuse Report — VivahLook

This document tracks what LaunchKit functionality was reused, modified, or newly built for VivahLook.

## Reused As-Is

| LaunchKit Module | Purpose in VivahLook |
| :--- | :--- |
| `src/middleware.ts` | Session refresh and auth route enforcement |
| `src/lib/supabase/*` | Browser, server, middleware, and service Supabase clients |
| `src/lib/auth/session.ts` | `getUser`, `requireUser`, `requireProfile` helpers |
| `src/app/auth/*` | Sign in/up/out actions and OAuth callback |
| `src/lib/payments/razorpay.ts` | Razorpay order creation and checkout payload |
| `src/lib/payments/razorpay-webhooks.ts` | HMAC signature verification |
| `src/lib/payments/repository.ts` | Payment record CRUD via Supabase service client |
| `src/app/api/payments/razorpay/*` | Verify route and webhook route |
| `src/lib/seo.ts` | `buildMetadata()` and `absoluteUrl()` SEO helpers |
| `src/components/ui/*` | Button, Container, Input, Label, LoadingState, ErrorState, etc. |
| `src/components/theme/ThemeStyle.tsx` | CSS variable injection from theme config |
| `src/providers/ThemeProvider.tsx` | next-themes dark mode provider |
| `src/components/layout/SiteShell.tsx` | Navbar + main + footer wrapper |
| `src/components/analytics/Analytics.tsx` | Plausible / GA snippet |
| `src/app/contact/*` | Contact form with optional Resend email |
| `src/app/sitemap.ts` | Sitemap generation |
| `src/app/robots.ts` | Robots.txt configuration |

## Modified

| File | Changes |
| :--- | :--- |
| `src/config/site.ts` | VivahLook branding (name, tagline, description, social links, OG image, en_IN locale) |
| `src/config/theme.ts` | Luxury Indian wedding palette (warm ivory/burgundy/champagne gold) replacing teal/cyan starter |
| `src/config/navigation.ts` | Wedding-focused nav (Try Free, How It Works, FAQ) replacing generic starter nav |
| `src/config/modules.ts` | Disabled blog, seoProfile, githubAuth; kept analytics, email, admin |
| `src/config/payments.ts` | Razorpay-only INR pricing with look-pack products (₹99/₹199/₹299) replacing Stripe+Razorpay USD/INR starter |
| `src/content/pages.ts` | Complete VivahLook copy for home, about, contact, FAQ, privacy, terms |
| `src/app/layout.tsx` | Playfair Display + Inter fonts, VivahLook SEO metadata |
| `src/app/page.tsx` | VivahLook landing page with wedding hero and sections |
| `src/app/billing/actions.ts` | Razorpay-only checkout (removed Stripe references) |
| `src/components/home/HomeHero.tsx` | Premium Indian wedding fashion hero section |
| `src/components/home/HomeSections.tsx` | How it works, occasions, outfit gallery, pricing, FAQ, CTA |
| `.env.example` | VivahLook-specific environment variables |

## Newly Built

| File | Purpose |
| :--- | :--- |
| `src/config/wedding.ts` | Occasions, outfits, styles, usage limits, helper functions |
| `src/lib/ai/types.ts` | AI generation request/response types and provider interface |
| `src/lib/ai/prompt-builder.ts` | Modular photorealistic prompt builder with identity preservation |
| `src/lib/ai/service.ts` | Generation orchestrator (Gemini API + fallback) |
| `src/lib/usage.ts` | Client-side usage tracking (localStorage) |
| `src/app/api/generate/route.ts` | Server-side generation API with rate limiting and validation |
| `src/app/studio/page.tsx` | Studio route for the generation wizard |
| `src/components/studio/StudioWizard.tsx` | Step-by-step wizard controller |
| `src/components/studio/UploadStep.tsx` | Photo upload with drag-drop and preview |
| `src/components/studio/OccasionStep.tsx` | Occasion selector with emoji and color swatches |
| `src/components/studio/OutfitStep.tsx` | Gender toggle and outfit selection grid |
| `src/components/studio/StyleStep.tsx` | Style selector (Royal, Modern, Traditional, etc.) |
| `src/components/studio/GenerationLoader.tsx` | Animated loading screen with progress messages |
| `src/components/studio/ResultViewer.tsx` | Result display with download, share, try-another |
| `src/app/admin/wedding/page.tsx` | Internal analytics dashboard |
| `LAUNCHKIT_REUSE.md` | This document |

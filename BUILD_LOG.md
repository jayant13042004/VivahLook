# VivahLook — Build & Engineering Log

All changes made to the codebase are chronologically documented here with rationales, touched files, and verification steps.

---

## Entry: 2026-09-25 — Product Expansion, Brand Purity & Monetization Architecture

### 1. Brand Purity (Eliminating "Vaaraa" → 100% Pure VivahLook)
- **Problem:** Several residual references to "Vaaraa" remained across copy, metadata, and component identifiers.
- **Actions:**
  - Created `src/components/brand/VivahLookLogo.tsx` with high-fashion wordmark, accent dot, and official tagline: *"See Yourself in Your Perfect Wedding Look"*. Kept backward-compatible exports in `VaaraaLogo.tsx`.
  - Updated `src/config/site.ts` to pure VivahLook branding, updated social links, and contact email.
  - Updated `src/app/layout.tsx` metadata title to *"VivahLook — See Yourself in Your Perfect Wedding Look | AI Wedding Try-On"*, and purged keywords.
  - Updated `src/components/layout/Navbar.tsx` and `src/components/layout/Footer.tsx` to use `VivahLookLogo` and updated all navigation labels.
  - Replaced CTA button copy in `src/components/home/HomeHero.tsx`, `BeforeAfterSlider.tsx`, `EmotionalBanner.tsx`, and `FinalCtaSection.tsx` from "Try Vaaraa Free" to "Try VivahLook Free".
  - Cleaned developer comments in `theme.ts`, `navigation.ts`, `usage.ts`, and `README.md`.
  - **Verification:** `git grep -i "vaaraa"` confirmed zero user-facing occurrences.

### 2. Curated Data-Driven Outfit Catalog
- **Problem:** Outfit options were previously flat and hardcoded, making future visual asset drops and occasion-specific styling difficult.
- **Actions:**
  - Created `src/config/catalog.ts` exporting `OutfitTemplate` schema containing `id`, `name`, `occasionId`, `gender`, `category`, `description`, `style`, `colors`, `image`, `thumbnail`, `tags`, `productLinks`, `affiliateInfo`, and `status`.
  - Added 25+ curated templates across Haldi, Mehendi, Sangeet, Wedding, Reception, and Guest.
  - Re-exported catalog helpers through `src/config/wedding.ts`.
  - Upgraded `src/components/studio/OutfitStep.tsx` to display occasion-tailored curated styles alongside classic silhouettes with active color palette swatches.

### 3. AI Provider Abstraction & Telemetry Engine
- **Problem:** The system previously called Google Gemini directly in `service.ts` without formal provider contracts or cost tracking.
- **Actions:**
  - Created `src/lib/ai/provider.ts` defining `AIImageProvider`, `GenerationResult`, and `GenerationTelemetry`.
  - Built an in-memory telemetry buffer (`generationMetrics`) tracking total generations, provider latency, failure reasons, and compute costs.
  - Updated `src/lib/ai/service.ts` to record telemetry for Gemini (Tier 1), FLUX (Tier 2), and fallback attempts.
  - Redesigned `/admin/wedding` (`src/app/admin/wedding/page.tsx`) with real-time telemetry cards, provider cost comparisons, and gross margin economics (~85% margin on ₹99 pack).

### 4. Shop The Look & Affiliate Architecture
- **Problem:** After generating a look, users could not discover matching clothing or accessories.
- **Actions:**
  - Created `src/config/shop.ts` defining `ShoppableProduct`, `RetailerId`, and `curatedShoppingRegistry` mapping looks to sherwanis, lehengas, safas, mojaris, and heirloom jewelry.
  - Created `src/lib/shop/import-types.ts` defining `ProductImportRequest` and `ProductImportResult` for future Amazon.in / marketplace URL import.
  - Built `src/components/shop/ShopTheLook.tsx` with luxury card presentation, prices in INR, merchant tags, and external shop buttons.
  - Integrated `ShopTheLook` directly into `src/components/studio/ResultViewer.tsx`.

### 5. Configurable Pricing & Usage
- **Problem:** Hardcoded free limit and outdated pack sizes.
- **Actions:**
  - Updated `src/config/wedding.ts`: `freeGenerationLimit: 1` (1 free complimentary look for trial).
  - Updated `src/config/payments.ts`:
    - Starter Pack: ₹99 for 5 looks
    - Wedding Wardrobe Pack: ₹199 for 15 looks
    - Royal Couture HD Pack: ₹299 for 30 looks
  - Made `PricingSection.tsx` dynamically read from `usageConfig.freeGenerationLimit` and `paymentsConfig.products`.

### 6. Product Transformation Hero Section
- **Problem:** Hero was a standard text + button layout without visually proving the virtual try-on workflow.
- **Actions:**
  - Rebuilt `src/components/home/HomeHero.tsx` with a 3-stage visual transformation composition:
    1. Your Natural Photo
    2. Selected Curated Wedding Outfit
    3. Generated Bespoke Bridal/Groom Couture Look
  - Retained required headline *"See Yourself in Your Perfect Wedding Look"*, Primary CTA *"Try VivahLook Free"*, and Secondary CTA *"See How It Works"*.

### 7. Product Demo Video Section
- **Problem:** Needed a dedicated video section demonstrating the 7-step journey for users before they begin.
- **Actions:**
  - Built `src/components/home/ProductDemoVideo.tsx` featuring an accessible HTML5 video player with poster, custom overlay play controls, and an interactive 7-step journey timeline (1. Upload → 2. Occasion → 3. Outfit → 4. Style → 5. Generate → 6. View Result → 7. Shop The Look).
  - Mounted `ProductDemoVideo` in `src/app/page.tsx`.

### 8. Funnel Event Analytics
- **Problem:** No client-side telemetry to measure drop-offs across occasions, outfits, generations, and shopping clicks.
- **Actions:**
  - Created `src/lib/analytics/events.ts` supporting all 14 required product events (`photo_uploaded`, `generation_started`, `generation_completed`, `generation_failed`, `shop_look_clicked`, `product_clicked`, etc.).
  - Integrated tracking into `StudioWizard.tsx`, `ResultViewer.tsx`, and `ShopTheLook.tsx`.

---

## Entry: 2026-09-25 — Windows Environment Fix: Webpack Flag
- **Problem:** Next.js 16 defaults to Turbopack (`next dev`). On Windows machines with SmartAppControl/Application Control policies enabled, loading native `.node` binaries (`next-swc.win32-x64-msvc.node`) is restricted, causing Turbopack to error.
- **Solution:** Updated `package.json` scripts to `"dev": "next dev --webpack"` and `"build": "next build --webpack"`.
- **Verification:** Runs cleanly with Webpack on Windows without Turbopack native binary errors.

---

## Verification & Checks
- TypeScript: `npx tsc --noEmit` → PASS (0 errors)
- Production Build: `npm run build` → PASS (20 routes compiled)
- Brand Purity: `git grep -i "vaaraa"` → PASS (Zero user-facing occurrences)

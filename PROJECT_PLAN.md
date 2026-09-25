# VivahLook — Master Product Plan & Architectural Roadmap

> **Brand:** VivahLook  
> **Tagline:** "See Yourself in Your Perfect Wedding Look"  
> **Vision:** AI Wedding Stylist + Virtual Try-On + Wedding Shopping Assistant  
> **Positioning:** Premium Indian Wedding Fashion & Virtual Wardrobe Experience

---

## 1. Product Direction & Value Proposition

VivahLook is not a generic "AI image generator" or AI wrapper. It is a **luxury Indian wedding styling destination**.

### The Core Loop
```
UPLOAD PHOTO
    ↓
CHOOSE OCCASION (Haldi · Mehendi · Sangeet · Wedding · Reception · Guest)
    ↓
CHOOSE OUTFIT (Curated catalog & classic silhouettes)
    ↓
TRY IT ON (AI identity-preserving virtual drape)
    ↓
SEE BESPOKE TRANSFORMATION
    ↓
RECREATE & SHOP THE LOOK
```

### The Long-Term Wardrobe Journey
1. **Virtual Try-On:** Single-turn and multi-ceremony visualization.
2. **Complete Wedding Wardrobe:** Build, save, and compare looks across all 6 auspicious wedding events.
3. **Shop The Look:** Direct affiliate links and merchant discovery for matching sherwanis, lehengas, safas, mojaris, jewelry, and accessories.
4. **Couple & Family Coordination:** Coordinated bride + groom palettes and family styling.
5. **Marketplace Ingestion:** Import external product URLs from Amazon.in, Myntra, Ajio to visualize on yourself.

---

## 2. Core Architecture

### A. Curated Outfit & Template Catalog (`src/config/catalog.ts`)
- **Data-Driven Design:** Decoupled from UI components for effortless addition of new collections.
- **6 Occasions:**
  - **Haldi:** Sunshine yellow gotapatti lehengas, floral anarkalis, silk Chanderi kurtas, Nehru jacket sets, gold-border dhoti kurtas.
  - **Mehendi:** Emerald mirrorwork shararas, sage green botanic lehengas, olive asymmetric angrakhas, embroidered silk bandhgalas.
  - **Sangeet:** Midnight blue mirrorwork lehengas, plum shimmer sarees, velvet bandhgalas, navy cutaway Indo-Western jackets.
  - **Wedding (Pheras):** Crimson heritage zardozi lehengas, red Banarasi katan silk sarees, ivory & antique gold sherwanis, deep crimson velvet achkans.
  - **Reception:** Champagne gold crystal sarees, emerald trail gown-lehengas, classic black-tie tuxedos, charcoal crossover suits.
  - **Guest:** Dusty peach organza sarees, blush pink shararas, cream Tussar silk kurtas, powder blue Nehru jacket sets.
- **Attributes per outfit:** `id`, `name`, `occasionId`, `gender`, `category`, `description`, `style`, `colors`, `image`, `tags`, `productLinks`, `affiliateInfo`, `status`.

### B. Multi-Tier AI Provider Abstraction (`src/lib/ai/provider.ts` & `src/lib/ai/service.ts`)
- Provider-agnostic interface (`AIImageProvider`):
  - **Tier 1 (Gemini Native Image Waterfall):** Checks `gemini-3.1-flash-image`, `gemini-2.5-flash-image`, `gemini-3-pro-image`, `gemini-3.1-flash-lite-image`. Detects zero-quota (`limit: 0`) instantly to avoid unnecessary latency.
  - **Tier 2 (Gemini 3.6 Flash + FLUX Visual Engine):** Enriches wedding styling prompts using Gemini 3.6 Flash (active text quota) and renders 8K photorealistic portraits with FLUX / Turbo at zero compute cost to the developer.
  - **Tier 3 (Graceful Fallback):** Safe placeholder fallback if completely offline.
- **Zero Client-Side Secret Exposure:** All generation and API keys execute exclusively inside Next.js server runtime (`/api/generate`).

### C. Shop The Look & Affiliate Commerce (`src/config/shop.ts` & `src/components/shop/`)
- Mappings for apparel, jewelry, headwear, footwear, and accessories.
- Data model supports `retailer`, `priceINR`, `affiliateUrl`, `affiliateNetwork`, `trackingMetadata`, and `availability`.
- Future marketplace import architecture (`src/lib/shop/import-types.ts`) ready for Amazon / Myntra URL try-on.

### D. Centralized Pricing & Unit Economics (`src/config/payments.ts` & `src/config/wedding.ts`)
- **Complimentary Trial:** 1 free look (`usageConfig.freeGenerationLimit: 1`) to showcase the magic while preventing bot exhaustion.
- **Starter Pack:** ₹99 for 5 looks (~₹19.80 / look, 85%+ gross margin).
- **Wedding Wardrobe Pack:** ₹199 for 15 looks (Complete 5-ceremony coverage).
- **Royal Couture HD Pack:** ₹299 for 30 HD looks (High-res unwatermarked downloads + priority styling).
- **Payment Gateway:** Razorpay INR checkout with instant credit provisioning.

### E. Telemetry & Analytics Engine (`src/lib/analytics/events.ts` & `src/lib/ai/provider.ts`)
- 14 tracked product funnel events:
  - `photo_uploaded`
  - `occasion_selected`
  - `outfit_selected`
  - `style_selected`
  - `generation_started`
  - `generation_completed`
  - `generation_failed`
  - `look_saved`
  - `look_downloaded`
  - `look_shared`
  - `shop_look_clicked`
  - `product_clicked`
  - `purchase_started`
  - `payment_completed`
- Real-time admin dashboard at `/admin/wedding` displaying latency, success rates, provider distribution, and estimated compute costs.

---

## 3. Implementation Status & Milestones

| Milestone | Status | Notes |
| :--- | :--- | :--- |
| **Brand Purity** | ✅ Completed | 100% pure VivahLook branding. All "Vaaraa" references eliminated. |
| **Data-Driven Catalog** | ✅ Completed | `src/config/catalog.ts` created with 25+ curated templates across 6 occasions. |
| **Provider Abstraction** | ✅ Completed | `AIImageProvider` interface & multi-tier engine in `service.ts`. |
| **Telemetry & Cost Tracker** | ✅ Completed | Real-time generation tracker and admin dashboard at `/admin/wedding`. |
| **Shop The Look Component** | ✅ Completed | `src/components/shop/ShopTheLook.tsx` integrated into `ResultViewer.tsx`. |
| **Product Import Contract** | ✅ Completed | `src/lib/shop/import-types.ts` ready for Amazon / marketplace URLs. |
| **Configurable Tiers** | ✅ Completed | 1 free look, ₹99 (5), ₹199 (15), ₹299 (30) in central config. |
| **Hero Redesign** | ✅ Completed | 3-stage visual transformation (You + Outfit → Generated Wedding Look). |
| **Product Demo Video** | ✅ Completed | `src/components/home/ProductDemoVideo.tsx` with 7-step journey timeline. |
| **Funnel Analytics** | ✅ Completed | Strongly-typed event dispatchers integrated into Studio & Result flows. |
| **Production Verification** | ⏳ In Progress | `tsc --noEmit` and `npm run build` verification. |

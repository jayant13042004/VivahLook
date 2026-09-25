# VivahLook — See Your Wedding Look

> **Luxury Indian Wedding Outfit AI Visualization Platform**  
> Try stunning Indian wedding outfits — from royal sherwanis to bridal lehengas and Banarasi silk sarees — before you buy.

---

## Features

- **Editorial Fashion Brand Aesthetic**: High-contrast serif typography (`Playfair Display` + `Cormorant Garamond`), warm royal ivory palette, and deep burgundy / wine accents.
- **Interactive Before/After Centerpiece**: High-performance draggable comparison slider demonstrating real casual portrait to royal bridal couture transformation.
- **Wedding Ceremony Suite**: Dedicated styling for all 6 ceremonies — *Haldi, Mehendi, Sangeet, Wedding, Reception, and Guest*.
- **Couture Catalog**: Bridal lehengas, silk sarees, Anarkalis, Shararas, structured Jodhpuri bandhgalas, and royal embroidered sherwanis.
- **AI Generation Engine**: Server-side abstracted provider (`src/lib/ai/service.ts`) with Google Gemini multimodal API integration and fallback simulation.
- **Facial Identity Preservation**: Modular prompt engineering prioritizing natural skin tone, facial structure, eye color, and proportions.
- **Razorpay Payments (India)**: Localized INR credit packs (₹0 Trial, ₹99 Single, ₹199 Wedding Wardrobe, ₹299 Royal HD) with server-side HMAC verification and UPI support.
- **Multi-Step Studio Flow**: Photo upload with client-side validation, ceremony selector, gender toggle, style picker, animated loader, and download/sharing.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (inline theme tokens, custom dark variant)
- **Database & Auth**: Supabase SSR
- **Payments**: Razorpay Node SDK (Server-side HMAC verification)
- **AI Provider**: Google Gemini API
- **Fonts**: Playfair Display, Cormorant Garamond, Inter, JetBrains Mono

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the required values:
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`
- `GEMINI_API_KEY` (Google AI Studio)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page or [http://localhost:3000/studio](http://localhost:3000/studio) for the interactive try-on studio.

---

## Project Structure

```
├── public/
│   └── images/editorial/    # High-resolution wedding photography assets
├── src/
│   ├── app/
│   │   ├── api/generate/    # Server-side AI generation endpoint
│   │   ├── studio/          # Multi-step try-on wizard route
│   │   ├── billing/         # Razorpay look pack checkout
│   │   ├── admin/wedding/   # Internal metrics dashboard
│   │   └── icon.svg         # Luxury vector favicon
│   ├── components/
│   │   ├── brand/           # VivahLook wordmark & monogram
│   │   ├── home/            # Editorial landing page sections & Before/After slider
│   │   ├── studio/          # Step components (Upload, Occasion, Outfit, Style, Result)
│   │   ├── layout/          # Navbar, Footer, SiteShell
│   │   └── payments/        # Pricing cards & Razorpay checkout button
│   ├── config/
│   │   ├── site.ts          # Brand metadata & URLs
│   │   ├── wedding.ts       # Occasions, outfits, styles, limits
│   │   ├── payments.ts      # INR packs & Razorpay config
│   │   └── theme.ts         # Palette tokens
│   └── lib/
│       ├── ai/              # Prompt builder & Gemini service
│       └── payments/        # Razorpay server actions & HMAC verification
```

---

## License

Private repository. All rights reserved.

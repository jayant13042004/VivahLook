# WeddingLook — MVP PRD

## 1. Product Overview

**Product:** WeddingLook
**Category:** AI Fashion / Consumer Utility
**Target market:** Indian consumers preparing for weddings and wedding events.

### Core promise

> **See how you could look in different Indian wedding outfits before you buy or wear them.**

Users upload their photo, select a wedding occasion and outfit style, and receive realistic AI-generated visualizations.

---

# 2. Primary Goal

Validate whether people will:

1. Upload their photo.
2. Generate wedding outfit looks.
3. Share/save the results.
4. Return for additional looks.
5. Eventually pay for additional generations.

### Initial success metric

The first objective is **not revenue**.

It is:

> **Can we get strangers to generate wedding looks and voluntarily share them?**

If yes, introduce paid packs.

---

# 3. Target Users

### Primary

Indian men and women aged approximately 18–40 who:

* Are getting married.
* Are attending a wedding.
* Are helping someone prepare for a wedding.
* Want to experiment with outfits.
* Like AI/photo transformation content.

### Secondary

* Wedding photographers
* Fashion creators
* Wedding planners
* Boutiques
* Clothing stores

These can become future B2B opportunities.

---

# 4. MVP User Flow

### Step 1 — Landing page

Headline:

> **See Yourself in Your Perfect Wedding Look**

Subheadline:

> Upload your photo and preview different Indian wedding outfits before you buy.

CTA:

**Try WeddingLook Free**

---

### Step 2 — Upload photo

User uploads:

* JPG
* JPEG
* PNG

Recommended guidance:

> Use a clear, well-lit photo with your face visible.

Optional:

* Front-facing photo
* Full-body photo

For MVP, don't force complicated requirements.

---

### Step 3 — Select occasion

Options:

* Haldi
* Mehendi
* Sangeet
* Wedding
* Reception
* Wedding Guest

---

### Step 4 — Select outfit

For initial launch:

### Men

* Sherwani
* Kurta Pajama
* Bandhgala
* Indo-Western
* Traditional Dhoti/Kurta

### Women

* Lehenga
* Saree
* Anarkali
* Sharara
* Indo-Western

Do not launch with 50 categories.

Start with **6–10 strong options**.

---

### Step 5 — Select style

Examples:

* Royal
* Modern
* Traditional
* Minimal
* Luxury
* Pastel

---

### Step 6 — Generate

Display:

> **Creating your WeddingLook...**

Progress states:

1. Preparing your photo
2. Styling your outfit
3. Creating your look
4. Finalizing your image

Avoid fake technical progress if the backend doesn't actually perform those steps. Use a simple loading animation instead.

---

# 5. Generated Result

Show:

### Main image

Large generated image.

### Actions

* Download
* Share
* Generate another
* Try another outfit

### Social CTA

> **Want to see yourself in another wedding look?**

CTA:

**Try Another Look**

---

# 6. Free MVP Strategy

Initially:

### Free

* 1–2 generations per user
* Watermarked result or limited resolution if necessary
* No payment required

Goal:

**Get users, feedback and organic sharing before monetization.**

Track AI usage carefully because image generation may become the main cost.

---

# 7. Future Monetization

Once there is evidence of demand:

### Single Pack

**₹99**

* 10 looks

### Wedding Pack

**₹199**

* Haldi
* Mehendi
* Sangeet
* Wedding
* Reception

### Premium

**₹299**

* 30 generations
* HD downloads
* Multiple styles
* No watermark

Pricing should be tested rather than assumed.

---

# 8. Viral Sharing

Every generated image should have:

**Download**

**Share**

**Try Your Own**

Shared image can contain subtle branding:

> Created with WeddingLook

And a small CTA:

> **See your wedding look → WeddingLook**

The goal is:

**User → generates image → shares → friend sees it → friend tries WeddingLook.**

---

# 9. Landing Page

Sections:

### Hero

**See Yourself in Your Perfect Wedding Look**

Upload your photo and discover your wedding style.

**[Try Free]**

---

### How it works

**1. Upload**
Upload your photo.

**2. Choose**
Pick your wedding event and outfit.

**3. Transform**
Get your personalized look.

---

### Examples

Show high-quality before/after transformations.

This section is extremely important.

---

### Outfit categories

Display visual cards:

Sherwani
Lehenga
Saree
Kurta
Bandhgala
Anarkali

---

### Social proof

Initially:

Don't fabricate testimonials.

Instead show:

> **Join the first WeddingLook users**

Later replace this with genuine reviews.

---

### FAQ

Examples:

**Is WeddingLook free?**

Initially yes, with limited generations.

**Do I need an account?**

Preferably no for the first generation.

**Can I download my image?**

Yes.

**Does WeddingLook sell my photos?**

Explain your actual data policy clearly.

---

# 10. Account Strategy

For MVP:

**Don't force signup before the first generation.**

Better flow:

Upload → Generate → See result → optional signup to save/download.

This reduces friction.

Later introduce accounts for:

* Saved looks
* Generation history
* Multiple photos
* Paid credits

---

# 11. Tech Stack

Optimized for your existing skills.

### Frontend

**Next.js + Tailwind CSS**

### Hosting

**Vercel free tier initially**

or Cloudflare if you prefer the infrastructure.

### Database/Auth

**Supabase**

Use only if actually needed.

### Image generation

Use an image-generation API with available free credits/free tier initially.

The image-generation provider should be abstracted behind your own API layer so you can change providers later.

### Storage

Supabase Storage initially.

### Analytics

Use a lightweight analytics solution.

Track:

* Landing-page visitors
* Uploads
* Generation attempts
* Successful generations
* Downloads
* Shares
* Conversion
* Returning users

---

# 12. Data Model

Minimal MVP.

### users

* id
* email
* created_at

### generations

* id
* user_id
* original_image
* occasion
* outfit
* style
* generated_image
* status
* created_at

### usage

* user_id
* generations_used
* generations_limit
* reset_date

Do not build a complicated database.

---

# 13. Privacy

This is important because users upload personal photographs.

Clearly tell users:

* What happens to uploaded images.
* How long images are stored.
* Whether images are used for AI training.
* How users can delete their data.

Default toward **minimal data retention**.

Don't claim that images are deleted immediately unless the system actually does it.

---

# 14. Abuse & Security

Implement basic protections:

* File-type validation
* File-size limits
* Rate limiting
* Generation limits
* API keys kept server-side
* Basic NSFW/abuse filtering where supported
* Don't expose AI provider credentials to frontend

---

# 15. Admin Dashboard

MVP admin page should show:

* Total users
* Total generations
* Successful generations
* Failed generations
* Daily usage
* Estimated AI cost
* Most popular occasions
* Most popular outfits
* Most popular styles

This lets you understand what users actually want.

---

# 16. Marketing Strategy

Do **not** start with expensive advertising.

### Organic content

Create short videos:

> "Which sherwani looks better?"

Show:

Original → Look 1 → Look 2 → Look 3

CTA:

> **Try your own wedding look — free.**

---

### Content themes

* "Which one should he wear?"
* "Bride tries 5 lehenga styles"
* "Indian wedding outfit transformation"
* "What would you wear to a Sangeet?"
* "Traditional vs modern"
* "₹5,000 look vs ₹50,000 look"
* "Which wedding outfit suits him?"

The generated result itself becomes marketing material.

---

# 17. Launch Plan

## Phase 1 — Prototype

**Days 1–3**

Build:

* Landing page
* Upload
* Occasion selection
* Outfit selection
* Generation
* Result page

Nothing else.

---

## Phase 2 — Polish

**Days 4–5**

Add:

* Better UI
* Loading state
* Download
* Share
* Usage limits
* Error handling
* Mobile optimization

---

## Phase 3 — Launch

**Days 6–7**

Publish.

Start posting short-form content.

Get the first 100 users.

---

# 18. Validation Metrics

After the first 100–500 users, examine:

### Activation

What percentage of visitors upload a photo?

### Generation success

What percentage successfully receive a good result?

### Engagement

How many generate another look?

### Sharing

How many download/share?

### Retention

Do users return?

### Monetization

Would users pay ₹99–₹299?

The most important early signal:

> **Do users voluntarily show the generated image to someone else?**

If yes, you have something worth investigating.

---

# 19. What NOT to Build Initially

Do NOT build:

* Mobile app
* Social network
* AI chatbot
* Complicated profile system
* 50 outfit categories
* AI video generation
* Marketplace
* Clothing shopping
* Affiliate integrations
* Influencer dashboard
* Advanced recommendation engine
* Complex subscription system

First prove:

> **Photo → great wedding look → user loves it.**

Everything else comes later.

---

# 20. Version 2

Only after MVP validation:

### Personal wardrobe

Users can upload multiple photos.

### More styles

* Regional Indian outfits
* Designer-inspired styles
* Celebrity-inspired *non-impersonating* fashion aesthetics
* Seasonal collections

### Shopping

Potentially:

> **Like this look? Find similar outfits.**

This could eventually create affiliate/e-commerce revenue.

### Vendor partnerships

Boutiques and wedding stores could pay to showcase outfits.

---

# 21. Long-Term Vision

WeddingLook can eventually become:

> **An AI wedding fashion discovery platform.**

Not merely:

> "AI generates wedding photos."

Potential ecosystem:

**Discover outfit → visualize it → compare looks → save look → find similar outfit → contact seller → purchase.**

That is much more valuable than a simple image generator.

---

# 22. Core MVP Principle

The entire first version should revolve around one sentence:

> **Upload your photo. Choose your wedding occasion. See yourself in the outfit.**

If that experience is excellent, **launch it.**

Don't hide behind features.

Build the smallest version that makes someone say:

> **"Damn, I want to try this with my photo."**

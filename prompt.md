You are the lead product engineer and UI/UX designer for this project.

Build **WeddingLook**, a polished consumer AI web app based on the PRD below.

The goal is to create a genuinely usable MVP that can be launched publicly, not a mockup or demo.

---

# 1. PRODUCT

Name: **WeddingLook**

Core promise:

> **See yourself in your perfect wedding look before you buy it.**

A user uploads their photo, selects an Indian wedding occasion, selects an outfit/style, and generates a realistic visualization of themselves wearing that outfit.

Target audience:

* Indian men and women
* Wedding attendees
* Brides/grooms
* People shopping for wedding outfits
* People experimenting with wedding fashion

The product should feel like a **premium consumer app**, not an AI-generated template or generic SaaS dashboard.

---

# 2. IMPORTANT: USE LAUNCHKIT

There is an existing **LaunchKit** in this project that I specifically want to test and use for this product.

Before building anything:

### First inspect the existing LaunchKit.

Understand:

* Its architecture
* Components
* Design system
* Landing-page sections
* Authentication
* Database utilities
* Payment infrastructure
* Analytics
* SEO
* Email/waitlist functionality
* Any reusable UI/components
* Any existing configuration

Then determine which parts are useful for WeddingLook.

### IMPORTANT

Do **not** blindly rebuild functionality that LaunchKit already provides.

Reuse LaunchKit wherever appropriate.

However, do NOT force WeddingLook into LaunchKit's existing structure if doing so would hurt the product UX.

WeddingLook's consumer experience comes first.

Create a clear separation between:

**LaunchKit infrastructure**
and
**WeddingLook product functionality.**

If LaunchKit already has a feature that solves something, reuse it.

If WeddingLook requires something LaunchKit doesn't provide, implement it cleanly.

At the end, document:

1. What LaunchKit functionality was reused.
2. What was modified.
3. What was newly built.

---

# 3. DESIGN DIRECTION

This is extremely important.

I DO NOT want:

* Generic AI SaaS design
* "AI slop"
* Excessive gradients
* Purple/pink AI aesthetic
* Huge meaningless hero text
* Overcomplicated dashboards
* Generic shadcn-looking landing page
* Stock-looking AI imagery

I want a **premium Indian wedding-fashion consumer product**.

Visual direction:

* Elegant
* Premium
* Modern
* Minimal
* Fashion-forward
* Warm
* High-end
* Mobile-first

Think:

**Indian wedding fashion magazine + premium consumer app**

rather than:

**AI startup dashboard.**

Use strong typography, excellent spacing, beautiful imagery, subtle animations and a refined visual hierarchy.

The generated outfit images should be the visual hero of the product.

---

# 4. TECH STACK

Prefer:

* Next.js
* TypeScript
* Tailwind CSS
* Supabase where needed
* Server-side API routes for AI generation
* Vercel/Cloudflare-compatible architecture

Use the existing project's stack where LaunchKit already establishes one.

Do NOT unnecessarily replace existing infrastructure.

---

# 5. MVP USER FLOW

The primary flow must be extremely simple:

Landing page

↓

**Try WeddingLook Free**

↓

Upload photo

↓

Select occasion

↓

Select outfit

↓

Select style

↓

Generate

↓

View result

↓

Download / Share / Try another

This flow should take as few steps as reasonably possible.

---

# 6. LANDING PAGE

Create a premium landing page.

## Hero

Headline:

> **See Yourself in Your Perfect Wedding Look**

Subheadline:

> Upload your photo and preview stunning Indian wedding outfits before you buy.

Primary CTA:

> **Try WeddingLook Free**

Secondary CTA if useful:

> See Examples

The hero should immediately show beautiful example transformations.

Do not use fake testimonials or fake user counts.

---

# 7. HOW IT WORKS

Three simple steps:

### 01 — Upload

Upload a clear photo.

### 02 — Choose

Pick your wedding occasion and outfit.

### 03 — Transform

Get your personalized wedding look.

Use visual examples rather than unnecessary text.

---

# 8. OUTFIT CATEGORIES

Initially support:

## Men

* Sherwani
* Kurta Pajama
* Bandhgala
* Indo-Western
* Dhoti/Kurta

## Women

* Lehenga
* Saree
* Anarkali
* Sharara
* Indo-Western

Do not build dozens of categories.

Architecture should make adding categories later easy.

---

# 9. OCCASIONS

Support:

* Haldi
* Mehendi
* Sangeet
* Wedding
* Reception
* Wedding Guest

---

# 10. STYLES

Support:

* Royal
* Modern
* Traditional
* Minimal
* Luxury
* Pastel

The UI should make these feel visually selectable.

---

# 11. PHOTO UPLOAD

Build a polished upload experience.

Support:

* JPG
* JPEG
* PNG

Show:

* drag & drop
* click to upload
* image preview
* replace photo
* remove photo

Give clear guidance:

> For best results, use a clear, well-lit photo with your face visible.

Don't force users through unnecessary forms.

---

# 12. GENERATION EXPERIENCE

After the user clicks Generate:

Show a beautiful generation screen.

Use meaningful loading copy such as:

> Creating your wedding look...

Then:

> Styling your outfit...

Then:

> Finishing your look...

Do NOT fake technical processing information.

If the backend only has one generation step, use a tasteful animated loading experience rather than pretending multiple backend stages are occurring.

The waiting experience should feel premium.

---

# 13. RESULT PAGE

The result is the most important screen.

Show the generated image prominently.

Actions:

**Download**

**Share**

**Try Another Look**

**Create Another**

Also display:

* Occasion
* Outfit
* Style

Keep the interface minimal.

The generated image should occupy most of the visual attention.

---

# 14. SHARING

Make sharing extremely easy.

Support:

* Download image
* Native Web Share API where available
* Copy/share link where appropriate

Generated images should optionally have subtle branding:

> Created with WeddingLook

Do not make the watermark ugly.

The goal is organic growth:

User generates image

→ shares it

→ someone else sees it

→ visits WeddingLook

→ generates their own look.

---

# 15. FREE MVP

Initially make the product free.

However, implement usage limits.

Example:

**2 free generations per user/session.**

The exact limit should be configurable.

Do not hard-code pricing or limits throughout the codebase.

Create configuration values so we can change:

* Free generation limit
* Paid generation limit
* Pricing
* Watermark settings

later without rewriting the application.

---

# 16. FUTURE MONETIZATION

Do not make payments mandatory for the MVP.

Prepare architecture for:

### ₹99

10 looks

### ₹199

Wedding Pack

### ₹299

30 looks + HD downloads

Do not build a complicated payment flow unless LaunchKit already provides it.

If LaunchKit has payment infrastructure, integrate it cleanly but keep it disabled/hidden until we decide to activate monetization.

---

# 17. AI IMAGE GENERATION ARCHITECTURE

IMPORTANT:

Do not tightly couple the entire frontend to one AI provider.

Create an abstraction such as:

generateWeddingLook()

The implementation can call the chosen image-generation provider.

This allows us to replace providers later.

The API key must NEVER be exposed to the client.

Generation should happen server-side.

Handle:

* successful generation
* timeout
* provider error
* invalid image
* rate limit
* unexpected failure

with good user-facing error messages.

---

# 18. PROMPT GENERATION

Create a structured backend prompt builder.

Inputs:

* user photo
* gender
* occasion
* outfit
* style

Generate a high-quality prompt designed to preserve:

* facial identity
* skin tone
* body proportions
* hairstyle where possible
* pose where possible

while changing:

* clothing
* styling
* accessories
* wedding environment where appropriate

Prioritize **photorealism**.

Avoid changing the person's identity unnecessarily.

The prompt architecture should be modular so outfit/style combinations can be improved independently.

---

# 19. DATABASE

Keep the initial database simple.

Potential tables:

### users

id
email
created_at

### generations

id
user_id
original_image
occasion
outfit
style
generated_image
status
created_at

### usage

user_id
generations_used
generation_limit
updated_at

Use Supabase if appropriate.

Don't build unnecessary database complexity.

---

# 20. AUTHENTICATION

Do not force account creation before the first generation.

Preferred flow:

Upload

→ Generate

→ See result

→ Ask user to sign up only when necessary for:

* saving results
* additional generations
* history
* future purchases

If LaunchKit already provides authentication, reuse it.

---

# 21. ANALYTICS

Track at minimum:

* Landing page visit
* CTA click
* Upload started
* Upload completed
* Generation started
* Generation succeeded
* Generation failed
* Result viewed
* Download clicked
* Share clicked
* Generate-again clicked
* Signup
* Purchase later

Use LaunchKit analytics if already available.

Do not introduce unnecessary analytics infrastructure if existing functionality works.

---

# 22. ADMIN / INTERNAL VIEW

Create a simple internal/admin view if practical.

Show:

* Total users
* Total generations
* Successful generations
* Failed generations
* Daily generations
* Most popular occasions
* Most popular outfits
* Most popular styles
* Estimated AI usage/cost

This is important because we're validating the business.

---

# 23. PRIVACY

Users upload personal photographs.

Implement and clearly communicate:

* What happens to uploaded images
* Storage duration
* Whether images are used for model training
* How users can delete their data

Do NOT make claims about deletion or AI training unless the implementation/provider actually supports them.

Use sensible retention policies.

---

# 24. SECURITY

Implement:

* File type validation
* File size limits
* Rate limiting
* Server-side API keys
* Generation limits
* Basic abuse protection
* Secure storage
* Proper authorization for generated images

Do not expose Supabase service keys or AI API keys in the browser.

---

# 25. SEO

Create useful metadata.

Title:

> WeddingLook — See Yourself in Your Perfect Wedding Look

Description:

> Upload your photo and preview Indian wedding outfits with AI.

Create clean metadata and Open Graph previews.

If LaunchKit already provides SEO infrastructure, reuse it.

---

# 26. MOBILE FIRST

This is a consumer product.

The experience must work exceptionally well on mobile.

Pay particular attention to:

* Uploading from phone gallery
* Image preview
* Generation loading
* Result viewing
* Download
* Share
* Touch targets

Desktop should also look polished.

---

# 27. RESPONSIVENESS

Test:

* Mobile
* Tablet
* Desktop

No horizontal scrolling.

No broken image containers.

No layout jumps.

---

# 28. ERROR STATES

Build polished error states.

Examples:

### Invalid image

> Please upload a JPG or PNG image.

### Generation failed

> We couldn't create your look this time. Please try again.

### Limit reached

> You've used your free looks. More options will be available soon.

Don't expose raw API errors to users.

---

# 29. PERFORMANCE

Optimize for:

* Fast initial page load
* Compressed assets
* Lazy loading
* Proper image sizing
* Minimal client JavaScript where possible

Do not sacrifice visual quality unnecessarily.

---

# 30. LEGAL / TRUST PAGES

Create:

* Privacy Policy
* Terms of Service
* About
* Contact

Keep them simple but professional.

Do not invent company registration details, addresses or claims.

---

# 31. BRAND

Brand:

**WeddingLook**

Possible positioning:

> **Your wedding. Your style. See it before you wear it.**

Do not overcomplicate the logo.

Create a simple premium wordmark/icon that works as:

* Website logo
* Favicon
* Social profile image

---

# 32. WHAT NOT TO BUILD

For this MVP, DO NOT build:

* Mobile native app
* Social network
* Chatbot
* Clothing marketplace
* E-commerce
* Affiliate system
* Vendor marketplace
* AI video generation
* Complex recommendation engine
* 50+ outfit categories
* Complex user profiles
* Advanced subscription system

We are validating one thing:

> **Can WeddingLook create wedding outfit visualizations that people genuinely want to use and share?**

---

# 33. QUALITY BAR

Before considering the MVP complete, inspect the entire product as if you were a real user.

Ask:

* Does this look like a real consumer startup?
* Would I trust uploading my photo?
* Is the value obvious within 5 seconds?
* Can I generate a look without confusion?
* Does the result page feel exciting?
* Is the mobile experience excellent?
* Are there any generic AI-dashboard design patterns?
* Are there broken states?
* Are loading states polished?
* Is the generated image the star of the experience?

Fix obvious issues before declaring completion.

---

# 34. DEVELOPMENT PROCESS

Do not build everything blindly in one pass.

Work in stages:

### Stage 1

Inspect existing project and LaunchKit.

### Stage 2

Create architecture and reusable components.

### Stage 3

Build landing page.

### Stage 4

Build upload → selection → generation flow.

### Stage 5

Build result/share/download experience.

### Stage 6

Integrate AI provider.

### Stage 7

Add usage limits and analytics.

### Stage 8

Add privacy/legal pages.

### Stage 9

Test mobile and desktop.

### Stage 10

Perform a final UX/visual audit and fix issues.

---

# 35. IMPORTANT INSTRUCTION

Do not stop at creating a design or skeleton.

**Actually implement the working product.**

If an external API key is required and isn't available, create the correct integration structure and clearly identify the exact environment variable required, while keeping the rest of the application fully functional.

Do not replace real functionality with fake buttons.

Do not use fake generated results in production UI unless clearly marked as examples.

At the end, provide:

1. What was built.
2. LaunchKit components reused.
3. New components created.
4. Environment variables required.
5. How to run locally.
6. How to test the complete user flow.
7. What remains before public launch.

Start by **inspecting the existing codebase and LaunchKit**, then begin implementation.




## IMPORTANT — BEFORE BUILDING

First inspect the existing **LaunchKit** codebase available in this project.

Understand:

* Architecture
* Existing components
* Design system
* Authentication
* Database
* Payments
* Analytics
* SEO
* Email
* Reusable UI
* Existing launch/marketing functionality

Use LaunchKit as the foundation wherever appropriate.

**Do not rebuild functionality that LaunchKit already provides.**

---

## BRAND NAME

**WeddingLook is only a working/project name.**

Before finalizing the product branding, research and propose a **highly distinctive, memorable brand name** for the product.

The name should:

* Be short and memorable
* Feel premium
* Work internationally, especially for Indian wedding users
* Have a suitable domain opportunity
* Not obviously conflict with an existing app, website, SaaS, company or brand
* Have no obvious trademark/brand confusion

Check the web/domain/search landscape as far as your available tools allow.

**Do not claim that a name is guaranteed globally conflict-free.**

Provide 3–5 candidates internally, then select the strongest candidate based on distinctiveness and apparent availability.

Use the selected name consistently throughout the product.

---

# BRANDING & VISUAL IDENTITY

Create a complete, polished visual identity for the selected brand.

Generate/design:

* Primary logo
* Logo variations
* App icon
* Favicon
* Mobile/home-screen icon
* Social media profile image
* Open Graph/social sharing image
* Default social preview
* Appropriate brand typography
* Color system
* UI icon treatment

The logo should be:

* Simple
* Memorable
* Premium
* Recognizable at small sizes
* Appropriate for wedding/fashion
* Not a generic AI sparkle logo
* Not overly complicated

Make sure the favicon and app icon remain recognizable at very small sizes.

---

# VISUAL QUALITY

Do not create a text-heavy generic SaaS website.

Use visual content wherever it genuinely improves the product.

Consider adding:

* High-quality wedding-fashion imagery
* Before/after examples
* Outfit previews
* Interactive visual cards
* Subtle decorative elements
* Micro-interactions
* Smooth transitions
* Scroll animations
* Hover effects
* Image reveal animations
* Elegant loading animations
* Generation progress visuals

Use animation **only when it improves the experience**.

Do not add animation just for the sake of animation.

---

# IMAGES & VIDEO

Where appropriate, use high-quality visuals demonstrating the product.

The most important visual content should communicate:

**Original photo → WeddingLook → transformed wedding outfit**

If suitable video can materially improve the landing page, create/use a lightweight product demonstration or short visual loop.

Prioritize performance.

Do not use random stock images simply to fill space.

Every visual should support the product story.

---

# PREMIUM CONSUMER EXPERIENCE

The final product should feel closer to a:

**premium Indian wedding-fashion consumer app**

than a:

**generic AI SaaS dashboard.**

Pay particular attention to:

* Typography
* Spacing
* Image quality
* Mobile UX
* Visual hierarchy
* Button design
* Empty states
* Loading states
* Error states
* Transitions
* Result presentation
* Sharing experience

The generated image should always remain the **hero of the experience**.

---

# SOCIAL & SHARING ASSETS

Prepare the product for organic distribution.

Create:

* OG image
* Twitter/X card image
* Social preview
* Favicon
* App icon
* Shareable generated-image branding
* Appropriate metadata

When users share generated results, make the result visually attractive enough that another person would want to try the product.

---

# FINAL POLISH

Before considering the project complete, perform a full visual and UX audit.

Look for:

* Generic-looking sections
* Poor spacing
* Weak typography
* Broken responsive layouts
* Missing mobile states
* Poor loading states
* Bad image cropping
* Inconsistent buttons
* Unnecessary UI
* Weak CTAs
* Missing SEO/social metadata
* Missing favicon/app icons
* Missing legal/trust elements
* Any obvious "AI-generated website" feeling

Fix these issues before declaring the product finished.

The goal is not merely:

> **"The app works."**

The goal is:

> **"The app works, looks premium, feels trustworthy, and is good enough to publicly launch."**

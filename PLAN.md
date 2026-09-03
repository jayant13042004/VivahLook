# Personal Launch Engine — Master Plan

## What We Are Building

Personal Launch Engine is a private, reusable, AI-first website starter system.

The purpose is to avoid rebuilding the same infrastructure for every project and reduce AI coding time, context usage, and token consumption.

Instead of starting from an empty project, every new project should begin with a proven foundation. AI coding tools should then focus primarily on the unique product features and problem being solved.

This project is currently for personal use only.

---

# Core Philosophy

## Build Once, Reuse Many Times

Common functionality should be built once and reused:

- UI foundations
- Design system
- Light/dark mode
- Navigation
- Footer
- SEO
- Legal pages
- Error states
- Loading states
- Authentication
- Database integrations
- Payments
- Analytics
- Blogs

Each new project should only include the modules it actually needs.

---



# Main Project Types

The system will eventually support three primary project profiles.

## 1. SaaS Applications

For products that require users, dashboards, databases, subscriptions, or payments.

Examples:

- CSV tools
- Productivity software
- Business software
- Subscription products
- Data tools

Possible modules:

- Authentication
- Database
- Dashboard
- Payments
- Subscriptions
- Analytics
- Emails
- Admin

---



## 2. Micro-Niche / SEO Websites

For multi-page websites designed to attract organic traffic.

Examples:

- Online tools
- Calculators
- Converters
- Information websites
- Programmatic SEO websites

Possible modules:

- SEO
- Blog
- Sitemap
- Schema markup
- Programmatic pages
- Analytics
- Advertising support

---



## 3. AI Web Applications

For products where AI is the main feature.

Examples:

- AI generators
- AI assistants
- AI productivity tools
- AI automation products

Possible modules:

- Authentication
- AI provider integration
- API architecture
- Database
- Usage limits
- Credits
- Payments
- Dashboard

---



# Technology Philosophy

We will not attempt to support every technology stack inside one project.

The core starter should remain clean and maintainable.

The primary stack for the first version is:

- Next.js
- TypeScript
- Tailwind CSS

Additional technologies such as Supabase, Firebase, Stripe, Razorpay, MongoDB, PostgreSQL, Cloudflare, and Vercel will eventually be implemented as optional modules or configurations.

The system should prefer sensible defaults.

---



# AI-First Architecture

This project must be easy for AI coding tools to understand.

The codebase should maintain clear documentation and conventions.

The project contains:

- `PLAN.md` — Overall vision and roadmap
- `PROJECT_CONTEXT.md` — Current project's purpose and conventions
- `ARCHITECTURE.md` — Technical architecture
- `AI_RULES.md` — Rules for AI when modifying the codebase
- `MODULES.md` — Available reusable modules
- `DOCUMENTATION.md` — How to run and configure what is built

AI should always prefer:

1. Understanding existing architecture.
2. Reusing existing components.
3. Following existing naming conventions.
4. Avoiding unnecessary duplication.
5. Making minimal, focused changes.
6. Not rewriting working code without a reason.

---



# Roadmap



## Phase 1 — Core Foundation

> Status: **Implemented** in this repo.

Build the reusable foundation.

Features:

- Next.js
- TypeScript
- Tailwind CSS
- Reusable design system
- Light mode
- Dark mode
- Theme switching
- Configurable color system
- Responsive design
- Navbar
- Footer
- Landing page
- About page
- Contact page
- Privacy Policy page
- Terms & Conditions page
- FAQ page
- Loading states
- Error pages
- 404 page
- Basic SEO foundation

No authentication, database, payments, or backend integrations yet.

The goal is a clean, reusable frontend foundation.

---



## Phase 2 — SaaS Infrastructure

> Status: **Implemented** in this repo.

Add:

- Authentication
- Google login
- Email authentication
- User management
- Dashboard
- User profile
- Database integration
- Supabase as the initial default

---



## Phase 3 — Payments

> Status: **Implemented** in this repo.

Add modular payment support:

- Stripe
- Razorpay

Support:

- One-time payments
- Subscriptions
- Webhooks
- Payment status

---



## Phase 4 — AI Context System

> Status: **Implemented** in this repo.

Build a **tool-agnostic AI context system** that allows any capable AI coding tool to understand and work effectively with the LaunchKit codebase.

The goal is **not to minimize context at the expense of quality**. The goal is to provide AI with the right information so it can produce the best possible code while avoiding unnecessary or duplicated context.

Create and maintain:

- `PROJECT_CONTEXT.md` — concise overview of the project, purpose, stack, conventions, and important decisions.

- `ARCHITECTURE.md` — key architecture, structure, data flow, and technical decisions.

- `AI_RULES.md` — universal coding, quality, security, architecture, and modification rules for AI agents.

- `MODULES.md` — reusable modules, what they do, when to use them, and how they interact.

### Requirements

- Keep all files concise and highly useful.

- Do not duplicate information unnecessarily.

- Do not document obvious code.

- Prioritize information that materially improves AI's decisions and implementation quality.

- The system must work with **Cursor, Claude Code, Antigravity, VS Code/Copilot, and other AI coding tools**.

- Do not depend on any single AI tool.

- The codebase itself must remain the primary source of truth.

- AI should inspect existing code before making changes.

- AI should reuse existing functionality instead of recreating it.

- AI should follow established architecture and conventions.

- AI should make minimal changes when appropriate and never sacrifice correctness or quality merely to reduce tokens.

- If tool-specific instruction files are useful, they may be generated as small adapters, but they must reference the universal source of truth rather than duplicate it.

### Core Principle

**Give AI enough context to build the best possible project, but never give it unnecessary context.**

This phase should make LaunchKit significantly better for AI-assisted development while preserving its primary goal:

**Build once → reuse everywhere → ship faster → focus AI effort on the unique problem.**

---



## Phase 5 — Optional Modules

> Status: **Implemented** in this repo.

Create reusable modules for:

- Blog
- Analytics
- Email
- Admin dashboard
- Additional authentication
- Additional databases

Modules should be optional and should not unnecessarily bloat projects.

---



## Phase 6 — SEO / Micro-Niche Profile

> Status: **Implemented** in this repo.

Create specialized functionality for SEO websites:

- Advanced metadata
- Sitemap generation
- Robots configuration
- Schema markup
- Blog architecture
- Programmatic SEO support
- Tool page templates

Toggle extras with `modulesConfig.seoProfile` (off for lean SaaS). Core `buildMetadata`, sitemap, and robots stay in Phase 1.

---



## Phase 7 — Project Creator

Eventually create an internal interface or CLI.

The user flow:

1. Choose project type.
2. Describe the project.
3. Select required features.
4. Choose optional integrations.
5. Generate a clean project.

Example:

> Project: AI CSV cleaning tool

Selected configuration:

- SaaS profile
- Google authentication
- Supabase
- Razorpay
- Vercel
- Blog

The generated project should only contain the required code.

---


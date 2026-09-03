/**
 * Page copy — edit text here instead of hunting through JSX.
 * Keep marketing/legal content centralized for AI and humans.
 */

export const homeContent = {
  hero: {
    brand: "Personal Launch Engine",
    headline: "A reusable foundation for every new product.",
    supporting:
      "Start with design, theming, SEO, and core pages already in place — then focus on the feature that matters.",
    primaryCta: { label: "Get started", href: "/contact" },
    secondaryCta: { label: "Learn more", href: "/about" },
  },
  features: {
    title: "Built once. Reused many times.",
    supporting:
      "Common website infrastructure lives here so each new project inherits a proven baseline.",
    items: [
      {
        title: "Design system",
        description:
          "Semantic colors, typography, and reusable UI primitives that stay consistent across pages.",
      },
      {
        title: "Theme ready",
        description:
          "Light and dark modes with a single config file for brand colors on future projects.",
      },
      {
        title: "SEO foundation",
        description:
          "Metadata helpers, sitemap, and robots setup so launches start search-aware.",
      },
      {
        title: "Core pages",
        description:
          "Home, About, Contact, FAQ, Privacy, and Terms — ready to customize, not rewrite.",
      },
    ],
  },
  cta: {
    title: "Ready to launch the next idea?",
    supporting:
      "Use this starter as your default baseline. Customize branding, ship the unique product work.",
    button: { label: "Contact", href: "/contact" },
  },
} as const;

export const aboutContent = {
  title: "About",
  description: "Why Personal Launch Engine exists and how to use it.",
  intro:
    "Personal Launch Engine is a private, reusable, AI-first website starter. It exists so common infrastructure is not rebuilt for every project.",
  sections: [
    {
      title: "The problem",
      body: "Every new site tends to recreate the same pieces: navigation, theming, legal pages, SEO basics, and loading/error states. That burns time and AI context on work that should already be solved.",
    },
    {
      title: "The approach",
      body: "Build a clean foundation once. Keep configuration centralized. Prefer reusable components. Add optional modules later only when a project needs them.",
    },
    {
      title: "What Phase 1 includes",
      body: "A production-quality frontend foundation: design system, light/dark mode, responsive layout, core marketing and legal pages, reusable states, and basic SEO — with no auth, database, or payments yet.",
    },
  ],
} as const;

export const contactContent = {
  title: "Contact",
  description: "Reach out about a project, question, or customization need.",
  intro:
    "Send a message using the form below. If Resend is configured, the message is emailed. Otherwise it is validated locally only.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@example.com" },
    message: { label: "Message", placeholder: "How can we help?" },
  },
  submitLabel: "Send message",
  successTitle: "Message received",
  successBody:
    "Thanks — if email is configured, we sent it. If not, the form still validates locally.",
} as const;

export const faqContent = {
  title: "FAQ",
  description: "Common questions about Personal Launch Engine.",
  items: [
    {
      question: "What is Personal Launch Engine?",
      answer:
        "A reusable Next.js starter for personal projects. It provides UI foundations, theming, core pages, and SEO basics so new products start further ahead.",
    },
    {
      question: "Can I change the brand and colors?",
      answer:
        "Yes. Update src/config/site.ts for branding and src/config/theme.ts for colors. Most pages and components read from those configs.",
    },
    {
      question: "Does this include authentication or payments?",
      answer:
        "Yes. Auth (email, Google, optional GitHub), Stripe/Razorpay billing, optional blog, analytics, email, and admin. Toggle extras in src/config/modules.ts.",
    },
    {
      question: "Is this meant for AI coding tools?",
      answer:
        "Yes. Clear folders, config-driven branding, and documentation conventions are intentional so AI tools can navigate and extend the codebase with less context.",
    },
    {
      question: "How do I add a new page?",
      answer:
        "Create a route under src/app, add the link in src/config/navigation.ts, and reuse layout primitives like Container, Section, and PageHeader.",
    },
  ],
} as const;

export const privacyContent = {
  title: "Privacy Policy",
  description: "How this site handles information.",
  lastUpdated: "September 2, 2026",
  sections: [
    {
      title: "Overview",
      body: "This Privacy Policy explains what information may be collected when you use this website and how it may be used. Replace this placeholder text with your project's actual policy before launch.",
    },
    {
      title: "Information we collect",
      body: "Depending on how you use the site, we may collect information you voluntarily provide (such as name, email, and message content through a contact form) and basic technical data such as browser type or device information from analytics tools you choose to add later.",
    },
    {
      title: "How we use information",
      body: "Information is used to respond to inquiries, improve the website, and operate the service. We do not sell personal information.",
    },
    {
      title: "Cookies and analytics",
      body: "This Phase 1 starter does not ship analytics by default. If you add cookies or analytics later, disclose them here and provide opt-out details where required.",
    },
    {
      title: "Contact",
      body: "For privacy questions, contact the site owner using the Contact page or the email listed in site configuration.",
    },
  ],
} as const;

export const termsContent = {
  title: "Terms & Conditions",
  description: "Terms of use for this website.",
  lastUpdated: "September 2, 2026",
  sections: [
    {
      title: "Agreement",
      body: "By accessing this website, you agree to these Terms & Conditions. If you do not agree, do not use the site. Replace this placeholder with counsel-reviewed terms before a public launch.",
    },
    {
      title: "Use of the site",
      body: "You may use this website for lawful purposes only. You agree not to misuse the site, attempt unauthorized access, or interfere with its operation.",
    },
    {
      title: "Intellectual property",
      body: "Site content, branding, and materials are owned by the site operator or licensors unless otherwise stated. You may not copy or redistribute them without permission.",
    },
    {
      title: "Disclaimer",
      body: "The site is provided as-is without warranties of any kind. The operator is not liable for damages arising from use of the site to the fullest extent permitted by law.",
    },
    {
      title: "Changes",
      body: "These terms may be updated from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.",
    },
  ],
} as const;

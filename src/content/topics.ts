/**
 * Programmatic SEO topics — add rows here to generate /topics/[slug] pages.
 */

export type TopicPage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { title: string; body: string }[];
  faqs?: { question: string; answer: string }[];
};

export const topicPages: TopicPage[] = [
  {
    slug: "nextjs-website-starter",
    title: "Next.js website starter",
    description:
      "What a Next.js website starter should include before you add unique product features.",
    intro:
      "A starter should cover layout, theming, SEO basics, and legal pages so each new site does not rebuild them.",
    sections: [
      {
        title: "What to reuse",
        body: "Design tokens, navigation, metadata helpers, and error states belong in the foundation. Product logic does not.",
      },
      {
        title: "When to use this page type",
        body: "Duplicate this topic pattern for keyword-focused landing pages: one slug, one search intent, structured sections and FAQs.",
      },
    ],
    faqs: [
      {
        question: "Do I need a new route file per topic?",
        answer:
          "No. Add an object to src/content/topics.ts. The /topics/[slug] template renders it.",
      },
    ],
  },
  {
    slug: "saas-boilerplate-checklist",
    title: "SaaS boilerplate checklist",
    description:
      "Auth, billing, and a dashboard — the usual SaaS baseline before custom features.",
    intro:
      "SaaS starters typically include authentication, a user area, and payments. Search pages like this one target checklist queries.",
    sections: [
      {
        title: "Core SaaS pieces",
        body: "Sign-in, profiles, a protected dashboard, and a billing page with webhook-backed payment status.",
      },
      {
        title: "Keep SEO optional",
        body: "A SaaS app can turn off the micro-niche SEO profile (tools and topic pages) in src/config/modules.ts.",
      },
    ],
  },
];

export function getTopic(slug: string) {
  return topicPages.find((topic) => topic.slug === slug);
}

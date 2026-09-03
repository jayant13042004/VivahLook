/**
 * Tool catalog for /tools/[slug].
 * Add a slug here, then optionally a widget in src/components/tools/.
 */

export type ToolDefinition = {
  slug: string;
  name: string;
  description: string;
  howTo: string[];
  faqs: { question: string; answer: string }[];
  widget?: "word-counter" | "meta-description";
};

export const tools: ToolDefinition[] = [
  {
    slug: "word-counter",
    name: "Word counter",
    description: "Count words, characters, and sentences in text. A template for free SEO tools.",
    widget: "word-counter",
    howTo: [
      "Paste or type text in the box.",
      "Word, character, and sentence counts update as you type.",
      "Copy this page pattern for other calculators and converters.",
    ],
    faqs: [
      {
        question: "How do I add another tool?",
        answer:
          "Add an entry in src/content/tools.ts and a widget in src/components/tools if it needs UI. The /tools/[slug] template handles layout, metadata, and schema.",
      },
    ],
  },
  {
    slug: "meta-description-length",
    name: "Meta description length check",
    description:
      "Check whether a meta description is in a typical search-snippet range (~150–160 characters).",
    widget: "meta-description",
    howTo: [
      "Write a candidate meta description.",
      "Aim for about 150–160 characters for many SERPs.",
      "Use this as a second example of the same tool-page template with a different widget.",
    ],
    faqs: [
      {
        question: "Is 160 characters a hard limit?",
        answer:
          "No. Google truncates by pixels, not a fixed character count. Treat 150–160 as a practical target.",
      },
    ],
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

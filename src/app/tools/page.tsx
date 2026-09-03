import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { modulesConfig } from "@/config/modules";
import { tools } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Tools",
  description: "Free utilities with reusable page templates for search-led products.",
  path: "/tools",
});

export default function ToolsIndexPage() {
  if (!modulesConfig.seoProfile) notFound();

  return (
    <Section>
      <JsonLd
        data={collectionPageSchema({
          name: "Tools",
          description: "Free utilities with reusable page templates.",
          path: "/tools",
        })}
      />
      <PageHeader
        title="Tools"
        description="Each tool is a content row plus an optional widget. Add more in src/content/tools.ts."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <li
            key={tool.slug}
            className="rounded-lg border border-border bg-surface p-6"
          >
            <h2 className="font-display text-xl font-semibold text-foreground">
              <Link href={`/tools/${tool.slug}`} className="hover:underline">
                {tool.name}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

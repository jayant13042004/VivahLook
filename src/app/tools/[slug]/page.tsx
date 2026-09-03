import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MetaDescriptionChecker } from "@/components/tools/MetaDescriptionChecker";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordCounter } from "@/components/tools/WordCounter";
import { modulesConfig } from "@/config/modules";
import { getTool, tools } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  if (!modulesConfig.seoProfile) return [];
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool || !modulesConfig.seoProfile) {
    return buildMetadata({ title: "Tool not found", path: "/tools", noIndex: true });
  }
  return buildMetadata({
    title: tool.name,
    description: tool.description,
    path: `/tools/${tool.slug}`,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  if (!modulesConfig.seoProfile) notFound();
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  return (
    <ToolLayout tool={tool}>
      {tool.widget === "word-counter" ? <WordCounter /> : null}
      {tool.widget === "meta-description" ? <MetaDescriptionChecker /> : null}
    </ToolLayout>
  );
}

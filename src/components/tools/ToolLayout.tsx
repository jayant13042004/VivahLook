import { FaqList } from "@/components/content/FaqList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import type { ToolDefinition } from "@/content/tools";
import { faqPageSchema, webApplicationSchema } from "@/lib/seo/schema";

type ToolLayoutProps = {
  tool: ToolDefinition;
  children?: React.ReactNode;
};

/** Shared chrome for /tools/[slug] — metadata and schema live on the route. */
export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const path = `/tools/${tool.slug}`;

  return (
    <Section>
      <JsonLd
        data={webApplicationSchema({
          name: tool.name,
          description: tool.description,
          path,
        })}
      />
      {tool.faqs.length ? <JsonLd data={faqPageSchema(tool.faqs)} /> : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path },
        ]}
      />
      <PageHeader eyebrow="Tool" title={tool.name} description={tool.description} />
      {children ? <div className="mt-10 max-w-3xl">{children}</div> : null}
      <ol className="mt-12 max-w-2xl list-decimal space-y-3 pl-5 text-muted-foreground">
        {tool.howTo.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {tool.faqs.length ? (
        <div className="mt-14 max-w-3xl">
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground">FAQ</h2>
          <FaqList items={tool.faqs} />
        </div>
      ) : null}
    </Section>
  );
}

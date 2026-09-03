import { ContactForm } from "@/components/content/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/content/pages";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: contactContent.title,
  description: contactContent.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div>
          <PageHeader
            title={contactContent.title}
            description={contactContent.intro}
          />
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

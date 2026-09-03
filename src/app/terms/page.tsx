import { LegalPage } from "@/components/content/LegalPage";
import { termsContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: termsContent.title,
  description: termsContent.description,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage {...termsContent} />;
}

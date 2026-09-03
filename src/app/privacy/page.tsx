import { LegalPage } from "@/components/content/LegalPage";
import { privacyContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: privacyContent.title,
  description: privacyContent.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage {...privacyContent} />;
}

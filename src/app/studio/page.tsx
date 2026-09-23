import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { StudioWizard } from "@/components/studio/StudioWizard";

export const metadata: Metadata = buildMetadata({
  title: "Create Your Wedding Look",
  description:
    "Upload your photo and see yourself in stunning Indian wedding outfits. Try sherwanis, lehengas, sarees, and more.",
});

export default function StudioPage() {
  return <StudioWizard />;
}

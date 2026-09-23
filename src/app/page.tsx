import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { OccasionsGallery } from "@/components/home/OccasionsGallery";
import { OutfitCatalogSection } from "@/components/home/OutfitCatalogSection";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { EmotionalBanner } from "@/components/home/EmotionalBanner";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero: Emotional + Product Demonstration */}
      <HomeHero />

      {/* 2. How It Works: 3-Step Story */}
      <HowItWorksSection />

      {/* 3. Wedding Occasions: Immersive 6-Ceremony Gallery */}
      <OccasionsGallery />

      {/* 4. Outfit Exploration: Haute Couture Editorial Catalog */}
      <OutfitCatalogSection />

      {/* 5. Centerpiece: Interactive BEFORE → AFTER Transformation Slider */}
      <BeforeAfterSlider />

      {/* 6. Editorial Philosophy: More Than Outfits / It's a Feeling */}
      <EmotionalBanner />

      {/* 7. Look Packs & Pricing */}
      <PricingSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Final Grand Invitation CTA */}
      <FinalCtaSection />
    </div>
  );
}

import { HomeHero } from "@/components/home/HomeHero";
import { HomeCta, HomeFeatures } from "@/components/home/HomeSections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeCta />
    </>
  );
}

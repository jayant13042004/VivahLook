/**
 * VivahLook — Structured prompt builder for photorealistic wedding outfit visualization.
 *
 * Modular architecture: occasion ambiance, outfit details, and style modifiers
 * are independently composable. Each section can be improved without affecting others.
 */

const IDENTITY_PRESERVATION = `Preserve the exact facial identity, natural skin tone, facial structure, eye color, hair color, hairstyle, and body proportions of the person in the reference photo. The generated image must look like the SAME person, not a different model. Maintain natural lighting on the face.`;

const QUALITY_DIRECTIVES = `Photorealistic, high-resolution portrait photography. Professional studio or venue lighting. Sharp focus on face and outfit details. Natural skin texture. Magazine-quality fashion photography aesthetic. No AI artifacts, no distorted hands or fingers, no unnatural poses.`;

const occasionAmbiance: Record<string, string> = {
  haldi: "Vibrant turmeric and marigold yellow setting. Warm sunlit outdoor ambiance. Fresh flower garlands and marigold decorations. Joyful, festive, and colorful Haldi ceremony atmosphere.",
  mehendi: "Rich emerald green and botanical garden setting. Intricate henna art celebration. Lush courtyard with jasmine and rose decorations. Warm evening lantern lighting.",
  sangeet: "Grand celebration hall with dramatic evening lighting. Deep jewel tones — royal purple, wine, and midnight blue ambiance. Festive dance and music night atmosphere with sparkle and mirror elements.",
  wedding: "Grand wedding mandap or heritage palace setting. Rich crimson, vermilion, and antique gold decor. Traditional floral garlands, diyas, and ceremonial elements. Sacred, majestic, regal atmosphere.",
  reception: "Elegant ballroom or modern venue with chandelier lighting. Sophisticated color palette — champagne, emerald, or midnight blue. Contemporary glamour with subtle sparkle.",
  guest: "Beautiful wedding venue as an attending guest. Tastefully decorated celebration setting. Elegant but not overpowering backdrop.",
};

const outfitDetails: Record<string, string> = {
  // Women
  lehenga: "Wearing a magnificent heavily embroidered bridal lehenga with intricate zardozi, sequin, and thread work. Matching embroidered choli (blouse) and flowing dupatta with golden border. Complementary bridal jewelry including maang tikka, necklace, bangles, and earrings.",
  saree: "Wearing an exquisite silk saree with rich pallu draping. Intricate golden zari border and woven motifs. Elegant blouse with embroidery. Traditional jewelry including necklace, jhumka earrings, and bangles. Perfect pleating and graceful drape.",
  anarkali: "Wearing a flowing floor-length Anarkali suit with heavy embroidery. Rich fabric with golden embellishments. Matching dupatta with embroidered border. Elegant jewelry and traditional styling.",
  sharara: "Wearing an embroidered sharara set with wide-legged flared pants. Ornate kurta top with detailed embroidery. Flowing dupatta. Festive and elegant styling with appropriate jewelry.",
  "indo-western-w": "Wearing a contemporary Indo-Western fusion outfit. Modern silhouette blending Indian embroidery with Western structure. Elegant and fashion-forward. Statement jewelry pieces.",
  // Men
  sherwani: "Wearing a magnificent royal sherwani with rich embroidery — zardozi, thread work, and subtle sequin detailing. Structured collar and long-line silhouette. Matching churidar or straight pants. Safa (turban) or styled hair. Mojari footwear. Wedding jewelry such as brooch or mala.",
  "kurta-pajama": "Wearing an elegant kurta pajama set. Rich fabric with subtle embroidery on collar, cuffs, and front placket. Matching churidar or straight-cut pajama. Nehru jacket or waistcoat optional. Clean, polished traditional look.",
  bandhgala: "Wearing a sharp, structured Jodhpuri bandhgala suit. Mandarin collar with clean lines. Premium fabric with subtle texture or tone-on-tone embroidery. Matching pocket square. Sophisticated and refined.",
  "indo-western-m": "Wearing a modern Indo-Western fusion outfit. Contemporary structured jacket with Indian embroidery details over tailored trousers. Fashion-forward and stylish.",
  "dhoti-kurta": "Wearing a traditional dhoti kurta. Rich silk fabric with golden border on dhoti. Elegant kurta with subtle embroidery. Traditional styling with authentic draping.",
};

const styleModifiers: Record<string, string> = {
  royal: "Royal heritage aesthetic. Rich jewel tones — deep crimson, emerald, royal blue, antique gold. Heavy traditional embroidery. Opulent and majestic presence. Regal posture and expression.",
  modern: "Contemporary and sleek styling. Clean lines and modern color palette. Minimalist embroidery with structured silhouettes. Fresh and fashion-forward.",
  traditional: "Timeless classic Indian wedding styling. Authentic traditional colors and embroidery patterns. Heritage craftsmanship. Dignified and culturally rooted.",
  minimal: "Clean, understated beauty. Soft, muted tones. Subtle embroidery. Elegant simplicity. Less-is-more approach with high-quality fabric focus.",
  luxury: "Ultra-premium, couture-level detailing. Hand-embroidered zardozi and crystal work. Luxurious fabrics — raw silk, velvet, organza. Designer-quality presentation.",
  pastel: "Soft, ethereal pastel color palette. Powder pink, lavender, mint, peach, or soft gold. Delicate embroidery. Dreamy, romantic, and gentle aesthetic.",
};

export function buildWeddingLookPrompt(input: {
  gender: string;
  occasionId: string;
  outfitId: string;
  styleId: string;
}): string {
  const { gender, occasionId, outfitId, styleId } = input;

  const occasion = occasionAmbiance[occasionId] ?? occasionAmbiance.wedding;
  const outfit = outfitDetails[outfitId] ?? "Wearing a beautiful Indian wedding outfit with traditional embroidery.";
  const style = styleModifiers[styleId] ?? styleModifiers.traditional;
  const genderLabel = gender === "women" ? "woman" : "man";

  return [
    `Generate a photorealistic full-body portrait of the ${genderLabel} from the reference photo in a stunning Indian wedding outfit.`,
    "",
    "IDENTITY PRESERVATION (CRITICAL):",
    IDENTITY_PRESERVATION,
    "",
    "OUTFIT:",
    outfit,
    "",
    "STYLE:",
    style,
    "",
    "SETTING & AMBIANCE:",
    occasion,
    "",
    "QUALITY:",
    QUALITY_DIRECTIVES,
  ].join("\n");
}

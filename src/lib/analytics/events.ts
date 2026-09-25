/**
 * VivahLook — Product Event Analytics & Telemetry.
 *
 * Tracks user progression through the Virtual Try-On and Shopping funnel.
 * Integrates seamlessly with internal logs, Supabase analytics, Plausible, or Google Analytics.
 */

export type VivahLookEventName =
  | "photo_uploaded"
  | "occasion_selected"
  | "outfit_selected"
  | "style_selected"
  | "generation_started"
  | "generation_completed"
  | "generation_failed"
  | "look_saved"
  | "look_downloaded"
  | "look_shared"
  | "shop_look_clicked"
  | "product_clicked"
  | "purchase_started"
  | "payment_completed";

export type EventPayloads = {
  photo_uploaded: { sizeBytes: number; mimeType: string };
  occasion_selected: { occasionId: string };
  outfit_selected: { outfitId: string; gender: string };
  style_selected: { styleId: string };
  generation_started: { occasionId: string; outfitId: string; styleId: string; isTrial: boolean };
  generation_completed: { occasionId: string; outfitId: string; durationMs: number; provider: string };
  generation_failed: { occasionId: string; outfitId: string; error: string };
  look_saved: { lookId?: string; occasionId: string; outfitId: string };
  look_downloaded: { occasionId: string; outfitId: string };
  look_shared: { occasionId: string; outfitId: string; method: "native" | "clipboard" };
  shop_look_clicked: { outfitId: string };
  product_clicked: { productId: string; productName: string; retailer: string; priceINR: number };
  purchase_started: { productId: string; amountINR: number };
  payment_completed: { orderId: string; paymentId: string; amountINR: number; looksGranted: number };
};

/**
 * Dispatch product events across client analytics sinks.
 */
export function trackProductEvent<T extends VivahLookEventName>(
  name: T,
  properties?: EventPayloads[T],
): void {
  if (typeof window === "undefined") return;

  try {
    // 1. Console debug trace in development
    if (process.env.NODE_ENV !== "production") {
      console.log(`[VivahLook Analytics] ${name}`, properties ?? {});
    }

    // 2. Window Plausible custom event
    const win = window as unknown as {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
      gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    };

    if (typeof win.plausible === "function") {
      win.plausible(name, { props: properties as Record<string, unknown> });
    }

    // 3. Google Analytics (gtag)
    if (typeof win.gtag === "function") {
      win.gtag("event", name, properties as Record<string, unknown>);
    }
  } catch (err) {
    // Silent fail to avoid disrupting user experience
    console.warn(`[VivahLook Analytics Error] ${name}:`, err);
  }
}

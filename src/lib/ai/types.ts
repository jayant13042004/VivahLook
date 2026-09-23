/**
 * VivahLook AI generation types.
 */

export type WeddingLookRequest = {
  /** Base64-encoded user photo */
  imageBase64: string;
  /** MIME type of the image */
  mimeType: string;
  /** User's selected gender */
  gender: "women" | "men";
  /** Selected occasion ID */
  occasionId: string;
  /** Selected outfit ID */
  outfitId: string;
  /** Selected style ID */
  styleId: string;
};

export type WeddingLookResponse = {
  /** Whether the generation was successful */
  success: boolean;
  /** Base64-encoded generated image (if successful) */
  imageBase64?: string;
  /** Public URL of the generated image (if stored) */
  imageUrl?: string;
  /** Error message (if failed) */
  error?: string;
  /** Generation metadata */
  metadata?: {
    occasionId: string;
    outfitId: string;
    styleId: string;
    gender: string;
    executionTimeMs: number;
  };
};

export interface AIProvider {
  name: string;
  generate(request: WeddingLookRequest): Promise<WeddingLookResponse>;
}

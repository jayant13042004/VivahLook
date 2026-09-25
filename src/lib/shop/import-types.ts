/**
 * VivahLook — External Product Import & Browser Extension Contract.
 *
 * Architecture definition for accepting product URLs from Amazon.in, Myntra,
 * Ajio, or designer stores, extracting apparel attributes, and piping them
 * into the VivahLook Virtual Try-On Engine.
 */

export type ExternalRetailer =
  | "amazon"
  | "myntra"
  | "ajio"
  | "nykaa_fashion"
  | "tata_cliq"
  | "other";

export type ProductImportRequest = {
  /** Clean product URL from external marketplace */
  productUrl: string;
  /** Primary product image URL extracted from listing */
  productImageUrl?: string;
  /** Raw product title or extracted brand name */
  productName: string;
  /** Retailer domain / source */
  retailer: ExternalRetailer;
  /** Inferred apparel category */
  category?: "sherwani" | "lehenga" | "saree" | "kurta" | "bandhgala" | "tuxedo" | "jewelry" | "accessories";
  /** Inferred occasion */
  suggestedOccasion?: "haldi" | "mehendi" | "sangeet" | "wedding" | "reception" | "guest";
  /** Extracted price in INR */
  priceINR?: number;
  /** Optional affiliate click tag */
  affiliateTag?: string;
};

export type ProductImportResult = {
  success: boolean;
  importedProduct?: ProductImportRequest;
  /** Pre-configured try-on parameters ready for StudioWizard */
  studioPrefill?: {
    occasionId: string;
    outfitId: string;
    styleId: string;
    suggestedGender: "women" | "men";
  };
  error?: string;
};

/**
 * Interface for future marketplace scrapers / browser extension importers.
 */
export interface ProductImportService {
  parseUrl(url: string): Promise<ProductImportResult>;
  validateSupportedRetailer(url: string): boolean;
}

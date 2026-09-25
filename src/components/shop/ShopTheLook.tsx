"use client";

import { useEffect } from "react";
import { getProductsForOutfit, type ShoppableProduct } from "@/config/shop";
import { formatINR } from "@/config/payments";
import { trackProductEvent } from "@/lib/analytics/events";

type ShopTheLookProps = {
  outfitId: string;
  className?: string;
  onProductClick?: (product: ShoppableProduct) => void;
};

export function ShopTheLook({ outfitId, className = "", onProductClick }: ShopTheLookProps) {
  const products = getProductsForOutfit(outfitId);

  useEffect(() => {
    if (products.length > 0) {
      trackProductEvent("shop_look_clicked", { outfitId });
    }
  }, [outfitId, products.length]);

  if (products.length === 0) return null;

  const handleProductSelect = (product: ShoppableProduct) => {
    trackProductEvent("product_clicked", {
      productId: product.id,
      productName: product.name,
      retailer: product.retailer.name,
      priceINR: product.priceINR,
    });
    onProductClick?.(product);
  };

  return (
    <section className={`mt-10 pt-8 border-t border-border/80 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            Curated Wardrobe
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mt-0.5">
            Recreate This Wedding Look
          </h3>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs sm:text-right">
          Discover matching attire, safas, jewelry, and footwear from premier fashion destinations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between p-4 rounded-2xl bg-surface border border-border/80 hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            {/* Top Image & Badge */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-muted border border-border/60">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-foreground border border-border/60 shadow-2xs">
                {item.retailer.name}
              </span>
            </div>

            {/* Product Meta */}
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wide">
                {item.category.replace("_", " ")}
              </p>
              <h4 className="text-sm font-semibold text-foreground line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                {item.name}
              </h4>
            </div>

            {/* Price & Action */}
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-foreground">
                  {formatINR(item.priceINR * 100)}
                </span>
                {item.originalPriceINR && (
                  <span className="ml-1.5 text-xs text-muted-foreground line-through">
                    {formatINR(item.originalPriceINR * 100)}
                  </span>
                )}
              </div>

              {item.url && item.url !== "#" ? (
                <a
                  href={item.affiliateUrl || item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleProductSelect(item)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Shop</span>
                  <span className="text-[10px]">↗</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleProductSelect(item)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-muted/60 text-foreground text-xs font-medium hover:bg-muted transition-colors"
                >
                  <span>View Details</span>
                  <span className="text-[10px]">→</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

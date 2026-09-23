"use client";

import { useCallback } from "react";
import { getOccasionById, getOutfitById, getStyleById } from "@/config/wedding";

type Props = {
  originalImageBase64: string;
  resultImageBase64: string;
  occasionId: string;
  outfitId: string;
  styleId: string;
  onTryAnother: () => void;
  onStartNew: () => void;
};

export function ResultViewer({
  resultImageBase64,
  occasionId,
  outfitId,
  styleId,
  onTryAnother,
  onStartNew,
}: Props) {
  const occasion = getOccasionById(occasionId);
  const outfit = getOutfitById(outfitId);
  const style = getStyleById(styleId);

  const handleDownload = useCallback(() => {
    if (!resultImageBase64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${resultImageBase64}`;
    link.download = `vivahlook-${occasion?.label ?? "wedding"}-${outfit?.label ?? "look"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resultImageBase64, occasion, outfit]);

  const handleShare = useCallback(async () => {
    if (!resultImageBase64) return;

    try {
      // Try native Web Share API first
      if (navigator.share) {
        const blob = await fetch(`data:image/png;base64,${resultImageBase64}`).then((r) => r.blob());
        const file = new File([blob], "vivahlook-wedding-look.png", { type: "image/png" });
        await navigator.share({
          title: "My VivahLook Wedding Look",
          text: `Check out my ${occasion?.label ?? "wedding"} look in a ${outfit?.label ?? "beautiful outfit"}! Created with VivahLook.`,
          files: [file],
        });
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.origin);
        alert("Link copied to clipboard!");
      }
    } catch {
      // User cancelled share or API not available
    }
  }, [resultImageBase64, occasion, outfit]);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      {/* Result image */}
      <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border border-border">
        {resultImageBase64 ? (
          <img
            src={`data:image/png;base64,${resultImageBase64}`}
            alt={`${occasion?.label ?? "Wedding"} look in ${outfit?.label ?? "outfit"}`}
            className="w-full aspect-[3/4] object-cover"
          />
        ) : (
          <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image generated</p>
          </div>
        )}
      </div>

      {/* Metadata pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {occasion && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm text-foreground">
            {occasion.emoji} {occasion.label}
          </span>
        )}
        {outfit && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-foreground">
            {outfit.label}
          </span>
        )}
        {style && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-foreground">
            {style.label}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
        <button
          onClick={handleDownload}
          className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          ↓ Download
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          ↗ Share
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-3 max-w-md mx-auto">
        <button
          onClick={onTryAnother}
          className="flex-1 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors text-sm"
        >
          Try Another Look
        </button>
        <button
          onClick={onStartNew}
          className="flex-1 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors text-sm"
        >
          New Photo
        </button>
      </div>

      {/* Branding */}
      <p className="text-center text-xs text-muted-foreground/50 mt-8">
        Created with VivahLook
      </p>
    </div>
  );
}

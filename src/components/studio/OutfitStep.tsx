"use client";

import { useState } from "react";
import { getOutfitsByGender, type Gender } from "@/config/wedding";
import { getOutfitsByOccasion, type OutfitTemplate } from "@/config/catalog";

type Props = {
  occasionId?: string;
  onSelect: (outfitId: string, gender: Gender) => void;
};

export function OutfitStep({ occasionId, onSelect }: Props) {
  const [gender, setGender] = useState<Gender>("women");

  // Occasion-specific curated templates from the new data-driven catalog
  const curatedTemplates: OutfitTemplate[] = occasionId
    ? getOutfitsByOccasion(occasionId, gender)
    : [];

  // General categories
  const generalOutfits = getOutfitsByGender(gender);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          Choose Your Outfit
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Select from curated wedding styles or classic silhouettes
        </p>
      </div>

      {/* Gender toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full border border-border bg-surface p-1 shadow-sm">
          <button
            onClick={() => setGender("women")}
            className={`px-7 py-2 rounded-full text-sm font-semibold transition-all ${
              gender === "women"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setGender("men")}
            className={`px-7 py-2 rounded-full text-sm font-semibold transition-all ${
              gender === "men"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Men
          </button>
        </div>
      </div>

      {/* Curated Occasion Outfits (if available for selected occasion) */}
      {curatedTemplates.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
              Curated For This Ceremony
            </h3>
            <span className="text-[11px] text-muted-foreground">
              {curatedTemplates.length} styles available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {curatedTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template.id, gender)}
                className="group flex flex-col justify-between p-4 rounded-2xl border border-border/80 bg-surface hover:border-primary/60 hover:shadow-md transition-all duration-200 text-left"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {template.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                      {template.style}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Color swatches */}
                {template.colors.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground/80">Palette:</span>
                    <div className="flex gap-1">
                      {template.colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Classic Silhouettes */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">
          Classic Silhouettes
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {generalOutfits.map((outfit) => (
            <button
              key={outfit.id}
              onClick={() => onSelect(outfit.id, gender)}
              className="group flex flex-col items-start gap-1.5 p-4 rounded-2xl border border-border/80 bg-surface hover:border-primary/50 hover:shadow-sm transition-all duration-200 text-left"
            >
              <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {outfit.label}
              </span>
              <span className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                {outfit.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

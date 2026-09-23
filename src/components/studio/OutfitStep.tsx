"use client";

import { useState } from "react";
import { getOutfitsByGender, type Gender } from "@/config/wedding";

type Props = {
  onSelect: (outfitId: string, gender: Gender) => void;
};

export function OutfitStep({ onSelect }: Props) {
  const [gender, setGender] = useState<Gender>("women");
  const outfits = getOutfitsByGender(gender);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Choose Your Outfit
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Select your outfit style
        </p>
      </div>

      {/* Gender toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl border border-border bg-surface p-1">
          <button
            onClick={() => setGender("women")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              gender === "women"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setGender("men")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              gender === "men"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Men
          </button>
        </div>
      </div>

      {/* Outfit grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {outfits.map((outfit) => (
          <button
            key={outfit.id}
            onClick={() => onSelect(outfit.id, gender)}
            className="group flex flex-col items-start gap-2 p-5 rounded-2xl border border-border bg-surface hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left"
          >
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {outfit.label}
            </span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              {outfit.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

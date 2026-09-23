"use client";

import { occasions } from "@/config/wedding";

type Props = {
  onSelect: (occasionId: string) => void;
};

export function OccasionStep({ onSelect }: Props) {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Choose Your Occasion
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          What wedding event are you dressing for?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {occasions.map((occasion) => (
          <button
            key={occasion.id}
            onClick={() => onSelect(occasion.id)}
            className="group relative flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-surface hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl">{occasion.emoji}</span>
            <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
              {occasion.label}
            </span>
            <span className="text-xs text-muted-foreground">{occasion.subtitle}</span>
            <div className="flex gap-1 mt-1">
              {occasion.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

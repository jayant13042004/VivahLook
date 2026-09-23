"use client";

import { styles } from "@/config/wedding";

type Props = {
  onSelect: (styleId: string) => void;
};

export function StyleStep({ onSelect }: Props) {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Choose Your Style
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          How do you want your look to feel?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className="group flex flex-col items-start gap-2 p-5 rounded-2xl border border-border bg-surface hover:border-primary/50 hover:shadow-md transition-all duration-200 text-left"
          >
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {style.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {style.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

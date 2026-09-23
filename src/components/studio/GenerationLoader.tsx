"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  "Preparing your photo...",
  "Crafting your wedding look...",
  "Styling your outfit...",
  "Adding finishing touches...",
  "Almost ready...",
];

export function GenerationLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 min-h-[60vh]">
      {/* Animated spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-muted" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
      </div>

      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
        Creating Your Wedding Look
      </h3>

      <p className="text-sm text-muted-foreground animate-pulse-soft text-center">
        {MESSAGES[messageIndex]}
      </p>

      <p className="mt-8 text-xs text-muted-foreground/60">
        This may take up to a minute
      </p>
    </div>
  );
}

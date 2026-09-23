"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  "Preparing your photo...",
  "Selecting the best AI model...",
  "Crafting your wedding look...",
  "Draping your chosen outfit...",
  "Styling the details...",
  "Adding finishing touches...",
  "Polishing your look...",
  "Almost there...",
];

export function GenerationLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3500);
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

      <p className="mt-8 text-xs text-muted-foreground/60 text-center max-w-xs">
        This may take up to 2 minutes — we automatically try multiple AI models to get you the best result.
      </p>
    </div>
  );
}

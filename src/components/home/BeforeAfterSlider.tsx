"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

export function BeforeAfterSlider() {
  // Slider position from 0 to 100%
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove],
  );

  const featurePillars = [
    {
      title: "Same You",
      subtitle: "100% facial identity & skin tone preservation",
      emoji: "👤",
    },
    {
      title: "Realistic Results",
      subtitle: "Natural fabric drape, zardozi embroidery & lighting",
      emoji: "✨",
    },
    {
      title: "Multiple Styles",
      subtitle: "From royal heritage red to modern pastel lehengas",
      emoji: "🎨",
    },
    {
      title: "HD Downloads",
      subtitle: "High-resolution photos for WhatsApp & family sharing",
      emoji: "📥",
    },
    {
      title: "Private & Secure",
      subtitle: "Photos processed safely and never sold or trained on",
      emoji: "🔒",
    },
  ];

  return (
    <section id="transformation" className="py-20 lg:py-32 bg-muted/30 border-y border-border/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Value Prop (3.5 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-3">
              Real Looks. Real You.
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Try Before <br />
              <span className="font-editorial-italic font-normal text-primary">You Buy</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              See how different outfits, colors, and silhouettes look on you with AI-powered realistic try-ons. Make confident choices for your big day without the showroom fatigue.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/studio"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:opacity-95 transition-all shadow-md hover:shadow-lg"
              >
                <span>Try VivahLook Free</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Handwritten Script Callout with Arrow */}
            <div className="mt-8 pt-4 flex items-center gap-2 text-accent">
              <span className="font-editorial-italic text-2xl text-accent font-medium">
                Same You, New Possibilities
              </span>
              <span className="text-xl">↗</span>
            </div>
          </div>

          {/* Middle Column — Interactive Centerpiece Before/After Slider (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-border/80 select-none cursor-ew-resize bg-surface"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={handleClick}
            >
              {/* "After" Image (Background - Transformed Bride) */}
              <img
                src="/images/editorial/after_bride.jpg"
                alt="After: Royal bride in crimson zardozi lehenga and jewelry"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* "Before" Image (Foreground with Clip Path - Natural Photo) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="/images/editorial/before_girl.jpg"
                  alt="Before: Natural portrait photo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/20">
                  Before
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/20">
                  After
                </span>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Circular Scrubbing Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-primary border-2 border-primary shadow-xl flex items-center justify-center text-xs font-bold pointer-events-auto">
                  <span>◂ ▸</span>
                </div>
              </div>

              {/* Helper Drag Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-medium tracking-wide">
                  Drag slider to compare
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — 5 Luxury Feature Pillars (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {featurePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface border border-border/80 shadow-sm flex items-start gap-3.5 hover:border-primary/40 transition-colors"
              >
                <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-base shrink-0">
                  {pillar.emoji}
                </span>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-foreground">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

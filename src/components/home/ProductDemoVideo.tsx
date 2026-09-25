"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const PRODUCT_STEPS = [
  { step: 1, label: "Upload Photo", detail: "Selfie or portrait" },
  { step: 2, label: "Select Occasion", detail: "Haldi to Reception" },
  { step: 3, label: "Choose Outfit", detail: "Curated wedding styles" },
  { step: 4, label: "Select Style", detail: "Royal, modern or pastel" },
  { step: 5, label: "AI Generate", detail: "Preserves your identity" },
  { step: 6, label: "View Transformation", detail: "High-res photorealism" },
  { step: 7, label: "Shop The Look", detail: "Matching pieces & jewelry" },
];

type ProductDemoVideoProps = {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
};

export function ProductDemoVideo({
  videoSrc = "/videos/vivahlook-demo.mp4",
  posterSrc = "/images/editorial/banner_couple.jpg",
  className = "",
}: ProductDemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="demo-video" className={`py-16 sm:py-24 bg-surface/50 border-y border-border/70 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-2">
            The VivahLook Experience
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Watch How It <span className="font-editorial-italic font-normal text-primary">Works</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            See the 30-second transformation — from a single natural photo to royal bridal couture and shoppable wardrobe pieces.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-border/90 shadow-2xl bg-black">
          {/* Main HTML5 Video Element */}
          <div className="relative aspect-video w-full bg-black/90 flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <track kind="captions" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Overlay Play Button when Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group transition-all"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center pl-1 shadow-2xl group-hover:scale-105 group-hover:bg-primary transition-all">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-100/90 drop-shadow-md">
                  Preview Virtual Try-On Flow (0:30)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 7-Step Product Journey Timeline */}
        <div className="mt-12 max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            The 7-Step Journey
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {PRODUCT_STEPS.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                className={`flex flex-col p-3 rounded-2xl border text-left transition-all ${
                  activeStep === s.step
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border/70 bg-surface hover:border-border"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </span>
                  <span className="text-[11px] font-bold text-foreground truncate">
                    {s.label}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {s.detail}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:opacity-95 transition-all shadow-md hover:shadow-lg"
          >
            <span>Try Your Look Free</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { faqContent } from "@/content/pages";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted/20 border-t border-border/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-2">
            Questions & Answers
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Frequently Asked <span className="font-editorial-italic font-normal text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqContent.items.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-border/80 bg-surface transition-all overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none text-left">
                <span className="font-display font-bold text-base sm:text-lg text-foreground pr-4 group-hover:text-primary transition-colors">
                  {item.question}
                </span>
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-sm font-semibold text-muted-foreground group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground group-open:border-primary transition-all shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

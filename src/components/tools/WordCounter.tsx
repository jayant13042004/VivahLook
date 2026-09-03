"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/Label";

function countStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const sentences = trimmed ? trimmed.split(/[.!?]+/).filter((part) => part.trim()).length : 0;
  return { words, characters, sentences };
}

/** Example tool widget — copy this pattern for other calculators. */
export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);

  return (
    <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      <Label htmlFor="word-counter-input">Text</Label>
      <textarea
        id="word-counter-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={8}
        placeholder="Paste or type text…"
        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
      <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
        {(
          [
            ["Words", stats.words],
            ["Characters", stats.characters],
            ["Sentences", stats.sentences],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

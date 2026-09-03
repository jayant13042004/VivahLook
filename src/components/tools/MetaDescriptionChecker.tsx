"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/Label";

const TARGET_MIN = 150;
const TARGET_MAX = 160;

/** Second sample widget using the same tool-page template. */
export function MetaDescriptionChecker() {
  const [text, setText] = useState("");
  const length = text.length;
  const inRange = length >= TARGET_MIN && length <= TARGET_MAX;

  const status = useMemo(() => {
    if (length === 0) return "Start typing a candidate description.";
    if (length < TARGET_MIN) return `${TARGET_MIN - length} characters under the typical range.`;
    if (length > TARGET_MAX) return `${length - TARGET_MAX} characters over the typical range.`;
    return "Within a common 150–160 character target.";
  }, [length]);

  return (
    <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      <Label htmlFor="meta-description-input">Meta description</Label>
      <textarea
        id="meta-description-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        maxLength={320}
        placeholder="Write a search snippet…"
        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        <span className={inRange ? "font-medium text-success" : "font-medium text-foreground"}>
          {length}
        </span>{" "}
        characters. {status}
      </p>
    </div>
  );
}

import { cn } from "@/lib/utils";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

/** Readable long-form text block for legal and content pages. */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground",
        "[&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_p]:mt-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

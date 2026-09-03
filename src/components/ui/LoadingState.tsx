import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
  /** Use full-page centered layout (route loading.tsx). */
  fullPage?: boolean;
};

/** Reusable loading UI for route transitions and async sections. */
export function LoadingState({
  label = "Loading…",
  className,
  fullPage = false,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-muted-foreground",
        fullPage ? "min-h-[50vh] py-24" : "py-12",
        className,
      )}
    >
      <span className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-border" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-[spin_0.8s_linear_infinite]" />
      </span>
      <p className="text-sm font-medium">{label}</p>
      <span className="sr-only">{label}</span>
    </div>
  );
}

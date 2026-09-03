"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  message?: string;
  reset?: () => void;
  homeHref?: string;
  className?: string;
  fullPage?: boolean;
};

/** Reusable error UI for error.tsx boundaries and inline failures. */
export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Try again, or return home.",
  reset,
  homeHref = "/",
  className,
  fullPage = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex w-full max-w-lg flex-col items-start gap-4",
        fullPage ? "min-h-[50vh] justify-center py-24" : "py-12",
        className,
      )}
    >
      <p className="text-sm font-medium text-danger">Error</p>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">{message}</p>
      <div className="mt-2 flex flex-wrap gap-3">
        {reset ? (
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        ) : null}
        <Button href={homeHref} variant={reset ? "secondary" : "primary"}>
          Go home
        </Button>
      </div>
    </div>
  );
}

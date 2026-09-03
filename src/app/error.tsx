"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-4">
      <ErrorState
        fullPage
        title="Something went wrong"
        message="An unexpected error occurred while rendering this page."
        reset={reset}
      />
    </div>
  );
}

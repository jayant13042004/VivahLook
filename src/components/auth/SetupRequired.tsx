import { PageHeader } from "@/components/ui/PageHeader";
import { authContent } from "@/content/auth";

/** Shown when Supabase env vars are missing. */
export function SetupRequired() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
      <PageHeader
        title={authContent.setupRequired.title}
        description={authContent.setupRequired.description}
      />
    </div>
  );
}

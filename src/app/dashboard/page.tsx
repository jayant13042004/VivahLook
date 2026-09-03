import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { authContent } from "@/content/auth";
import { isAdminUser } from "@/lib/auth/admin";
import { requireProfile } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: authContent.dashboard.title,
  description: authContent.dashboard.description,
  path: "/dashboard",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <Section>
        <SetupRequired />
      </Section>
    );
  }

  const { user, profile } = await requireProfile();
  const displayName = profile.full_name ?? user.email ?? "there";
  const showAdmin = isAdminUser({ email: user.email, role: profile.role });

  return (
    <Section>
      <DashboardNav className="mb-8" showAdmin={showAdmin} />
      <PageHeader
        title={authContent.dashboard.title}
        description={authContent.dashboard.description}
      />

      <p className="mt-6 text-lg text-foreground">
        {authContent.dashboard.welcome}, {displayName}.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <article className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {authContent.dashboard.cards.profile.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {authContent.dashboard.cards.profile.description}
          </p>
          <Button href="/profile" variant="secondary" className="mt-4">
            {authContent.dashboard.cards.profile.action}
          </Button>
        </article>

        <article className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {authContent.dashboard.cards.account.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {authContent.dashboard.cards.account.description}
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">{user.email}</p>
        </article>

        <article className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {authContent.dashboard.cards.billing.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {authContent.dashboard.cards.billing.description}
          </p>
          <Button href="/billing" variant="secondary" className="mt-4">
            {authContent.dashboard.cards.billing.action}
          </Button>
        </article>

        {showAdmin ? (
          <article className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              {authContent.dashboard.cards.admin.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {authContent.dashboard.cards.admin.description}
            </p>
            <Button href="/admin" variant="secondary" className="mt-4">
              {authContent.dashboard.cards.admin.action}
            </Button>
          </article>
        ) : null}
      </div>
    </Section>
  );
}

import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { authContent } from "@/content/auth";
import { isAdminUser } from "@/lib/auth/admin";
import { requireProfile } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: authContent.profile.title,
  description: authContent.profile.description,
  path: "/profile",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  if (!isSupabaseConfigured()) {
    return (
      <Section>
        <SetupRequired />
      </Section>
    );
  }

  const { user, profile } = await requireProfile();
  const showAdmin = isAdminUser({ email: user.email, role: profile.role });

  return (
    <Section>
      <DashboardNav className="mb-8" showAdmin={showAdmin} />
      <PageHeader
        title={authContent.profile.title}
        description={authContent.profile.description}
      />
      <div className="mt-10 max-w-xl">
        <ProfileForm profile={profile} email={user.email ?? ""} />
      </div>
    </Section>
  );
}

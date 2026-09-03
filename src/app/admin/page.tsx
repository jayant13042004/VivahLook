import { notFound } from "next/navigation";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { modulesConfig } from "@/config/modules";
import { requireAdmin } from "@/lib/auth/session";
import { createServiceClient, isServiceRoleConfigured } from "@/lib/supabase/service";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SetupRequired } from "@/components/auth/SetupRequired";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin",
  description: "Admin user list.",
  path: "/admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!modulesConfig.admin) notFound();

  if (!isSupabaseConfigured()) {
    return (
      <Section>
        <SetupRequired />
      </Section>
    );
  }

  await requireAdmin();

  const users = isServiceRoleConfigured()
    ? await listProfiles()
    : [];

  return (
    <Section>
      <DashboardNav className="mb-8" showAdmin />
      <PageHeader
        title="Admin"
        description="Signed-in users. Grant admin with profiles.role = admin or ADMIN_EMAILS."
      />
      {!isServiceRoleConfigured() ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Add SUPABASE_SERVICE_ROLE_KEY to list all profiles.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-4 py-3">{user.email ?? "—"}</td>
                  <td className="px-4 py-3">{user.full_name ?? "—"}</td>
                  <td className="px-4 py-3">{user.role ?? "user"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

async function listProfiles() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("admin listProfiles:", error.message);
    return [];
  }

  return data ?? [];
}

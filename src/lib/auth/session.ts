import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

/** Current auth user, or null if signed out. */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Redirect to login when no session. Use on protected pages. */
export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/** Load the signed-in user's profile row. */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("getProfile:", error.message);
    return null;
  }

  return data;
}

/** Ensure a profile exists (e.g. users created before migration). */
async function ensureProfile(user: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): Promise<Profile | null> {
  const existing = await getProfile(user.id);
  if (existing) return existing;

  const supabase = await createClient();
  const metadata = user.user_metadata ?? {};
  const fullName =
    (typeof metadata.full_name === "string" && metadata.full_name) ||
    (typeof metadata.name === "string" && metadata.name) ||
    null;
  const avatarUrl =
    (typeof metadata.avatar_url === "string" && metadata.avatar_url) ||
    (typeof metadata.picture === "string" && metadata.picture) ||
    null;

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email: user.email ?? null,
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .select()
    .single();

  if (error) {
    console.error("ensureProfile:", error.message);
    return null;
  }

  return data;
}

/** Require user + profile for dashboard/profile pages. */
export async function requireProfile() {
  const user = await requireUser();
  const profile = await ensureProfile(user);

  if (!profile) {
    redirect("/login?error=profile-missing");
  }

  return { user, profile };
}

/** Require an admin (profiles.role or ADMIN_EMAILS). */
export async function requireAdmin() {
  const { user, profile } = await requireProfile();
  if (!isAdminUser({ email: user.email, role: profile.role })) {
    redirect("/dashboard");
  }
  return { user, profile };
}

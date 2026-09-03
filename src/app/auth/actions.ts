"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authConfig } from "@/config/auth";
import { siteConfig } from "@/config/site";
import { safeInternalPath } from "@/lib/auth/paths";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type AuthActionState = {
  error?: string;
  success?: string;
};

function authCallbackUrl(next?: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  const path = next ? `?next=${encodeURIComponent(next)}` : "";
  return `${base}/auth/callback${path}`;
}

export async function signInWithEmail(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? authConfig.redirects.afterLogin);

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect(safeInternalPath(next, authConfig.redirects.afterLogin));
}

export async function signUpWithEmail(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) {
    return { error: "All fields are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: authCallbackUrl(),
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(authConfig.redirects.afterSignup);
}

export async function signInWithOAuth(
  provider: "google" | "github",
  next?: string,
) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase-not-configured");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: authCallbackUrl(next),
    },
  });

  if (error || !data.url) {
    redirect(`/login?error=${provider}-sign-in-failed`);
  }

  redirect(data.url);
}

export async function signInWithGoogleAction(formData: FormData) {
  const next = String(formData.get("next") ?? "").trim() || undefined;
  await signInWithOAuth("google", next);
}

export async function signInWithGithubAction(formData: FormData) {
  const next = String(formData.get("next") ?? "").trim() || undefined;
  await signInWithOAuth("github", next);
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect(authConfig.redirects.afterLogout);
}

export async function updateProfile(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const fullName = String(formData.get("full_name") ?? "").trim();
  const avatarUrl = String(formData.get("avatar_url") ?? "").trim();

  if (!fullName) {
    return { error: "Full name is required." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl || null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/profile");

  return { success: "Profile updated." };
}

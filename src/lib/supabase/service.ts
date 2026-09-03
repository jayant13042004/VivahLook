import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function isServiceRoleConfigured() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return false;
  return !key.includes("your-service-role");
}

/** Server-only Supabase client. Never import this into Client Components. */
export function createServiceClient() {
  if (!isServiceRoleConfigured()) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Required for payment webhooks. See .env.example.",
    );
  }

  const { url } = getSupabaseEnv();
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

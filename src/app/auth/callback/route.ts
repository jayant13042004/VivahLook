import { NextResponse } from "next/server";
import { authConfig } from "@/config/auth";
import { safeInternalPath } from "@/lib/auth/paths";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/** OAuth / email-confirmation callback — exchanges code for session. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? authConfig.redirects.afterLogin;

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/login?error=supabase-not-configured`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const safeNext = safeInternalPath(next, authConfig.redirects.afterLogin);
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}

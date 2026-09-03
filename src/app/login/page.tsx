import { LoginForm } from "@/components/auth/LoginForm";
import { SetupRequired } from "@/components/auth/SetupRequired";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { authContent } from "@/content/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: authContent.login.title,
  description: authContent.login.description,
  path: "/login",
  noIndex: true,
});

const loginMessages: Record<string, string> = {
  "check-email": "Check your email to confirm your account, then sign in.",
  "supabase-not-configured": "Authentication is not configured yet.",
  "auth-callback-failed": "Sign-in failed. Please try again.",
  "google-sign-in-failed": "Google sign-in failed. Please try again.",
  "github-sign-in-failed": "GitHub sign-in failed. Please try again.",
  "profile-missing": "Profile not found. Run the Supabase migration and try again.",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    message?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const message = params.message
    ? loginMessages[params.message]
    : undefined;
  const error = params.error ? loginMessages[params.error] ?? params.error : undefined;

  return (
    <Section>
      <div className="mx-auto max-w-md">
        <PageHeader
          title={authContent.login.title}
          description={authContent.login.description}
        />
        <div className="mt-8">
          {isSupabaseConfigured() ? (
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <LoginForm
                next={params.next}
                message={message}
                error={error}
              />
            </div>
          ) : (
            <SetupRequired />
          )}
        </div>
      </div>
    </Section>
  );
}

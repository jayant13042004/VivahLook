import { SignUpForm } from "@/components/auth/SignUpForm";
import { SetupRequired } from "@/components/auth/SetupRequired";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { authContent } from "@/content/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: authContent.signup.title,
  description: authContent.signup.description,
  path: "/signup",
  noIndex: true,
});

export default function SignUpPage() {
  return (
    <Section>
      <div className="mx-auto max-w-md">
        <PageHeader
          title={authContent.signup.title}
          description={authContent.signup.description}
        />
        <div className="mt-8">
          {isSupabaseConfigured() ? (
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <SignUpForm />
            </div>
          ) : (
            <SetupRequired />
          )}
        </div>
      </div>
    </Section>
  );
}

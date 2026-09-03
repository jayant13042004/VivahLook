import { writeFile } from "../fs.ts";
import { hasAuth, hasOAuth, hasPayments, type ProjectConfig } from "../types.ts";

export function writeAuthSources(outDir: string, config: ProjectConfig) {
  if (!hasAuth(config)) return;
  writeAuthActions(outDir, config);
  writeOAuthButtons(outDir, config);
  writeLoginForm(outDir, config);
  writeSignUpForm(outDir, config);
  writeSession(outDir, config);
  writeDashboardNav(outDir, config);
  writeNavbarAuth(outDir, config);
  writeDashboardPage(outDir, config);
  writeProfilePage(outDir, config);
}

function writeAuthActions(outDir: string, config: ProjectConfig) {
  const emailFns = config.auth.email
    ? `
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
`
    : "";

  const oauthFns = hasOAuth(config)
    ? `
export async function signInWithOAuth(
  provider: ${oauthProviderType(config)},
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
    redirect(\`/login?error=\${provider}-sign-in-failed\`);
  }

  redirect(data.url);
}
${config.auth.google
      ? `
export async function signInWithGoogleAction(formData: FormData) {
  const next = String(formData.get("next") ?? "").trim() || undefined;
  await signInWithOAuth("google", next);
}
`
      : ""}${config.auth.github
      ? `
export async function signInWithGithubAction(formData: FormData) {
  const next = String(formData.get("next") ?? "").trim() || undefined;
  await signInWithOAuth("github", next);
}
`
      : ""}`
    : "";

  writeFile(
    outDir,
    "src/app/auth/actions.ts",
    `"use server";

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
  const base = siteConfig.url.replace(/\\/$/, "");
  const path = next ? \`?next=\${encodeURIComponent(next)}\` : "";
  return \`\${base}/auth/callback\${path}\`;
}
${emailFns}${oauthFns}
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
`,
  );
}

function oauthProviderType(config: ProjectConfig) {
  if (config.auth.google && config.auth.github) return `"google" | "github"`;
  if (config.auth.google) return `"google"`;
  return `"github"`;
}

function writeOAuthButtons(outDir: string, config: ProjectConfig) {
  if (!hasOAuth(config)) return;
  const imports = [
    config.auth.google ? "signInWithGoogleAction" : null,
    config.auth.github ? "signInWithGithubAction" : null,
  ].filter(Boolean);

  const google = config.auth.google
    ? `
      <form action={signInWithGoogleAction}>
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <Button type="submit" variant="secondary" className="w-full">
          {authContent.login.google}
        </Button>
      </form>`
    : "";
  const github = config.auth.github
    ? `
      <form action={signInWithGithubAction}>
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <Button type="submit" variant="secondary" className="w-full">
          {authContent.login.github}
        </Button>
      </form>`
    : "";

  writeFile(
    outDir,
    "src/components/auth/OAuthButtons.tsx",
    `import {
  ${imports.join(",\n  ")},
} from "@/app/auth/actions";
import { authContent } from "@/content/auth";
import { Button } from "@/components/ui/Button";

type OAuthButtonsProps = {
  next?: string;
};

export function OAuthButtons({ next }: OAuthButtonsProps) {
  return (
    <div className="space-y-3">${google}${github}
    </div>
  );
}
`,
  );
}

function writeLoginForm(outDir: string, config: ProjectConfig) {
  const oauthImport = hasOAuth(config)
    ? `import { OAuthButtons } from "@/components/auth/OAuthButtons";\n`
    : "";
  const emailImport = config.auth.email
    ? `import { signInWithEmail, type AuthActionState } from "@/app/auth/actions";\n`
    : "";

  const oauthBlock = hasOAuth(config) ? `\n      <OAuthButtons next={next} />\n` : "";
  const divider =
    hasOAuth(config) && config.auth.email
      ? `
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-muted-foreground">
            {authContent.login.or}
          </span>
        </div>
      </div>
`
      : "";

  const emailForm = config.auth.email
    ? `
      <form action={formAction} className="space-y-4">
        {next ? <input type="hidden" name="next" value={next} /> : null}

        <div>
          <Label htmlFor="email">{authContent.login.emailLabel}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">{authContent.login.passwordLabel}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : authContent.login.submit}
        </Button>
      </form>
`
    : "";

  const signupLink = config.auth.email
    ? `
      <p className="text-center text-sm text-muted-foreground">
        {authContent.login.noAccount}{" "}
        <Link href="/signup" className="font-medium text-foreground hover:underline">
          {authContent.login.signUpLink}
        </Link>
      </p>`
    : hasOAuth(config)
      ? `
      <p className="text-center text-sm text-muted-foreground">
        {authContent.login.noAccount}{" "}
        <Link href="/signup" className="font-medium text-foreground hover:underline">
          {authContent.login.signUpLink}
        </Link>
      </p>`
      : "";

  const hooks = config.auth.email
    ? `
  const [state, formAction, pending] = useActionState(
    signInWithEmail,
    initialState,
  );

  const error = state.error ?? urlError;`
    : `
  const error = urlError;`;

  const clientImports = config.auth.email
    ? `import Link from "next/link";
import { useActionState } from "react";
`
    : `import Link from "next/link";
`;

  writeFile(
    outDir,
    "src/components/auth/LoginForm.tsx",
    `"use client";

${clientImports}${emailImport}${oauthImport}${config.auth.email ? `import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
` : ""}import { authContent } from "@/content/auth";

${config.auth.email ? "const initialState: AuthActionState = {};" : ""}

type LoginFormProps = {
  next?: string;
  message?: string;
  error?: string;
};

export function LoginForm({ next, message, error: urlError }: LoginFormProps) {${hooks}

  return (
    <div className="space-y-6">
      {message ? (
        <p className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
          {message}
        </p>
      ) : null}
${oauthBlock}${divider}${emailForm}${signupLink}
    </div>
  );
}
`,
  );
}

function writeSignUpForm(outDir: string, config: ProjectConfig) {
  const oauthImport = hasOAuth(config)
    ? `import { OAuthButtons } from "@/components/auth/OAuthButtons";\n`
    : "";
  const emailImport = config.auth.email
    ? `import { signUpWithEmail, type AuthActionState } from "@/app/auth/actions";\n`
    : "";

  const oauthBlock = hasOAuth(config) ? `\n      <OAuthButtons />\n` : "";
  const divider =
    hasOAuth(config) && config.auth.email
      ? `
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-muted-foreground">
            {authContent.signup.or}
          </span>
        </div>
      </div>
`
      : "";

  const form = config.auth.email
    ? `
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="full_name">{authContent.signup.nameLabel}</Label>
          <Input
            id="full_name"
            name="full_name"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">{authContent.signup.emailLabel}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">{authContent.signup.passwordLabel}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {authContent.signup.passwordHint}
          </p>
        </div>

        {state.error ? (
          <p className="text-sm text-danger" role="alert">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account…" : authContent.signup.submit}
        </Button>
      </form>
`
    : "";

  const hooks = config.auth.email
    ? `
  const [state, formAction, pending] = useActionState(
    signUpWithEmail,
    initialState,
  );`
    : "";

  const clientImports = config.auth.email
    ? `import Link from "next/link";
import { useActionState } from "react";
`
    : `import Link from "next/link";
`;

  writeFile(
    outDir,
    "src/components/auth/SignUpForm.tsx",
    `"use client";

${clientImports}${emailImport}${oauthImport}${config.auth.email ? `import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
` : ""}import { authContent } from "@/content/auth";

${config.auth.email ? "const initialState: AuthActionState = {};" : ""}

export function SignUpForm() {${hooks}

  return (
    <div className="space-y-6">${oauthBlock}${divider}${form}
      <p className="text-center text-sm text-muted-foreground">
        {authContent.signup.hasAccount}{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          {authContent.signup.signInLink}
        </Link>
      </p>
    </div>
  );
}
`,
  );
}

function writeSession(outDir: string, config: ProjectConfig) {
  const adminImport = config.admin
    ? `import { isAdminUser } from "@/lib/auth/admin";\n`
    : "";
  const requireAdmin = config.admin
    ? `
/** Require an admin (profiles.role or ADMIN_EMAILS). */
export async function requireAdmin() {
  const { user, profile } = await requireProfile();
  if (!isAdminUser({ email: user.email, role: profile.role })) {
    redirect("/dashboard");
  }
  return { user, profile };
}
`
    : "";

  writeFile(
    outDir,
    "src/lib/auth/session.ts",
    `import { redirect } from "next/navigation";
${adminImport}import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

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

export async function requireProfile() {
  const user = await requireUser();
  const profile = await ensureProfile(user);

  if (!profile) {
    redirect("/login?error=profile-missing");
  }

  return { user, profile };
}
${requireAdmin}`,
  );
}

function writeDashboardNav(outDir: string, config: ProjectConfig) {
  const links = [
    `{ href: "/dashboard", label: "Dashboard" }`,
    `{ href: "/profile", label: "Profile" }`,
  ];
  if (hasPayments(config)) links.push(`{ href: "/billing", label: "Billing" }`);

  const adminSpread = config.admin
    ? `,
    ...(showAdmin ? [{ href: "/admin", label: "Admin" }] : [])`
    : "";

  writeFile(
    outDir,
    "src/components/layout/DashboardNav.tsx",
    `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type DashboardNavProps = {
  className?: string;
  ${config.admin ? "showAdmin?: boolean;" : ""}
};

export function DashboardNav({ className${config.admin ? ", showAdmin" : ""} }: DashboardNavProps) {
  const pathname = usePathname();
  const links = [
    ${links.join(",\n    ")}${adminSpread},
  ];

  return (
    <nav
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Account"
    >
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "border-border bg-muted text-foreground"
                : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
`,
  );
}

function writeNavbarAuth(outDir: string, config: ProjectConfig) {
  const billingLink = hasPayments(config)
    ? `
      <Link
        href="/billing"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Billing
      </Link>`
    : "";

  writeFile(
    outDir,
    "src/components/auth/NavbarAuth.tsx",
    `"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/Button";

const emptySubscribe = () => () => {};

function useClientReady() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function useAuthUser() {
  const ready = useClientReady();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!ready || !isSupabaseConfigured()) return;

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [ready]);

  return { ready, user };
}

export function NavbarAuth() {
  const { ready, user } = useAuthUser();

  if (!ready) {
    return <span className="hidden h-9 w-16 rounded-md bg-muted sm:block" />;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!user) {
    return (
      <Button href="/login" variant="secondary" size="sm" className="hidden sm:inline-flex">
        Sign in
      </Button>
    );
  }

  return (
    <div className="hidden items-center gap-1 sm:flex">
      <Button href="/dashboard" variant="ghost" size="sm">
        Dashboard
      </Button>
      <SignOutButton />
    </div>
  );
}

export function MobileNavbarAuth({ onNavigate }: { onNavigate: () => void }) {
  const { ready, user } = useAuthUser();

  if (!ready || !isSupabaseConfigured()) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Sign in
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href="/profile"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Profile
      </Link>${billingLink}
      <div className="px-3 py-2">
        <SignOutButton />
      </div>
    </>
  );
}
`,
  );
}

function writeDashboardPage(outDir: string, config: ProjectConfig) {
  const adminImport = config.admin
    ? `import { isAdminUser } from "@/lib/auth/admin";\n`
    : "";
  const showAdmin = config.admin
    ? `  const showAdmin = isAdminUser({ email: user.email, role: profile.role });\n`
    : `  const showAdmin = false;\n`;

  const billingCard = hasPayments(config)
    ? `
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
`
    : "";

  const adminCard = config.admin
    ? `
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
`
    : "";

  writeFile(
    outDir,
    "src/app/dashboard/page.tsx",
    `import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { authContent } from "@/content/auth";
${adminImport}import { requireProfile } from "@/lib/auth/session";
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
${config.admin ? showAdmin : ""}
  return (
    <Section>
      <DashboardNav className="mb-8"${config.admin ? " showAdmin={showAdmin}" : ""} />
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
${billingCard}${adminCard}
      </div>
    </Section>
  );
}
`,
  );
}

function writeProfilePage(outDir: string, config: ProjectConfig) {
  const adminImport = config.admin
    ? `import { isAdminUser } from "@/lib/auth/admin";\n`
    : "";
  const showAdmin = config.admin
    ? `  const showAdmin = isAdminUser({ email: user.email, role: profile.role });\n`
    : `  const showAdmin = false;\n`;

  writeFile(
    outDir,
    "src/app/profile/page.tsx",
    `import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { authContent } from "@/content/auth";
${adminImport}import { requireProfile } from "@/lib/auth/session";
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
${config.admin ? showAdmin : ""}
  return (
    <Section>
      <DashboardNav className="mb-8"${config.admin ? " showAdmin={showAdmin}" : ""} />
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
`,
  );
}

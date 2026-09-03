/**
 * Auth page copy — login, signup, dashboard, profile.
 */

export const authContent = {
  login: {
    title: "Sign in",
    description: "Access your dashboard and manage your account.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submit: "Sign in",
    noAccount: "Don't have an account?",
    signUpLink: "Create one",
    google: "Continue with Google",
    github: "Continue with GitHub",
    or: "or",
  },
  signup: {
    title: "Create account",
    description: "Get started with your personal dashboard.",
    nameLabel: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    submit: "Create account",
    hasAccount: "Already have an account?",
    signInLink: "Sign in",
    google: "Continue with Google",
    github: "Continue with GitHub",
    or: "or",
    passwordHint: "Use at least 8 characters.",
  },
  dashboard: {
    title: "Dashboard",
    description: "Your account overview.",
    welcome: "Welcome back",
    cards: {
      profile: {
        title: "Profile",
        description: "Update your name and account details.",
        action: "Edit profile",
      },
      account: {
        title: "Account",
        description: "Signed in with Supabase authentication.",
      },
      billing: {
        title: "Billing",
        description: "One-time payments, subscriptions, and payment status.",
        action: "View billing",
      },
      admin: {
        title: "Admin",
        description: "View users. Restricted to admins.",
        action: "Open admin",
      },
    },
  },
  profile: {
    title: "Profile",
    description: "Manage your personal information.",
    nameLabel: "Full name",
    emailLabel: "Email",
    emailHint: "Email is managed by your sign-in provider and cannot be changed here.",
    avatarLabel: "Avatar URL",
    avatarHint: "Optional image URL for your profile.",
    submit: "Save changes",
    success: "Profile updated.",
  },
  setupRequired: {
    title: "Supabase not configured",
    description:
      "Add your Supabase URL and anon key to .env.local, then run the profiles migration. See DOCUMENTATION.md.",
  },
} as const;

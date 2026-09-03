/**
 * Auth configuration — redirects and route guards.
 * Provider setup (Google, email) is done in the Supabase dashboard.
 */

export const authConfig = {
  /** Routes that require a signed-in user. */
  protectedRoutes: ["/dashboard", "/profile", "/billing", "/admin"] as const,

  /** Auth pages — signed-in users are redirected away. */
  guestOnlyRoutes: ["/login", "/signup"] as const,

  redirects: {
    afterLogin: "/dashboard",
    afterLogout: "/",
    afterSignup: "/login?message=check-email",
  },
} as const;

export type ProtectedRoute = (typeof authConfig.protectedRoutes)[number];

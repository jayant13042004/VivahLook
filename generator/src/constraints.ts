import { hasAuth, hasPayments, type ProjectConfig } from "./types.ts";

/** Apply real module dependencies. Auth/payments/admin require Supabase. */
export function applyConstraints(config: ProjectConfig): ProjectConfig {
  const notes = [...config.notes];
  const next: ProjectConfig = { ...config, auth: { ...config.auth }, payments: { ...config.payments } };

  if (next.admin && !hasAuth(next)) {
    next.auth.email = true;
    notes.push("Admin requires authentication; email auth was enabled.");
  }

  if (hasPayments(next) && !hasAuth(next)) {
    next.auth.email = true;
    notes.push("Payments require authentication; email auth was enabled.");
  }

  if (hasAuth(next) || hasPayments(next) || next.admin) {
    if (!next.supabase) {
      next.supabase = true;
      notes.push("Auth, payments, and admin use Supabase; the Supabase client was included.");
    }
  }

  if (next.mongodb && hasAuth(next)) {
    notes.push(
      "MongoDB is an extra product data store. Auth and payments still use Supabase.",
    );
  }

  next.notes = notes;
  return next;
}

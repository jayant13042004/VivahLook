import { modulesConfig } from "@/config/modules";

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(input: {
  email?: string | null;
  role?: string | null;
}) {
  if (!modulesConfig.admin) return false;
  if (input.role === "admin") return true;
  const email = input.email?.toLowerCase();
  if (!email) return false;
  return getAdminEmails().includes(email);
}

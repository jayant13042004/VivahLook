/** Prevent open redirects after login (e.g. `//evil.com`). */
export function safeInternalPath(
  path: string | null | undefined,
  fallback: string,
): string {
  if (!path) return fallback;
  if (!path.startsWith("/")) return fallback;
  if (path.startsWith("//") || path.startsWith("/\\")) return fallback;
  if (path.includes("://")) return fallback;
  return path;
}

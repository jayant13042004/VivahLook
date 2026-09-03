import { OAuthButtons } from "@/components/auth/OAuthButtons";

/** @deprecated Use OAuthButtons. Kept so older imports keep working. */
export function GoogleAuthButton({ next }: { next?: string }) {
  return <OAuthButtons next={next} />;
}

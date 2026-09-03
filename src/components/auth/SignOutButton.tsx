import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";

/** Sign out via server action. */
export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="ghost" size="sm">
        Sign out
      </Button>
    </form>
  );
}

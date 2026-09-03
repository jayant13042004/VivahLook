import {
  signInWithGithubAction,
  signInWithGoogleAction,
} from "@/app/auth/actions";
import { modulesConfig } from "@/config/modules";
import { authContent } from "@/content/auth";
import { Button } from "@/components/ui/Button";

type OAuthButtonsProps = {
  next?: string;
};

/** Google (always) + optional GitHub. Enable GitHub in Supabase Auth providers. */
export function OAuthButtons({ next }: OAuthButtonsProps) {
  return (
    <div className="space-y-3">
      <form action={signInWithGoogleAction}>
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <Button type="submit" variant="secondary" className="w-full">
          {authContent.login.google}
        </Button>
      </form>
      {modulesConfig.githubAuth ? (
        <form action={signInWithGithubAction}>
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <Button type="submit" variant="secondary" className="w-full">
            {authContent.login.github}
          </Button>
        </form>
      ) : null}
    </div>
  );
}

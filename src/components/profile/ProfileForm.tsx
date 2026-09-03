"use client";

import { useActionState } from "react";
import { updateProfile, type AuthActionState } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { authContent } from "@/content/auth";
import type { Profile } from "@/types/database";

const initialState: AuthActionState = {};

type ProfileFormProps = {
  profile: Profile;
  email: string;
};

/** Edit profile name and avatar URL. */
export function ProfileForm({ profile, email }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-lg border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <Label htmlFor="full_name">{authContent.profile.nameLabel}</Label>
        <Input
          id="full_name"
          name="full_name"
          defaultValue={profile.full_name ?? ""}
          autoComplete="name"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">{authContent.profile.emailLabel}</Label>
        <Input id="email" name="email" value={email} disabled readOnly />
        <p className="mt-2 text-xs text-muted-foreground">
          {authContent.profile.emailHint}
        </p>
      </div>

      <div>
        <Label htmlFor="avatar_url">{authContent.profile.avatarLabel}</Label>
        <Input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={profile.avatar_url ?? ""}
          placeholder="https://"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {authContent.profile.avatarHint}
        </p>
      </div>

      {state.error ? (
        <p className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-success" role="status">
          {authContent.profile.success}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : authContent.profile.submit}
      </Button>
    </form>
  );
}

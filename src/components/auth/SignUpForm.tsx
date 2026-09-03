"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpWithEmail, type AuthActionState } from "@/app/auth/actions";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { authContent } from "@/content/auth";

const initialState: AuthActionState = {};

/** Email sign-up form. */
export function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    signUpWithEmail,
    initialState,
  );

  return (
    <div className="space-y-6">
      <OAuthButtons />

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

      <p className="text-center text-sm text-muted-foreground">
        {authContent.signup.hasAccount}{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          {authContent.signup.signInLink}
        </Link>
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithEmail, type AuthActionState } from "@/app/auth/actions";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { authContent } from "@/content/auth";

const initialState: AuthActionState = {};

type LoginFormProps = {
  next?: string;
  message?: string;
  error?: string;
};

/** Email + password login form. */
export function LoginForm({ next, message, error: urlError }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    signInWithEmail,
    initialState,
  );

  const error = state.error ?? urlError;

  return (
    <div className="space-y-6">
      {message ? (
        <p className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
          {message}
        </p>
      ) : null}

      <OAuthButtons next={next} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-muted-foreground">
            {authContent.login.or}
          </span>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        {next ? <input type="hidden" name="next" value={next} /> : null}

        <div>
          <Label htmlFor="email">{authContent.login.emailLabel}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">{authContent.login.passwordLabel}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : authContent.login.submit}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {authContent.login.noAccount}{" "}
        <Link href="/signup" className="font-medium text-foreground hover:underline">
          {authContent.login.signUpLink}
        </Link>
      </p>
    </div>
  );
}

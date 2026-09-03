"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactActionState } from "@/app/contact/actions";
import { contactContent } from "@/content/pages";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

const initialState: ContactActionState = {};

/** Contact form — sends email when Resend is configured. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  if (state.success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-surface p-6 sm:p-8"
      >
        <p className="text-sm font-medium text-primary">
          {state.delivered ? "Sent" : "Received"}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold text-foreground">
          {contactContent.successTitle}
        </h2>
        <p className="mt-3 text-muted-foreground">{state.success}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-lg border border-border bg-surface p-6 sm:p-8"
      noValidate
    >
      <Field id="name" label={contactContent.fields.name.label}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder={contactContent.fields.name.placeholder}
        />
      </Field>
      <Field id="email" label={contactContent.fields.email.label}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={contactContent.fields.email.placeholder}
        />
      </Field>
      <Field id="message" label={contactContent.fields.message.label}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={contactContent.fields.message.placeholder}
          className={cn(
            "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-shadow resize-y",
            "placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
          )}
        />
      </Field>
      {state.error ? (
        <p className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : contactContent.submitLabel}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

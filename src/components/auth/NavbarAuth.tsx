"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/Button";

const emptySubscribe = () => () => {};

function useClientReady() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function useAuthUser() {
  const ready = useClientReady();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!ready || !isSupabaseConfigured()) return;

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [ready]);

  return { ready, user };
}

/** Navbar auth controls — login link or dashboard + sign out. */
export function NavbarAuth() {
  const { ready, user } = useAuthUser();

  if (!ready) {
    return <span className="hidden h-9 w-16 rounded-md bg-muted sm:block" />;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!user) {
    return (
      <Button href="/login" variant="secondary" size="sm" className="hidden sm:inline-flex">
        Sign in
      </Button>
    );
  }

  return (
    <div className="hidden items-center gap-1 sm:flex">
      <Button href="/dashboard" variant="ghost" size="sm">
        Dashboard
      </Button>
      <SignOutButton />
    </div>
  );
}

/** Mobile auth links for the slide-out menu. */
export function MobileNavbarAuth({ onNavigate }: { onNavigate: () => void }) {
  const { ready, user } = useAuthUser();

  if (!ready || !isSupabaseConfigured()) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Sign in
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Dashboard
      </Link>
      <Link
        href="/profile"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Profile
      </Link>
      <Link
        href="/billing"
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      >
        Billing
      </Link>
      <div className="px-3 py-2">
        <SignOutButton />
      </div>
    </>
  );
}

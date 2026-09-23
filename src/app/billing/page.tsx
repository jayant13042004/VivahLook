import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { PricingCards } from "@/components/payments/PricingCards";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { isAdminUser } from "@/lib/auth/admin";
import { requireProfile } from "@/lib/auth/session";
import { isRazorpayConfigured } from "@/lib/payments/env";
import {
  formatMoney,
  listMyPayments,
  statusLabel,
} from "@/lib/payments/repository";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Look Packs & Billing — VivahLook",
  description: "Purchase VivahLook credit packs to generate more high-definition wedding outfits.",
  path: "/billing",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type BillingPageProps = {
  searchParams: Promise<{ checkout?: string }>;
};

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const { checkout } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <Section>
        <SetupRequired />
      </Section>
    );
  }

  const { user, profile } = await requireProfile();
  const showAdmin = isAdminUser({ email: user.email, role: profile.role });
  const payments = await listMyPayments(user.id);

  const banner =
    checkout === "success"
      ? "Payment received! Your look credits have been added."
      : checkout === "canceled"
        ? "Checkout was canceled. You have not been charged."
        : null;

  return (
    <Section>
      <DashboardNav className="mb-8" showAdmin={showAdmin} />
      <PageHeader
        title="VivahLook Packs"
        description="Choose a pack to unlock more wedding outfits, HD downloads, and all ceremonies."
      />

      {banner ? (
        <p className="mt-6 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-sm">
          {banner}
        </p>
      ) : null}

      {isRazorpayConfigured() ? (
        <PricingCards />
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Razorpay Setup Required</p>
          <p>
            Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local` to enable secure UPI and Card checkout.
          </p>
        </div>
      )}

      <div className="mt-14">
        <h2 className="font-display text-xl font-bold text-foreground">
          Payment History
        </h2>
        {payments.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No payments recorded yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {payment.product_id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.provider.toUpperCase()} · {new Date(payment.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {formatMoney(payment.amount, payment.currency)} · {statusLabel(payment.status)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}

import { SetupRequired } from "@/components/auth/SetupRequired";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { PricingCards } from "@/components/payments/PricingCards";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getDefaultPaymentProvider } from "@/config/payments";
import { paymentsContent } from "@/content/payments";
import { isAdminUser } from "@/lib/auth/admin";
import { requireProfile } from "@/lib/auth/session";
import { isPaymentsConfigured } from "@/lib/payments/env";
import {
  formatMoney,
  getMySubscription,
  getStripeCustomerId,
  listMyPayments,
  statusLabel,
} from "@/lib/payments/repository";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isServiceRoleConfigured } from "@/lib/supabase/service";
import { buildMetadata } from "@/lib/seo";
import { openStripePortal } from "@/app/billing/actions";

export const metadata = buildMetadata({
  title: paymentsContent.billing.title,
  description: paymentsContent.billing.description,
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
  const [payments, subscription, stripeCustomerId] = await Promise.all([
    listMyPayments(user.id),
    getMySubscription(user.id),
    isServiceRoleConfigured() ? getStripeCustomerId(user.id) : Promise.resolve(null),
  ]);

  const banner =
    checkout === "success"
      ? paymentsContent.billing.checkoutSuccess
      : checkout === "canceled"
        ? paymentsContent.billing.checkoutCanceled
        : null;

  return (
    <Section>
      <DashboardNav className="mb-8" showAdmin={showAdmin} />
      <PageHeader
        title={paymentsContent.billing.title}
        description={paymentsContent.billing.description}
      />

      {banner ? (
        <p className="mt-6 rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
          {banner}
        </p>
      ) : null}

      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          {paymentsContent.billing.currentPlan}
        </h2>
        {subscription ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {subscription.product_id} · {statusLabel(subscription.status)}
            {subscription.current_period_end
              ? ` · renews ${new Date(subscription.current_period_end).toLocaleDateString()}`
              : ""}
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            {paymentsContent.billing.noSubscription}
          </p>
        )}
        {stripeCustomerId ? (
          <form action={openStripePortal} className="mt-4">
            <Button type="submit" variant="secondary" size="sm">
              {paymentsContent.billing.manageStripe}
            </Button>
          </form>
        ) : null}
      </div>

      {isPaymentsConfigured() ? (
        <PricingCards defaultProvider={getDefaultPaymentProvider()} />
      ) : (
        <p className="mt-10 rounded-lg border border-border bg-surface p-6 text-sm text-muted-foreground">
          {paymentsContent.billing.setupDescription}
        </p>
      )}

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {paymentsContent.billing.history}
        </h2>
        {payments.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {paymentsContent.billing.emptyHistory}
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
                    {payment.product_id} · {payment.kind.replace("_", " ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.provider} · {new Date(payment.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-foreground">
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

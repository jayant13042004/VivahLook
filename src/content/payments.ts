export const paymentsContent = {
  billing: {
    title: "Billing",
    description: "Buy a one-time product or start a subscription.",
    currentPlan: "Current subscription",
    noSubscription: "No active subscription.",
    history: "Payment history",
    emptyHistory: "No payments yet.",
    manageStripe: "Manage subscription",
    setupTitle: "Payments not configured",
    setupDescription:
      "Add Stripe and/or Razorpay keys to .env.local, run the payments migration, and set SUPABASE_SERVICE_ROLE_KEY. See DOCUMENTATION.md.",
    checkoutSuccess: "Checkout submitted. Status updates when the provider confirms payment.",
    checkoutCanceled: "Checkout was canceled. You have not been charged.",
  },
  dashboard: {
    title: "Billing",
    description: "One-time payments, subscriptions, and payment status.",
    action: "View billing",
  },
} as const;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startCheckout } from "@/app/billing/actions";
import { Button } from "@/components/ui/Button";
import type { PaymentProviderId } from "@/config/payments";
import type { RazorpayCheckoutPayload } from "@/lib/payments/razorpay";

type CheckoutButtonProps = {
  productId: string;
  provider: PaymentProviderId;
  label: string;
  disabled?: boolean;
};

export function CheckoutButton({
  productId,
  provider,
  label,
  disabled,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    setPending(true);
    try {
      const result = await startCheckout(productId, provider);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      if (result.type === "redirect") {
        window.location.assign(result.url);
        return;
      }
      await openRazorpay(result.checkout, () => {
        router.push("/billing?checkout=success");
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={onClick} disabled={disabled || pending} className="w-full">
        {pending ? "Starting checkout…" : label}
      </Button>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

async function loadRazorpayScript() {
  if (window.Razorpay) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
    document.body.appendChild(script);
  });
}

async function openRazorpay(
  checkout: RazorpayCheckoutPayload,
  onSuccess: () => void,
) {
  await loadRazorpayScript();
  const RazorpayCheckout = window.Razorpay;
  if (!RazorpayCheckout) {
    throw new Error("Razorpay checkout is unavailable.");
  }

  await new Promise<void>((resolve, reject) => {
    const instance = new RazorpayCheckout({
      key: checkout.keyId,
      amount: checkout.amount,
      currency: checkout.currency,
      name: checkout.name,
      description: checkout.description,
      order_id: checkout.orderId,
      subscription_id: checkout.subscriptionId,
      handler: async (response) => {
        const verify = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            paymentRecordId: checkout.paymentRecordId,
          }),
        });
        if (!verify.ok) {
          reject(new Error("Payment verification failed."));
          return;
        }
        onSuccess();
        resolve();
      },
      modal: {
        ondismiss: () => resolve(),
      },
    });
    instance.open();
  });
}

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id?: string;
      subscription_id?: string;
      handler: (response: Record<string, string>) => void;
      modal?: { ondismiss: () => void };
    }) => { open: () => void };
  }
}

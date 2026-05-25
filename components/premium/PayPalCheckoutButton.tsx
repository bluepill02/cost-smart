"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { PREMIUM_CONFIG } from "@/lib/premium-config";
import { useProStatus } from "@/lib/hooks/useProStatus";

interface PayPalCheckoutButtonProps {
  planType?: "monthly" | "yearly";
}

export default function PayPalCheckoutButton({ planType = "monthly" }: PayPalCheckoutButtonProps) {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approvedSubId, setApprovedSubId] = useState<string | null>(null);
  const { setSubscriptionId } = useProStatus();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const planId = planType === "yearly"
    ? PREMIUM_CONFIG.plans.proYearly.planId
    : PREMIUM_CONFIG.plans.proMonthly.planId;

  if (!clientId) {
    return <p className="text-sm text-slate-500">Payment not configured</p>;
  }

  if (paid) {
    return (
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
        <p className="text-sm font-semibold text-emerald-700">
          Subscription activated! Welcome to CostSmart Pro.
        </p>
        <p className="text-xs text-emerald-600 mt-1">
          You will receive a confirmation email from PayPal shortly.
        </p>
        {approvedSubId && (
          <p className="text-xs text-slate-500 mt-2">
            Subscription ID: {approvedSubId}
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button
          onClick={() => setError(null)}
          className="text-xs text-red-600 underline mt-1"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "subscription",
        vault: true,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "subscribe" }}
        createSubscription={(_data, actions) => {
          return actions.subscription.create({
            plan_id: planId,
          });
        }}
        onApprove={async (data) => {
          console.log("Subscription approved:", data.subscriptionID);
          if (data.subscriptionID) {
            setSubscriptionId(data.subscriptionID);
            setApprovedSubId(data.subscriptionID);
          }
          setPaid(true);
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          setError("Something went wrong with the payment. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
}

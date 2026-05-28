"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PayPalOneTimeButtonProps {
  amount?: string;
  description?: string;
  onPaymentComplete: (orderDetails: Record<string, unknown>) => void;
  onError?: (error: unknown) => void;
}

export default function PayPalOneTimeButton({
  amount = "7.00",
  description = "CostSmart Landed Cost Report",
  onPaymentComplete,
  onError,
}: PayPalOneTimeButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return <p className="text-sm text-slate-500">Payment not configured</p>;
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
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "USD",
                },
                description,
              },
            ],
            intent: "CAPTURE",
          });
        }}
        onApprove={async (_data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onPaymentComplete(details as unknown as Record<string, unknown>);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          setError("Something went wrong with the payment. Please try again.");
          if (onError) {
            onError(err);
          }
        }}
      />
    </PayPalScriptProvider>
  );
}

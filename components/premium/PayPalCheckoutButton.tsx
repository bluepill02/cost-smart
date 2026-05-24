"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalCheckoutButton() {
  const [paid, setPaid] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return <p className="text-sm text-slate-500">Payment not configured</p>;
  }

  if (paid) {
    return (
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
        <p className="text-sm font-semibold text-emerald-700">
          Payment successful! Welcome to Pro.
        </p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: { value: "4.99", currency_code: "USD" },
                description: "CostSmart Pro - Monthly",
              },
            ],
          });
        }}
        onApprove={async (_data, actions) => {
          const order = await actions.order?.capture();
          if (order?.status === "COMPLETED") {
            setPaid(true);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}

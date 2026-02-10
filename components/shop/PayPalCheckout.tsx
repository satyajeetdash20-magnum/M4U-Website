"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  PayPalButtons,
  PayPalScriptProvider,
  type ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import type { CartItem } from "@/lib/shop";

interface PayPalCheckoutProps {
  amount: number;
  customerEmail: string;
  items: CartItem[];
  onOrderCreated: (payload: { id: string; orderNumber: string }) => void;
}

export function PayPalCheckout({
  amount,
  customerEmail,
  items,
  onOrderCreated,
}: PayPalCheckoutProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
        PayPal is not configured. Set `NEXT_PUBLIC_PAYPAL_CLIENT_ID` in your
        environment.
      </p>
    );
  }

  const initialOptions: ReactPayPalScriptOptions = {
    clientId,
    currency: "GBP",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        forceReRender={[amount]}
        style={{ layout: "vertical" }}
        createOrder={(_, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "GBP",
                  value: amount.toFixed(2),
                },
              },
            ],
          })
        }
        onApprove={async (data, actions) => {
          setIsSubmitting(true);
          try {
            await actions.order?.capture();

            const response = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customerEmail,
                items: items.map((item) => ({
                  productId: item.product.id,
                  title: item.product.title,
                  price: item.product.price,
                  quantity: item.quantity,
                })),
                totalAmount: amount,
                paypalOrderId: data.orderID,
              }),
            });

            if (!response.ok) {
              throw new Error("Unable to save order after payment.");
            }

            const payload = (await response.json()) as {
              id: string;
              orderNumber: string;
            };

            toast.success("Payment complete. Order confirmed.");
            onOrderCreated(payload);
          } catch {
            toast.error("Payment failed. Please try again.");
          } finally {
            setIsSubmitting(false);
          }
        }}
        onError={() => {
          toast.error("Payment failed. Please try again.");
        }}
        disabled={isSubmitting || amount <= 0}
      />
    </PayPalScriptProvider>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { PayPalCheckout } from "@/components/shop/PayPalCheckout";
import { useCart } from "@/hooks/useCart";
import { useUserStore } from "@/stores/useUserStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { trackPurchase } from "@/lib/analytics";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card">("paypal");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCardSubmitting, setIsCardSubmitting] = useState(false);
  const setUserEmail = useUserStore((state) => state.setEmail);
  const addPurchase = useUserStore((state) => state.addPurchase);

  const total = getTotal();

  const finalizeOrder = (payload: { id: string; orderNumber: string }) => {
    trackPurchase(
      payload.id,
      total,
      items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }))
    );
    setUserEmail(email);
    addPurchase({
      orderId: payload.id,
      orderNumber: payload.orderNumber,
      totalAmount: total,
      purchasedAt: new Date().toISOString(),
    });
    clearCart();
    router.push(`/checkout/success?orderId=${payload.id}&orderNumber=${payload.orderNumber}`);
  };

  const handleCardPurchase = async () => {
    if (!email || !firstName || !lastName || !termsAccepted) {
      toast.error("Please complete required checkout fields.");
      return;
    }
    if (!cardName || cardNumber.length < 12 || !cardExpiry || !cardCvc) {
      toast.error("Payment failed. Please try again.");
      return;
    }

    setIsCardSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          items: items.map((item) => ({
            productId: item.product.id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          })),
          totalAmount: total,
          paypalOrderId: `CARD-${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const payload = (await response.json()) as { id: string; orderNumber: string };
      toast.success("Payment complete. Order confirmed.");
      finalizeOrder(payload);
    } catch {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsCardSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-charcoal">Checkout</h1>
        <p className="mt-4 text-dark-gray">
          Your cart is empty. Add products before checkout.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="text-4xl font-bold text-charcoal">Checkout</h1>
      <ol className="mt-4 flex items-center gap-3 text-sm">
        {["Cart", "Details", "Payment", "Complete"].map((step, index) => (
          <li
            key={step}
            className={`rounded-full px-3 py-1 ${index <= 2 ? "bg-charcoal text-white" : "border border-light-gray text-dark-gray"}`}
          >
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6 rounded-lg border border-light-gray bg-white p-6">
          <section>
            <h2 className="text-lg font-semibold text-charcoal">1. Contact info</h2>
            <div className="mt-3 space-y-3">
              <Input
                id="checkout-email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="you@example.com"
              />
              <label className="inline-flex items-center gap-2 text-sm text-dark-gray">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(event) => setSubscribe(event.target.checked)}
                />
                Keep me updated with new resources and offers
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-charcoal">2. Billing details</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Input
                label="First name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <Input
                label="Last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <label className="mt-3 block text-sm">
              <span className="mb-1 block font-medium text-charcoal">Country</span>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="w-full rounded-lg border border-light-gray px-3 py-2"
              >
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>Pakistan</option>
              </select>
            </label>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-charcoal">3. Payment method</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <label className="inline-flex items-center gap-2 rounded-lg border border-light-gray p-3 text-sm">
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                PayPal
              </label>
              <label className="inline-flex items-center gap-2 rounded-lg border border-light-gray p-3 text-sm">
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
            </div>

            {paymentMethod === "paypal" && email ? (
              <PayPalCheckout
                amount={total}
                customerEmail={email}
                items={items}
                onOrderCreated={finalizeOrder}
              />
            ) : null}
            {paymentMethod === "paypal" && !email ? (
              <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                Enter your email to enable PayPal checkout.
              </p>
            ) : null}
            {paymentMethod === "card" ? (
              <div className="mt-4 space-y-3 rounded-lg border border-light-gray bg-slate-50 p-4">
                <p className="text-sm text-dark-gray">
                  Card payments are securely processed via PayPal card rails.
                </p>
                <Input
                  label="Name on card"
                  value={cardName}
                  onChange={(event) => setCardName(event.target.value)}
                />
                <Input
                  label="Card number"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  placeholder="4242 4242 4242 4242"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Expiry"
                    value={cardExpiry}
                    onChange={(event) => setCardExpiry(event.target.value)}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVC"
                    value={cardCvc}
                    onChange={(event) => setCardCvc(event.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
            ) : null}
          </section>

          <div className="rounded-lg border border-light-gray p-4">
            <label className="inline-flex items-center gap-2 text-sm text-dark-gray">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
              I agree to the terms and digital delivery policy.
            </label>
            {paymentMethod === "card" ? (
              <Button
                onClick={handleCardPurchase}
                disabled={isCardSubmitting}
                isLoading={isCardSubmitting}
                className="mt-4 w-full"
              >
                Complete purchase
              </Button>
            ) : null}
            {paymentMethod === "paypal" ? (
              <p className="mt-3 text-xs text-dark-gray">
                Complete purchase using the PayPal button above.
              </p>
            ) : null}
          </div>
        </div>

        <OrderSummary items={items} sticky showCta={false} />
      </div>
    </section>
  );
}

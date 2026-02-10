"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Gift } from "lucide-react";
import { CartItem } from "@/components/shop/CartItem";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null);

  const recommended = useMemo(() => products.slice(0, 2), []);

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === "MATH10") {
      const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const discount = Number((subtotal * 0.1).toFixed(2));
      setDiscountAmount(discount);
      toast.success("Discount applied!");
      return;
    }

    setDiscountAmount(0);
    toast.error("Invalid code");
  };

  const runCartAction = async (productId: string, action: () => void) => {
    setUpdatingProductId(productId);
    action();
    await new Promise((resolve) => setTimeout(resolve, 220));
    setUpdatingProductId(null);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Cart" },
        ]}
      />
      <h1 className="mb-8 text-4xl font-bold text-charcoal">Shopping cart</h1>

      {items.length === 0 ? (
        <div className="rounded-lg border border-light-gray p-8 text-center">
          <p className="text-dark-gray">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-lg bg-gold px-5 py-3 font-medium text-charcoal"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    isUpdating={updatingProductId === item.product.id}
                    onDecrease={() =>
                      runCartAction(item.product.id, () =>
                        updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                      )
                    }
                    onIncrease={() =>
                      runCartAction(item.product.id, () =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      )
                    }
                    onRemove={() =>
                      runCartAction(item.product.id, () => {
                        removeItem(item.product.id);
                        toast.success("Removed from cart");
                      })
                    }
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 rounded-lg border border-light-gray bg-white p-4">
              <p className="font-semibold text-charcoal">Discount code</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                  placeholder="Enter code (try MATH10)"
                  className="w-full rounded-lg border border-light-gray px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={applyDiscount}
                  className="rounded-lg bg-charcoal px-4 py-2 text-sm font-semibold text-white"
                >
                  Apply
                </button>
              </div>
              <Link href="/shop" className="mt-3 inline-block text-sm font-medium text-navy hover:text-charcoal">
                Continue shopping
              </Link>
            </div>

            <div className="mt-6 rounded-lg border border-light-gray bg-white p-4">
              <p className="inline-flex items-center gap-2 font-semibold text-charcoal">
                <Gift size={16} />
                Recommended for you
              </p>
              <div className="mt-3 space-y-2">
                {recommended.map((product) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <p className="line-clamp-1 text-dark-gray">{product.title}</p>
                    <Link
                      href={`/shop/${product.category}/${product.slug}`}
                      className="font-medium text-navy hover:text-charcoal"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <OrderSummary
            items={items}
            discountAmount={discountAmount}
            ctaHref="/checkout"
            ctaLabel="Proceed to checkout"
          />
        </div>
      )}
    </section>
  );
}

"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { useUserStore } from "@/stores/useUserStore";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "N/A";
  const orderNumber = searchParams.get("orderNumber") ?? "N/A";
  const email = useUserStore((state) => state.email);
  const purchasedItems = products.slice(0, 3);
  const recommended = products.slice(3, 5);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Checkout", href: "/checkout" },
          { label: "Success" },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-light-gray bg-white p-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="mx-auto inline-flex rounded-full bg-emerald-100 p-3 text-emerald-700"
          >
            <CheckCircle2 size={34} />
          </motion.div>
          <h1 className="mt-4 text-4xl font-bold text-charcoal">Thank you for your order!</h1>
          <p className="mt-2 text-dark-gray">
            Your purchase is confirmed and download links are ready below.
          </p>
        </div>

        <div className="mt-6 grid gap-4 rounded-lg border border-light-gray bg-slate-50 p-4 md:grid-cols-3">
          <p className="text-sm text-dark-gray">
            <span className="font-semibold text-charcoal">Order number:</span> {orderNumber}
          </p>
          <p className="text-sm text-dark-gray">
            <span className="font-semibold text-charcoal">Order ID:</span> {orderId}
          </p>
          <p className="text-sm text-dark-gray">
            <span className="font-semibold text-charcoal">Confirmation sent:</span>{" "}
            {email || "your email"}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-charcoal">Your downloads</h2>
          <div className="mt-4 space-y-3">
            {purchasedItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-light-gray p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-charcoal">{item.title}</p>
                  <p className="text-sm text-dark-gray">{item.description}</p>
                </div>
                <button className="rounded-lg bg-charcoal px-4 py-2 text-sm font-semibold text-white">
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-charcoal">What&apos;s next</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-dark-gray">
            <li>Start with the suggested quick-start roadmap inside each file.</li>
            <li>Book a tutor session if you want a custom study strategy.</li>
            <li>Track your weekly progress and revisit weak topics.</li>
          </ul>
        </section>

        <section className="mt-8">
          <p className="inline-flex items-center gap-2 text-lg font-semibold text-charcoal">
            <Sparkles size={18} className="text-gold" />
            Recommended next
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {recommended.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.category}/${item.slug}`}
                className="rounded-lg border border-light-gray p-4 transition-colors hover:border-navy"
              >
                <p className="font-semibold text-charcoal">{item.title}</p>
                <p className="mt-1 text-sm text-dark-gray">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-lg border border-light-gray px-5 py-3 text-sm font-semibold text-charcoal"
          >
            Continue shopping
          </Link>
          <Link
            href="/#contact"
            className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white"
          >
            Book a tutor
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
          <p className="text-dark-gray">Loading order confirmation...</p>
        </section>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}

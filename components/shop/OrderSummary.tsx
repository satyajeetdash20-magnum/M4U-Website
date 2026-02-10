import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { CartItem } from "@/lib/shop";
import { formatCurrency } from "@/lib/shop";
import { Button } from "@/components/ui/Button";

interface OrderSummaryProps {
  items: CartItem[];
  discountAmount?: number;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  sticky?: boolean;
  showCta?: boolean;
}

export function OrderSummary({
  items,
  discountAmount = 0,
  ctaLabel = "Proceed to checkout",
  onCtaClick,
  ctaHref,
  sticky = true,
  showCta = true,
}: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);
  const ctaNode = ctaHref ? (
    <Link
      href={ctaHref}
      className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gold px-4 py-3 font-semibold text-charcoal transition-colors hover:bg-amber-500"
    >
      {ctaLabel}
    </Link>
  ) : (
    <Button onClick={onCtaClick} className="mt-5 w-full">
      {ctaLabel}
    </Button>
  );

  return (
    <aside className={`h-fit rounded-lg border border-light-gray bg-white p-6 ${sticky ? "lg:sticky lg:top-24" : ""}`}>
      <h2 className="text-xl font-semibold text-charcoal">Order summary</h2>
      <div className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-start justify-between gap-2 text-dark-gray">
            <span className="line-clamp-2">
              {item.product.title} x {item.quantity}
            </span>
            <span className="font-medium text-charcoal">
              {formatCurrency(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 border-t border-light-gray pt-4 text-sm">
        <div className="flex items-center justify-between text-dark-gray">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-dark-gray">
          <span>Discount</span>
          <span>-{formatCurrency(discountAmount)}</span>
        </div>
        <div className="flex items-center justify-between pt-1 text-base font-semibold text-charcoal">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {showCta ? ctaNode : null}

      <p className="mt-4 text-center text-xs text-dark-gray">Cards, PayPal, and PayPal Pay Later accepted</p>
      <div className="mt-3 rounded-lg border border-light-gray bg-slate-50 p-3 text-sm text-charcoal">
        <p className="inline-flex items-center gap-2 font-medium">
          <ShieldCheck size={16} />
          Secure checkout
        </p>
        <p className="mt-1 text-xs text-dark-gray">Encrypted payments and instant digital delivery after purchase.</p>
      </div>
    </aside>
  );
}

import { formatCurrency } from "@/lib/shop";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  large?: boolean;
}

export function PriceDisplay({ price, originalPrice, large = false }: PriceDisplayProps) {
  const savings =
    typeof originalPrice === "number" && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div className="flex items-end gap-2">
      <p className={large ? "text-3xl font-bold text-charcoal" : "text-xl font-semibold text-charcoal"}>
        {formatCurrency(price)}
      </p>
      {originalPrice ? (
        <p className="text-sm text-dark-gray line-through">{formatCurrency(originalPrice)}</p>
      ) : null}
      {savings ? (
        <span className="rounded-full bg-gold/20 px-2 py-1 text-xs font-semibold text-charcoal">
          Save {savings}%
        </span>
      ) : null}
    </div>
  );
}

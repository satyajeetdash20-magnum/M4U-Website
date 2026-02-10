import Link from "next/link";
import { SHOP_CATEGORIES, ShopCategory, getCategoryLabel } from "@/lib/shop";

export function CategoryLinks({ active }: { active?: ShopCategory }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !active
            ? "bg-charcoal text-white"
            : "border border-light-gray text-charcoal hover:bg-light-gray/20"
        }`}
      >
        All
      </Link>
      {SHOP_CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/shop/${category}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === category
              ? "bg-charcoal text-white"
              : "border border-light-gray text-charcoal hover:bg-light-gray/20"
          }`}
        >
          {getCategoryLabel(category)}
        </Link>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/lib/shop";
import { formatCurrency, getCategoryLabel } from "@/lib/shop";

interface CartItemProps {
  item: CartItemType;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
  isUpdating?: boolean;
}

export function CartItem({
  item,
  onDecrease,
  onIncrease,
  onRemove,
  isUpdating = false,
}: CartItemProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="rounded-lg border border-light-gray bg-white p-4"
      aria-busy={isUpdating}
    >
      <div className={`flex gap-4 ${isUpdating ? "opacity-70" : ""}`}>
        <Image
          src={item.product.image_url}
          alt={item.product.title}
          width={96}
          height={96}
          className="h-24 w-24 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-charcoal">{item.product.title}</p>
          <p className="mt-1 text-sm text-dark-gray">
            {getCategoryLabel(item.product.category)} | {item.product.product_type.replace("-", " ")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-lg border border-light-gray">
              <button
                type="button"
                onClick={onDecrease}
                className="p-2 text-charcoal transition-colors hover:bg-light-gray/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Decrease quantity"
                disabled={isUpdating}
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={onIncrease}
                className="p-2 text-charcoal transition-colors hover:bg-light-gray/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Increase quantity"
                disabled={isUpdating}
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 text-sm font-medium text-red-600 transition-colors hover:text-red-700"
              disabled={isUpdating}
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>
        <div className="text-right font-semibold text-charcoal">
          {formatCurrency(item.product.price * item.quantity)}
        </div>
      </div>
    </motion.article>
  );
}

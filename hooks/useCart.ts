"use client";

import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/useCartStore";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);
  const getItemCount = useCartStore((state) => state.getItemCount);

  return {
    items,
    addItem: (product: Product, quantity = 1) => addItem(product, quantity),
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };
}

"use client";

import { track } from "@vercel/analytics";

export function trackProductView(productId: string) {
  track("product_view", { productId });
}

export function trackAddToCart(productId: string, price: number) {
  track("add_to_cart", { productId, price });
}

export function trackPurchase(
  orderId: string,
  total: number,
  items: Array<{ productId: string; quantity: number; price: number }>
) {
  track("purchase", {
    orderId,
    total,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    itemsJson: JSON.stringify(items),
  });
}

export function trackDownload(resourceName: string) {
  track("free_resource_download", { resourceName });
}

import { Product, products } from "@/data/products";

export const SHOP_CATEGORIES = [
  "gcse",
  "a-level",
  "further-maths",
  "university",
] as const;

export type ShopCategory = (typeof SHOP_CATEGORIES)[number];

export interface CartItem {
  product: Product;
  quantity: number;
}

export function isValidCategory(value: string): value is ShopCategory {
  return SHOP_CATEGORIES.includes(value as ShopCategory);
}

export function getAllProducts() {
  return products;
}

export function getProductsByCategory(category: ShopCategory) {
  return products.filter((product) => product.category === category);
}

export function getProductByCategoryAndSlug(category: ShopCategory, slug: string) {
  return products.find(
    (product) => product.category === category && product.slug === slug
  );
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function getCategoryLabel(category: ShopCategory) {
  const labels: Record<ShopCategory, string> = {
    "a-level": "A-Level",
    "further-maths": "Further Maths",
    gcse: "GCSE",
    university: "University",
  };

  return labels[category];
}

import { products, type Product } from "@/data/products";
import { getSupabaseServerClient } from "@/lib/supabase";

interface ProductOverride {
  id: string;
  price: number;
  is_active: boolean;
}

async function getProductOverrides() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("products")
      .select("id, price, is_active");

    if (error) {
      return null;
    }

    return (data ?? []) as ProductOverride[];
  } catch {
    return null;
  }
}

export async function getCatalogProducts() {
  const overrides = await getProductOverrides();
  if (!overrides) {
    return products;
  }

  const overrideMap = new Map(overrides.map((override) => [override.id, override]));
  return products
    .filter((product) => overrideMap.get(product.id)?.is_active ?? true)
    .map((product) => {
      const override = overrideMap.get(product.id);
      if (!override) {
        return product;
      }

      return {
        ...product,
        price: Number(override.price),
      } satisfies Product;
    });
}

export async function getCatalogProductByCategoryAndSlug(
  category: Product["category"],
  slug: string
) {
  const catalog = await getCatalogProducts();
  return catalog.find(
    (product) => product.category === category && product.slug === slug
  );
}

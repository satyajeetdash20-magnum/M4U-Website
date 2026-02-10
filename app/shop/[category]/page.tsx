import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageClient } from "@/components/shop/CategoryPageClient";
import { categoryDescriptions } from "@/data/shopContent";
import { getCatalogProducts } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";
import { getCategoryLabel, isValidCategory } from "@/lib/shop";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  if (!isValidCategory(params.category)) {
    return buildMetadata({ path: "/shop" });
  }

  const categoryLabel = getCategoryLabel(params.category);
  const dynamicDescription =
    categoryDescriptions[params.category] ??
    `Browse ${categoryLabel} workbooks, predicted papers, and exam-focused revision products.`;

  return buildMetadata({
    title: `${categoryLabel} Math Resources | Workbooks & Past Papers | MentorSubhiMath`,
    description: dynamicDescription,
    keywords: [
      `${categoryLabel} math resources`,
      `${categoryLabel} workbooks`,
      `${categoryLabel} past papers`,
      `${categoryLabel} revision resources`,
    ],
    path: `/shop/${params.category}`,
  });
}

export default async function ShopCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!isValidCategory(params.category)) {
    notFound();
  }

  const catalogProducts = await getCatalogProducts();
  const categoryProducts = catalogProducts.filter(
    (product) => product.category === params.category
  );

  return (
    <CategoryPageClient
      category={params.category}
      description={categoryDescriptions[params.category]}
      products={categoryProducts}
    />
  );
}

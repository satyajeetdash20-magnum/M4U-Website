import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/seo/StructuredData";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { getCatalogProductByCategoryAndSlug, getCatalogProducts } from "@/lib/catalog";
import { getProductMetadata, toAbsoluteUrl } from "@/lib/seo";
import { getCategoryLabel, isValidCategory } from "@/lib/shop";

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  if (!isValidCategory(params.category)) {
    return {};
  }

  const product = await getCatalogProductByCategoryAndSlug(params.category, params.slug);
  if (!product) {
    return {};
  }

  return getProductMetadata(product);
}

export default async function ProductDetailPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  if (!isValidCategory(params.category)) {
    notFound();
  }

  const product = await getCatalogProductByCategoryAndSlug(
    params.category,
    params.slug
  );
  if (!product) {
    notFound();
  }

  const allProducts = await getCatalogProducts();
  const relatedProducts = allProducts
    .filter((item) => item.category === params.category && item.id !== product.id)
    .slice(0, 6);

  const productUrl = toAbsoluteUrl(`/shop/${product.category}/${product.slug}`);
  const imageUrl = toAbsoluteUrl(product.image_url);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: toAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: toAbsoluteUrl("/shop"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: getCategoryLabel(params.category),
        item: toAbsoluteUrl(`/shop/${params.category}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.long_description,
    image: [imageUrl],
    sku: product.id,
    category: getCategoryLabel(product.category),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.review_count,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "GBP",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Product",
      name: product.title,
    },
    ratingValue: product.rating,
    reviewCount: product.review_count,
    bestRating: 5,
    worstRating: 1,
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={productSchema} />
      <StructuredData data={reviewSchema} />
      <ProductDetailClient
        product={product}
        category={params.category}
        relatedProducts={relatedProducts}
      />
    </>
  );
}

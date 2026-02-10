"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { DifficultyBadge } from "@/components/shop/DifficultyBadge";
import { PriceDisplay } from "@/components/shop/PriceDisplay";
import { ReviewStars } from "@/components/shop/ReviewStars";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

export function ProductCard({ product }: { product: Product }) {
  const badgeLabel = product.is_bestseller
    ? "BESTSELLER"
    : product.is_new
      ? "NEW"
      : undefined;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <Card className="flex h-full flex-col overflow-hidden border border-light-gray">
        <div className="relative">
          <Image
            src={product.image_url}
            alt={product.title}
            width={700}
            height={400}
            className="h-48 w-full object-cover"
          />
          <div className="absolute left-3 top-3">
            <DifficultyBadge tier={product.difficulty_tier} labelOverride={badgeLabel} />
          </div>
        </div>

        <CardHeader className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-navy">
            {product.product_type.replace("-", " ")}
          </span>
          <CardTitle className="text-lg leading-tight">{product.title}</CardTitle>
          <ReviewStars rating={product.rating} reviewCount={product.review_count} />
        </CardHeader>

        <CardContent className="flex-1">
          <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-dark-gray">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <PriceDisplay price={product.price} originalPrice={product.original_price} />
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t-0 pt-0">
          <div className="grid w-full gap-2 sm:grid-cols-2">
            <Link
              href={`/shop/${product.category}/${product.slug}`}
              className="inline-flex items-center justify-center rounded-lg border border-light-gray px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-light-gray/20"
            >
              View details
            </Link>
            <AddToCartButton product={product} className="w-full" />
          </div>
          {product.sample_url ? (
            <Link
              href={product.sample_url}
              className="text-center text-sm font-medium text-navy transition-colors hover:text-charcoal"
            >
              Preview sample
            </Link>
          ) : null}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { categoryTestimonials, categoryTopics } from "@/data/shopContent";
import { getCategoryLabel, type ShopCategory } from "@/lib/shop";
import { ProductCard } from "@/components/shop/ProductCard";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";

interface CategoryPageClientProps {
  category: ShopCategory;
  description: string;
  products: Product[];
}

type SortOption = "featured" | "price-low" | "price-high" | "rating";

export function CategoryPageClient({
  category,
  description,
  products,
}: CategoryPageClientProps) {
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [productType, setProductType] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const topicMatch =
        topic === "all" ||
        product.title.toLowerCase().includes(topic.toLowerCase()) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(topic.toLowerCase())
        );
      const difficultyMatch =
        difficulty === "all" || product.difficulty_tier === difficulty;
      const typeMatch = productType === "all" || product.product_type === productType;
      return topicMatch && difficultyMatch && typeMatch;
    });

    if (sort === "price-low") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-high") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (sort === "rating") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }
    return filtered;
  }, [difficulty, productType, products, sort, topic]);

  const bundles = products
    .filter((product) => product.product_type === "bundle")
    .slice(0, 3);
  const testimonials = categoryTestimonials[category];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: getCategoryLabel(category) },
        ]}
      />

      <header className="mb-6">
        <h1 className="text-4xl font-bold text-charcoal">{getCategoryLabel(category)}</h1>
        <p className="mt-2 max-w-3xl text-dark-gray">{description}</p>
      </header>

      <div className="mb-8 grid gap-3 rounded-lg border border-light-gray bg-white p-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-charcoal">Topic</span>
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="w-full rounded-lg border border-light-gray px-3 py-2 text-sm"
          >
            <option value="all">All topics</option>
            {categoryTopics[category].map((topicOption) => (
              <option key={topicOption} value={topicOption}>
                {topicOption}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-charcoal">Difficulty</span>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="w-full rounded-lg border border-light-gray px-3 py-2 text-sm"
          >
            <option value="all">All tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-charcoal">Product type</span>
          <select
            value={productType}
            onChange={(event) => setProductType(event.target.value)}
            className="w-full rounded-lg border border-light-gray px-3 py-2 text-sm"
          >
            <option value="all">All products</option>
            <option value="workbook">Workbook</option>
            <option value="predicted-paper">Predicted Paper</option>
            <option value="video">Video</option>
            <option value="vault">Vault</option>
            <option value="bundle">Bundle</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-charcoal">Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="w-full rounded-lg border border-light-gray px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 ? (
        <p className="mt-4 rounded-lg border border-light-gray bg-slate-50 p-4 text-sm text-dark-gray">
          No products match these filters yet. Try a different topic, tier, or product type.
        </p>
      ) : null}

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-charcoal">Bundle offers</h2>
        <p className="mt-2 text-dark-gray">Save more with curated high-impact stacks.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(bundles.length > 0 ? bundles : filteredProducts.slice(0, 3)).map((bundle) => (
            <div key={bundle.id} className="rounded-lg border border-light-gray bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy">Bundle</p>
              <h3 className="mt-1 font-semibold text-charcoal">{bundle.title}</h3>
              <p className="mt-2 text-sm text-dark-gray">{bundle.description}</p>
              <p className="mt-4 text-xl font-semibold text-charcoal">GBP {bundle.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-charcoal">Student results</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-lg border border-light-gray bg-white p-5">
              <p className="italic text-charcoal">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-3 font-semibold text-charcoal">{testimonial.name}</p>
              <p className="text-sm text-navy">{testimonial.result}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

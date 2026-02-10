"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CreditCard, HelpCircle, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import type { ShopCategory } from "@/lib/shop";
import { formatCurrency, getCategoryLabel } from "@/lib/shop";
import { trackProductView } from "@/lib/analytics";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { PriceDisplay } from "@/components/shop/PriceDisplay";
import { ProductCard } from "@/components/shop/ProductCard";
import { ReviewStars } from "@/components/shop/ReviewStars";

type DetailTab = "description" | "inside" | "reviews" | "faqs";

interface ProductDetailClientProps {
  product: Product;
  category: ShopCategory;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  category,
  relatedProducts,
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(product.image_url);
  const [activeTab, setActiveTab] = useState<DetailTab>("description");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    trackProductView(product.id);
  }, [product.id]);

  const gallery = useMemo(
    () => [product.image_url, "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200"],
    [product.image_url]
  );

  const tabClass = (tab: DetailTab) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      activeTab === tab
        ? "bg-charcoal text-white"
        : "border border-light-gray text-charcoal hover:bg-light-gray/20"
    }`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: getCategoryLabel(category), href: `/shop/${category}` },
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Image
            src={activeImage}
            alt={product.title}
            width={1000}
            height={700}
            className="h-auto w-full rounded-lg object-cover"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`overflow-hidden rounded-lg border ${activeImage === image ? "border-charcoal" : "border-light-gray"}`}
                aria-label="Select product image"
              >
                <Image src={image} alt={product.title} width={320} height={220} className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              <button type="button" className={tabClass("description")} onClick={() => setActiveTab("description")}>
                Description
              </button>
              <button type="button" className={tabClass("inside")} onClick={() => setActiveTab("inside")}>
                What&apos;s Inside
              </button>
              <button type="button" className={tabClass("reviews")} onClick={() => setActiveTab("reviews")}>
                Reviews
              </button>
              <button type="button" className={tabClass("faqs")} onClick={() => setActiveTab("faqs")}>
                FAQs
              </button>
            </div>

            <div className="mt-4 rounded-lg border border-light-gray bg-white p-5">
              {activeTab === "description" ? <p className="text-dark-gray">{product.long_description}</p> : null}
              {activeTab === "inside" ? (
                <ul className="list-inside list-disc space-y-2 text-dark-gray">
                  {product.whats_included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {activeTab === "reviews" ? (
                <div className="space-y-3">
                  <ReviewStars rating={product.rating} reviewCount={product.review_count} />
                  <p className="text-sm text-dark-gray">
                    Students consistently highlight clarity, exam relevance, and confidence boosts from this product.
                  </p>
                </div>
              ) : null}
              {activeTab === "faqs" ? (
                <div className="space-y-2 text-sm text-dark-gray">
                  <p>Q: Is this suitable for independent study?</p>
                  <p>A: Yes, it is built for self-paced progression and quick feedback cycles.</p>
                  <p className="pt-2">Q: Can I print the workbook?</p>
                  <p>A: Yes. All PDF resources are print-friendly and optimized for home printers.</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-light-gray bg-white p-6 lg:sticky lg:top-24 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy">
            {getCategoryLabel(category)}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-charcoal">{product.title}</h1>
          <div className="mt-3">
            <ReviewStars rating={product.rating} reviewCount={product.review_count} />
          </div>
          <div className="mt-5">
            <PriceDisplay price={product.price} originalPrice={product.original_price} large />
          </div>

          <ul className="mt-5 space-y-2 text-sm text-charcoal">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-5 inline-flex items-center rounded-lg border border-light-gray">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2">
              +
            </button>
          </div>

          <div className="mt-5 space-y-2">
            <AddToCartButton product={product} quantity={quantity} className="w-full" />
            <Link
              href="/checkout"
              className="inline-flex w-full items-center justify-center rounded-lg bg-navy px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Buy now
            </Link>
          </div>

          <div className="mt-5 rounded-lg border border-light-gray bg-slate-50 p-3 text-sm text-dark-gray">
            <p className="inline-flex items-center gap-2 font-medium text-charcoal">
              <CreditCard size={16} />
              Payment options
            </p>
            <p className="mt-1">PayPal, Visa, Mastercard, and secure card checkout available.</p>
          </div>

          <div className="mt-3 rounded-lg border border-light-gray p-3 text-sm">
            <p className="inline-flex items-center gap-2 font-medium text-charcoal">
              <Truck size={16} />
              Delivery info
            </p>
            <p className="mt-1 text-dark-gray">Instant digital download after payment confirmation.</p>
          </div>

          <div className="mt-3 rounded-lg border border-light-gray p-3 text-sm text-dark-gray">
            <p className="font-medium text-charcoal">Trust badges</p>
            <p className="mt-1">Encrypted checkout | Verified reviews | Mentor-authored resources</p>
          </div>

          <div className="mt-3 rounded-lg border border-light-gray p-3 text-sm text-dark-gray">
            <p className="inline-flex items-center gap-2 font-medium text-charcoal">
              <HelpCircle size={16} />
              Need help?
            </p>
            <p className="mt-1">Email support@mentorsubhimath.com for quick product guidance.</p>
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-charcoal">Related products</h2>
        <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2">
          {relatedProducts.map((related) => (
            <div key={related.id} className="min-w-[280px] max-w-[320px] snap-start">
              <ProductCard product={related} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

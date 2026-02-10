import type { Metadata } from "next";
import Link from "next/link";
import { FreeSamplesCapture } from "@/components/shop/FreeSamplesCapture";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFaqAccordion } from "@/components/shop/ShopFaqAccordion";
import { shopLandingFaqs } from "@/data/shopContent";
import { getCatalogProducts } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Premium Math Resources | GCSE, A-Level, STEP | MentorSubhiMath",
  description:
    "Download handwritten workbooks, predicted papers, and video masterclasses for GCSE, A-Level, and university entrance exams. Bronze to Gold difficulty tiers. From £4.99.",
  keywords: [
    "GCSE math resources",
    "A-Level math workbooks",
    "STEP preparation",
    "MAT practice",
    "math predicted papers",
  ],
  path: "/shop",
});

export default async function ShopPage() {
  const allProducts = await getCatalogProducts();
  const featured = allProducts.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl space-y-14 px-4 py-10 md:px-6 lg:px-8">
      <div className="rounded-2xl bg-charcoal px-6 py-12 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">
          MentorSubhiMath Resources
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          High-impact maths resources for GCSE, A-Level, Further Maths, and University.
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Built by a mentor who has helped 150+ students hit top grades with structured,
          exam-smart systems.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#shop-grid"
            className="rounded-lg bg-gold px-5 py-3 font-semibold text-charcoal transition-colors hover:bg-amber-400"
          >
            Explore products
          </Link>
          <Link
            href="/resources/free"
            className="rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Get free samples
          </Link>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-semibold text-charcoal">How It Works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["Pick your level", "Choose GCSE, A-Level, Further Maths, or University resources."],
            ["Study with structure", "Follow guided worksheets, videos, and focused exam plans."],
            ["Track progress", "Use built-in review systems to improve weak topics fast."],
          ].map(([title, text], index) => (
            <article key={title} className="rounded-lg border border-light-gray bg-white p-5">
              <p className="text-sm font-semibold text-navy">Step {index + 1}</p>
              <h3 className="mt-1 text-xl font-semibold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-dark-gray">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-charcoal">Shop by Category</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["GCSE", "/shop/gcse"],
            ["A-Level", "/shop/a-level"],
            ["Further Maths", "/shop/further-maths"],
            ["University", "/shop/university"],
          ].map(([title, href]) => (
            <Link
              key={title}
              href={href}
              className="rounded-lg border border-light-gray bg-white p-5 transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-dark-gray group-hover:text-white/90">
                Browse targeted resources and bundles.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-charcoal">What Makes Us Different</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-light-gray">
          <div className="grid grid-cols-3 bg-charcoal px-4 py-3 text-sm font-semibold text-white">
            <p>Feature</p>
            <p>MentorSubhiMath</p>
            <p>Typical resources</p>
          </div>
          {[
            ["Exam alignment", "Updated with trend analysis", "Often generic"],
            ["Structure", "Step-by-step progression", "Mixed and unstructured"],
            ["Support", "Mentor-led strategy focus", "Little exam-technique guidance"],
          ].map(([feature, ours, others]) => (
            <div key={feature} className="grid grid-cols-3 border-t border-light-gray bg-white px-4 py-3 text-sm">
              <p className="font-medium text-charcoal">{feature}</p>
              <p className="text-navy">{ours}</p>
              <p className="text-dark-gray">{others}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-charcoal">Product Types</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Workbooks", "Topic-by-topic practice with worked methods."],
            ["Predicted Papers", "Realistic paper sets based on current trends."],
            ["Video Courses", "Short, focused lessons for hard topics."],
            ["Vaults & Bundles", "High-value packs for full revision systems."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-light-gray bg-white p-5">
              <h3 className="text-xl font-semibold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-dark-gray">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="shop-grid">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="text-3xl font-semibold text-charcoal">Featured Resources</h2>
          <Link href="/cart" className="text-sm font-semibold text-navy hover:text-charcoal">
            Go to cart
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-light-gray bg-navy px-6 py-8 text-white">
        <h2 className="text-3xl font-semibold">Free Samples</h2>
        <p className="mt-2 max-w-2xl text-white/80">
          Enter your email and we will send curated sample pages from our top resources.
        </p>
        <FreeSamplesCapture />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-charcoal">What Students Say</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            [
              "The workbook flow made revision feel easy and focused.",
              "Sana A.",
              "Grade 9 GCSE",
            ],
            [
              "Predicted papers gave me exactly the practice style I needed.",
              "Haris M.",
              "A* A-Level",
            ],
            [
              "I improved speed and confidence within two weeks.",
              "Maha K.",
              "Top 5% mock score",
            ],
          ].map(([quote, name, result]) => (
            <article key={name} className="rounded-lg border border-light-gray bg-white p-5">
              <p className="italic text-charcoal">&ldquo;{quote}&rdquo;</p>
              <p className="mt-3 font-semibold text-charcoal">{name}</p>
              <p className="text-sm text-navy">{result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-light-gray bg-white p-6">
        <h2 className="text-3xl font-semibold text-charcoal">Pricing Philosophy</h2>
        <p className="mt-3 max-w-3xl text-dark-gray">
          We price for value-per-grade improvement, not inflated &ldquo;premium&rdquo; branding. Every
          product is designed to save revision time, reduce exam stress, and produce measurable
          score gains.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-charcoal">Frequently Asked Questions</h2>
        <div className="mt-5">
          <ShopFaqAccordion items={shopLandingFaqs} />
        </div>
      </section>

      <section className="rounded-lg bg-charcoal px-6 py-10 text-center text-white">
        <h2 className="text-3xl font-semibold">Ready to level up your maths results?</h2>
        <p className="mt-3 text-white/80">Pick your category and start a smarter revision plan today.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop/gcse"
            className="rounded-lg bg-gold px-5 py-3 font-semibold text-charcoal transition-colors hover:bg-amber-400"
          >
            Start with GCSE
          </Link>
          <Link
            href="/shop/a-level"
            className="rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Browse A-Level
          </Link>
        </div>
      </section>
    </section>
  );
}

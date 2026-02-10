import type { Metadata } from "next";
import { FreeResourcesClient } from "@/components/resources/FreeResourcesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Math Resources | GCSE, A-Level, STEP PDF Downloads | MentorSubhiMath",
  description:
    "Download free GCSE, A-Level, and STEP maths PDFs with no signup required. Get sample worksheets, formula sheets, and worked solutions.",
  keywords: [
    "free math resources",
    "GCSE free worksheets",
    "A-Level math PDFs",
    "STEP preparation free resources",
  ],
  path: "/resources/free",
});

export default function FreeResourcesPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 px-4 py-12 md:px-6 lg:px-8">
      <header className="rounded-2xl bg-charcoal px-6 py-10 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Free Resources</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Download free maths PDFs and sharpen your exam prep today
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          No email required for downloads. Start with free worksheets, formula sheets, and worked
          solutions for GCSE, A-Level, and STEP.
        </p>
      </header>

      <FreeResourcesClient />
    </section>
  );
}

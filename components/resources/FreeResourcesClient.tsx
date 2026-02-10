"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FileDown, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { trackDownload } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

interface FreeResourceItem {
  title: string;
  description: string;
  fileName: string;
}

const freeResources: FreeResourceItem[] = [
  {
    title: "GCSE Algebra Starter Worksheet",
    description: "A diagnostic worksheet with worked methods and answer checks.",
    fileName: "gcse-sample.pdf",
  },
  {
    title: "A-Level Differentiation Toolkit",
    description: "Core differentiation rules, traps, and exam-style walkthroughs.",
    fileName: "a-level-differentiation-sample.pdf",
  },
  {
    title: "STEP 2020 Worked Solutions",
    description: "Selected STEP-style problems with concise strategic solutions.",
    fileName: "step-2020-solutions.pdf",
  },
  {
    title: "Exam Formula Sheet",
    description: "A printable formula sheet for rapid final-week revision.",
    fileName: "formula-sheet.pdf",
  },
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function FreeResourcesClient() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/free-subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!response.ok) {
        throw new Error("Could not save email.");
      }

      // Placeholder for external email provider integration.
      console.log("Send free resource email confirmation:", trimmedEmail);
      toast.success("Success! Check your email for confirmation.");
      setEmail("");
    } catch {
      toast.error("Could not submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2">
        {freeResources.map((resource) => (
          <article
            key={resource.fileName}
            className="rounded-xl border border-light-gray bg-white p-6 shadow-sm"
          >
            <div className="inline-flex rounded-lg bg-navy/10 p-3 text-navy">
              <FileText aria-hidden="true" size={22} />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-charcoal">{resource.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-charcoal">
                PDF
              </span>
            </div>
            <p className="mt-2 text-sm text-dark-gray">{resource.description}</p>
            <a
              href={`/free-resources/${resource.fileName}`}
              download
              onClick={() => trackDownload(resource.fileName)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-charcoal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <FileDown size={16} />
              Download Free PDF
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-navy px-6 py-8 text-white md:px-10">
        <h2 className="text-3xl font-semibold">Join 2,000+ Students</h2>
        <p className="mt-2 max-w-2xl text-white/80">
          Get weekly exam strategy tips, free worksheets, and upcoming resource drops.
        </p>
        <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <label htmlFor="free-resource-email" className="sr-only">
            Email address
          </label>
          <input
            id="free-resource-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:max-w-sm"
          />
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="!shadow-none"
          >
            Get updates
          </Button>
        </form>
      </section>

      <section className="rounded-xl border border-light-gray bg-white p-6">
        <h2 className="text-2xl font-semibold text-charcoal">
          Why free maths resources improve exam performance
        </h2>
        <p className="mt-3 text-dark-gray">
          High-quality free resources give students a low-friction way to test resource style,
          teaching clarity, and exam relevance before purchasing full packs. This improves fit and
          reduces wasted study time.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-charcoal">
          What to look for in GCSE, A-Level, and STEP revision PDFs
        </h2>
        <p className="mt-3 text-dark-gray">
          The strongest revision PDFs include model methods, common mistake callouts, and a clear
          progression from core confidence to higher-difficulty exam questions. Resources should
          also be printable and easy to annotate.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-charcoal">
          Build a weekly revision system using downloadable worksheets
        </h2>
        <p className="mt-3 text-dark-gray">
          Start with one diagnostic worksheet, review errors with worked solutions, then schedule
          a second pass on weak areas within 48 hours. This repetition model helps retention and
          boosts test-day accuracy.
        </p>
      </section>

      <section className="rounded-2xl bg-charcoal px-6 py-10 text-center text-white">
        <h2 className="text-3xl font-semibold">Ready for premium resources?</h2>
        <p className="mt-2 text-white/80">
          Move from sample practice to full systems, predicted papers, and masterclass support.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-lg bg-gold px-5 py-3 font-semibold text-charcoal transition-colors hover:bg-amber-400"
          >
            Explore premium products
          </Link>
          <Link
            href="/shop/a-level"
            className="rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Browse A-Level
          </Link>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const problems = [
  "Cramming last minute with no structured plan or timeline.",
  "Following generic YouTube playlists with no topic-wise depth or weak-spot focus.",
  "Skipping weak topics instead of drilling them until they become strengths.",
  "Doing random practice without curated question banks aligned to exam format.",
  "No mock exams or timed practice, leading to time pressure and careless errors on test day.",
];

const solutions = [
  "Weekly live classes with a clear curriculum and milestone-based progress tracking.",
  "Topic-wise repositories and recorded sessions so you can revisit any concept anytime.",
  "Targeted weak-spot drilling with personalized assignments until you master each area.",
  "Curated question banks and past-paper style practice aligned to SAT/IGCSE format.",
  "Weekly mock exams and timed drills so you build speed and accuracy under real conditions.",
];

export function ProblemSolution() {
  return (
    <section id="problem-solution" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-[36px]">
            Why Most Students Struggle with SAT & IGCSE Math
          </h2>
        </SectionWrapper>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Problems */}
          <SectionWrapper delay={0.1}>
            <div className="space-y-4">
              {problems.map((text, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start text-charcoal"
                >
                  <span className="mt-0.5 shrink-0 text-red-500" aria-hidden>
                    <X className="h-6 w-6" />
                  </span>
                  <p className="text-dark-gray">{text}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* Right: Solutions */}
          <SectionWrapper delay={0.2}>
            <div className="space-y-4">
              {solutions.map((text, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start text-charcoal"
                >
                  <span className="mt-0.5 shrink-0 text-emerald-600" aria-hidden>
                    <Check className="h-6 w-6" />
                  </span>
                  <p className="text-dark-gray">{text}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>

        <SectionWrapper className="mt-12 text-center" delay={0.3}>
          <Link href="#how-it-works">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight size={20} />}
              className="rounded-lg"
            >
              Here&apos;s how we do it differently →
            </Button>
          </Link>
        </SectionWrapper>
      </div>
    </section>
  );
}

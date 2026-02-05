"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Calendar, Laptop, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    number: 1,
    icon: Calendar,
    headline: "Book Your Free Strategy Call",
    description:
      "Schedule a 15-minute call to discuss your goals, current level, and how our program fits your timeline. No pressure—just clarity.",
  },
  {
    number: 2,
    icon: Laptop,
    headline: "Join Live Classes & Access Repositories",
    description:
      "Attend weekly live sessions and get 24/7 access to topic-wise materials, recordings, and curated practice so you can learn at your pace.",
  },
  {
    number: 3,
    icon: Trophy,
    headline: "Track Progress with Mock Exams",
    description:
      "Take weekly mock exams and timed drills. We track your weak spots and adjust your plan so you hit 750+ SAT or A/A* IGCSE.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-light-gray/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-gray">
            Three simple steps from free call to target score.
          </p>
        </SectionWrapper>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <SectionWrapper key={step.number} delay={index * 0.1}>
              <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-elevated">
                <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy font-heading font-bold">
                  {step.number}
                </div>
                <div className="mb-4 inline-flex rounded-lg bg-gold/10 p-3">
                  <step.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal">
                  {step.headline}
                </h3>
                <p className="mt-2 flex-1 text-dark-gray">
                  {step.description}
                </p>
              </div>
            </SectionWrapper>
          ))}
        </div>

        <SectionWrapper className="mt-12 text-center" delay={0.4}>
          <Link href="#contact">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight size={20} />}
              className="rounded-lg"
            >
              Book Your Free Strategy Call →
            </Button>
          </Link>
        </SectionWrapper>
      </div>
    </section>
  );
}

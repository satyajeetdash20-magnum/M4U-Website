"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BookOpen, GraduationCap, Target, Check } from "lucide-react";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { motion } from "framer-motion";

const programs = [
  {
    icon: BookOpen,
    title: "IGCSE A/A* Program",
    description: "Structured path to A or A* in IGCSE Mathematics.",
    features: [
      "Live weekly classes",
      "Topic-wise repositories & recordings",
      "Weak-spot drilling & assignments",
      "Past-paper style practice",
      "Mock exams & progress tracking",
    ],
    price: "Contact for pricing",
    cta: "Book a Free Call",
    variant: "side" as const,
  },
  {
    icon: Target,
    title: "SAT 750+ Program",
    description: "Our most popular program for students targeting 750+ on SAT Math.",
    features: [
      "Everything in IGCSE program, plus",
      "SAT-specific question banks",
      "Weekly SAT-style mock exams",
      "Time management & strategy sessions",
      "Score guarantee* (terms apply)",
    ],
    price: "Contact for pricing",
    cta: "Book a Free Call",
    variant: "center" as const,
  },
  {
    icon: GraduationCap,
    title: "Combo: SAT + IGCSE",
    description: "Dual preparation for students taking both exams.",
    features: [
      "Full SAT 750+ program",
      "Full IGCSE A/A* program",
      "Unified curriculum & scheduling",
      "Dedicated support for both formats",
      "Best value for dual prep",
    ],
    price: "Contact for pricing",
    cta: "Book a Free Call",
    variant: "side" as const,
  },
];

export function Programs() {
  return (
    <section id="programs" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Choose Your Path to Math Mastery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-gray">
            Pick the program that matches your goals. All include live classes,
            repositories, and mock exams.
          </p>
        </SectionWrapper>

        <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {programs.map((program, index) => (
            <SectionWrapper key={program.title} delay={index * 0.1}>
              <motion.div
                className={`relative flex h-full flex-col rounded-lg p-6 shadow-elevated ${
                  program.variant === "center"
                    ? "bg-navy text-white lg:-mt-4 lg:mb-4 lg:scale-105"
                    : "bg-white text-charcoal border border-light-gray"
                }`}
                whileHover={{ y: -4, boxShadow: "0 14px 28px rgba(0, 0, 0, 0.16)" }}
              >
                {program.variant === "center" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                    Most Popular
                  </div>
                )}
                <div
                  className={`mb-4 inline-flex rounded-lg p-3 ${
                    program.variant === "center"
                      ? "bg-gold/20"
                      : "bg-navy/10"
                  }`}
                >
                  <program.icon
                    className={`h-8 w-8 ${
                      program.variant === "center" ? "text-gold" : "text-navy"
                    }`}
                  />
                </div>
                <h3
                  className={`font-heading text-xl font-semibold ${
                    program.variant === "center" ? "text-white" : "text-charcoal"
                  }`}
                >
                  {program.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    program.variant === "center"
                      ? "text-white/80"
                      : "text-dark-gray"
                  }`}
                >
                  {program.description}
                </p>
                <p
                  className={`mt-4 font-heading text-sm font-medium ${
                    program.variant === "center" ? "text-gold" : "text-charcoal"
                  }`}
                >
                  WHAT YOU GET:
                </p>
                <ul className="mt-2 space-y-2">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          program.variant === "center"
                            ? "text-gold"
                            : "text-emerald-600"
                        }`}
                      />
                      <span
                        className={
                          program.variant === "center"
                            ? "text-white/90"
                            : "text-dark-gray"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <p
                  className={`mt-6 font-heading text-2xl font-bold ${
                    program.variant === "center" ? "text-white" : "text-charcoal"
                  }`}
                >
                  {program.price}
                </p>
                <div className="mt-6 flex-1" />
                <BookCallButton
                  size="lg"
                  variant={program.variant === "center" ? "primary" : "outline"}
                  className={`mt-4 w-full rounded-lg ${
                    program.variant === "side"
                      ? "border-navy text-navy hover:bg-navy hover:text-white"
                      : ""
                  }`}
                  label={program.cta}
                  aria-label={`Book free call for ${program.title}`}
                />
              </motion.div>
            </SectionWrapper>
          ))}
        </div>

        <SectionWrapper className="mt-8 text-center">
          <p className="text-sm text-dark-gray">
            *Score guarantee terms apply. Discussed on your free strategy call.
          </p>
        </SectionWrapper>
      </div>
    </section>
  );
}

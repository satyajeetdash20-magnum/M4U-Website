"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Award, BookOpen, GraduationCap, Target } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "Engineering graduate with strong quantitative background" },
  { icon: BookOpen, text: "Years of experience teaching SAT Math and IGCSE" },
  { icon: Target, text: "Structured, curriculum-based approach" },
  { icon: Award, text: "Proven track record of 750+ SAT and A/A* IGCSE results" },
];

export function About() {
  return (
    <section id="about" className="bg-navy/5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:items-center lg:gap-16">
          {/* Left: Circular image placeholder with SK initials */}
          <SectionWrapper>
            <div className="mx-auto flex h-[300px] w-[300px] shrink-0 items-center justify-center rounded-full bg-navy text-gold shadow-elevated-lg">
              <span className="font-heading text-5xl font-bold">SK</span>
            </div>
          </SectionWrapper>

          {/* Right: Text */}
          <div>
            <SectionWrapper delay={0.1}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                MEET YOUR COACH
              </p>
              <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
                Subhankar: Engineering Graduate & Math Specialist
              </h2>
            </SectionWrapper>
            <SectionWrapper delay={0.15}>
              <p className="mt-4 text-dark-gray">
                Subhankar is an engineering graduate and math specialist who has
                helped 150+ students reach their target scores on the SAT Math
                section and achieve A or A* in IGCSE Mathematics. He combines a
                structured, curriculum-based approach with live classes,
                topic-wise repositories, and weekly mock exams so students build
                both conceptual clarity and exam-ready speed and accuracy.
              </p>
            </SectionWrapper>
            <SectionWrapper delay={0.2}>
              <ul className="mt-6 space-y-3">
                {credentials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span className="text-dark-gray">{item.text}</span>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
            <SectionWrapper delay={0.25}>
              <blockquote className="mt-8 border-l-4 border-gold bg-white/50 py-4 pl-6 pr-4 italic text-charcoal">
                &ldquo;My goal is to make every student confident in math—not just
                for the exam, but for the long term.&rdquo;
              </blockquote>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

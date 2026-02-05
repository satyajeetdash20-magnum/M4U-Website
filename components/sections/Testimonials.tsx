"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";

const testimonials = [
  {
    initials: "RK",
    quote:
      "I went from 620 to 760 on SAT Math in 4 months. The weekly mocks and topic-wise repos made the difference—I always knew what to practice next.",
    name: "Rahul K.",
    scoreLine: "620 → 760 SAT Math",
    university: "Admitted to UCLA",
  },
  {
    initials: "PM",
    quote:
      "Finally got my A* in IGCSE Math. The live classes and weak-spot drilling were exactly what I needed. Subhankar explains things clearly and never rushes.",
    name: "Priya M.",
    scoreLine: "B → A* IGCSE Math",
    university: "Admitted to Imperial College London",
  },
  {
    initials: "AS",
    quote:
      "The structured program and mock exams took away my test anxiety. I hit 750 on my first real SAT. Couldn't have asked for a better coach.",
    name: "Arjun S.",
    scoreLine: "680 → 750 SAT Math",
    university: "Admitted to NUS",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F3F4F6] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            What Students Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-gray">
            Real results from students who followed the system.
          </p>
        </SectionWrapper>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <SectionWrapper key={t.name} delay={index * 0.1}>
              <div className="h-full rounded-lg border-l-4 border-gold bg-white p-6 shadow-subtle">
                <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-heading font-bold text-gold">
                  {t.initials}
                </div>
                <p className="text-[18px] text-dark-gray">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-heading font-semibold text-charcoal">
                  {t.name}
                </p>
                <p className="text-sm text-gold font-medium">{t.scoreLine}</p>
                <p className="text-sm text-dark-gray">{t.university}</p>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

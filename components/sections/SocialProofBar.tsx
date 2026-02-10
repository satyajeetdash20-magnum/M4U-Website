"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";

const universities = [
  { name: "Oxford", slug: "oxford" },
  { name: "Cambridge", slug: "cambridge" },
  { name: "Imperial", slug: "imperial" },
  { name: "UCLA", slug: "ucla" },
  { name: "NUS", slug: "nus" },
  { name: "MIT", slug: "mit" },
];

export function SocialProofBar() {
  return (
    <section id="social-proof" className="bg-[#374151] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center">
          <p className="mb-12 text-lg text-[#E5E7EB]">
            Trusted by students preparing for admissions to:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {universities.map((uni) => (
              <div
                key={uni.slug}
                className="flex h-20 w-28 items-center justify-center rounded-lg bg-[#E5E7EB]"
                aria-label={uni.name}
              >
                <span className="text-sm font-semibold text-charcoal">
                  {uni.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-12 text-base text-[#D1D5DB]">
            📊 150+ Students | ⭐ 4.9/5 Rating | 🎯 92% Score 700+
          </p>
        </SectionWrapper>
      </div>
    </section>
  );
}

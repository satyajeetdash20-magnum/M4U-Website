"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import {
  Video,
  FileText,
  Users,
  MessageSquare,
  Target,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Video,
    headline: "Live Weekly Classes",
    description:
      "Real-time instruction with Q&A, so you never fall behind. All sessions recorded for replay.",
  },
  {
    icon: FileText,
    headline: "Topic-Wise Repositories",
    description:
      "Organized materials and recordings by topic so you can revisit any concept whenever you need.",
  },
  {
    icon: Users,
    headline: "Small Batches",
    description:
      "Limited seats per batch so every student gets attention and personalized feedback.",
  },
  {
    icon: MessageSquare,
    headline: "Doubt Support",
    description:
      "Get your questions answered between classes via dedicated channels so you stay unblocked.",
  },
  {
    icon: Target,
    headline: "Weak-Spot Drilling",
    description:
      "Targeted practice on your weak areas until they become strengths, with progress tracking.",
  },
  {
    icon: BookOpen,
    headline: "Curated Question Banks",
    description:
      "Past-paper style and exam-format practice so you're ready for the real test.",
  },
];

export function WhatsIncluded() {
  return (
    <section id="whats-included" className="bg-light-gray/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            What&apos;s Included
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-gray">
            Every program comes with the full system: live classes, materials,
            mocks, and support.
          </p>
        </SectionWrapper>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {features.map((feature, index) => (
            <SectionWrapper key={feature.headline} delay={index * 0.05}>
              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-subtle">
                <div className="shrink-0 rounded-lg bg-gold/10 p-3">
                  <feature.icon className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    {feature.headline}
                  </h3>
                  <p className="mt-2 text-dark-gray">{feature.description}</p>
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

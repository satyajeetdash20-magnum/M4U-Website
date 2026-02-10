"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Mail, MessageCircle } from "lucide-react";
import { BookCallButton } from "@/components/ui/BookCallButton";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="bg-gradient-to-br from-charcoal via-navy to-charcoal py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
        <SectionWrapper>
          <h2 className="font-heading text-3xl font-bold text-white md:text-[40px]">
            Ready to Transform Your Math Scores?
          </h2>
          <p className="mt-6 text-[20px] text-[#E5E7EB]">
            Book a free 15-minute consultation to discuss your goals and see if
            our program is the right fit. No pressure—just clarity.
          </p>
          <div className="mt-10">
            <BookCallButton
              size="lg"
              variant="primary"
              className="rounded-lg px-10 py-4 text-[18px]"
              label="Book Free Call"
            />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[#D1D5DB]">
            <a
              href="mailto:hello@mentorsubhimath.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail size={20} />
              <span>hello@mentorsubhimath.com</span>
            </a>
            <span className="text-white/50">|</span>
            <span className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span>WhatsApp (placeholder)</span>
            </span>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

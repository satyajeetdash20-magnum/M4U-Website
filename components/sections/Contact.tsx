"use client";

import { motion } from "framer-motion";
import { BookCallButton } from "@/components/ui/BookCallButton";

export function Contact() {
  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Book Your Free Consultation
          </h2>
          <p className="mx-auto mt-4 text-dark-gray">
            Get a quick, personalized plan based on your current score and
            target. It takes under 2 minutes to submit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-lg bg-light-gray/30 p-8 text-center shadow-elevated"
        >
          <p className="text-dark-gray">
            We&apos;ll email you within 24 hours to schedule your call.
          </p>
          <BookCallButton
            size="lg"
            className="mt-6 w-full"
            label="Book Free Call"
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookCallButton } from "@/components/ui/BookCallButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy via-charcoal to-[#1a1a2e] pt-20"
    >
      {/* Floating badge top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-24 right-4 md:right-8 z-20 rounded-full border border-gold/50 bg-charcoal/90 backdrop-blur px-4 py-2 text-xs font-medium uppercase tracking-wide text-gold"
      >
        4+ Years | 150+ Students
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-24 lg:grid-cols-[60%_40%] lg:px-8">
        {/* Left: Copy - 60% */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-gold"
          >
            FOR STUDENTS TARGETING 750+ SAT MATH & A/A* IN IGCSE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-[32px] font-bold leading-tight text-white md:text-[48px]"
          >
            Master SAT & IGCSE Math with Structured Coaching That Actually Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl font-sans text-[20px] text-[#E5E7EB]"
          >
            Join 150+ students who&apos;ve achieved top scores through our proven
            system of live classes, topic-wise repositories, and weekly mock
            exams.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4"
          >
            <BookCallButton
              size="lg"
              variant="primary"
              className="rounded-lg text-[18px]"
              label="Book Free Call"
            />
            <p className="text-[#9CA3AF]">
              <Link href="#programs" className="hover:text-gold transition-colors">
                Or explore our programs below ↓
              </Link>
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-sm text-[#9CA3AF]"
          >
            🌍 UK • USA • Singapore | ⏰ Flexible Batches | 💯 Score Guarantee*
          </motion.p>
        </div>

        {/* Right: Circular headshot placeholder - 40% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full border-4 border-gold/40 bg-navy shadow-2xl">
            <span className="font-heading text-7xl font-bold text-gold">SK</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

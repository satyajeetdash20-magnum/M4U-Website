"use client";

import { useForm } from "react-hook-form";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type LeadFormData = {
  firstName: string;
  email: string;
};

export function LeadMagnet() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>();

  const onSubmit = async (data: LeadFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
    reset();
  };

  return (
    <section id="lead-magnet" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            🎁 Free Download: The 30-Day SAT Math Prep Blueprint
          </h2>
          <p className="mt-4 text-[#E5E7EB]">
            A step-by-step guide to structure your next 30 days: what to study,
            when to take mocks, and how to avoid common traps. Perfect for
            students starting their SAT Math prep.
          </p>
        </SectionWrapper>

        <SectionWrapper delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-4"
          >
            <Input
              label="First Name"
              placeholder="Your first name"
              className="bg-white text-charcoal"
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message}
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              className="bg-white text-charcoal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full rounded-lg text-[18px]"
              rightIcon={<ArrowRight size={20} />}
              isLoading={isSubmitting}
            >
              Send Me the Blueprint →
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-white/70">
            No spam. Just the free guide + weekly math tips.
          </p>
        </SectionWrapper>
      </div>
    </section>
  );
}

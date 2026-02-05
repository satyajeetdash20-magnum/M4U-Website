"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
  };

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
            Book Your Free 15-Min Strategy Call
          </h2>
          <p className="mx-auto mt-4 text-dark-gray">
            Tell us your goals and we&apos;ll get back within 24 hours to
            schedule your free consultation.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 space-y-6 rounded-lg bg-light-gray/30 p-8 shadow-elevated"
        >
          <Input
            label="Name"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <div>
            <label className="mb-1 block font-heading text-sm font-medium text-charcoal">
              Message
            </label>
            <textarea
              placeholder="Tell us about your goals and experience level..."
              rows={4}
              className="flex w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-charcoal placeholder:text-dark-gray focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<Send size={20} />}
          >
            Request Free Call
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

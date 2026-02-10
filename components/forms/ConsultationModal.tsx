"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const scoreOptions = [
  "SAT 400-500",
  "SAT 500-600",
  "SAT 600-700",
  "SAT 700+",
  "IGCSE Predicted Grade A-E",
] as const;

const programOptions = [
  "SAT Foundation",
  "SAT Intensive",
  "IGCSE Mastery",
  "Not Sure",
] as const;

type ConsultationFormData = {
  fullName: string;
  email: string;
  whatsappNumber?: string;
  currentScore: (typeof scoreOptions)[number];
  targetScore: (typeof scoreOptions)[number];
  preferredProgram: (typeof programOptions)[number];
  message?: string;
};

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ConsultationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log("Free consultation booking:", data);
    setIsSuccess(true);
    reset();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" aria-hidden />
      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-elevated-lg md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="font-heading text-2xl font-bold text-charcoal">
                  Book Your Free Consultation
                </DialogTitle>
                <p className="mt-2 text-dark-gray">
                  Share your current level and target score. We&apos;ll plan the
                  best next step together.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-dark-gray transition-colors hover:bg-light-gray/40 hover:text-charcoal"
                aria-label="Close booking form"
              >
                <X size={20} />
              </button>
            </div>

            {isSuccess ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                Thanks! We&apos;ll email you within 24 hours to schedule your
                call.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 md:grid-cols-2"
              >
                <div className="md:col-span-2">
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    error={errors.fullName?.message}
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  error={errors.email?.message}
                />

                <Input
                  label="WhatsApp Number (optional)"
                  placeholder="+447700900123"
                  {...register("whatsappNumber", {
                    pattern: {
                      value: /^\+\d{6,15}$/,
                      message:
                        "Use format +countrycode followed by digits only",
                    },
                  })}
                  error={errors.whatsappNumber?.message}
                />

                <div>
                  <label className="mb-1 block font-heading text-sm font-medium text-charcoal">
                    Current Math Score / Grade
                  </label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
                    {...register("currentScore", {
                      required: "Please select your current score/grade",
                    })}
                    aria-label="Current math score or grade"
                  >
                    <option value="">Select one</option>
                    {scoreOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.currentScore && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.currentScore.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block font-heading text-sm font-medium text-charcoal">
                    Target Score / Grade
                  </label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
                    {...register("targetScore", {
                      required: "Please select your target score/grade",
                    })}
                    aria-label="Target score or grade"
                  >
                    <option value="">Select one</option>
                    {scoreOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.targetScore && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.targetScore.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block font-heading text-sm font-medium text-charcoal">
                    Preferred Program
                  </label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
                    {...register("preferredProgram", {
                      required: "Please select a preferred program",
                    })}
                    aria-label="Preferred program"
                  >
                    <option value="">Select one</option>
                    {programOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.preferredProgram && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.preferredProgram.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block font-heading text-sm font-medium text-charcoal">
                    Message (optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share any goals, timelines, or concerns."
                    className="flex w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-charcoal placeholder:text-dark-gray focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
                    {...register("message")}
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    aria-label="Book free call"
                  >
                    Book Free Call
                  </Button>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

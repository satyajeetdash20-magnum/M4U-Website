"use client";

import { ArrowRight } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useConsultationModal } from "@/components/providers/ConsultationModalProvider";

type BookCallButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  label?: string;
};

export function BookCallButton({
  label = "Book Free Call",
  ...props
}: BookCallButtonProps) {
  const { openModal } = useConsultationModal();

  return (
    <Button
      type="button"
      onClick={openModal}
      rightIcon={props.rightIcon ?? <ArrowRight size={20} />}
      aria-label={props["aria-label"] ?? "Book free call"}
      {...props}
    >
      {label}
    </Button>
  );
}

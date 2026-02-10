"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ConsultationModal } from "@/components/forms/ConsultationModal";

interface ConsultationModalContextValue {
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(
  null
);

export function ConsultationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <ConsultationModalContext.Provider value={value}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={closeModal} />
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);
  if (!context) {
    throw new Error(
      "useConsultationModal must be used within ConsultationModalProvider"
    );
  }
  return context;
}

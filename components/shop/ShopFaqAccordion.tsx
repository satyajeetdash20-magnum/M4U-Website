"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function ShopFaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Disclosure key={item.question} as="div" className="rounded-lg border border-light-gray bg-white p-4">
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between gap-4 text-left">
                <span className="font-medium text-charcoal">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-dark-gray transition-transform ${open ? "rotate-180" : ""}`}
                />
              </DisclosureButton>
              <DisclosurePanel className="pt-3 text-sm leading-relaxed text-dark-gray">
                {item.answer}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

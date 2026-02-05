"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the program work?",
    answer:
      "You join weekly live classes, get access to topic-wise repositories and recordings, complete assigned practice and weak-spot drilling, and take weekly mock exams. Progress is tracked so we can adjust your plan as needed.",
  },
  {
    question: "What's included in each program?",
    answer:
      "All programs include live weekly classes, topic-wise materials and recordings, curated question banks, weak-spot drilling with assignments, weekly mock exams, and doubt support between sessions. SAT and Combo programs add SAT-specific content and score guarantee terms.",
  },
  {
    question: "Do you offer both SAT and IGCSE coaching?",
    answer:
      "Yes. We have dedicated IGCSE A/A* and SAT 750+ programs, plus a Combo program for students preparing for both exams. You can choose based on your goals.",
  },
  {
    question: "What are the batch timings?",
    answer:
      "We run flexible batches to suit UK, USA, and Singapore time zones. Specific timings are shared after you book your free strategy call so we can place you in a batch that works for your schedule.",
  },
  {
    question: "What is the score guarantee?",
    answer:
      "Score guarantee terms apply to the SAT 750+ program and are discussed on your free strategy call. It reflects our confidence in the system when students follow the plan consistently.",
  },
  {
    question: "How do I pay and when do classes start?",
    answer:
      "Payment and start dates are confirmed after your free 15-minute strategy call. We'll walk you through options and get you started as soon as a batch slot is available.",
  },
  {
    question: "What happens on the free strategy call?",
    answer:
      "We discuss your current level, target score, timeline, and how our program fits. You'll get clarity on the curriculum, batch options, and next steps. No pressure—just a focused 15-minute conversation.",
  },
  {
    question: "Who is this program for?",
    answer:
      "Students targeting 750+ on SAT Math and/or A or A* in IGCSE Mathematics who want structured coaching with live classes, materials, and mock exams. Ideal for students who are ready to follow a plan and put in consistent practice.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <SectionWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-gray">
            Common questions about our programs and process.
          </p>
        </SectionWrapper>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <SectionWrapper key={faq.question} delay={index * 0.03}>
              <Disclosure
                as="div"
                className="rounded-lg border border-light-gray bg-white shadow-subtle"
              >
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex w-full items-center justify-between px-6 py-4 text-left font-heading font-medium text-charcoal hover:bg-light-gray/30 transition-colors rounded-lg">
                      {faq.question}
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-gold transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-6 pb-4 pt-0 text-dark-gray">
                      <p className="border-t border-light-gray pt-4">
                        {faq.answer}
                      </p>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

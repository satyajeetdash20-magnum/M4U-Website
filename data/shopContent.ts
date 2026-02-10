import type { ShopCategory } from "@/lib/shop";

export const shopLandingFaqs = [
  {
    question: "Are these resources suitable for all exam boards?",
    answer:
      "Yes. The resources are written around shared core outcomes and exam techniques used across major UK boards.",
  },
  {
    question: "Do I get instant access after purchase?",
    answer:
      "Yes. After checkout, you will see your downloads on the confirmation page and receive an order email.",
  },
  {
    question: "Can I preview content before buying?",
    answer:
      "Most products include a preview sample so you can see structure, tone, and question quality before purchase.",
  },
  {
    question: "What format are resources delivered in?",
    answer:
      "Resources are digital-first (PDF/video access) and optimised for both tablet and desktop study workflows.",
  },
  {
    question: "How often are predicted papers updated?",
    answer:
      "Predicted papers are refreshed each season using latest examiner patterns and frequent student performance data.",
  },
  {
    question: "Are there discounts for bundles?",
    answer:
      "Yes. Bundles include built-in savings compared with buying each resource individually.",
  },
  {
    question: "Can parents buy on behalf of students?",
    answer:
      "Absolutely. Parents can complete checkout and share download files with the student.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If there is a technical issue or duplicate purchase, contact support and we will resolve it quickly.",
  },
];

export const categoryDescriptions: Record<ShopCategory, string> = {
  gcse: "Exam-focused resources for confidence, speed, and high GCSE outcomes.",
  "a-level":
    "Structured A-Level packs for Pure, Mechanics, and Statistics mastery.",
  "further-maths":
    "Stretch resources for high-attaining students targeting top Further Maths grades.",
  university:
    "Bridge and first-year university resources for STEM and mathematical maturity.",
};

export const categoryTestimonials: Record<
  ShopCategory,
  Array<{ quote: string; name: string; result: string }>
> = {
  gcse: [
    {
      quote: "The predicted papers felt exactly exam-level. My final paper felt easier.",
      name: "Ayaan R.",
      result: "Grade 9 GCSE Maths",
    },
    {
      quote: "The structure made revision simple. I always knew what to do next.",
      name: "Zara M.",
      result: "Jumped from Grade 6 to 8",
    },
    {
      quote: "Loved the daily plan and confidence tracker in the sprint bundle.",
      name: "Yusuf K.",
      result: "Grade 8 in mocks",
    },
  ],
  "a-level": [
    {
      quote: "The calculus videos fixed gaps I had for months in just two weeks.",
      name: "Mariam T.",
      result: "A* in Pure modules",
    },
    {
      quote: "Mechanics problem ladders were a game changer for exam technique.",
      name: "Imran S.",
      result: "A in A-Level Maths",
    },
    {
      quote: "Predicted papers were incredibly close to real paper style.",
      name: "Noah D.",
      result: "A* overall",
    },
  ],
  "further-maths": [
    {
      quote: "Complex numbers workbook is challenging in the best possible way.",
      name: "Rahma N.",
      result: "A* in Further Maths",
    },
    {
      quote: "Mock series taught me pacing under pressure.",
      name: "Bilal H.",
      result: "Improved from B to A",
    },
    {
      quote: "The vault made proof questions less intimidating.",
      name: "Amina P.",
      result: "Top set distinction",
    },
  ],
  university: [
    {
      quote: "Perfect bridge before starting engineering maths at uni.",
      name: "Leo C.",
      result: "First-class Year 1 start",
    },
    {
      quote: "Linear algebra visuals finally made abstract topics click.",
      name: "Sofia W.",
      result: "Top quartile coursework",
    },
    {
      quote: "The prep bundle removed the panic before semester started.",
      name: "Adam F.",
      result: "Confident transition to STEM",
    },
  ],
};

export const categoryTopics: Record<ShopCategory, string[]> = {
  gcse: ["Algebra", "Geometry", "Statistics", "Number", "Mixed Revision"],
  "a-level": ["Pure", "Calculus", "Mechanics", "Statistics", "Mixed Papers"],
  "further-maths": ["Complex Numbers", "Matrices", "Proof", "Mocks"],
  university: ["Calculus", "Linear Algebra", "Proof Skills", "Bridge"],
};

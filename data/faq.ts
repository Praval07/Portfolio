export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How does the process work with your projects?",
    answer:
      "It usually starts with a short conversation about the problem you're trying to solve, followed by a proposal covering scope, timeline, and approach before any code is written.",
  },
  {
    question: "How do you determine the price of a project?",
    answer:
      "Pricing depends on scope, complexity, and timeline. For smaller projects I can offer a fixed quote; for larger or more ambiguous ones, an hourly or milestone-based structure usually works better for both sides.",
  },
  {
    question: "How long does it usually take to complete a project?",
    answer:
      "It varies widely — a focused feature might take a few days, while a full product build can take several weeks. I'll always give a realistic estimate up front rather than an optimistic one.",
  },
  {
    question: "Can you help with branding and content too?",
    answer:
      "My core strength is engineering and product thinking, but I can collaborate closely with designers/writers, or handle light content and branding work for smaller projects.",
  },
  {
    question: "Do you work with clients from other countries?",
    answer:
      "Yes — most of my collaboration happens remotely and asynchronously, with video calls scheduled across time zones as needed.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Always. Every project I build is designed and tested across mobile, tablet, and desktop as a non-negotiable baseline, not an afterthought.",
  },
];

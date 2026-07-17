"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { faqItems } from "@/data/faq";

function FaqRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <span className="text-base sm:text-lg">{question}</span>
        <Plus
          size={18}
          className={`shrink-0 text-gold-deep transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-ink-soft text-sm max-w-[60ch]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const mid = Math.ceil(faqItems.length / 2);
  const left = faqItems.slice(0, mid);
  const right = faqItems.slice(mid);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="05" label="FAQ" />
        <div className="flex-1">
          <Reveal className="mb-12 max-w-lg">
            <p className="eyebrow mb-4">Got Questions?</p>
            <h2 className="text-4xl sm:text-5xl leading-tight mb-4">We&rsquo;ve Got Answers!</h2>
            <p className="text-ink-soft">
              Here are some quick answers to common questions about my work and process.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12">
            <div>{left.map((item) => <FaqRow key={item.question} {...item} />)}</div>
            <div>{right.map((item) => <FaqRow key={item.question} {...item} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

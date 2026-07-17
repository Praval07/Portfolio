"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { faqItems } from "@/data/faq";
import { Reveal } from "@/components/motion/Reveal";
import { Search, ChevronDown, HelpCircle, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="pt-32 pb-24 max-w-[960px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <Reveal>
          <p className="eyebrow justify-center mb-4">FAQ Directory</p>
          <h1 className="text-5xl sm:text-6xl font-display font-semibold tracking-tight leading-tight mb-8">
            Frequently Asked<br />
            <span className="text-gold">Questions.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-xl mx-auto leading-relaxed">
            Get instant answers to common questions about my project timelines, pricing structures, work scope, and collaboration models.
          </p>
        </Reveal>
      </section>

      {/* Toolbar Search */}
      <section className="mb-12 max-w-md mx-auto">
        <Reveal className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or terms..."
            className="w-full bg-surface border border-line rounded-full pl-10 pr-4 py-3 text-sm outline-none focus:border-gold transition-colors text-ink placeholder:text-stone"
          />
        </Reveal>
      </section>

      {/* FAQs List Accordion */}
      <section className="mb-24 flex flex-col gap-4">
        {filteredFaqs.length === 0 ? (
          <div className="py-16 text-center text-stone font-mono text-sm border border-dashed border-line rounded-2xl">
            No questions found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.04}>
                <div className="bg-surface border border-line rounded-2xl overflow-hidden transition-colors hover:border-line-strong">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between text-left px-6 py-5 font-display font-semibold text-lg text-ink focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-stone shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-gold-deep" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-60 border-t border-line" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 py-5 text-sm text-ink-soft leading-relaxed bg-paper-deep">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })
        )}
      </section>

      {/* Support / Contact CTA Block */}
      <section className="bg-ink text-paper rounded-3xl p-8 sm:p-12 border border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 max-w-md mx-auto">
          <HelpCircle className="text-gold mx-auto mb-4" size={32} />
          <h2 className="font-display text-2xl font-semibold mb-4 text-paper">Still Have Questions?</h2>
          <p className="text-stone text-sm leading-relaxed mb-8" style={{ color: "#A8A39A" }}>
            If you couldn&rsquo;t find what you were looking for, feel free to send me an email directly or request a quick call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-gold text-ink font-mono text-xs font-semibold rounded-full py-3.5 px-6 hover:bg-gold-soft transition-colors flex items-center justify-center gap-1.5"
            >
              <Mail size={14} /> Send An Inquiry
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="border border-white/20 text-paper font-mono text-xs font-semibold rounded-full py-3.5 px-6 hover:bg-paper hover:text-ink transition-colors flex items-center justify-center gap-1.5"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

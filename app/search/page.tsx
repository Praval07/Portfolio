"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight, CornerDownRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface SearchableItem {
  title: string;
  description: string;
  href: string;
  group: "Projects" | "Pages" | "Skills" | "Articles";
}

const ITEMS: SearchableItem[] = [
  { title: "AlpURL", description: "AI URL shortener", href: "/projects/alpurl", group: "Projects" },
  { title: "MOHINI AI Assistant", description: "Conversational AI voice assistant", href: "/projects/mohini-ai", group: "Projects" },
  { title: "Nexora AI", description: "Education management platform", href: "/projects/nexora-ai", group: "Projects" },
  { title: "N.E.T.R.A.-R", description: "Computer vision road extraction", href: "/projects/netra-r", group: "Projects" },
  { title: "Rapid Revision Hub", description: "Smart notes EdTech platform", href: "/projects/rapid-revision-hub", group: "Projects" },
  { title: "About Me", description: "Who I am, education and values", href: "/about", group: "Pages" },
  { title: "My Skills", description: "Core technical stack and domains", href: "/skills", group: "Pages" },
  { title: "Experience Timeline", description: "Professional history and timeline", href: "/experience", group: "Pages" },
  { title: "Tech Blog", description: "Articles on AI & systems design", href: "/blog", group: "Pages" },
  { title: "Contact", description: "Send message or schedule calls", href: "/contact", group: "Pages" },
  { title: "Interactive Resume", description: "ATS-friendly structured resume", href: "/resume", group: "Pages" },
  { title: "FAQ Accordion", description: "Frequently asked questions", href: "/faq", group: "Pages" },
  { title: "Certificates Showcase", description: "Verified credentials and achievements", href: "/certificates", group: "Pages" },
  { title: "Python & C++", description: "Monogram programming languages", href: "/skills", group: "Skills" },
  { title: "React & Next.js", description: "Modern UI rendering engine", href: "/skills", group: "Skills" },
  { title: "Building Agentic AI Workflows in Next.js", description: "Technical article on planning-execution models", href: "/blog/agentic-workflows-nextjs", group: "Articles" },
  { title: "Building MOHINI: Local Desktop AI Assistant Blueprint", description: "Blueprints for audio Whisper pipelines", href: "/blog/local-llm-desktop-assistant", group: "Articles" },
  { title: "Optimizing Next.js App Router for Sub-100ms LCP", description: "Zero-JS server components performance optimization", href: "/blog/optimizing-web-performance", group: "Articles" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const results = useMemo(() => {
    if (!query.trim() && selectedGroup === "All") return ITEMS;
    return ITEMS.filter((item) => {
      const matchGroup = selectedGroup === "All" || item.group === selectedGroup;
      const matchQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.group.toLowerCase().includes(query.toLowerCase());
      return matchGroup && matchQuery;
    });
  }, [query, selectedGroup]);

  return (
    <div className="pt-32 pb-24 max-w-[960px] mx-auto px-4 sm:px-6">
      {/* Search Header */}
      <section className="mb-12">
        <Reveal>
          <p className="eyebrow mb-4">Workspace Search</p>
          <h1 className="text-5xl font-display font-semibold tracking-tight mb-2">
            Search Directory
          </h1>
          <p className="text-stone text-sm">Instant navigation across projects, articles, skills, and directories.</p>
        </Reveal>
      </section>

      {/* Instant Search Bar */}
      <section className="mb-8 relative">
        <Reveal>
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-stone" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your query (e.g. Next.js, MOHINI, B.Tech)..."
            className="w-full bg-surface border border-line rounded-full pl-12 pr-6 py-4 text-base outline-none focus:border-gold transition-colors text-ink placeholder:text-stone shadow-sm"
            autoFocus
          />
        </Reveal>
      </section>

      {/* Filter Tabs */}
      <section className="mb-10 flex flex-wrap gap-2 justify-start border-b border-line pb-6">
        {["All", "Projects", "Pages", "Skills", "Articles"].map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`font-mono text-xs px-4 py-2 rounded-full border transition-all ${
              selectedGroup === group
                ? "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper"
                : "bg-surface text-ink-soft border-line hover:border-ink-soft"
            }`}
          >
            {group}
          </button>
        ))}
      </section>

      {/* Results List */}
      <section className="flex flex-col gap-3">
        {results.length === 0 ? (
          <div className="py-16 text-center text-stone font-mono text-sm border border-dashed border-line rounded-2xl">
            No results matched your search.
          </div>
        ) : (
          results.map((item, i) => (
            <Reveal key={`${item.group}-${item.title}`} delay={Math.min(i * 0.03, 0.2)}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-line bg-surface hover:border-gold hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-3">
                  <CornerDownRight size={16} className="text-gold shrink-0 mt-1" />
                  <div>
                    <span className="font-mono text-[9px] text-stone-light bg-ink-soft/10 px-1.5 py-0.5 rounded border border-line uppercase tracking-wide mr-2 inline-block">
                      {item.group}
                    </span>
                    <h3 className="text-base font-display font-semibold text-ink inline-block group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-soft mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-stone group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </Reveal>
          ))
        )}
      </section>
    </div>
  );
}

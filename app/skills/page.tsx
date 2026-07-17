import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Layout, Server, Database, Cloud, Settings, BrainCircuit } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { skillBadges } from "@/data/skillBadges";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Skills — Praval Saxena",
  description: "Explore Praval Saxena's technical skill categories, frontend and backend development tools, AI/ML models, and system practices.",
  path: "/skills",
});

const SKILL_DOMAINS = [
  {
    icon: <BrainCircuit className="text-gold shrink-0" size={28} />,
    title: "AI & Machine Learning",
    level: "Advanced Integration",
    desc: "Implementing local LLM APIs, prompt chain engineering, computer vision models (segmentation and road extraction), and audio STT/TTS automation.",
  },
  {
    icon: <Layout className="text-gold shrink-0" size={28} />,
    title: "Frontend Engineering",
    level: "Expert Layouts",
    desc: "Developing polished web apps using Next.js App Router, React 19, TypeScript, Tailwind CSS, and custom Framer Motion transitions.",
  },
  {
    icon: <Server className="text-gold shrink-0" size={28} />,
    title: "Backend Infrastructure",
    level: "Secure Routing",
    desc: "Building low-latency Node.js API services, handling RESTful redirects, structured analytics database schemas, and caching.",
  },
  {
    icon: <Database className="text-gold shrink-0" size={28} />,
    title: "Databases & Storage",
    level: "Optimized Schemas",
    desc: "Working with PostgreSQL, MongoDB, Prisma ORM, and Redis key-value stores to guarantee data consistency and speedy queries.",
  },
  {
    icon: <Cloud className="text-gold shrink-0" size={28} />,
    title: "Cloud & Deployment",
    level: "CI/CD & Serverless",
    desc: "Deploying projects on Vercel, containerizing with Docker, automating deployment pipelines using GitHub Actions, and configuring AWS instances.",
  },
  {
    icon: <Settings className="text-gold shrink-0" size={28} />,
    title: "Systems & Practices",
    level: "Clean Codebase",
    desc: "Adhering to system design principles, writing unit tests, ensuring Lighthouse accessibility compliance, and semantic DOM structures.",
  },
];

const ROADMAP = [
  { term: "Current Focus", goal: "Deep learning models for speech accent parsing and emotional voice synthesis." },
  { term: "Q3 2026", goal: "Kubernetes orchestration and high-scale container clustering for AI server backends." },
  { term: "Q4 2026", goal: "Contributing to core open-source LLM inference engines (Llama.cpp, Ollama Integrations)." },
];

export default function SkillsPage() {
  return (
    <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <section className="mb-20">
        <Reveal>
          <p className="eyebrow mb-4">Core Domains</p>
          <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-tight mb-8">
            My Technical Stack<br />
            <span className="text-gold">&amp; Skillsets.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
            I don&rsquo;t believe in arbitrary skill bar percentages. Instead, I show my expertise through real, working code systems. Here are the core domains I focus on.
          </p>
        </Reveal>
      </section>

      {/* Domain Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {SKILL_DOMAINS.map((domain, i) => (
          <Reveal key={domain.title} delay={i * 0.05} as="div" className="group">
            <Card className="h-full flex flex-col justify-between hover:border-gold transition-colors duration-300">
              <div>
                <div className="flex justify-between items-start mb-6">
                  {domain.icon}
                  <span className="font-mono text-[0.65rem] border border-line rounded px-2 py-0.5 text-stone uppercase tracking-wider bg-paper-deep">
                    {domain.level}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-gold transition-colors">
                  {domain.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">{domain.desc}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </section>

      {/* Flat Technology Grid */}
      <section className="mb-24 bg-ink text-paper rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-display font-semibold mb-2 text-paper">Monogram Tech Grid</h2>
            <p className="text-stone text-sm" style={{ color: "#A8A39A" }}>
              A curated list of core tools, libraries, and frameworks I use day-to-day.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {skillBadges.map((badge, i) => (
              <Reveal key={badge.label} delay={i * 0.03} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                <span className="font-display text-lg font-bold mb-1" style={{ color: badge.color }}>
                  {badge.short}
                </span>
                <span className="font-mono text-[0.65rem] tracking-tight text-stone-light">{badge.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap & Categorized Skills */}
      <div className="grid md:grid-cols-12 gap-12">
        {/* Categories */}
        <section className="md:col-span-7">
          <Reveal className="mb-8">
            <h2 className="text-3xl font-display font-semibold mb-2">Detailed Categories</h2>
            <p className="text-stone text-sm">Full index of languages, frameworks, and tools.</p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.category} delay={i * 0.05} className="bg-surface border border-line rounded-2xl p-6">
                <h3 className="font-mono text-xs text-gold-deep uppercase tracking-wider mb-4">{cat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="text-xs bg-paper-deep text-ink-soft border border-line rounded-full px-3 py-1 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="md:col-span-5">
          <Reveal className="mb-8">
            <h2 className="text-3xl font-display font-semibold mb-2">Learning Roadmap</h2>
            <p className="text-stone text-sm">What I am currently mastering to expand my capabilities.</p>
          </Reveal>

          <div className="border-l border-line pl-6 flex flex-col gap-8">
            {ROADMAP.map((step, i) => (
              <Reveal key={step.term} delay={0.1 + i * 0.1} className="relative">
                <span className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-gold ring-4 ring-paper" />
                <span className="font-mono text-xs text-gold-deep font-semibold">{step.term}</span>
                <h3 className="text-lg font-display font-semibold mt-1 mb-2">{step.goal}</h3>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

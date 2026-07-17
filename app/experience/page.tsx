import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Briefcase, Award, ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { profile } from "@/data/profile";

export const metadata: Metadata = buildMetadata({
  title: "Professional Experience — Praval Saxena",
  description: "View Praval Saxena's professional internships, hackathon leadership, and technical timeline.",
  path: "/experience",
});

import { timelineMilestones } from "@/data/timeline";

const ACHIEVEMENTS = [
  {
    title: "Bharatiya Antariksh Hackathon 2026",
    desc: "Demonstrated advanced engineering leadership by spearheading a team to design innovative, scalable space technology solutions.",
  },
  {
    title: "HCL Hackathon 2026",
    desc: "Led end-to-end system planning, software architecture, and development, resulting in a highly optimized and impactful project submission.",
  },
  {
    title: "Lenovo LEAP Scholar 2025",
    desc: "Selected for Lenovo's NextGen Scholar Program, gaining specialized expertise in AI technologies, computing paradigms, and professional advancement.",
  },
  {
    title: "Smart India Hackathon 2025",
    desc: "Contributed as a core software developer to engineer resilient systems and solve complex computational challenges.",
  },
  {
    title: "IBM SkillsBuild 2024",
    desc: "Completed rigorous AICTE learning pathways, acquiring foundational and practical skills in AI frameworks and industry-standard workflows.",
  },
];

export default function ExperiencePage() {
  return (
    <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="mb-20">
        <Reveal>
          <p className="eyebrow mb-4">My Background</p>
          <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-tight mb-8">
            Experience, Programs<br />
            <span className="text-gold">&amp; Achievements.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
            A comprehensive record of my academic milestones, industry programs, and hackathon milestones.
          </p>
        </Reveal>
      </section>

      {/* Main Experience Vertical Timeline */}
      <div className="grid md:grid-cols-12 gap-12 mb-24">
        {/* Timeline Row */}
        <section className="md:col-span-8">
          <Reveal className="mb-10">
            <h2 className="text-3xl font-display font-semibold mb-2">Chronological History</h2>
            <p className="text-stone text-sm">Follow my path through CS engineering and projects.</p>
          </Reveal>

          <div className="relative border-l border-line pl-8 ml-4 flex flex-col gap-12">
            {timelineMilestones.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className="relative">
                {/* Timeline node icon container */}
                <div className="absolute -left-[53px] top-1.5 w-10 h-10 rounded-full border border-line bg-surface flex items-center justify-center shadow-sm">
                  <Briefcase className="text-gold" size={20} />
                </div>

                <div className="bg-surface border border-line rounded-2xl p-6 shadow-sm hover:border-gold transition-colors duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-gold-deep font-semibold">{item.year}</span>
                    <span className="font-mono text-[0.65rem] text-stone bg-paper-deep px-2 py-0.5 border border-line rounded uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
                  {item.role && (
                    <span className="font-mono text-xs text-stone-light uppercase tracking-wider mb-2 block">
                      Role: <span className="text-ink">{item.role}</span>
                    </span>
                  )}
                  <div className="text-ink-soft text-sm leading-relaxed space-y-2">
                    {Array.isArray(item.description) ? (
                      item.description.map((desc, idx) => <p key={idx}>{desc}</p>)
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sidebar Info - Achievements & Certifications */}
        <section className="md:col-span-4 flex flex-col gap-8">
          {/* Highlight Achievements */}
          <div>
            <Reveal className="mb-6">
              <h2 className="text-2xl font-display font-semibold mb-1">Milestones</h2>
              <p className="text-stone text-xs">Major awards and recognitions received.</p>
            </Reveal>

            <div className="flex flex-col gap-4">
              {ACHIEVEMENTS.map((ach, i) => (
                <Reveal key={ach.title} delay={0.1 + i * 0.05}>
                  <Card className="hover:border-gold transition-colors duration-300">
                    <h3 className="text-base font-display font-semibold mb-1.5 flex items-center gap-1">
                      <Award size={16} className="text-gold" /> {ach.title}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">{ach.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Quick Stats Summary */}
          <Reveal className="bg-ink text-paper rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-mono text-[0.65rem] tracking-wider text-gold uppercase mb-4">FUTURE ROADMAP</h3>
              <p className="text-stone text-xs leading-relaxed mb-6" style={{ color: "#A8A39A" }}>
                Actively seeking AI Engineering and Full Stack Developer roles for Summer 2026/2027. Committed to high-quality code, performance audits, and shipping robust solutions.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xs flex items-center gap-1.5 text-paper hover:text-gold font-semibold"
              >
                Inquire For Hiring <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

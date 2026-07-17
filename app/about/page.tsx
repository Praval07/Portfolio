import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { AboutGallery } from "@/components/sections/AboutGallery";
import { ArrowRight, GraduationCap, Award, Lightbulb, Compass, Target } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Me — Praval Saxena",
  description: "Learn about Praval Saxena's engineering journey, academic background in Computer Science, and core values.",
  path: "/about",
});

const STATS = [
  { value: "8+", label: "Major AI Projects" },
  { value: "3+", label: "Hackathons" },
  { value: "2027", label: "Graduation Year" },
  { value: "5+", label: "Programs & Open Source" },
];

const VALUES = [
  {
    icon: <Lightbulb className="text-gold shrink-0" size={24} />,
    title: "AI First Approach",
    desc: "Leveraging agentic workflows and local LLMs to solve real-world productivity and accessibility bottlenecks.",
  },
  {
    icon: <Compass className="text-gold shrink-0" size={24} />,
    title: "Clean System Architecture",
    desc: "Writing decoupled, robust, and extensible full-stack code that compiles cleanly and runs efficiently.",
  },
  {
    icon: <Target className="text-gold shrink-0" size={24} />,
    title: "Goal-Driven Engineering",
    desc: "Aligning software features directly with user metrics, focusing on performance, LCP optimization, and semantic HTML.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Hero Intro */}
      <section className="mb-20">
        <Reveal>
          <p className="eyebrow mb-4">Who I Am</p>
          <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-tight mb-8">
            Turning Complex Ideas Into<br />
            <span className="text-gold">Intelligent Software.</span>
          </h1>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-8 items-start mt-12">
          <div className="md:col-span-7 text-ink-soft text-base sm:text-lg leading-relaxed flex flex-col gap-6">
            <Reveal delay={0.1}>
              <p>
                I am <strong>Praval Saxena</strong>, an AI Engineer and Full Stack Developer studying Computer Science. I specialize in bridging the gap between advanced artificial intelligence models and modern web engineering to create polished, high-performance digital systems.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                My passion lies at the intersection of AI integration and robust system architecture. I enjoy engineering intelligent solutions that solve real-world problems—from conversational voice assistants like <strong>MOHINI AI</strong> and platforms like <strong>Nexora AI</strong>, to highly optimized tools like <strong>AlpURL</strong> and <strong>Rapid Revision Hub</strong>.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                I approach software development with a focus on clean code, seamless user experiences, and reliable performance. By combining modern web engineering principles with cutting-edge AI, I strive to build applications that are not only powerful but also intuitive, accessible, and elegantly designed.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.15 + i * 0.05} className="bg-surface border border-line rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                <span className="text-3xl sm:text-4xl font-display font-bold text-gold-deep mb-2">{stat.value}</span>
                <span className="font-mono text-xs text-stone">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery — OneDrive video via /api/video-url */}
      <AboutGallery />


      {/* Journey & Values */}
      <div className="grid md:grid-cols-2 gap-12 mb-24">
        {/* Education & Achievements */}
        <section>
          <Reveal className="mb-8">
            <h2 className="text-3xl font-display font-semibold mb-2">Education & Journey</h2>
            <p className="text-stone text-sm">Where I study and build my academic foundations.</p>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1} className="bg-surface border border-line rounded-2xl p-6 flex gap-4">
              <GraduationCap className="text-gold shrink-0" size={32} />
              <div>
                <span className="font-mono text-xs text-gold-deep">2023 — 2027</span>
                <h3 className="text-lg font-display font-semibold mt-1 mb-2">B.Tech in Computer Science & Engineering</h3>
                <p className="text-sm text-ink-soft">
                  Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh. Affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU). Focus on system architecture, database optimization, and machine learning methods.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="bg-surface border border-line rounded-2xl p-6 flex gap-4">
              <Award className="text-gold shrink-0" size={32} />
              <div>
                <span className="font-mono text-xs text-gold-deep">Key Achievement</span>
                <h3 className="text-lg font-display font-semibold mt-1 mb-2">Hackathon & Open Source Contributor</h3>
                <p className="text-sm text-ink-soft">
                  Led development teams across multiple hackathons including Bharatiya Antariksh and HCL, engineering robust architectures and integrating advanced AI capabilities into impactful solutions.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <Reveal className="mb-8">
            <h2 className="text-3xl font-display font-semibold mb-2">Core Values</h2>
            <p className="text-stone text-sm">The engineering philosophies guiding my work.</p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {VALUES.map((val, i) => (
              <Reveal key={val.title} delay={0.1 + i * 0.1} className="bg-surface border border-line rounded-2xl p-6 flex gap-4">
                {val.icon}
                <div>
                  <h3 className="text-lg font-display font-semibold mb-2">{val.title}</h3>
                  <p className="text-sm text-ink-soft">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* Career Goals & Story */}
      <section className="mb-24 bg-ink text-paper rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/5">
        <div className="relative z-10 max-w-2xl">
          <Reveal>
            <p className="font-mono text-xs text-gold uppercase tracking-wider mb-4">My Vision</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-6">
              Building the next generation of ambient intelligent tools.
            </h2>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-8" style={{ color: "#A8A39A" }}>
              My career goal is to spearhead intelligent agents that integrate natively into desktop and mobile OS environments. I want to build robust AI tooling that reduces cognitive load, prioritizes data privacy, and elevates user workflows to new levels of efficiency.
            </p>
            <div className="flex gap-4">
              <LinkButton href="/projects" variant="gold">
                Explore Work <ArrowRight size={14} />
              </LinkButton>
              <LinkButton href="/contact" variant="outline-light">
                Get In Touch
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

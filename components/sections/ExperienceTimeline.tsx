import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { timelineMilestones } from "@/data/timeline";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="bg-ink py-20 sm:py-28 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="04" label="Experience" />
        <div className="flex-1">
          <Reveal className="mb-14">
            <p className="eyebrow mb-4" style={{ color: "var(--color-gold-soft)" }}>My Journey</p>
            <h2 className="text-4xl sm:text-5xl leading-tight text-paper">
              Experience &amp; Achievements
            </h2>
          </Reveal>

          <div className="flex flex-col gap-8 sm:gap-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
            
            {timelineMilestones.map((m, i) => (
              <Reveal
                key={m.title + i}
                delay={i * 0.1}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot */}
                <span className="absolute left-[9px] sm:left-[17px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-4 border-ink z-10" />
                
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-xs text-gold-soft">{m.year}</span>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-paper leading-tight">{m.title}</h3>
                  </div>
                  
                  {m.role && (
                    <span className="font-mono text-xs text-stone-light uppercase tracking-wider">
                      Role: <span className="text-paper">{m.role}</span>
                    </span>
                  )}
                  
                  <div className="text-sm text-stone mt-2 mb-3 max-w-3xl leading-relaxed space-y-2">
                    {Array.isArray(m.description) ? (
                      m.description.map((desc, idx) => <p key={idx}>{desc}</p>)
                    ) : (
                      <p>{m.description}</p>
                    )}
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-gold-deep w-max">
                    {m.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

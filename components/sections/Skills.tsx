import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { skillBadges } from "@/data/skillBadges";

/** Dark, premium technology grid — rounded badge cards with a glow-on-hover
 *  effect, per the reference. */
export function Skills() {
  return (
    <section id="skills" className="bg-ink py-20 sm:py-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="02" label="Skills" />
        <div className="flex-1">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4" style={{ color: "var(--color-gold-soft)" }}>My Skills</p>
            <h2 className="text-4xl sm:text-5xl leading-tight text-paper">
              Technologies I Work With
            </h2>
          </Reveal>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
            {skillBadges.map((skill, i) => (
              <Reveal
                key={skill.label}
                delay={Math.min(i * 0.02, 0.3)}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
              >
                <span
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -z-10"
                  style={{ background: skill.color }}
                  aria-hidden="true"
                />
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-semibold"
                  style={{ background: `${skill.color}22`, color: skill.color === "#FFFFFF" ? "#FFFFFF" : skill.color }}
                >
                  {skill.short}
                </span>
                <span className="text-[0.7rem] text-center" style={{ color: "#C9C4C0" }}>
                  {skill.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

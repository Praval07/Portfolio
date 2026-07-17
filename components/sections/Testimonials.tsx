import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-surface border-y border-line">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="06" label="Testimonials" />
        <div className="flex-1">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl leading-tight">Client Feedback</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name + i}
                delay={i * 0.06}
                className="bg-paper rounded-2xl border border-line p-6"
              >
                <div className="flex gap-0.5 text-gold mb-4" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-ink-soft text-sm mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-paper-deep flex items-center justify-center font-mono text-xs text-stone">
                    {t.name.charAt(0) !== "[" ? t.name.charAt(0) : "?"}
                  </div>
                  <div>
                    <span className="text-sm block">{t.name}</span>
                    <span className="font-mono text-xs text-stone">{t.role}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

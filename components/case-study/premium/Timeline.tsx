"use client";

import { motion } from "framer-motion";
import { ProjectTimelineStep } from "@/data/projects";

export function Timeline({ timeline }: { timeline?: ProjectTimelineStep[] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-4">
            Project Evolution
          </h2>
          <p className="text-xl text-ink-soft font-light">
            The journey from concept to deployment.
          </p>
        </motion.div>

        <div className="relative">
          {/* Continuous Line */}
          <div className="absolute left-[28px] top-[10px] bottom-[10px] w-0.5 bg-line" />

          <div className="space-y-12 relative z-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 group"
              >
                {/* Node */}
                <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-line group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(245,197,66,0.3)] flex items-center justify-center transition-all duration-300 z-10">
                  <div className="w-3 h-3 rounded-full bg-line group-hover:bg-gold transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="pt-3">
                  <div className="flex items-baseline gap-4 mb-2">
                    <h3 className="text-xl font-medium text-ink">{item.phase}</h3>
                    <span className="font-mono text-xs text-stone tracking-wider">{item.date}</span>
                  </div>
                  <p className="text-ink-soft leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

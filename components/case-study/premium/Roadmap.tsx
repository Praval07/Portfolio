"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ProjectRoadmapItem } from "@/data/projects";

export function Roadmap({ roadmap }: { roadmap?: ProjectRoadmapItem[] }) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <section className="py-32 bg-[var(--color-paper-deep)] relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-4">
            Future Roadmap
          </h2>
          <p className="text-xl text-ink-soft font-light max-w-2xl">
            Where the project is heading next.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((item, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Sparkles;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-line flex flex-col items-start group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-paper-deep)] flex items-center justify-center text-ink-soft mb-6 group-hover:bg-gold group-hover:text-ink transition-colors duration-300">
                  <IconComponent size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-ink mb-3">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed font-light text-sm">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

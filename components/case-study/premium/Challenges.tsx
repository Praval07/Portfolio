"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ProjectChallenge } from "@/data/projects";

export function Challenges({ challenges }: { challenges?: ProjectChallenge[] }) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-4">
            Engineering Challenges
          </h2>
          <p className="text-xl text-ink-soft font-light max-w-2xl">
            Overcoming technical hurdles to deliver a seamless experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[challenge.icon] || LucideIcons.AlertTriangle;
            return (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-[var(--color-paper)] border border-line hover:border-gold/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6 text-gold">
                  <IconComponent size={24} />
                  <h3 className="text-lg font-medium text-ink">{challenge.title}</h3>
                </div>
                <p className="text-ink-soft leading-relaxed font-light">
                  {challenge.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

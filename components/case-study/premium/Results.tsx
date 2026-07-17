"use client";

import { motion } from "framer-motion";
import { ProjectResult } from "@/data/projects";

export function Results({ results }: { results?: ProjectResult[] }) {
  if (!results || results.length === 0) return null;

  return (
    <section className="py-32 bg-[var(--color-ink)] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight mb-6">
            Impact & Results
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            Measurable success metrics and key achievements.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, i) => (
            <motion.div
              key={result.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center group hover:bg-white/10 transition-colors duration-300"
            >
              <div className="text-5xl font-display font-medium text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                {result.val}
              </div>
              <h3 className="text-lg font-medium mb-2">{result.title}</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                {result.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

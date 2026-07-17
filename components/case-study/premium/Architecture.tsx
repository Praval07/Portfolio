"use client";

import { motion } from "framer-motion";
import { ProjectArchitectureNode } from "@/data/projects";

export function Architecture({ architecture }: { architecture?: ProjectArchitectureNode[] }) {
  if (!architecture || architecture.length === 0) return null;

  return (
    <section className="py-32 bg-[var(--color-ink)] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight mb-6">
            System Architecture
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl">
            A high-level view of the data flow and system integration.
          </p>
        </motion.div>

        {/* Abstract Flow Diagram */}
        <div className="relative py-20 overflow-x-auto hide-scrollbar">
          <div className="min-w-[800px] flex items-center justify-between relative px-4">
            
            {/* Animated Connection Line */}
            <div className="absolute left-10 right-10 top-1/2 h-[1px] bg-white/10 -translate-y-1/2">
              <motion.div 
                className="h-full bg-gold shadow-[0_0_15px_rgba(245,197,66,0.5)]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {architecture.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center gap-4"
              >
                <div className="w-4 h-4 rounded-full bg-[var(--color-ink)] border-2 border-gold ring-4 ring-gold/20" />
                <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl min-w-[120px]">
                  <p className="font-medium mb-1">{node.label}</p>
                  <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase">{node.sub}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

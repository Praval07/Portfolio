"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ProjectTechCategory } from "@/data/projects";

export function TechStack({ techStack }: { techStack?: ProjectTechCategory[] }) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <section className="py-32 bg-[var(--color-paper-deep)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-4">
            Technology Stack
          </h2>
          <p className="text-xl text-ink-soft font-light">
            Modern tools for robust solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((category, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Code;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-line"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-paper-deep)] flex items-center justify-center text-ink-soft">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium">{category.category}</h3>
                </div>
                
                <ul className="space-y-4">
                  {category.items.map((tech) => (
                    <li key={tech} className="flex items-center gap-3 text-ink-soft font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

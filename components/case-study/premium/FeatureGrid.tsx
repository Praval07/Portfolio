"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ProjectFeature } from "@/data/projects";

export function FeatureGrid({ features }: { features?: ProjectFeature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-32 bg-white relative overflow-hidden border-t border-line">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight mb-6">
            Core Features
          </h2>
          <p className="text-xl text-ink-soft font-light max-w-2xl mx-auto">
            Engineered with precision to deliver a seamless user experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            // Dynamically get the icon component
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.CheckCircle;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-8 rounded-[24px] bg-[var(--color-paper)] border border-line hover:border-gold/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-line flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm text-ink group-hover:text-gold group-hover:border-gold/20">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-ink mb-3">{feature.title}</h3>
                <p className="text-ink-soft leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

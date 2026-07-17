"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectOverview as ProjectOverviewType } from "@/data/projects";

export function ProjectOverview({ overview }: { overview?: ProjectOverviewType }) {
  if (!overview) return null;

  return (
    <section className="py-32 bg-[var(--color-paper-deep)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Sticky Image */}
          <motion.div 
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden shadow-xl bg-white border border-line p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-ink/5">
                <Image
                  src={overview.image}
                  alt="Overview visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center min-h-[50vh] lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-ink mb-16">
                Project Overview
              </h2>
            </motion.div>

            <div className="space-y-16">
              {[
                { label: "The Problem", text: overview.problem },
                { label: "The Solution", text: overview.solution },
                { label: "Core Goals", text: overview.goals }
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-8 border-l-2 border-line/60"
                >
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-gold" />
                  <h3 className="font-mono text-sm tracking-widest text-stone uppercase mb-4">
                    {item.label}
                  </h3>
                  <p className="text-lg sm:text-xl text-ink-soft leading-relaxed font-light">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

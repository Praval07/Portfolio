"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-32 bg-white border-t border-line">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          className="mb-16 flex items-end justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-4">
              More Projects
            </h2>
            <p className="text-xl text-ink-soft font-light">
              Explore other case studies.
            </p>
          </div>
          <Link href="/#work" className="hidden sm:inline-flex items-center gap-2 text-gold font-medium hover:text-ink transition-colors">
            View All Work <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, i) => (
            <Link key={proj.slug} href={`/projects/${proj.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-ink/5 border border-line">
                  <Image
                    src={proj.thumbnail || "/assets/placeholder.png"}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-stone mb-2">
                    {proj.category}
                  </div>
                  <h3 className="text-xl font-medium text-ink mb-2 group-hover:text-gold transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-ink-soft font-light line-clamp-2">
                    {proj.subtitle || proj.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

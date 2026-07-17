"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Github, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const mainImage = project.heroImage || project.thumbnail || "/assets/placeholder.png";

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[var(--color-paper-deep)]">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Column: Content */}
        <motion.div 
          className="flex-1 w-full max-w-2xl z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 inline-block">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink transition-colors"
            >
              <ArrowLeft size={14} /> All work
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="eyebrow mb-6">
            {project.category}
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8"
          >
            {project.title}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-ink-soft max-w-[50ch] mb-12 leading-relaxed"
          >
            {project.description}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 font-mono text-xs border-y border-line py-8"
          >
            <div>
              <dt className="text-stone mb-2">Year</dt>
              <dd className="text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="text-stone mb-2">Status</dt>
              <dd className="text-ink">{project.status}</dd>
            </div>
            <div>
              <dt className="text-stone mb-2">Role</dt>
              <dd className="text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="text-stone mb-2">Focus</dt>
              <dd className="flex flex-col gap-1 text-ink">
                {project.focus.slice(0, 5).map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </dd>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap gap-2">
              {(project.techStack?.flatMap(t => t.items) || []).slice(0, 10).map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white border border-line rounded-full text-xs font-mono text-ink-soft">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-medium hover:bg-ink-soft transition-colors">
                <Play size={16} className="fill-current" /> Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-line text-ink rounded-full font-medium hover:border-ink transition-colors">
                <Github size={16} /> GitHub
              </a>
            )}
            {project.docs && (
              <a href={project.docs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-line text-ink rounded-full font-medium hover:border-ink transition-colors">
                <ExternalLink size={16} /> Documentation
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Image */}
        <motion.div 
          className="flex-1 w-full relative h-[50vh] lg:h-[80vh] min-h-[400px] rounded-[32px] overflow-hidden shadow-2xl bg-ink/5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <Image
            src={mainImage}
            alt={`${project.title} Interface`}
            fill
            className="object-cover object-center z-10"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}

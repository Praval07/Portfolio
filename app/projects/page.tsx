"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Search, Github, ExternalLink, ArrowRight, Grid3X3, Award, BarChart } from "lucide-react";

const CATEGORIES = ["All", "AI", "Full Stack", "Computer Vision", "EdTech"];

export default function ProjectsPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat =
        selectedCat === "All" ||
        project.tag.toLowerCase().includes(selectedCat.toLowerCase()) ||
        (selectedCat === "AI" && (project.tag.toLowerCase().includes("ai") || project.tag.toLowerCase().includes("assistant")));
      const matchQuery =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="mb-16">
        <Reveal>
          <p className="eyebrow mb-4">My Projects</p>
          <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-tight mb-8">
            Engineering Systems<br />
            <span className="text-gold">&amp; Case Studies.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
            A comprehensive showcase of my work — from localized AI assistants to computer-vision terrain segmentation and routing infrastructure.
          </p>
        </Reveal>
      </section>

      {/* Filter and Search Bar */}
      <section className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-line pb-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`font-mono text-xs px-5 py-2.5 rounded-full border transition-all ${
                selectedCat === cat
                  ? "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper"
                  : "bg-surface text-ink-soft border-line hover:border-ink-soft"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, stack, terms..."
            className="w-full bg-surface border border-line rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-gold transition-colors text-ink placeholder:text-stone"
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-stone">
            No projects found matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCat}&rdquo;.
          </div>
        ) : (
          filteredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.05, 0.25)} as="article" className="group flex flex-col justify-between bg-surface border border-line rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gold">
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink mb-6">
                  {project.thumbnail ? (
                    <Image 
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-display text-5xl font-semibold text-white/10 transition-transform duration-500 group-hover:scale-105 select-none">
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub`}
                          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-gold hover:text-ink transition-colors"
                        >
                          <Github size={15} />
                        </a>
                      ) : null}
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Live`}
                          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-gold hover:text-ink transition-colors"
                        >
                          <ExternalLink size={15} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[0.65rem] text-gold-deep border border-gold/20 rounded px-2 py-0.5 uppercase tracking-wider bg-gold/5">
                    {project.tag}
                  </span>
                  <span className="font-mono text-xs text-stone">[Active]</span>
                </div>

                <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="font-mono text-xs flex items-center gap-1.5 text-ink hover:text-gold font-semibold pt-4 border-t border-line group-hover:border-gold/30 transition-colors mt-auto"
              >
                Read Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          ))
        )}
      </section>

      {/* Highlight/Overview Stats */}
      <section className="bg-ink text-paper rounded-3xl p-8 sm:p-12 border border-white/5 grid md:grid-cols-3 gap-8 text-center md:text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-50" />
        
        <Reveal className="flex flex-col md:flex-row items-center gap-4 relative z-10">
          <Grid3X3 className="text-gold shrink-0" size={32} />
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-1">Architecture Focused</h3>
            <p className="text-stone text-xs leading-relaxed" style={{ color: "#A8A39A" }}>
              Every codebase is built with modular routing, optimized databases, and clean decoupled logic layers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col md:flex-row items-center gap-4 relative z-10">
          <Award className="text-gold shrink-0" size={32} />
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-1">Hackathon Validated</h3>
            <p className="text-stone text-xs leading-relaxed" style={{ color: "#A8A39A" }}>
              Our prototypes are tested in intense developer sprints like the Smart India Hackathon (SIH 2024).
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col md:flex-row items-center gap-4 relative z-10">
          <BarChart className="text-gold shrink-0" size={32} />
          <div>
            <h3 className="font-display text-lg font-semibold text-paper mb-1">Performance Tracked</h3>
            <p className="text-stone text-xs leading-relaxed" style={{ color: "#A8A39A" }}>
              Optimized for fast redirection routes, sub-100ms API responses, and minimal bundle load sizes.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

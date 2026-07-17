import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { LinkButton } from "@/components/ui/Button";
import { projects } from "@/data/projects";

/**
 * Large project cards with hover zoom + glass overlay, per the reference.
 * Each card still links through to the full engineering case study
 * (MDX-driven, see /case-studies/[slug]) for anyone who wants the deeper
 * problem/architecture/lessons writeup — the card itself stays a fast,
 * visual entry point.
 */
export function Projects() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="03" label="Projects" />
        <div className="flex-1">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-4">My Projects</p>
              <h2 className="text-4xl sm:text-5xl leading-tight">Featured Projects</h2>
            </div>
            <LinkButton href="/projects" variant="gold">
              View All Projects <span aria-hidden="true">↗</span>
            </LinkButton>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.3)} as="article" className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink mb-4">
                  {project.thumbnail ? (
                    <Image 
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-display text-4xl text-white/15 transition-transform duration-500 group-hover:scale-110">
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
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
                          aria-label={`${project.title} live demo`}
                          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-paper hover:bg-gold hover:text-ink transition-colors"
                        >
                          <ExternalLink size={15} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
                <Link href={`/projects/${project.slug}`} className="block">
                  <h3 className="text-xl mb-1 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-stone mb-2">{project.tag}</p>
                  <p className="text-ink-soft text-sm">{project.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

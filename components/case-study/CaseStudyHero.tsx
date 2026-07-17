import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import type { CaseStudyFrontmatter } from "@/lib/case-studies";

export function CaseStudyHero({ fm }: { fm: CaseStudyFrontmatter }) {
  return (
    <header className="pt-40 pb-16 border-b border-line">
      <div className="max-w-[860px] mx-auto px-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-stone hover:text-ink mb-10"
        >
          <ArrowLeft size={14} /> All work
        </Link>

        <p className="eyebrow mb-4">{fm.tag}</p>
        <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-6">{fm.title}</h1>
        <p className="text-xl text-ink-soft max-w-[52ch] mb-8">{fm.tagline}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 font-mono text-xs">
          <div>
            <dt className="text-stone mb-1">Year</dt>
            <dd>{fm.year}</dd>
          </div>
          <div>
            <dt className="text-stone mb-1">Status</dt>
            <dd>{fm.status}</dd>
          </div>
          <div>
            <dt className="text-stone mb-1">Role</dt>
            <dd>{fm.role}</dd>
          </div>
          <div>
            <dt className="text-stone mb-1">Focus</dt>
            <dd>{fm.meta[0]}</dd>
          </div>
        </dl>

        <div className="flex gap-4 flex-wrap">
          {fm.github ? (
            <a href={fm.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm border border-ink rounded px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors">
              <Github size={14} /> View on GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-sm border border-line text-stone rounded px-4 py-2.5">
              <Github size={14} /> Repository link pending
            </span>
          )}
          {fm.demo ? (
            <a href={fm.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm border border-ink rounded px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors">
              <ExternalLink size={14} /> Live demo
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

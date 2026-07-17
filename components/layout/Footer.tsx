"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative bg-ink overflow-hidden pt-20 pb-10 border-t border-line-strong/10">
      {/* Background large stroke typography */}
      <div className="absolute inset-x-0 bottom-0 select-none overflow-hidden leading-none z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <span
          className="font-display font-bold inline-block whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 20vw, 24rem)",
            color: "transparent",
            WebkitTextStroke: "2px var(--color-ink)",
          }}
        >
          PRAVAL SAXENA
        </span>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 z-10">
        {/* Call to Action Row */}
        <div className="border-b border-line/10 pb-16 mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl text-paper font-semibold tracking-tight leading-none mb-4">
              LET&apos;S BUILD SOMETHING<br />
              <span className="text-gold">AMAZING.</span>
            </h2>
            <p className="text-stone max-w-md mx-auto lg:mx-0 text-sm">
              Open for collaboration, interesting projects, and internship opportunities in AI & full-stack development.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="w-full sm:w-auto font-mono text-sm bg-gold text-ink rounded-full px-8 py-4 hover:bg-gold-soft transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Mail size={16} /> Get In Touch <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto font-mono text-sm border border-white/20 text-paper hover:bg-paper hover:text-ink rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center"
            >
              Schedule a Meeting
            </Link>
          </div>
        </div>

        {/* Links and Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-left">
          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] text-stone uppercase mb-4">EXPLORE</h4>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0 text-sm font-medium">
              <li>
                <Link href="/about" className="text-stone hover:text-paper transition-colors">About Me</Link>
              </li>
              <li>
                <Link href="/skills" className="text-stone hover:text-paper transition-colors">My Skills</Link>
              </li>
              <li>
                <Link href="/projects" className="text-stone hover:text-paper transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/experience" className="text-stone hover:text-paper transition-colors">Experience</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] text-stone uppercase mb-4">RESOURCES</h4>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0 text-sm font-medium">
              <li>
                <Link href="/blog" className="text-stone hover:text-paper transition-colors">Tech Blog</Link>
              </li>
              <li>
                <Link href="/faq" className="text-stone hover:text-paper transition-colors">FAQ & Help</Link>
              </li>
              <li>
                <Link href="/resume" className="text-stone hover:text-paper transition-colors">Interactive Resume</Link>
              </li>
              <li>
                <Link href="/certificates" className="text-stone hover:text-paper transition-colors">Certificates</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] text-stone uppercase mb-4">CONTACT & SOCIAL</h4>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0 text-sm font-medium">
              <li>
                <a href={`mailto:${profile.email}`} className="text-stone hover:text-paper transition-colors">{profile.email}</a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-paper transition-colors flex items-center gap-1.5">
                  <Github size={14} /> GitHub
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-paper transition-colors flex items-center gap-1.5">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-paper transition-colors flex items-center gap-1.5">
                  <Instagram size={14} /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] text-stone uppercase mb-4">AVAILABILITY</h4>
            <div className="flex flex-col gap-2 text-stone text-sm">
              <span className="flex items-center gap-2 text-gold">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Available for Projects
              </span>
              <span>Based in Bareilly, UP</span>
              <span>B.Tech CSE Class of 2027</span>
            </div>
          </div>
        </div>

        {/* Footer Base Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 font-mono text-[0.7rem] text-stone">
          <div className="font-display text-base text-paper font-semibold">
            PS<span className="text-gold">.</span>
          </div>
          <span>© {new Date().getFullYear()} Praval Saxena. All Rights Reserved.</span>
          <a href="#top" className="hover:text-paper transition-colors">Back to Top ↑</a>
        </div>
      </div>
    </footer>
  );
}

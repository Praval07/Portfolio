import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Home, ArrowRight, Compass, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-40 pb-24 max-w-[960px] mx-auto px-4 sm:px-6 text-center">
      {/* Huge background outline "404" */}
      <Reveal className="mb-6">
        <h1
          className="font-display font-bold leading-none select-none tracking-tight inline-block mb-4"
          style={{
            fontSize: "clamp(6rem, 16vw, 12rem)",
            color: "transparent",
            WebkitTextStroke: "2px var(--color-gold)",
          }}
        >
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink mb-4">
          This Page Has Evaporated.
        </h2>
        <p className="text-ink-soft text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-12">
          The link you followed may be broken, or the path has changed. Let&apos;s guide you back to safety.
        </p>
      </Reveal>

      {/* Suggestion Paths */}
      <section className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12 text-left">
        <Reveal delay={0.05}>
          <Link
            href="/"
            className="flex flex-col justify-between p-5 rounded-2xl border border-line bg-surface hover:border-gold hover:shadow-sm transition-all group h-full"
          >
            <div>
              <Home size={18} className="text-gold mb-3" />
              <h3 className="text-sm font-display font-semibold text-ink group-hover:text-gold transition-colors">
                Back to Home
              </h3>
              <p className="text-[11px] text-ink-soft mt-1 leading-relaxed">
                Start over at the main landing page.
              </p>
            </div>
            <span className="font-mono text-[10px] text-stone mt-4 flex items-center gap-1">
              Go Home <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/projects"
            className="flex flex-col justify-between p-5 rounded-2xl border border-line bg-surface hover:border-gold hover:shadow-sm transition-all group h-full"
          >
            <div>
              <Compass size={18} className="text-gold mb-3" />
              <h3 className="text-sm font-display font-semibold text-ink group-hover:text-gold transition-colors">
                Explore Projects
              </h3>
              <p className="text-[11px] text-ink-soft mt-1 leading-relaxed">
                Review case studies and AI repositories.
              </p>
            </div>
            <span className="font-mono text-[10px] text-stone mt-4 flex items-center gap-1">
              See Projects <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            href="/search"
            className="flex flex-col justify-between p-5 rounded-2xl border border-line bg-surface hover:border-gold hover:shadow-sm transition-all group h-full"
          >
            <div>
              <Search size={18} className="text-gold mb-3" />
              <h3 className="text-sm font-display font-semibold text-ink group-hover:text-gold transition-colors">
                Search Site
              </h3>
              <p className="text-[11px] text-ink-soft mt-1 leading-relaxed">
                Search dynamically for what you need.
              </p>
            </div>
            <span className="font-mono text-[10px] text-stone mt-4 flex items-center gap-1">
              Launch Search <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

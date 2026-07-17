"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32 bg-[var(--color-ink)] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] pointer-events-none" />
      
      {/* Abstract Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm text-gold uppercase tracking-widest mb-6">Interested in collaborating?</p>
          <h2 className="text-5xl sm:text-7xl font-display mb-10 leading-[1.1]">Let&apos;s Build AI <br />Together.</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-ink rounded-full font-medium hover:bg-white transition-colors"
            >
              <Mail size={18} /> Contact Me
            </Link>
            <Link 
              href="/#work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors"
            >
              View More Projects <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

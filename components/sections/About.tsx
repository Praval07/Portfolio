"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { GraduationCap, MapPin, Heart } from "lucide-react";

export function About() {
  return (
    <section 
      id="about" 
      className="py-24 sm:py-32 bg-gradient-to-b from-[#FAF8F5] to-[#F5F0E8] border-b border-line/10 relative overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -z-10" 
      />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: 1, 
              ease: "easeOut",
              staggerChildren: 0.15 
            } 
          }
        }}
        className="max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 lg:gap-16 items-center"
      >
        {/* ── Left Side: Content (65% width on desktop) ── */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
          }}
          className="flex flex-col items-start z-10"
        >
          {/* Eyebrow Label */}
          <span className="font-mono text-xs tracking-widest uppercase text-gold-deep font-semibold mb-4 block">
            ABOUT ME
          </span>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-ink mb-6 leading-tight">
            Turning Ideas Into <span className="text-gold-deep">Intelligent</span> Solutions
          </h2>

          {/* Description */}
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-[620px] mb-10 font-light">
            I am a passionate Computer Science Engineering student who loves building
            innovative solutions using AI and full-stack technologies. I enjoy solving
            real-world problems and creating products that make a difference by bridging
            thoughtful design with robust engineering.
          </p>

          {/* Premium Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10">
            {/* Education Card */}
            <div className="bg-white/45 backdrop-blur-[2px] border border-line/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <GraduationCap className="text-gold-deep mb-3" size={20} />
              <span className="font-mono text-[9px] uppercase tracking-wider text-stone block mb-1">Education</span>
              <h4 className="text-sm font-semibold text-ink leading-tight mb-1">B.Tech Computer Science & Engineering</h4>
              <p className="text-[11px] text-ink-soft">2023–2027</p>
            </div>

            {/* Location Card */}
            <div className="bg-white/45 backdrop-blur-[2px] border border-line/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <MapPin className="text-gold-deep mb-3" size={20} />
              <span className="font-mono text-[9px] uppercase tracking-wider text-stone block mb-1">Location</span>
              <h4 className="text-sm font-semibold text-ink leading-tight mb-1">Uttar Pradesh</h4>
              <p className="text-[11px] text-ink-soft">India</p>
            </div>

            {/* Interests Card */}
            <div className="bg-white/45 backdrop-blur-[2px] border border-line/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Heart className="text-gold-deep mb-3" size={20} />
              <span className="font-mono text-[9px] uppercase tracking-wider text-stone block mb-1">Interests</span>
              <h4 className="text-sm font-semibold text-ink leading-tight mb-1">Artificial Intelligence</h4>
              <p className="text-[11px] text-ink-soft">Full Stack • Open Source</p>
            </div>
          </div>

          {/* Primary CTA with Glass Hover */}
          <LinkButton 
            href="/contact" 
            className="bg-black/90 text-white hover:bg-white/10 hover:text-black hover:border-black/30 border border-transparent backdrop-blur-md transition-all duration-300 shadow-md shadow-black/10 hover:scale-105 active:scale-95"
          >
            Know About Me <span aria-hidden="true">→</span>
          </LinkButton>
        </motion.div>

        {/* ── Right Side: Image Card (35% width on desktop) ── */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
          }}
          className="flex justify-center w-full"
        >
          {/* Luxury Card Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] max-w-[480px] rounded-[32px] overflow-hidden bg-white/5 backdrop-blur-md border border-white/[0.12] shadow-2xl shadow-black/10 group select-none pointer-events-auto">
            {/* Layer 1: Video with hover zoom */}
            <video
              src="/videos/about-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />

            {/* Layer 2: Subtle Black Gradient overlay */}
            <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none rounded-[32px]" />

            {/* Layer 3: Subtle warm orange radial overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.12),_transparent_55%)] z-10 pointer-events-none rounded-[32px]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

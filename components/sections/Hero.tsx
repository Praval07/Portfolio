"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroContent } from "./hero/HeroContent";
import { HeroButtons } from "./hero/HeroButtons";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 600, 0);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex items-center bg-black">
      {/* ── Layer 0: Cinematic Background Image with slow zoom ── */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-30 w-full h-full select-none pointer-events-none"
      >
        <Image
          src="/images/hero-cinematic.png"
          alt="Cinematic Background — Lava city and skyline"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[25%_center] md:object-center"
        />
      </motion.div>

      {/* ── Layer 1: Black Gradient (35% opacity) ── */}
      <div className="absolute inset-0 bg-black/35 -z-20 pointer-events-none" />

      {/* ── Layer 2: Warm Orange Gradient (10% opacity) ── */}
      <div 
        className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.1),_transparent_70%)]" 
      />

      {/* ── Layer 3: Soft Vignette ── */}
      <div 
        className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(circle,_transparent_35%,_rgba(10,9,8,0.7)_100%)]" 
      />

      {/* ── Layer 5: Subtle atmospheric embers ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-500/20 filter blur-[0.5px]"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${10 + (i * 7)}%`,
            }}
            animate={{
              y: [-10, -140, -10],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + i * 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      {/* ── Dynamic Overlay triggered on scroll ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-colors duration-100"
        style={{
          background: `rgba(0,0,0,${Math.min(scrollY / 1500, 0.45)})`
        }}
      />
      
      {/* ── Content Container (Fade Up transition) ── */}
      <motion.div 
        className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center h-full pt-16 lg:pt-0"
        style={{ opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Layer 4: Text area with glassmorphism blur box (45% width on desktop) */}
        <div className="w-full lg:w-[45%] bg-[#0a0908]/25 backdrop-blur-[3px] border border-white/5 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/45 select-text">
          <HeroContent />
          <HeroButtons />
        </div>
      </motion.div>

      {/* ── Scroll Indicator (Bottom Left) ── */}
      <div className="absolute bottom-8 left-8 sm:left-12 z-20 flex flex-col items-start gap-1 text-white/40 select-none pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{
            y: [0, 6, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-gold text-base font-semibold"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroContent } from "./hero/HeroContent";
import { HeroButtons } from "./hero/HeroButtons";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 600, 0);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex items-center bg-gradient-to-br from-zinc-900 to-black">
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
        className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none"
      >
        {isVideoPlaying && (
          <video
            autoPlay
            playsInline
            suppressHydrationWarning
            onEnded={() => setIsVideoPlaying(false)}
            className="absolute inset-0 w-full h-full object-cover object-center z-10"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        <Image
          src="/images/hero-cinematic.png"
          alt="Hero Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
      </motion.div>

      {/* ── Layer 1: Dark Overlay (lightened to show image) ── */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* ── Layer 2: Right-side Gradient for text contrast (kept dark on the right for text) ── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-black/90" 
      />

      {/* ── Layer 3: Soft Vignette (lightened) ── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,_transparent_50%,_rgba(0,0,0,0.5)_100%)]" 
      />

      {/* ── Layer 5: Subtle atmospheric embers ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
        className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-end h-full pt-16 lg:pt-0"
        style={{ opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Layer 4: Text area (45% width on desktop) - Removed blur background as requested */}
        <div className={`w-full lg:w-[45%] py-6 sm:py-10 lg:py-12 select-text transition-all duration-1000 delay-300 ${isVideoPlaying ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <HeroContent />
          <HeroButtons />
        </div>
      </motion.div>

      {/* ── Scroll Indicator (Bottom Left) ── */}
      <div className={`absolute bottom-8 left-8 sm:left-12 z-20 flex flex-col items-start gap-1 text-white/40 select-none pointer-events-none transition-opacity duration-1000 delay-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
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

"use client";

import { useEffect, useState } from "react";
import { HeroVideo } from "./hero/HeroVideo";
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
    <section id="top" className="relative h-screen w-full overflow-hidden">
      <HeroVideo />
      
      {/* Dynamic Overlay - Reduced to ~0.35 opacity as requested */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-colors duration-100"
        style={{
          background: `rgba(0,0,0,${Math.min(0.35 + (scrollY / 2000), 0.55)})`
        }}
      />
      
      {/* Content Container */}
      <div 
        className="relative z-10 h-full max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col justify-center"
        style={{ opacity }}
      >
        <div className="max-w-[620px]">
          <HeroContent />
          <HeroButtons />
        </div>
      </div>
    </section>
  );
}

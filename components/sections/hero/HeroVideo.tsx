"use client";

import { useEffect, useState } from "react";

export function HeroVideo() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (reducedMotion) {
    return (
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10" 
        style={{ backgroundImage: "url('/images/hero-poster.webp')" }} 
      />
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hero-video-fade {
          animation: customFadeIn 1.2s ease-out forwards;
        }
      `}} />
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 hero-video-fade"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}

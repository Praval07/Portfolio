"use client";

import { useEffect, useState } from "react";

export function AboutGallery() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="mb-24 rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-ink relative border border-line/10 shadow-2xl group">
      {isMounted && (
        <video
          src="/videos/about-video.mp4"
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </section>
  );
}

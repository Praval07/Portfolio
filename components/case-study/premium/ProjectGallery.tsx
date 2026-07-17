"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export function ProjectGallery({ gallery }: { gallery?: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNext = useCallback(() => setCurrentIndex((prev) => (prev + 1) % (gallery?.length || 1)), [gallery]);
  const handlePrev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + (gallery?.length || 1)) % (gallery?.length || 1)), [gallery]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-32 bg-[var(--color-paper-deep)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          className="mb-16 flex items-end justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight mb-4">
              Interface Gallery
            </h2>
            <p className="text-xl text-ink-soft font-light">
              High-fidelity pixels and polished interactions.
            </p>
          </div>
          <div className="hidden sm:flex gap-4">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-line flex items-center justify-center hover:bg-white hover:shadow-lg transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="w-12 h-12 rounded-full border border-line flex items-center justify-center hover:bg-white hover:shadow-lg transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Main Slider */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-ink/5 border border-line group cursor-pointer">
          <div 
            className="absolute inset-0 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink/10 backdrop-blur-[2px]"
            onClick={() => setLightboxOpen(true)}
          >
            <div className="flex items-center gap-2 px-6 py-3 bg-white text-ink rounded-full font-medium shadow-2xl scale-95 group-hover:scale-100 transition-transform">
              <Maximize2 size={16} /> View Fullscreen
            </div>
          </div>
          
          <Image
            src={gallery[currentIndex] as string}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          
          {/* Mobile controls */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between sm:hidden z-20 pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg">
              <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 mt-8 overflow-x-auto hide-scrollbar snap-x px-2 pb-4">
          {gallery.map((img, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden snap-center transition-all duration-300 ${i === currentIndex ? 'ring-2 ring-gold ring-offset-2 ring-offset-[var(--color-paper-deep)] opacity-100' : 'opacity-40 hover:opacity-100'}`}
            >
              <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={32} />
            </button>

            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-6 text-white/50 hover:text-white p-4 hidden sm:block">
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={gallery[currentIndex] as string}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                quality={100}
              />
            </div>

            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-6 text-white/50 hover:text-white p-4 hidden sm:block">
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-white/50">
              {currentIndex + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

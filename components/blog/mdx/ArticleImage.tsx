"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  gallery?: string[]; // Array of image URLs for a gallery
}

export function ArticleImage({ src, alt, caption, gallery }: ArticleImageProps) {
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  if (gallery && gallery.length > 0) {
    return (
      <figure className="my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((imgSrc, index) => (
            <div
              key={index}
              onClick={() => setZoomImg(imgSrc)}
              className="relative aspect-video rounded-2xl overflow-hidden border border-line cursor-zoom-in group bg-paper-deep"
            >
              <Image
                src={imgSrc}
                alt={`${alt} - Gallery Image ${index + 1}`}
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {caption && (
          <figcaption className="text-center font-mono text-[11px] text-stone mt-3 tracking-wide">
            {caption}
          </figcaption>
        )}

        <ZoomModal image={zoomImg} alt={alt} onClose={() => setZoomImg(null)} />
      </figure>
    );
  }

  return (
    <figure className="my-10">
      <div
        onClick={() => setZoomImg(src)}
        className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-line cursor-zoom-in group bg-paper-deep"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-w-1024px) 100vw, 800px"
          className="object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-center font-mono text-[11px] text-stone mt-3 tracking-wide">
          {caption}
        </figcaption>
      )}

      <ZoomModal image={zoomImg} alt={alt} onClose={() => setZoomImg(null)} />
    </figure>
  );
}

interface ZoomModalProps {
  image: string | null;
  alt: string;
  onClose: () => void;
}

function ZoomModal({ image, alt, onClose }: ZoomModalProps) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-1000 flex items-center justify-center bg-ink/90 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-paper/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close zoomed view"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden"
          >
            <Image
              src={image}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              quality={95}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

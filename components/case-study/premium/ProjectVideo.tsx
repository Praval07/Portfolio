"use client";

import { motion } from "framer-motion";

export function ProjectVideo({ video }: { video?: string }) {
  if (!video) return null;

  return (
    <section className="py-20 bg-[var(--color-paper)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-line bg-ink/5"
        >
          <iframe
            src={video}
            title="Project Demo Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}

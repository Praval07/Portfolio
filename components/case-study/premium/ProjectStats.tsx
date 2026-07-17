"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
import { ProjectStat } from "@/data/projects";

function AnimatedCounter({ from = 0, to, duration = 1.5 }: { from?: number, to: number, duration?: number }) {
  const [count, setCount] = React.useState(from);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInView) {
      let start = from;
      const ms = duration * 1000;
      const increment = (to - from) / (ms / 16);
      
      timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export function ProjectStats({ stats }: { stats?: ProjectStat[] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 bg-white border-b border-line">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="text-4xl sm:text-5xl font-display font-medium text-ink mb-2">
                {stat.prefix}
                <AnimatedCounter to={stat.to} />
                {stat.suffix}
              </div>
              <div className="font-mono text-xs text-stone tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

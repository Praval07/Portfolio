"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Star, GraduationCap as Cap, Briefcase, Code2, Target, ArrowRight, Download, Send } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative w-full py-24 px-4 sm:px-8 lg:px-12 flex items-center justify-center bg-ink">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-[1400px] h-[85vh] min-h-[700px] rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Background Image */}
        <Image
          src="/images/about-new-bg.jpg"
          alt="Praval Saxena About"
          fill
          quality={100}
          className="object-cover object-right"
        />

        {/* Content Container */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Header Texts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#E8A63D] font-mono text-xs sm:text-sm tracking-widest font-semibold mb-4 uppercase">
              About Me
            </p>
            <h2 className="text-2xl sm:text-3xl text-ink font-medium mb-2">
              Hello, I&apos;m 👋
            </h2>
            <h1 className="text-6xl sm:text-[5.5rem] lg:text-[6.5rem] font-serif font-bold leading-[1.05] tracking-tight mb-4">
              <span className="text-[#1a1a1a]">Praval</span><br />
              <span className="text-[#E8A63D]">Saxena</span>
            </h1>
            <h3 className="text-xl sm:text-2xl font-medium text-ink mb-6">
              AI Engineer
            </h3>
            <p className="text-ink/75 max-w-[450px] text-sm sm:text-base leading-relaxed mb-10">
              I am a passionate Computer Science Engineering student who loves building innovative solutions using AI and full-stack technologies.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-10 max-w-[650px]"
          >
            {/* Card 1 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5 flex gap-4 items-center flex-1 min-w-[180px] shadow-sm transition-all hover:bg-white/60">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#E8A63D] shrink-0 shadow-sm border border-white">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-[#1a1a1a] text-sm mb-0.5">Education</h4>
                <p className="text-xs text-ink/70 leading-tight">B.Tech in CSE<br/>(2023 - 2027)</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5 flex gap-4 items-center flex-1 min-w-[180px] shadow-sm transition-all hover:bg-white/60">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#E8A63D] shrink-0 shadow-sm border border-white">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-[#1a1a1a] text-sm mb-0.5">Location</h4>
                <p className="text-xs text-ink/70 leading-tight">Uttar Pradesh,<br/>India</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5 flex gap-4 items-center flex-1 min-w-[180px] shadow-sm transition-all hover:bg-white/60">
              <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#E8A63D] shrink-0 shadow-sm border border-white">
                <Star size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-[#1a1a1a] text-sm mb-0.5">Interests</h4>
                <p className="text-xs text-ink/70 leading-tight">Artificial Intelligence,<br/>Web Development,<br/>Open Source</p>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link 
              href="/#work" 
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-black transition-all duration-300 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              View Projects <ArrowRight size={16} className="text-[#E8A63D]" />
            </Link>
            
            <Link 
              href="/resume" 
              className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-white/80 hover:border-[#1a1a1a]/40 transition-all duration-300 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium hover:scale-105 active:scale-95"
            >
              <Download size={16} className="text-[#E8A63D]" /> Download Resume
            </Link>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-white/80 hover:border-[#1a1a1a]/40 transition-all duration-300 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium hover:scale-105 active:scale-95"
            >
              <Send size={16} className="text-[#E8A63D]" /> Let&apos;s Connect
            </Link>
          </motion.div>
        </div>

        {/* Bottom Right Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 bg-[#241e15]/85 backdrop-blur-xl rounded-[2rem] border border-white/10 p-5 sm:p-7 hidden md:flex items-center gap-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-20"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <Cap size={24} className="text-[#E8A63D] mb-2 opacity-80" />
            <span className="text-3xl font-serif font-bold text-white mb-1">3+</span>
            <span className="text-[10px] text-white/60 uppercase tracking-wider text-center">Years Learning</span>
          </div>
          <div className="w-[1px] h-16 bg-white/10" />
          
          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <Briefcase size={24} className="text-[#E8A63D] mb-2 opacity-80" />
            <span className="text-3xl font-serif font-bold text-white mb-1">10+</span>
            <span className="text-[10px] text-white/60 uppercase tracking-wider text-center">Projects</span>
          </div>
          <div className="w-[1px] h-16 bg-white/10" />
          
          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <Code2 size={24} className="text-[#E8A63D] mb-2 opacity-80" />
            <span className="text-3xl font-serif font-bold text-white mb-1">5+</span>
            <span className="text-[10px] text-white/60 uppercase tracking-wider text-center">Technologies</span>
          </div>
          <div className="w-[1px] h-16 bg-white/10" />
          
          {/* Stat 4 */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <Target size={24} className="text-[#E8A63D] mb-2 opacity-80" />
            <span className="text-3xl font-serif font-bold text-white mb-1">1</span>
            <span className="text-[10px] text-white/60 uppercase tracking-wider text-center">Mission</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

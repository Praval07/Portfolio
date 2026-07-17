"use client";

import { Printer, Download, Mail, MapPin, Globe, FileText } from "lucide-react";

export default function ResumePage() {
  function handlePrint() {
    window.print();
  }

  return (
    <div className="pt-32 pb-24 max-w-[900px] mx-auto px-4 sm:px-6">
      {/* Resume Top Control Bar */}
      <section className="mb-10 flex items-center justify-between gap-4 border-b border-line pb-6 print:hidden">
        <div>
          <h1 className="text-3xl font-display font-semibold flex items-center gap-2">
            <FileText size={28} className="text-gold" /> Curriculum Vitae
          </h1>
          <p className="text-stone text-xs">Print or download my professional technical resume.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="font-mono text-xs px-4 py-2.5 rounded-full border border-line hover:border-ink bg-surface text-ink transition-colors flex items-center gap-1.5"
          >
            <Printer size={13} /> Print Resume
          </button>
          <a
            href="/resume.pdf"
            download
            className="font-mono text-xs px-4 py-2.5 rounded-full bg-gold text-ink hover:bg-gold-soft transition-colors flex items-center gap-1.5"
          >
            <Download size={13} /> Download PDF
          </a>
        </div>
      </section>

      {/* Styled A4 Printable Sheet */}
      <article className="bg-white border border-line-strong/30 rounded-3xl p-8 sm:p-12 shadow-md text-zinc-950 font-sans print:shadow-none print:border-none print:p-0 print:rounded-none">
        {/* CV Header */}
        <header className="border-b-2 border-zinc-900 pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-zinc-950 tracking-tight leading-none mb-2">
              PRAVAL SAXENA
            </h2>
            <p className="font-mono text-xs font-semibold text-gold-deep uppercase tracking-wider">
              AI Engineer &amp; Full Stack Software Developer
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-xs text-zinc-700 text-center sm:text-right font-mono">
            <span className="flex items-center sm:justify-end gap-1"><Mail size={12} /> pravalsaxenapravalsaxena@gmail.com</span>
            <span className="flex items-center sm:justify-end gap-1"><MapPin size={12} /> Bareilly, Uttar Pradesh, India</span>
            <span className="flex items-center sm:justify-end gap-1"><Globe size={12} /> github.com/Praval07</span>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8">
          <h3 className="text-sm font-mono font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wider mb-3">
            Professional Summary
          </h3>
          <p className="text-zinc-700 text-sm leading-relaxed">
            Goal-driven Computer Science Engineering undergraduate specializing in artificial intelligence integration, computer vision systems, and Next.js full-stack architectures. Proven ability to lead development groups in national hacking sprints (SIH 2024) and engineer responsive, low-latency client utilities. Committed to clean architecture and sub-100ms web performance paths.
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h3 className="text-sm font-mono font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wider mb-3">
            Education
          </h3>
          <div className="flex justify-between items-start text-sm">
            <div>
              <h4 className="font-bold text-zinc-900">B.Tech in Computer Science and Engineering</h4>
              <p className="text-zinc-600 text-xs">Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh</p>
              <p className="text-zinc-500 text-[10px] font-mono">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</p>
            </div>
            <div className="text-right text-xs font-mono text-zinc-700 shrink-0">
              <span>2023 — 2027</span>
            </div>
          </div>
        </section>

        {/* Experience & Timeline */}
        <section className="mb-8">
          <h3 className="text-sm font-mono font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wider mb-3">
            Experience &amp; Leadership
          </h3>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start text-sm mb-1">
                <h4 className="font-bold text-zinc-900">Development Team Lead</h4>
                <span className="text-xs font-mono text-zinc-700">SIH 2024</span>
              </div>
              <p className="text-zinc-500 text-xs italic mb-2">Smart India Hackathon national rounds</p>
              <ul className="list-disc list-inside text-zinc-700 text-sm flex flex-col gap-1">
                <li>Commanded a 6-member student developer team to create localized database tools.</li>
                <li>Implemented backend RESTful endpoints, achieving fast data latency responses.</li>
                <li>Presented structural diagrams and pitch decks to jury committees.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start text-sm mb-1">
                <h4 className="font-bold text-zinc-900">AI and Machine Learning Intern</h4>
                <span className="text-xs font-mono text-zinc-700">Summer 2024</span>
              </div>
              <p className="text-zinc-500 text-xs italic mb-2">IBM SkillsBuild &amp; AICTE Virtual Internship</p>
              <ul className="list-disc list-inside text-zinc-700 text-sm flex flex-col gap-1">
                <li>Engineered machine learning classifiers and verified training models.</li>
                <li>Completed modules in data preprocessing techniques and prompt engineering.</li>
                <li>Built functional notebook reports summarizing algorithm metrics.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-8">
          <h3 className="text-sm font-mono font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wider mb-3">
            Selected Technical Projects
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-start text-sm">
                <h4 className="font-bold text-zinc-900">AlpURL — AI Link Router</h4>
                <span className="text-xs font-mono text-zinc-700">TypeScript, Next.js, Node.js</span>
              </div>
              <p className="text-zinc-700 text-xs leading-relaxed mt-1">
                Full-stack URL shortening engine with detailed user analytics. Engineered low-latency routing layers and responsive dashboard panels.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start text-sm">
                <h4 className="font-bold text-zinc-900">MOHINI — Conversational Voice Assistant</h4>
                <span className="text-xs font-mono text-zinc-700">Python, Local LLMs, Whisper STT</span>
              </div>
              <p className="text-zinc-700 text-xs leading-relaxed mt-1">
                Local desktop voice assistant featuring Whisper transcription, Llama quantized inference, and PyAudio audio synthesis. Privately executes operations on local directories.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start text-sm">
                <h4 className="font-bold text-zinc-900">N.E.T.R.A.-R — Vision Terrain Segmentation</h4>
                <span className="text-xs font-mono text-zinc-700">Python, OpenCV, PyTorch, PyQT</span>
              </div>
              <p className="text-zinc-700 text-xs leading-relaxed mt-1">
                Computer-vision utility for extracting roads and terrain matrices from high-resolution satellite imagery using deep learning segmentation maps.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Index */}
        <section>
          <h3 className="text-sm font-mono font-bold text-zinc-900 border-b border-zinc-200 pb-1.5 uppercase tracking-wider mb-3">
            Technical Skillset
          </h3>
          <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
            <div>
              <span className="font-bold text-zinc-900">Languages:</span> <span className="text-zinc-700">Python, C++, TypeScript, JavaScript, SQL</span>
            </div>
            <div>
              <span className="font-bold text-zinc-900">Backend:</span> <span className="text-zinc-700">Node.js, Express, RESTful APIs, Prisma</span>
            </div>
            <div>
              <span className="font-bold text-zinc-900">Frontend:</span> <span className="text-zinc-700">React, Next.js (App Router), Tailwind, CSS3</span>
            </div>
            <div>
              <span className="font-bold text-zinc-900">AI &amp; Data:</span> <span className="text-zinc-700">PyTorch, OpenCV, LLM Integration, MongoDB, Postgres</span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

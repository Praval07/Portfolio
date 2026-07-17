"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Award, ExternalLink, X, Calendar, User, CheckCircle } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "AI" | "Development" | "Programs";
  verificationUrl?: string;
  credentialId?: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: "bharatiya-antariksh",
    title: "National Hackathon Team Leader Certificate",
    issuer: "Bharatiya Antariksh Hackathon 2026",
    date: "2026",
    category: "Programs",
  },
  {
    id: "hcl-hackathon",
    title: "National Hackathon Team Leader Certificate",
    issuer: "HCL Hackathon 2026",
    date: "2026",
    category: "Programs",
  },
  {
    id: "lenovo-leap",
    title: "NextGen Scholar Certificate",
    issuer: "Lenovo LEAP Program",
    date: "2025",
    category: "Programs",
    verificationUrl: "https://lenovo.com",
    credentialId: "LEAP-2025-098",
  },
  {
    id: "sih-final",
    title: "National Hackathon Participant Certificate",
    issuer: "Smart India Hackathon 2025",
    date: "2025",
    category: "Programs",
    verificationUrl: "https://sih.gov.in",
    credentialId: "SIH-2025-PARTICIPANT",
  },
  {
    id: "ibm-ai",
    title: "AI & Machine Learning Internship Certificate",
    issuer: "IBM SkillsBuild & AICTE",
    date: "2024",
    category: "AI",
    verificationUrl: "https://skillsbuild.org",
    credentialId: "IBM-SB-AI-902",
  },
];

export default function CertificatesPage() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const filteredCerts = CERTIFICATES.filter(
    (c) => selectedCat === "All" || c.category === selectedCat
  );

  return (
    <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="mb-16">
        <Reveal>
          <p className="eyebrow mb-4">Credentials</p>
          <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-tight mb-8">
            Certifications<br />
            <span className="text-gold">&amp; Badges.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
            A verified archive of my academic achievements, industry programs, and hackathon leader awards.
          </p>
        </Reveal>
      </section>

      {/* Filter Toolbar */}
      <section className="mb-12 border-b border-line pb-8 flex justify-start gap-2">
        {["All", "AI", "Development", "Programs"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`font-mono text-xs px-5 py-2.5 rounded-full border transition-all ${
              selectedCat === cat
                ? "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper"
                : "bg-surface text-ink-soft border-line hover:border-ink-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grid Gallery */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 0.05}>
            <Card className="hover:border-gold transition-colors duration-300 h-full flex flex-col justify-between cursor-pointer" onClick={() => setActiveCert(cert)}>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center border border-gold/15">
                    <Award className="text-gold" size={20} />
                  </div>
                  <span className="font-mono text-[0.65rem] border border-line rounded px-2 py-0.5 text-stone uppercase tracking-wider bg-paper-deep">
                    {cert.category}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-ink hover:text-gold transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-stone mb-4">{cert.issuer}</p>
              </div>
              <div className="border-t border-line pt-4 mt-6 flex justify-between items-center font-mono text-xs text-stone">
                <span className="flex items-center gap-1"><Calendar size={13} /> {cert.date}</span>
                <span className="text-gold-deep hover:underline flex items-center gap-1">
                  Preview <ExternalLink size={12} />
                </span>
              </div>
            </Card>
          </Reveal>
        ))}
      </section>

      {/* Certificate Modal Preview */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-ink/65 backdrop-blur-sm"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="w-full max-w-lg bg-surface border border-line rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-mono text-[0.65rem] text-gold-deep border border-gold/20 rounded px-2.5 py-0.5 uppercase tracking-wider bg-gold/5 mb-2 inline-block">
                  Verified {activeCert.category} Credential
                </span>
                <h3 className="text-2xl font-display font-semibold text-ink leading-tight">
                  {activeCert.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-stone hover:text-ink hover:border-ink transition-colors bg-paper"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-8 text-sm text-ink-soft">
              <div className="flex items-center gap-3">
                <User size={16} className="text-gold" />
                <span>Issued by: <strong>{activeCert.issuer}</strong></span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <Calendar size={16} className="text-gold" />
                <span>Date: {activeCert.date}</span>
              </div>
              {activeCert.credentialId && (
                <div className="flex items-center gap-3 font-mono text-xs">
                  <CheckCircle size={16} className="text-gold" />
                  <span>Credential ID: {activeCert.credentialId}</span>
                </div>
              )}
            </div>

            {activeCert.verificationUrl && (
              <a
                href={activeCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-paper font-mono text-xs font-semibold rounded-full py-3 px-6 hover:bg-gold hover:text-ink transition-colors flex items-center justify-center gap-1.5 w-full"
              >
                Verify Credential <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

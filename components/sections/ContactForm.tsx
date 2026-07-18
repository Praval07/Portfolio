"use client";

import { useState } from "react";
import { Mail, MapPin, Calendar as CalendarIcon, Clock, Github, Linkedin, Instagram } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  }

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-stretch w-full">
      {/* Contact Form */}
      <div className="lg:col-span-7 flex flex-col">
        <Reveal className="bg-surface border border-line rounded-3xl p-6 sm:p-10 shadow-sm flex-1">
          <h2 className="font-display text-2xl font-semibold mb-6 text-ink">Send Message</h2>
          {submitted ? (
            <div className="py-8 text-center text-gold-deep font-mono text-sm">
              ✓ Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user_name" className="font-mono text-[10px] text-stone uppercase">Full Name</label>
                  <input
                    type="text"
                    id="user_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-paper border border-line rounded-full px-4 py-3 text-xs text-ink outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user_email" className="font-mono text-[10px] text-stone uppercase">Email Address</label>
                  <input
                    type="email"
                    id="user_email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-paper border border-line rounded-full px-4 py-3 text-xs text-ink outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="font-mono text-[10px] text-stone uppercase">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Collaboration"
                  className="bg-paper border border-line rounded-full px-4 py-3 text-xs text-ink outline-none focus:border-gold transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="msg" className="font-mono text-[10px] text-stone uppercase">Message</label>
                <textarea
                  id="msg"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Praval, I'd like to discuss a project..."
                  className="bg-paper border border-line rounded-2xl px-4 py-3 text-xs text-ink outline-none focus:border-gold transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-ink text-paper hover:bg-gold hover:text-ink font-mono text-xs font-semibold rounded-full py-4 px-8 transition-colors w-full cursor-pointer text-center"
              >
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>

      {/* Sidebar Info & Scheduler */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-8 w-full h-full">
        {/* Quick Details */}
        <Reveal className="bg-surface border border-line rounded-3xl p-6 shadow-sm flex-1">
          <h2 className="font-display text-lg font-semibold mb-4 text-ink">Contact Information</h2>
          <div className="flex flex-col gap-4 text-sm text-ink-soft">
            <div className="flex items-center gap-3">
              <Mail className="text-gold shrink-0" size={18} />
              <a href={`mailto:${profile.email}`} className="hover:text-gold transition-colors">{profile.email}</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gold shrink-0" size={18} />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-start gap-3">
              <CalendarIcon className="text-gold shrink-0 mt-1" size={18} />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-ink">Open to</span>
                <span className="text-stone">Internships, AI Engineering, Research Collaboration, Open Source, Freelance</span>
              </div>
            </div>
          </div>

          {/* Social Grid */}
          <div className="border-t border-line mt-6 pt-6">
            <h3 className="font-mono text-[10px] text-stone uppercase mb-3">SOCIAL CONNECTIONS</h3>
            <div className="flex gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-8 h-8 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center justify-center bg-paper text-ink">
                <Github size={14} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-8 h-8 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center justify-center bg-paper text-ink">
                <Linkedin size={14} />
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="w-8 h-8 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center justify-center bg-paper text-ink">
                <Instagram size={14} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Calendly-style mock Scheduler widget */}
        <Reveal className="bg-ink text-paper rounded-3xl p-6 border border-white/5 relative overflow-hidden flex flex-col gap-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono text-[0.65rem] tracking-wider text-gold uppercase">SCHEDULE A MEET</h3>
              <Clock size={16} className="text-gold" />
            </div>
            <h4 className="font-display text-xl font-semibold mb-2">Book a Meeting</h4>
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-stone text-sm flex items-center gap-2" style={{ color: "#A8A39A" }}>
                <Clock size={14} /> 30 Minutes
              </span>
              <span className="text-stone text-sm flex items-center gap-2" style={{ color: "#A8A39A" }}>
                <MapPin size={14} /> Google Meet
              </span>
            </div>
            
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-ink font-mono text-xs font-semibold rounded-full py-4 hover:bg-gold-soft transition-colors w-full text-center block"
            >
              Launch Calendly
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionRail } from "@/components/ui/SectionRail";
import { social } from "@/data/social";

type Status = "idle" | "submitting" | "success" | "error";

const details = [
  { icon: Mail, label: "Email", value: social.email },
  { icon: Phone, label: "Phone", value: "[Add phone number]" },
  { icon: MapPin, label: "Location", value: "Uttar Pradesh, India" },
  { icon: Clock, label: "Availability", value: "Open to Opportunities" },
];

/** Same placeholder /api/contact endpoint as before — see the route file
 *  and README for what needs wiring before this actually sends email. */
function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-gold-soft font-mono text-sm" role="status">
        Message sent — thank you. I&rsquo;ll reply within a few days.
      </p>
    );
  }

  const fieldClasses =
    "w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-paper placeholder:text-white/30 focus-visible:border-gold outline-none text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" placeholder="Your Name" required className={fieldClasses} aria-label="Your name" />
        <input name="email" type="email" placeholder="Your Email" required className={fieldClasses} aria-label="Your email" />
      </div>
      <input name="subject" placeholder="Subject" className={fieldClasses} aria-label="Subject" />
      <textarea name="message" placeholder="Your Message" required rows={4} className={`${fieldClasses} resize-none`} aria-label="Message" />
      {status === "error" && (
        <p className="text-sm" style={{ color: "#E58F6B" }} role="alert">
          Something went wrong — email me directly at{" "}
          <a href={`mailto:${social.email}`} className="underline">{social.email}</a>.
        </p>
      )}
      <Button type="submit" variant="gold" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"} <span aria-hidden="true">↗</span>
      </Button>
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink py-20 sm:py-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="07" label="Contact" />
        <div className="flex-1 grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <p className="eyebrow mb-4" style={{ color: "var(--color-gold-soft)" }}>Contact</p>
            <h2 className="text-4xl sm:text-6xl leading-[1.05] text-paper mb-10">
              Let&rsquo;s Build Something <span className="text-gold-soft">Amazing</span>
            </h2>
            <ul className="space-y-6">
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold-soft" />
                  </span>
                  <div>
                    <span className="font-mono text-xs block" style={{ color: "#8B877F" }}>{label}</span>
                    <span className="text-paper text-sm">{value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

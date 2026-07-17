import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Me — Praval Saxena",
  description: "Get in touch with Praval Saxena for collaborations, projects, or internship opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="mb-16">
        <Reveal>
          <p className="eyebrow mb-4">Get In Touch</p>
          <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-tight mb-8">
            Let&apos;s Build Something<br />
            <span className="text-gold">Remarkable Together.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-2xl leading-relaxed">
            Have an idea you want to develop, a job vacancy, or just want to connect? Drop a message or choose a time on my calendar.
          </p>
        </Reveal>
      </section>

      {/* Interactive Contact Form (Client Component) */}
      <ContactForm />
    </div>
  );
}

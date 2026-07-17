import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { LinkButton } from "@/components/ui/Button";
import { GraduationCap, MapPin, Heart } from "lucide-react";

const facts = [
  { icon: GraduationCap, label: "Education", value: "B.Tech CSE\n2023 – 2027" },
  { icon: MapPin, label: "Location", value: "Uttar Pradesh,\nIndia" },
  { icon: Heart, label: "Interest", value: "AI, Web Dev,\nOpen Source" },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="01" label="About Me" />
        <div className="flex-1 grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center">
          <Reveal className="relative max-w-sm mx-auto md:mx-0">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-paper-deep">
              <Image
                src="/assets/portrait-1200.jpg"
                alt="Portrait of Praval Saxena"
                fill
                sizes="(max-width: 768px) 80vw, 32vw"
                className="object-cover"
              />
            </div>
            <span className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-gold" aria-hidden="true" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">About Me</p>
            <h2 className="text-4xl sm:text-5xl leading-tight mb-6">
              Turning Ideas Into <span className="text-gold-deep">Intelligent</span> Solutions
            </h2>
            <p className="text-ink-soft text-lg max-w-[54ch] mb-8">
              I am a passionate Computer Science Engineering student who loves building
              innovative solutions using AI and full stack technologies. I enjoy solving
              real-world problems and creating products that make a difference.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <Icon size={18} className="text-gold-deep mb-2" />
                  <span className="font-mono text-xs text-stone block mb-1">{label}</span>
                  <span className="text-sm whitespace-pre-line">{value}</span>
                </div>
              ))}
            </div>

            <LinkButton href="/#work" variant="primary">
              Know About Me <span aria-hidden="true">↗</span>
            </LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

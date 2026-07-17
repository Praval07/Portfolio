import { Mail, ArrowDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { social } from "@/data/social";

export function ResumeCTA() {
  return (
    <section id="resume-cta" className="py-10 sm:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F2C46B]/40 via-[#F2C46B]/25 to-[#F2C46B]/10 border border-gold/30 px-6 sm:px-12 py-10 sm:py-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shrink-0">
              <Mail size={20} className="text-ink" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl mb-1">Download My Resume</h2>
              <p className="text-ink-soft text-sm max-w-md">
                Get a detailed overview of my skills, experience, and achievements.
              </p>
            </div>
          </div>
          <LinkButton href={social.resumeHref} variant="primary">
            Download Resume <ArrowDown size={14} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

import { FileDown, ExternalLink } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { social } from "@/data/social";
import { experience } from "@/data/experience";
import { skillCategories } from "@/data/skills";

/**
 * Interactive resume section — per Part 2.2 §11, this is not just an
 * embedded PDF. It renders the timeline and skills inline, and offers
 * the PDF as a download/print option alongside.
 *
 * Drop the real file at /public/resume.pdf for the download link to work.
 */
export function ResumeViewer() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-2xl">Resume</h3>
        <div className="flex gap-3">
          <LinkButton href={social.resumeHref} variant="secondary">
            <FileDown size={14} /> Download PDF
          </LinkButton>
          <LinkButton href={social.resumeHref} variant="text">
            <ExternalLink size={14} /> Open in new tab
          </LinkButton>
        </div>
      </div>

      <div>
        <h4 className="font-mono text-xs uppercase tracking-wider text-stone mb-4">Experience</h4>
        <ul className="space-y-6">
          {experience.map((item) => (
            <li key={item.title + item.dateRange} className="border-t border-line pt-4">
              <span className="font-mono text-xs text-copper">{item.dateRange}</span>
              <h5 className="text-lg mt-1">{item.title}</h5>
              <span className="font-mono text-xs text-stone block mb-2">{item.org}</span>
              <p className="text-ink-soft text-sm max-w-2xl">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-mono text-xs uppercase tracking-wider text-stone mb-4">Skills</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.category}>
              <h5 className="font-mono text-xs text-ink-soft mb-2">{cat.category}</h5>
              <ul className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <li key={skill} className="text-xs border border-line rounded-full px-2.5 py-1 text-ink-soft">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

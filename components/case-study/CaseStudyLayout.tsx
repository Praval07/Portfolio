import type { ReactNode } from "react";

/**
 * Wraps rendered MDX body content with editorial typographic rules —
 * generous measure, comfortable line-height, and headings styled to
 * match the rest of the design system (Fraunces display + hairline
 * rules), so long-form engineering writeups stay readable rather than
 * turning into a wall of text.
 */
export function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <article className="max-w-[720px] mx-auto px-6 py-20">
      <div
        className="
          [&>h2]:font-display [&>h2]:text-3xl [&>h2]:mt-16 [&>h2]:mb-5 [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-line first:[&>h2]:border-t-0 first:[&>h2]:pt-0 first:[&>h2]:mt-0
          [&>p]:text-ink-soft [&>p]:leading-relaxed [&>p]:mb-5 [&>p]:text-[1.05rem]
          [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-5 [&>ul]:text-ink-soft
          [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-5 [&>ol]:text-ink-soft
          [&_a]:underline [&_a]:decoration-line-strong hover:[&_a]:text-copper
          [&_code]:font-mono [&_code]:text-sm [&_code]:bg-paper-deep [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
        "
      >
        {children}
      </div>
    </article>
  );
}

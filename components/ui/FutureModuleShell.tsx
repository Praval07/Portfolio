import Link from "next/link";

interface FutureModuleShellProps {
  eyebrow: string;
  title: string;
  description: string;
  plannedFeatures: string[];
}

/**
 * Shared shell for not-yet-built future modules (AI Assistant, Research
 * Hub, Innovation Lab, Blog — see Part 12 of the design bible). These are
 * UI-only placeholders with no backend: routed, styled consistently with
 * the rest of the site, and honest about being in progress rather than
 * a broken or empty page.
 */
export function FutureModuleShell({ eyebrow, title, description, plannedFeatures }: FutureModuleShellProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-48 pb-32">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl mb-6">{title}</h1>
      <p className="text-ink-soft text-lg mb-10">{description}</p>

      <div className="border-t border-line pt-8 mb-10">
        <h2 className="font-mono text-xs uppercase tracking-wider text-stone mb-4">Planned</h2>
        <ul className="space-y-2">
          {plannedFeatures.map((f) => (
            <li key={f} className="text-ink-soft text-sm flex gap-3">
              <span className="text-copper">—</span>{f}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/" className="font-mono text-sm border-b border-ink pb-0.5">
        ← Back to homepage
      </Link>
    </div>
  );
}

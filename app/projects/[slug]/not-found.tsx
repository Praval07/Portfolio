import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 pt-48 pb-32 text-center">
      <p className="eyebrow justify-center mb-4">404</p>
      <h1 className="text-4xl mb-4 font-display font-semibold">Project Not Found</h1>
      <p className="text-ink-soft mb-8">
        This project could not be found. It may have been archived or renamed.
      </p>
      <Link href="/projects" className="font-mono text-sm border-b border-ink pb-0.5 hover:text-gold transition-colors">
        ← Back to all projects
      </Link>
    </div>
  );
}

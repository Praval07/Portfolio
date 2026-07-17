import { FutureModuleShell } from "@/components/ui/FutureModuleShell";

export const metadata = { title: "Research — Praval Saxena" };

export default function ResearchPage() {
  return (
    <FutureModuleShell
      eyebrow="Coming soon"
      title="Research"
      description="Notes on AI systems, architecture, and technology comparisons — documenting genuine learning and experimentation rather than polished conclusions."
      plannedFeatures={[
        "AI and system design notes",
        "Technology comparisons and trade-off write-ups",
        "Searchable, linked to related case studies",
      ]}
    />
  );
}

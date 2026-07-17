import { FutureModuleShell } from "@/components/ui/FutureModuleShell";

export const metadata = { title: "Praval Intelligence — Praval Saxena" };

export default function AiAssistantPage() {
  return (
    <FutureModuleShell
      eyebrow="Coming soon"
      title="Praval Intelligence"
      description="A structured knowledge layer over this portfolio's real content — not a generic chatbot — that can explain projects, architecture decisions, and engineering reasoning grounded only in what's actually published here."
      plannedFeatures={[
        "Instant answers: navigation, search, project summaries",
        "Engineering Mentor mode: architecture and trade-off walkthroughs using real projects",
        "Clear separation between portfolio facts and general explanation — never fabricated",
      ]}
    />
  );
}

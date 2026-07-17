import { FutureModuleShell } from "@/components/ui/FutureModuleShell";

export const metadata = { title: "Innovation Lab — Praval Saxena" };

export default function LabPage() {
  return (
    <FutureModuleShell
      eyebrow="Coming soon"
      title="Innovation Lab"
      description="Experiments and works-in-progress — shown for curiosity, not polish. This is where half-finished ideas will live in the open."
      plannedFeatures={[
        "AI agent experiments",
        "System design prototypes",
        "Open, dated, and honest about what did and didn't work",
      ]}
    />
  );
}

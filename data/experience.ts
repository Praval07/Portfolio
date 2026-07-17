export interface ExperienceItem {
  dateRange: string;
  title: string;
  org: string;
  description: string;
}

// PLACEHOLDER DATA — replace with real roles, dates, and outcomes.
// Frame each entry around the problem solved, not just the title held.
export const experience: ExperienceItem[] = [
  {
    dateRange: "2025 — Present",
    title: "[Role Title]",
    org: "[Company / Organization]",
    description:
      "[Describe the problem you were brought in to solve, the engineering decisions you made, and the measurable or observed impact.]",
  },
  {
    dateRange: "2024 — 2025",
    title: "[Role Title]",
    org: "[Company / Organization]",
    description:
      "[Describe responsibilities, technologies used, and lessons learned — written the way you'd explain it to another engineer.]",
  },
  {
    dateRange: "2023 — 2024",
    title: "[Role Title / Education]",
    org: "[Institution / Company]",
    description:
      "[Foundational experience — coursework, early internship, or first serious project work.]",
  },
];

export interface SkillBadge {
  label: string;
  short: string; // shown inside the badge glyph
  color: string; // accent color for the badge glyph
}

// Flat badge list for the dark "Technologies I Work With" grid.
// Brand marks are represented as colored monogram badges rather than
// imported logo assets, to keep this original and dependency-free.
export const skillBadges: SkillBadge[] = [
  { label: "Python", short: "Py", color: "#3776AB" },
  { label: "C++", short: "C++", color: "#00599C" },
  { label: "JavaScript", short: "JS", color: "#F7DF1E" },
  { label: "TypeScript", short: "TS", color: "#3178C6" },
  { label: "React", short: "R", color: "#61DAFB" },
  { label: "Next.js", short: "N", color: "#FFFFFF" },
  { label: "Node.js", short: "Nd", color: "#3C873A" },
  { label: "Express", short: "Ex", color: "#FFFFFF" },
  { label: "MongoDB", short: "Mo", color: "#47A248" },
  { label: "PostgreSQL", short: "Pg", color: "#336791" },
  { label: "Git", short: "Git", color: "#F05032" },
  { label: "GitHub", short: "Gh", color: "#FFFFFF" },
  { label: "HTML5", short: "5", color: "#E34F26" },
  { label: "CSS3", short: "3", color: "#1572B6" },
  { label: "Tailwind CSS", short: "Tw", color: "#38BDF8" },
  { label: "AI / ML", short: "AI", color: "#E8A63D" },
];

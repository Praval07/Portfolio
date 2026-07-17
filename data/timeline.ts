export interface TimelineMilestone {
  year: string;
  title: string;
  role?: string;
  description: string | string[];
  tag: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2024",
    title: "IBM SkillsBuild",
    description: "Completed AICTE IBM SkillsBuild learning pathways.",
    tag: "IBM SKILLSBUILD"
  },
  {
    year: "2024",
    title: "GIVI HCL Hackathon",
    role: "Team Leader",
    description: "Led planning, architecture and software development for the competition.",
    tag: "TEAM LEADER"
  },
  {
    year: "2025",
    title: "Smart India Hackathon",
    role: "Participant",
    description: "Contributed as a software development team member.",
    tag: "PARTICIPANT"
  },
  {
    year: "2026",
    title: "Lenovo Internship - Lenovo LEAP NextGen Scholar",
    description: "Selected for Lenovo's NextGen Scholar Program focusing on AI, computing and professional development.",
    tag: "LENOVO LEAP"
  },
  {
    year: "2026",
    title: "Bharatiya Antariksh Hackathon 2026",
    role: "Team Leader",
    description: "Led the engineering team in designing innovative space technology solutions.",
    tag: "TEAM LEADER"
  },
  {
    year: "2026 – Present",
    title: "AI Development & Full Stack Engineering",
    description: [
      "Working on advanced AI systems including MOHINI AI, Nexora AI, AlpURL and Rapid Revision Hub.",
      "Focused on AI Engineering, Full Stack Development, System Design, Performance Optimization, and Developer Experience."
    ],
    tag: "PERSONAL ENGINEERING LAB"
  }
];

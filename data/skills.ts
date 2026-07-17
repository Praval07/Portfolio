export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills = {
  languages: ["Python", "C++", "JavaScript", "TypeScript", "HTML", "CSS"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express.js", "REST API"],
  ai: ["Artificial Intelligence", "LangChain", "LangGraph", "Prompt Engineering", "LLM Applications"],
  databases: ["MongoDB", "SQLite"],
  tools: ["Git", "GitHub", "VS Code", "Vercel", "Postman"],
  concepts: ["System Design", "Data Structures", "Algorithms", "OOP", "Software Engineering"]
};

export const skillCategories: SkillCategory[] = [
  { category: "Programming Languages", items: skills.languages },
  { category: "Frontend Web Stack", items: skills.frontend },
  { category: "Backend Engineering", items: skills.backend },
  { category: "Artificial Intelligence & LLMs", items: skills.ai },
  { category: "Databases & Storage", items: skills.databases },
  { category: "Tools & Environments", items: skills.tools },
  { category: "Core CS Concepts", items: skills.concepts }
];

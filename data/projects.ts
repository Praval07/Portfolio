import { LucideIcon } from "lucide-react";

export interface ProjectStat {
  label: string;
  to: number;
  suffix?: string;
  prefix?: string;
}

export interface ProjectOverview {
  image: string;
  problem: string;
  solution: string;
  goals: string;
}

export interface ProjectFeature {
  icon: string; // Name of lucide-react icon, e.g., 'Mic', 'Search'
  title: string;
  desc: string;
}

export interface ProjectArchitectureNode {
  label: string;
  sub: string;
}

export interface ProjectTimelineStep {
  phase: string;
  date: string;
  desc: string;
}

export interface ProjectTechCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface ProjectChallenge {
  icon: string;
  title: string;
  desc: string;
}

export interface ProjectResult {
  title: string;
  val: string;
  desc: string;
}

export interface ProjectRoadmapItem {
  icon: string;
  title: string;
  desc: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tag: string;
  year: string;
  status: string;
  role: string;
  duration: string;
  focus: string[];
  github: string;
  demo: string;
  docs?: string;
  
  heroImage?: string;
  banner?: string;
  thumbnail?: string;

  stats?: ProjectStat[];
  overview?: ProjectOverview;
  features?: ProjectFeature[];
  architecture?: ProjectArchitectureNode[];
  gallery?: string[];
  video?: string;
  timeline?: ProjectTimelineStep[];
  techStack?: ProjectTechCategory[];
  challenges?: ProjectChallenge[];
  results?: ProjectResult[];
  roadmap?: ProjectRoadmapItem[];
  
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "mohini-ai",
    title: "MOHINI AI",
    subtitle: "A personal AI desktop companion",
    description: "A conversational AI desktop assistant focused on natural, emotionally aware dialogue, voice interaction, desktop automation, and local system integration powered by modern local AI models.",
    category: "AI • Voice Assistant",
    tag: "Artificial Intelligence",
    year: "2026",
    status: "Active Development",
    role: "Full Stack Developer",
    duration: "6 Months",
    focus: ["AI", "Desktop", "Voice", "LLM", "Automation"],
    github: "https://github.com/Praval07/Mohini",
    demo: "",
    docs: "",
    heroImage: "/projects/mohini-ai/thumbnail.jpg",
    thumbnail: "/projects/mohini-ai/thumbnail.jpg",
    gallery: [
      "/projects/mohini-ai/thumbnail.jpg",
      "/projects/mohini/gallery/1.png",
      "/projects/mohini/gallery/2.png"
    ],
    stats: [
      { label: "Conversation Engine Latency", to: 50, suffix: "ms", prefix: "<" },
      { label: "Local LLM Parameters", to: 7, suffix: "B" },
      { label: "Languages Supported", to: 15, suffix: "+" },
      { label: "Offline Capability", to: 100, suffix: "%" },
    ],
    overview: {
      image: "/projects/mohini/gallery/1.png",
      problem: "Current voice assistants are cloud-dependent, slow, and lack deep OS integration.",
      solution: "MOHINI is designed to provide conversational intelligence while running completely locally, combining language models, TTS, and desktop automation into a native experience.",
      goals: "Absolute privacy, zero latency for local operations, and feeling like a native OS extension."
    },
    features: [
      { icon: "Mic", title: "Voice Conversation", desc: "Natural bi-directional voice chat with interruption handling." },
      { icon: "Zap", title: "Wake Word", desc: "Always-on local wake word detection with zero cloud dependency." },
      { icon: "Terminal", title: "Desktop Automation", desc: "Control OS features, open apps, and trigger complex workflows." },
      { icon: "Search", title: "File Search", desc: "Semantic local file search integrated with the LLM." },
      { icon: "Camera", title: "Screenshot Analysis", desc: "Vision models analyze your current screen on demand." },
      { icon: "Cpu", title: "Local LLM", desc: "Powered by Ollama for 100% private, on-device intelligence." },
      { icon: "Brain", title: "Memory", desc: "Long-term contextual memory using local vector databases." },
      { icon: "Languages", title: "Multi-language", desc: "Seamless switching between 15+ spoken languages." },
      { icon: "Smile", title: "Emotion-aware UI", desc: "The UI reacts to tone and sentiment during conversations." },
      { icon: "FileText", title: "System Commands", desc: "Execute safe shell commands through natural language." }
    ],
    architecture: [
      { label: "User", sub: "Input" },
      { label: "Voice", sub: "Capture" },
      { label: "Whisper", sub: "STT" },
      { label: "LLM", sub: "Reasoning" },
      { label: "Memory", sub: "Vector DB" },
      { label: "Desktop", sub: "Actions" },
      { label: "Response", sub: "Output" }
    ],
    timeline: [
      { phase: "Idea", date: "Jan 2026", desc: "Initial concept and feasibility testing." },
      { phase: "Prototype", date: "Feb 2026", desc: "Basic terminal interface with simple STT." },
      { phase: "Voice", date: "Mar 2026", desc: "Integrated Whisper and ultra-fast TTS." },
      { phase: "LLM", date: "Apr 2026", desc: "Switched to local Ollama (Llama 3) for reasoning." },
      { phase: "Desktop Control", date: "May 2026", desc: "Added Python automation scripts for macOS/Windows." },
      { phase: "Memory", date: "Jun 2026", desc: "Implemented local vector DB for conversational recall." },
      { phase: "Current Development", date: "Jul 2026", desc: "Refining UI, emotion-awareness, and performance." },
    ],
    techStack: [
      { category: "Frontend", icon: "LayoutTemplate", items: ["Next.js 15", "React 19", "Tailwind CSS v4", "Framer Motion", "Electron"] },
      { category: "Backend", icon: "Server", items: ["Python 3.12", "FastAPI", "WebSockets", "Node.js"] },
      { category: "AI & Models", icon: "BrainCircuit", items: ["Ollama", "Llama 3", "Whisper", "Coqui", "Moondream"] },
      { category: "Database", icon: "Database", items: ["SQLite", "ChromaDB", "Redis"] },
      { category: "Deployment", icon: "Cloud", items: ["Local Executable", "Docker", "GitHub Actions"] }
    ],
    challenges: [
      { icon: "AlertTriangle", title: "Voice Latency", desc: "Reducing STT to LLM to TTS turnaround time to feel natural (sub 500ms)." },
      { icon: "Gauge", title: "Model Optimization", desc: "Quantizing models to run efficiently on consumer hardware." },
      { icon: "HardDrive", title: "Memory", desc: "Implementing sliding window context and vector DB to recall past conversations accurately." },
      { icon: "Smartphone", title: "Cross-platform", desc: "Ensuring desktop automation scripts work seamlessly across Windows and macOS." },
      { icon: "Zap", title: "Performance", desc: "Maintaining 60FPS UI while heavy background ML inference happens." }
    ],
    results: [
      { title: "Fast Responses", val: "Sub 1s", desc: "Average response latency." },
      { title: "Offline Capability", val: "100%", desc: "Works entirely without internet." },
      { title: "Low Memory", val: "< 4GB", desc: "RAM usage during inference." },
      { title: "Natural Interaction", val: "95%", desc: "Accurate intent parsing." }
    ],
    roadmap: [
      { icon: "Sparkles", title: "Realtime Avatar", desc: "Interactive 3D avatar syncing with speech in real-time." },
      { icon: "Eye", title: "Face Recognition", desc: "Using local OpenCV to recognize users and adjust context." },
      { icon: "Puzzle", title: "Plugin System", desc: "Allowing community developers to add new automation skills." },
      { icon: "Cloud", title: "Cloud Sync", desc: "Optional E2E encrypted sync of memory across multiple devices." }
    ],
    featured: true,
  },
  {
    slug: "nexora-ai",
    title: "Nexora AI",
    subtitle: "AI-assisted education and workflow management",
    description: "An AI-assisted education and workflow management platform built to reduce friction for educators, offering smart attendance, learning analytics, and team channels.",
    category: "AI Platform",
    tag: "AI Platform",
    year: "2025",
    status: "Completed",
    role: "Lead Developer",
    duration: "4 Months",
    focus: ["Next.js", "AI", "SaaS", "Education"],
    github: "https://github.com/Praval07/Nexora-Ai",
    demo: "",
    heroImage: "/projects/nexora-ai/thumbnail.png",
    thumbnail: "/projects/nexora-ai/thumbnail.png",
    overview: {
      image: "/projects/nexora-ai/thumbnail.png",
      problem: "Educators spend too much time on administrative tasks instead of teaching.",
      solution: "Nexora AI centralizes attendance, assessments, and communication into a single smart platform.",
      goals: "Reduce admin workload by 50% and provide actionable telemetry insights for student performance."
    },
    gallery: [
      "/projects/nexora-ai/gallery-2.png",
      "/projects/nexora-ai/gallery-1.png"
    ],
    features: [
      { icon: "Camera", title: "AI Attendance", desc: "Biometric facial recognition for instant smart attendance." },
      { icon: "BookOpen", title: "LMS Modules", desc: "Comprehensive course management and content delivery." },
      { icon: "Bot", title: "AI Assistant", desc: "Cognitive AI helper for students and teachers." },
      { icon: "BarChart3", title: "Analytics", desc: "High-fidelity telemetry insights into student performance." }
    ],
    techStack: [
      { category: "Frontend", icon: "LayoutTemplate", items: ["Next.js", "React", "Tailwind CSS"] },
      { category: "Backend", icon: "Server", items: ["Node.js", "Express", "Python"] },
      { category: "Database", icon: "Database", items: ["PostgreSQL", "Prisma"] }
    ],
    featured: true,
  },
  {
    slug: "alpurl",
    title: "AlpURL",
    subtitle: "AI-powered link management",
    description: "AI-powered URL shortener with detailed analytics tracking, link redirection metrics, and custom QR code generation.",
    category: "SaaS",
    tag: "Developer Tools",
    year: "2025",
    status: "Live",
    role: "Full Stack Engineer",
    duration: "2 Months",
    focus: ["Next.js", "Redis", "Analytics", "SaaS"],
    github: "https://github.com/Praval07/AlpURL",
    demo: "",
    heroImage: "/projects/alpurl/thumbnail.png",
    thumbnail: "/projects/alpurl/thumbnail.png",
    overview: {
      image: "/projects/alpurl/thumbnail.png",
      problem: "Users needed a fast, reliable, and completely free URL shortener with comprehensive tracking.",
      solution: "AlpURL provides infinite short links, custom QR generation, and detailed analytics in a clean interface.",
      goals: "Deliver an enterprise-grade URL management platform to everyone for free."
    },
    gallery: [
      "/projects/alpurl/gallery-1.png"
    ],
    features: [
      { icon: "Link", title: "Short Links", desc: "Custom branded short URLs." },
      { icon: "QrCode", title: "QR Generator", desc: "Highly custom QR codes for your audience." },
      { icon: "BarChart", title: "Analytics", desc: "Detailed tracking and redirection metrics." },
      { icon: "Globe", title: "Global Edge", desc: "Fast redirection via Edge networks." }
    ],
    techStack: [
      { category: "Frontend", icon: "LayoutTemplate", items: ["Next.js", "Tailwind CSS"] },
      { category: "Backend", icon: "Server", items: ["Next.js API Routes", "Redis"] },
      { category: "Database", icon: "Database", items: ["PostgreSQL", "Upstash"] }
    ],
    featured: true,
  },
  {
    slug: "rapid-revision-hub",
    title: "Rapid Revision Hub",
    subtitle: "Accelerated learning platform",
    description: "An EdTech platform for smart notes, revision guides, and rapid last-minute exam preparation workflows tailored for engineering students.",
    category: "EdTech",
    tag: "EdTech",
    year: "2024",
    status: "Completed",
    role: "Creator",
    duration: "5 Months",
    focus: ["React", "Education", "Content Management"],
    github: "https://github.com/Praval07/Rapid-Revision-Hub",
    demo: "",
    heroImage: "/projects/rapid-revision-hub/thumbnail.png",
    thumbnail: "/projects/rapid-revision-hub/thumbnail.png",
    overview: {
      image: "/projects/rapid-revision-hub/thumbnail.png",
      problem: "Students waste hours organizing notes instead of studying before exams.",
      solution: "A centralized hub providing curated, high-yield notes and rapid revision workflows.",
      goals: "Help students revise less and score more by streamlining study material access."
    },
    gallery: [
      "/projects/rapid-revision-hub/gallery-1.png"
    ],
    features: [
      { icon: "FileText", title: "Handwritten Notes", desc: "Curated high-quality notes." },
      { icon: "HelpCircle", title: "Important Questions", desc: "Exam-oriented Q&A repositories." },
      { icon: "Calculator", title: "Formulas", desc: "Quick reference formula sheets." },
      { icon: "Brain", title: "Mind Maps", desc: "Visual learning aids for complex topics." }
    ],
    featured: true,
  },
  {
    slug: "netra-r",
    title: "N.E.T.R.A.-R",
    subtitle: "Network Extraction & Topology Reasoning",
    description: "Computer-vision system for road and terrain extraction from satellite imagery using segmentation maps and graph topology reasoning.",
    category: "Space & AI",
    tag: "Computer Vision",
    year: "2026",
    status: "Hackathon Entry",
    role: "AI Researcher",
    duration: "1 Month",
    focus: ["Computer Vision", "PyTorch", "Graph Algorithms", "Satellite Imagery"],
    github: "https://github.com/Praval07",
    demo: "",
    heroImage: "/projects/netra-r/thumbnail.jpg",
    thumbnail: "/projects/netra-r/thumbnail.jpg",
    overview: {
      image: "/projects/netra-r/thumbnail.jpg",
      problem: "Manual mapping of critical infrastructure after disasters is slow and expensive.",
      solution: "Automated road extraction using advanced AI and graph-based topology understanding.",
      goals: "Identify vulnerable points and simulate infrastructure disruptions for disaster response."
    },
    features: [
      { icon: "Satellite", title: "Satellite Imagery", desc: "High-resolution multi-source satellite data processing." },
      { icon: "Map", title: "Network Extraction", desc: "Deep learning models extract road networks with high accuracy." },
      { icon: "GitGraph", title: "Topology Reasoning", desc: "Graph algorithms to understand connectivity and critical links." },
      { icon: "ShieldAlert", title: "Resilience Analysis", desc: "Simulate disruptions and generate resilience heatmaps." }
    ],
    stats: [
      { label: "Road Extraction Accuracy", to: 92, suffix: "%" },
      { label: "Faster Resilience Assessment", to: 3, suffix: "x" },
      { label: "Reduction in Mapping Time", to: 70, suffix: "%" }
    ],
    techStack: [
      { category: "AI & Models", icon: "BrainCircuit", items: ["Python", "PyTorch", "OpenCV"] },
      { category: "Data Processing", icon: "Database", items: ["NetworkX", "GeoPandas"] },
      { category: "Backend", icon: "Server", items: ["FastAPI", "PostgreSQL"] }
    ],
    featured: false,
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getRelatedProjects(slug: string, limit = 4): Project[] {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
}

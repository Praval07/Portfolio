import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function HeroButtons() {
  return (
    <Reveal delay={0.4} className="mt-12 flex flex-wrap gap-4 items-center">
      <Link 
        href="/#work" 
        className="inline-flex items-center justify-center bg-[#E8A63D] text-ink hover:bg-[#F2B95A] hover:scale-100 scale-[0.98] transition-all duration-300 rounded-full px-8 py-3.5 font-medium shadow-lg hover:shadow-xl"
      >
        View Projects
      </Link>
      <Link 
        href="/resume" 
        className="inline-flex items-center justify-center bg-transparent border border-paper/30 text-paper hover:border-paper hover:bg-paper/10 hover:scale-100 scale-[0.98] transition-all duration-300 rounded-full px-8 py-3.5 font-medium"
      >
        Download Resume
      </Link>
    </Reveal>
  );
}

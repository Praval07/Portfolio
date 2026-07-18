import { Reveal } from "@/components/motion/Reveal";

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center items-start text-left w-full">
      <Reveal delay={0.1} className="w-full text-left">
        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight text-paper mb-6 leading-none">
          Praval Saxena
        </h1>
      </Reveal>
      
      <Reveal delay={0.2} className="w-full flex flex-col items-start gap-2 mb-8">
        <div className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-gold-deep border-l-4 border-gold-deep pl-4 py-1">
          AI Engineer
        </div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-paper/90 border-l-4 border-paper/40 pl-4 py-1">
          Full Stack Developer
        </div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-paper/60 border-l-4 border-paper/20 pl-4 py-1">
          B.Tech CSE Student
        </div>
      </Reveal>
      
      <Reveal delay={0.3} className="w-full flex justify-start">
        <p className="text-lg sm:text-xl text-paper/80 text-left leading-relaxed max-w-md border-l-4 border-transparent pl-4">
          Building intelligent software, AI-powered products, and scalable digital experiences.
        </p>
      </Reveal>
    </div>
  );
}

import { Reveal } from "@/components/motion/Reveal";

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center">
      <Reveal delay={0.1}>
        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight text-paper mb-6 leading-none">
          Praval Saxena
        </h1>
      </Reveal>
      
      <Reveal delay={0.2}>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-paper/90 mb-8 leading-snug">
          AI Engineer <br />
          Full Stack Developer <br />
          B.Tech CSE Student
        </h2>
      </Reveal>
      
      <Reveal delay={0.3}>
        <p className="text-lg sm:text-xl text-paper/75 leading-relaxed max-w-lg">
          Building intelligent software,<br />
          AI-powered products,<br />
          and scalable digital experiences.
        </p>
      </Reveal>
    </div>
  );
}

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";
import { ResumeCTA } from "@/components/sections/ResumeCTA";
import { ContactSection } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperienceTimeline />
      <LatestBlogs />
      <FAQ />
      <Testimonials />
      <ResumeCTA />
      <ContactSection />
    </>
  );
}

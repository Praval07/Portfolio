import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

// Lazy load below-the-fold components to improve initial page load performance
const ExperienceTimeline = dynamic(() => import("@/components/sections/ExperienceTimeline").then(mod => mod.ExperienceTimeline));
const LatestBlogs = dynamic(() => import("@/components/sections/LatestBlogs").then(mod => mod.LatestBlogs));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials));
const ResumeCTA = dynamic(() => import("@/components/sections/ResumeCTA").then(mod => mod.ResumeCTA));
const ContactSection = dynamic(() => import("@/components/sections/Contact").then(mod => mod.ContactSection));

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

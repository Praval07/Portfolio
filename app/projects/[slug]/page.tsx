import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getProjectBySlug, getAllProjects, getRelatedProjects } from "@/data/projects";

import { ProjectHero } from "@/components/case-study/premium/ProjectHero";
import { ProjectStats } from "@/components/case-study/premium/ProjectStats";
import { ProjectOverview } from "@/components/case-study/premium/ProjectOverview";
import { FeatureGrid } from "@/components/case-study/premium/FeatureGrid";
import { Architecture } from "@/components/case-study/premium/Architecture";
import { ProjectGallery } from "@/components/case-study/premium/ProjectGallery";
import { ProjectVideo } from "@/components/case-study/premium/ProjectVideo";
import { Timeline } from "@/components/case-study/premium/Timeline";
import { TechStack } from "@/components/case-study/premium/TechStack";
import { Challenges } from "@/components/case-study/premium/Challenges";
import { Results } from "@/components/case-study/premium/Results";
import { Roadmap } from "@/components/case-study/premium/Roadmap";
import { RelatedProjects } from "@/components/case-study/premium/RelatedProjects";
import { CTA } from "@/components/case-study/premium/CTA";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found",
      description: "The requested project could not be found.",
    });
  }

  return buildMetadata({
    title: `${project.title} | Case Study`,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.heroImage || project.thumbnail,
  });
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project.slug, 4);

  return (
    <main className="bg-[var(--color-paper-deep)] text-ink selection:bg-gold selection:text-ink">
      <ProjectHero project={project} />
      <ProjectStats stats={project.stats} />
      <ProjectOverview overview={project.overview} />
      <FeatureGrid features={project.features} />
      <Architecture architecture={project.architecture} />
      <ProjectGallery gallery={project.gallery} />
      <ProjectVideo video={project.video} />
      <Timeline timeline={project.timeline} />
      <TechStack techStack={project.techStack} />
      <Challenges challenges={project.challenges} />
      <Results results={project.results} />
      <Roadmap roadmap={project.roadmap} />
      <RelatedProjects projects={related} />
      <CTA />
    </main>
  );
}

import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { BlogList } from "@/components/sections/BlogList";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Engineering Journal — Praval Saxena",
  description: "Read Praval Saxena's engineering journal covering AI agents, systems engineering, startups, and software design blueprints.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = getAllBlogs();

  // Extract metadata and slug, leaving out raw content to keep payload light
  const postMetadata = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    excerpt: post.frontmatter.excerpt,
    category: post.frontmatter.category,
    author: post.frontmatter.author,
    date: post.frontmatter.date,
    readTime: post.frontmatter.readTime,
    tags: post.frontmatter.tags || [],
    image: post.frontmatter.image || "/assets/blog/agentic_workflows_cover.png",
    difficulty: post.frontmatter.difficulty || "Intermediate",
  }));

  return (
    <div className="blog-root min-h-screen">
      <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
        <BlogList initialPosts={postMetadata} />
      </div>
    </div>
  );
}

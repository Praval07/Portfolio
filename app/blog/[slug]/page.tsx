import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllBlogSlugs, getBlogBySlug, getAllBlogs, type BlogFrontmatter } from "@/lib/blogs";
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ShareAndBookmark } from "@/components/blog/ShareAndBookmark";
import { CommentSection } from "@/components/blog/CommentSection";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { buildMetadata } from "@/lib/seo";
import { mdxComponents } from "@/components/blog/mdx/MdxComponents";
import { TableOfContents } from "@/components/blog/mdx/TableOfContents";
import { ReadingProgress } from "@/components/blog/mdx/ReadingProgress";
import { profile } from "@/data/profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return buildMetadata({ title: "Article not found" });

  return buildMetadata({
    title: `${post.frontmatter.title} — Praval Saxena`,
    description: post.frontmatter.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  // Compile MDX with custom styled components
  const { content } = await compileMDX<BlogFrontmatter>({
    source: post.content,
    options: { parseFrontmatter: false },
    components: mdxComponents as unknown as Record<string, React.ComponentType>,
  });

  const allPosts = getAllBlogs();
  const index = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = index > 0 ? allPosts[index - 1] : null;
  const prevPost = index < allPosts.length - 1 ? allPosts[index + 1] : null;

  // Related posts (excluding current post, matching category if possible, or taking latest 3)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.frontmatter.category === post.frontmatter.category && b.frontmatter.category !== post.frontmatter.category) return -1;
      if (b.frontmatter.category === post.frontmatter.category && a.frontmatter.category !== post.frontmatter.category) return 1;
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    })
    .slice(0, 3);

  // Author details
  const authorName = post.frontmatter.author || profile.name;
  const publishedDate = post.frontmatter.date;
  const updatedDate = post.frontmatter.updatedDate || publishedDate;
  const readTime = post.frontmatter.readTime;
  const category = post.frontmatter.category;
  const tags = post.frontmatter.tags || [];
  const difficulty = post.frontmatter.difficulty || "Intermediate";
  const coverImage = post.frontmatter.image || "/assets/blog/agentic_workflows_cover.png";

  return (
    <div className="blog-root min-h-screen">
      {/* Scroll Reading Progress */}
      <ReadingProgress />

      {/* Top spacing for header */}
      <div className="pt-32 pb-24 max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="font-mono text-xs font-semibold inline-flex items-center gap-1.5 text-stone hover:text-ink transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to engineering journal
          </Link>
        </div>

        {/* Editorial Hero Header */}
        <header className="mb-12 max-w-4xl">
          <Reveal>
            <span className="font-mono text-[10px] blog-category-badge rounded-full px-4 py-1 uppercase tracking-wider font-semibold mb-6 inline-block">
              {category}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.1] mb-6 text-ink">
              {post.frontmatter.title}
            </h1>
            <p className="text-ink-soft text-lg sm:text-xl font-normal leading-relaxed mb-8 border-l-2 border-gold/35 pl-6 font-body">
              {post.frontmatter.excerpt}
            </p>
          </Reveal>

          {/* Metadata Row */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-xs text-stone border-y border-line py-5 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-[10px] font-bold text-gold-deep select-none">
                  {authorName.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-semibold text-ink font-body">{authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-stone-light/80" />
                <span>Published: {publishedDate}</span>
                {updatedDate !== publishedDate && (
                  <span className="text-[10px] text-stone-light/70 pl-1">(Updated: {updatedDate})</span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-stone-light/80" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-stone-light/80" />
                <span className="blog-tag px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                  {difficulty}
                </span>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Large Editorial Cover Image */}
        <Reveal delay={0.15}>
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-line mb-16 bg-paper-deep select-none">
            <Image
              src={coverImage}
              alt={post.frontmatter.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        {/* Main Grid: Left Sidebar (TOC) and Main Content */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Left Sidebar (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-32 h-auto max-h-[80vh] flex flex-col gap-8">
            <TableOfContents />
            
            <div className="border-t border-line pt-6">
              <ShareAndBookmark slug={slug} title={post.frontmatter.title} />
            </div>

            {/* Sticky Sidebar Tech Badges */}
            {tags.length > 0 && (
              <div className="border-t border-line pt-6 flex flex-col gap-2 select-none">
                <span className="font-mono text-[10px] text-stone uppercase tracking-wider">Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] blog-tag px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 max-w-none w-full">
            <div className="max-w-[760px] mx-auto text-ink-soft leading-relaxed flex flex-col">
              
              {/* Rendered Article Body */}
              <article className="font-body text-ink-soft font-normal text-sm sm:text-base selection:bg-gold selection:text-ink w-full">
                {content}
              </article>

              {/* Tags Cloud (Mobile/Tablet and fallback) */}
              <div className="lg:hidden border-t border-line pt-8 mt-12 flex flex-wrap gap-2 select-none">
                {tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] blog-tag px-2.5 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share & Bookmark Actions (Mobile/Tablet only) */}
              <div className="lg:hidden border-t border-line pt-8 mt-8">
                <ShareAndBookmark slug={slug} title={post.frontmatter.title} />
              </div>

              {/* Author Bio Card */}
              <Reveal>
                <div className="border border-line rounded-3xl p-6 sm:p-8 mt-16 bg-[#FAF7F0]/25 dark:bg-[#161617]/10 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-line select-none flex-shrink-0">
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gold-deep uppercase tracking-wider font-semibold mb-1 block select-none">
                      Author Profile
                    </span>
                    <h4 className="font-display text-lg font-semibold text-ink mb-2">
                      {profile.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-4 font-body">
                      {profile.about}
                    </p>
                    <div className="flex gap-4 items-center justify-center sm:justify-start font-mono text-xs select-none">
                      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-gold transition-colors font-semibold">GitHub</a>
                      <span className="text-line-strong">•</span>
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-gold transition-colors font-semibold">LinkedIn</a>
                      <span className="text-line-strong">•</span>
                      <a href={`mailto:${profile.email}`} className="text-stone hover:text-gold transition-colors font-semibold">Email</a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Newsletter subscription card */}
              <Reveal>
                <NewsletterForm />
              </Reveal>

              {/* Adjacent Post Navigation (Previous / Next) */}
              <div className="grid sm:grid-cols-2 gap-4 border-t border-line pt-12 mt-16 select-none font-mono">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group bg-paper hover:bg-[#FAF7F0]/30 dark:hover:bg-[#161617]/10 border border-line rounded-2xl p-6 text-left hover:border-gold transition-colors block"
                  >
                    <span className="text-[10px] text-stone tracking-wider block mb-1">← PREVIOUS JOURNAL</span>
                    <span className="font-display font-medium text-ink group-hover:text-gold transition-colors line-clamp-1 text-sm sm:text-base font-semibold">
                      {prevPost.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <div className="bg-paper-deep border border-line border-dashed rounded-2xl p-6 text-stone text-xs flex items-center justify-center select-none font-mono text-center">
                    First entry in the publication.
                  </div>
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group bg-paper hover:bg-[#FAF7F0]/30 dark:hover:bg-[#161617]/10 border border-line rounded-2xl p-6 text-right hover:border-gold transition-colors block"
                  >
                    <span className="text-[10px] text-stone tracking-wider block mb-1">NEXT JOURNAL →</span>
                    <span className="font-display font-medium text-ink group-hover:text-gold transition-colors line-clamp-1 text-sm sm:text-base font-semibold">
                      {nextPost.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <div className="bg-paper-deep border border-line border-dashed rounded-2xl p-6 text-stone text-xs flex items-center justify-center select-none font-mono text-center">
                    Latest entry in the publication.
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <CommentSection />

            </div>
          </main>
        </div>

        {/* Related Articles Row */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-line pt-20 mt-20 select-none">
            <h3 className="font-display text-2xl font-semibold mb-8 text-ink tracking-tight">
              Recommended Reading
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-paper border border-line rounded-2xl p-0 overflow-hidden flex flex-col justify-between hover:border-gold transition-all duration-300 hover:shadow-sm"
                >
                  <div className="relative aspect-video w-full border-b border-line bg-paper-deep">
                    <Image
                      src={post.frontmatter.image || "/assets/blog/agentic_workflows_cover.png"}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] blog-category-badge rounded-full px-2.5 py-0.5 uppercase tracking-wider font-semibold mb-3 inline-block">
                        {post.frontmatter.category}
                      </span>
                      <h4 className="font-display text-base font-semibold text-ink group-hover:text-gold transition-colors line-clamp-2 leading-tight mb-2 tracking-tight">
                        {post.frontmatter.title}
                      </h4>
                      <p className="text-xs text-ink-soft leading-relaxed line-clamp-2 font-body mb-4">
                        {post.frontmatter.excerpt}
                      </p>
                    </div>
                    <div className="flex justify-between items-center font-mono text-[10px] text-stone border-t border-line pt-4 mt-auto">
                      <span>{post.frontmatter.date}</span>
                      <span className="font-semibold text-ink group-hover:text-gold transition-colors flex items-center gap-0.5">
                        Read <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

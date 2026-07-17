import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";
import { Reveal } from "@/components/motion/Reveal";
import { SectionRail } from "@/components/ui/SectionRail";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, ArrowRight } from "lucide-react";

export function LatestBlogs() {
  const posts = getAllBlogs().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="latest-blogs" className="py-20 sm:py-28 bg-paper-deep border-t border-b border-line/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex gap-6">
        <SectionRail number="05" label="Blog" />
        <div className="flex-1">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-4">Tech Writing</p>
              <h2 className="text-4xl sm:text-5xl leading-tight text-ink font-display font-semibold">
                Latest Insights
              </h2>
            </div>
            <LinkButton href="/blog" variant="gold">
              Read All Articles <span aria-hidden="true">↗</span>
            </LinkButton>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05} as="article" className="group">
                <Card className="hover:border-gold transition-colors duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-[0.65rem] text-gold-deep border border-gold/25 rounded px-2.5 py-0.5 bg-gold/5 uppercase tracking-wider font-semibold">
                        {post.frontmatter.category}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-stone">
                        <span className="flex items-center gap-1"><Calendar size={11} /> {post.frontmatter.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-gold transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
                    </h3>
                    <p className="text-ink-soft text-sm leading-relaxed mb-6">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-mono text-xs font-semibold flex items-center gap-1 text-ink hover:text-gold border-t border-line pt-4 transition-colors mt-auto"
                  >
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

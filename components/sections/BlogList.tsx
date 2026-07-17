"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ArrowRight, Bookmark, Rss, Sparkles, Layers } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

interface PostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  difficulty?: string;
}

interface BlogListProps {
  initialPosts: PostMetadata[];
}

const CATEGORIES = [
  "All",
  "Artificial Intelligence",
  "Full Stack Development",
  "System Design",
  "Developer Tools",
  "Programming",
  "Computer Science",
  "Startups",
  "Product Design",
  "Career",
  "Research"
];

export function BlogList({ initialPosts }: BlogListProps) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [readTimeFilter, setReadTimeFilter] = useState<number>(15); // Max reading time filter
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  // Keyboard shortcut listener to focus search on "/" keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        document.getElementById("blog-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("praval-blog-bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved) as string[]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialPosts.forEach((post) => post.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [initialPosts]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialPosts.length };
    initialPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchCat = selectedCat === "All" || post.category === selectedCat;
      const matchTag = !selectedTag || post.tags?.includes(selectedTag);
      
      // Parse reading time number
      const minutes = parseInt(post.readTime) || 5;
      const matchReadTime = minutes <= readTimeFilter;

      // Match bookmark status
      const matchBookmark = !showBookmarkedOnly || bookmarks.includes(post.slug);

      const query = searchQuery.toLowerCase();
      const matchQuery =
        !searchQuery ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query));

      return matchCat && matchTag && matchReadTime && matchBookmark && matchQuery;
    });
  }, [initialPosts, selectedCat, selectedTag, searchQuery, readTimeFilter, showBookmarkedOnly, bookmarks]);

  // Toggle single bookmark
  const toggleBookmark = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    let updatedBookmarks = [...bookmarks];
    if (bookmarks.includes(slug)) {
      updatedBookmarks = updatedBookmarks.filter((s) => s !== slug);
    } else {
      updatedBookmarks.push(slug);
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem("praval-blog-bookmarks", JSON.stringify(updatedBookmarks));
  };

  // Determine if featured post should display (only when no filters are active)
  const isFiltering = selectedCat !== "All" || !!selectedTag || !!searchQuery || showBookmarkedOnly || readTimeFilter < 15;
  const featuredPost = !isFiltering && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const displayPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  // Stats display
  const stats = useMemo(() => {
    const researchCount = initialPosts.filter(p => p.category === "Research" || p.category === "Research Notes" || p.tags.includes("Research")).length;
    const featuredProjs = projects.filter(p => p.featured).length;
    return [
      { label: "Articles Published", value: initialPosts.length },
      { label: "Research Notes", value: researchCount },
      { label: "Active Projects", value: featuredProjs },
      { label: "Years Learning", value: "3+" }
    ];
  }, [initialPosts]);

  return (
    <div className="font-body selection:bg-gold selection:text-ink">
      
      {/* Magazine Hero Section */}
      <section className="grid lg:grid-cols-12 gap-8 items-stretch mb-20">
        
        {/* Left Side: Editorial Banner & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 rounded-3xl bg-[#FAF7F0] dark:bg-[#161617]/50 border border-line">
          <div>
            <span className="font-mono text-[10px] text-gold-deep tracking-wider uppercase font-semibold mb-4 block select-none">
              PS. Journal
            </span>
            <h1 className="text-5xl sm:text-7xl font-display font-semibold tracking-tight leading-[1.0] text-ink mb-6">
              Engineering<br />Journal<span className="text-gold">.</span>
            </h1>
            <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-normal">
              Thoughts on AI agents, Software Engineering, System Design, Startups, and the future of intelligent software.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-line/60 pt-8 mt-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-none mb-1">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-stone uppercase tracking-wider select-none">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Large Featured Article */}
        <div className="lg:col-span-5 flex flex-col">
          {featuredPost ? (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group flex-1 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-line bg-paper hover:border-gold transition-all duration-300 hover:shadow-sm"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-line mb-6 bg-paper-deep select-none">
                  <Image
                    src={featuredPost.image || "/assets/blog/agentic_workflows_cover.png"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] blog-category-badge rounded-full px-3 py-0.5 uppercase tracking-wider font-semibold select-none">
                    Featured · {featuredPost.category}
                  </span>
                  <button
                    onClick={(e) => toggleBookmark(e, featuredPost.slug)}
                    className="text-stone hover:text-gold transition-colors p-1"
                    aria-label={bookmarks.includes(featuredPost.slug) ? "Remove bookmark" : "Add bookmark"}
                  >
                    <Bookmark size={14} fill={bookmarks.includes(featuredPost.slug) ? "currentColor" : "none"} />
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-ink group-hover:text-gold transition-colors leading-tight mb-3 tracking-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3 font-body">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex justify-between items-center font-mono text-[10px] text-stone border-t border-line pt-5 mt-6">
                <div className="flex items-center gap-3">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <span className="font-semibold text-ink group-hover:text-gold transition-colors flex items-center gap-1.5">
                  Read Article <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex-1 flex items-center justify-center border border-dashed border-line rounded-3xl p-12 text-stone text-xs font-mono select-none">
              Explore the index using the filters below.
            </div>
          )}
        </div>

      </section>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Articles Stream */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Top category row & Filter indicators */}
          <div className="flex flex-wrap gap-2 items-center justify-between border-b border-line pb-6 select-none">
            <h3 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold">
              {showBookmarkedOnly ? "Bookmarked Entries" : selectedCat === "All" ? "Latest Publications" : `${selectedCat} Entries`} ({filteredPosts.length})
            </h3>
            {isFiltering && (
              <button
                onClick={() => {
                  setSelectedCat("All");
                  setSelectedTag(null);
                  setSearchQuery("");
                  setReadTimeFilter(15);
                  setShowBookmarkedOnly(false);
                }}
                className="font-mono text-[10px] text-gold-deep hover:text-gold underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center text-stone font-mono text-sm border border-dashed border-line rounded-3xl bg-paper">
              No journal entries match your selected criteria.
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {displayPosts.map((post, i) => {
                // Alternating card layout to create a high-end magazine rhythm:
                // Type A (index % 3 === 0): Full card with image on top, text below.
                // Type B (index % 3 === 1): Grid split card. Image left, text right on desktop.
                // Type C (index % 3 === 2): Pure editorial typography layout. Minimal border, no cover image.
                const cardType = i % 3;

                if (cardType === 0) {
                  return (
                    <Reveal key={post.slug} delay={Math.min(i * 0.04, 0.15)}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group bg-paper border border-line rounded-3xl overflow-hidden flex flex-col justify-between hover:border-gold transition-all duration-300 hover:shadow-sm"
                      >
                        <div className="relative aspect-[21/9] w-full border-b border-line bg-paper-deep select-none">
                          <Image
                            src={post.image || "/assets/blog/agentic_workflows_cover.png"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-[9px] blog-category-badge rounded-full px-2.5 py-0.5 uppercase tracking-wider font-semibold select-none">
                              {post.category}
                            </span>
                            <button
                              onClick={(e) => toggleBookmark(e, post.slug)}
                              className="text-stone hover:text-gold transition-colors p-1"
                              aria-label={bookmarks.includes(post.slug) ? "Remove bookmark" : "Add bookmark"}
                            >
                              <Bookmark size={13} fill={bookmarks.includes(post.slug) ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-gold transition-colors leading-tight mb-3 tracking-tight">
                            {post.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-2 font-body mb-6">
                            {post.excerpt}
                          </p>
                          <div className="flex justify-between items-center font-mono text-[10px] text-stone border-t border-line pt-4 mt-2">
                            <div className="flex items-center gap-3">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <span className="font-semibold text-ink group-hover:text-gold transition-colors flex items-center gap-1">
                              Read Entry <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                } else if (cardType === 1) {
                  return (
                    <Reveal key={post.slug} delay={Math.min(i * 0.04, 0.15)}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group bg-paper border border-line rounded-3xl overflow-hidden grid md:grid-cols-12 hover:border-gold transition-all duration-300 hover:shadow-sm"
                      >
                        <div className="relative aspect-square md:aspect-auto md:col-span-5 border-b md:border-b-0 md:border-r border-line bg-paper-deep select-none">
                          <Image
                            src={post.image || "/assets/blog/agentic_workflows_cover.png"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 sm:p-8 md:col-span-7 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-mono text-[9px] blog-category-badge rounded-full px-2.5 py-0.5 uppercase tracking-wider font-semibold select-none">
                                {post.category}
                              </span>
                              <button
                                onClick={(e) => toggleBookmark(e, post.slug)}
                                className="text-stone hover:text-gold transition-colors p-1"
                                aria-label={bookmarks.includes(post.slug) ? "Remove bookmark" : "Add bookmark"}
                              >
                                <Bookmark size={13} fill={bookmarks.includes(post.slug) ? "currentColor" : "none"} />
                              </button>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink group-hover:text-gold transition-colors leading-tight mb-3 tracking-tight">
                              {post.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3 font-body mb-4">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex justify-between items-center font-mono text-[10px] text-stone border-t border-line pt-4 mt-4">
                            <div className="flex items-center gap-3">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <span className="font-semibold text-ink group-hover:text-gold transition-colors flex items-center gap-1">
                              Read Entry <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                } else {
                  return (
                    <Reveal key={post.slug} delay={Math.min(i * 0.04, 0.15)}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group bg-[#FAF7F0]/25 dark:bg-[#161617]/10 border border-line rounded-3xl p-6 sm:p-8 hover:border-gold transition-all duration-300 block hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-[9px] blog-category-badge rounded-full px-2.5 py-0.5 uppercase tracking-wider font-semibold select-none">
                            {post.category}
                          </span>
                          <button
                            onClick={(e) => toggleBookmark(e, post.slug)}
                            className="text-stone hover:text-gold transition-colors p-1"
                            aria-label={bookmarks.includes(post.slug) ? "Remove bookmark" : "Add bookmark"}
                          >
                            <Bookmark size={13} fill={bookmarks.includes(post.slug) ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink group-hover:text-gold transition-colors leading-tight mb-3 tracking-tight">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-2 font-body mb-6">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center font-mono text-[10px] text-stone border-t border-line pt-4 mt-2">
                          <div className="flex items-center gap-3">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <span className="font-semibold text-ink group-hover:text-gold transition-colors flex items-center gap-1">
                            Read Entry <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* Right Side: Sticky Sidebar */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-8 w-full select-none">
          
          {/* Instant Search Widget */}
          <div className="bg-paper border border-line rounded-3xl p-6 relative">
            <h4 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold mb-4 flex items-center gap-2">
              <Search size={12} className="text-gold" /> Search Archive
            </h4>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone" size={15} />
              <input
                id="blog-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type keywords... (Press /)"
                className="w-full blog-input rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm outline-none placeholder:text-stone font-body"
              />
            </div>
          </div>

          {/* Bookmarks Toggle Tab */}
          {bookmarks.length > 0 && (
            <div className="bg-paper border border-line rounded-3xl p-6">
              <h4 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold mb-4">
                Saved Articles
              </h4>
              <button
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-xs font-mono cursor-pointer ${
                  showBookmarkedOnly
                    ? "bg-gold border-gold text-ink font-semibold"
                    : "bg-paper-deep border-line text-ink-soft hover:border-gold hover:text-gold"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bookmark size={13} fill={showBookmarkedOnly ? "currentColor" : "none"} />
                  {showBookmarkedOnly ? "Showing Saved Entries" : "Filter by Saved"}
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                  {bookmarks.length}
                </span>
              </button>
            </div>
          )}

          {/* Category Filter Widget */}
          <div className="bg-paper border border-line rounded-3xl p-6">
            <h4 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold mb-4 flex items-center gap-2">
              <Layers size={12} className="text-gold" /> Categories
            </h4>
            <div className="flex flex-col gap-1 text-sm font-body">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                // Only render categories that have articles (except 'All')
                if (cat !== "All" && count === 0) return null;
                
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      setSelectedTag(null);
                    }}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg text-left transition-colors text-xs font-medium cursor-pointer ${
                      selectedCat === cat
                        ? "bg-[#FAF7F0] dark:bg-[#161617] text-gold-deep font-semibold"
                        : "text-ink-soft hover:text-ink hover:bg-paper-deep/60"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-mono text-stone bg-paper-deep px-1.5 py-0.5 rounded border border-line">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reading Time Slider Widget */}
          <div className="bg-paper border border-line rounded-3xl p-6">
            <h4 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
              <Clock size={12} className="text-gold" /> Reading Time Filter
            </h4>
            <div className="flex flex-col gap-2">
              <input
                type="range"
                min="3"
                max="15"
                step="1"
                value={readTimeFilter}
                onChange={(e) => setReadTimeFilter(parseInt(e.target.value))}
                className="w-full h-1 bg-line rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
              />
              <div className="flex justify-between items-center font-mono text-[10px] text-stone">
                <span>Min: 3m</span>
                <span className="text-gold-deep font-bold font-mono">Max: {readTimeFilter}m</span>
                <span>Max: 15m</span>
              </div>
            </div>
          </div>

          {/* Tag Cloud Filter Widget */}
          {allTags.length > 0 && (
            <div className="bg-paper border border-line rounded-3xl p-6">
              <h4 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold mb-4">
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? null : tag);
                      setShowBookmarkedOnly(false);
                    }}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-mono transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-gold text-ink border-gold font-semibold shadow-sm"
                        : "blog-tag"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects Widget */}
          <div className="bg-paper border border-line rounded-3xl p-6">
            <h4 className="font-mono text-[10px] text-stone uppercase tracking-wider font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={12} className="text-gold" /> Featured Projects
            </h4>
            <div className="flex flex-col gap-4 font-body">
              {projects
                .filter((p) => p.featured)
                .slice(0, 3)
                .map((proj) => (
                  <div key={proj.slug} className="group border-b border-line pb-3 last:border-b-0 last:pb-0">
                    <span className="font-mono text-[8px] text-gold-deep border border-gold/20 rounded px-1.5 py-0.5 bg-gold/5 uppercase tracking-wider font-semibold mb-1.5 inline-block">
                      {proj.tag}
                    </span>
                    <h5 className="text-xs font-semibold text-ink group-hover:text-gold transition-colors font-display mb-1">
                      {proj.title}
                    </h5>
                    <p className="text-[10px] text-ink-soft leading-normal line-clamp-2 mb-2 font-body font-normal">
                      {proj.description}
                    </p>
                    <Link
                      href={`/projects#${proj.slug}`}
                      className="font-mono text-[9px] text-ink hover:text-gold transition-colors inline-flex items-center gap-0.5 font-semibold"
                    >
                      View Project <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Newsletter Signup Widget */}
          <div className="bg-[#FAF7F0]/40 dark:bg-[#161617]/20 border border-line rounded-3xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold">
              <Rss size={18} />
              <h4 className="font-display text-sm font-semibold text-ink m-0">
                Subscribe
              </h4>
            </div>
            <p className="text-[11px] text-stone leading-relaxed font-body font-normal m-0">
              Receive technical updates regarding AI systems, Next.js optimization, and software architecture pipelines. No spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 select-all">
              <input
                type="email"
                placeholder="name@email.com"
                className="blog-input rounded-full px-4 py-2.5 text-xs outline-none placeholder:text-stone font-body shadow-sm"
                required
              />
              <button className="bg-gold text-ink font-mono text-[10px] font-bold rounded-full py-2.5 hover:bg-gold-hover transition-colors w-full cursor-pointer shadow-sm">
                Subscribe
              </button>
            </form>
          </div>

        </aside>
      </div>

    </div>
  );
}

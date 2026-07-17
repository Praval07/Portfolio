"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Select all h2 and h3 headings inside the article body
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const items: TocItem[] = Array.from(headingElements).map((el) => {
      // If heading doesn't have an ID, generate one based on text content
      if (!el.id) {
        el.id = el.textContent
          ? el.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          : Math.random().toString(36).substring(2, 9);
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(items);

    // Set up IntersectionObserver to track active heading
    const callback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Find entry closest to the top of the viewport
        const sorted = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topEntry = sorted[0];
        if (topEntry) {
          setActiveId(topEntry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0.1,
    });

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 font-body">
      <span className="font-mono text-[10px] text-stone uppercase tracking-wider select-none border-b border-line pb-2 block">
        Table of Contents
      </span>
      <nav aria-label="Table of Contents" className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
        <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: heading.level === 3 ? "12px" : "0px" }}
              className="list-none m-0"
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  window.history.pushState(null, "", `#${heading.id}`);
                }}
                className={`text-xs block py-0.5 leading-relaxed transition-all cursor-pointer ${
                  activeId === heading.id
                    ? "text-gold font-medium border-l border-gold pl-2 -ml-[9px] dark:text-gold"
                    : "text-stone hover:text-ink border-l border-transparent"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

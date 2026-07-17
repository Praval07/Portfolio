"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, Linkedin, Twitter, Github, Mail, Bookmark, Check } from "lucide-react";

interface ShareAndBookmarkProps {
  slug: string;
  title: string;
}

export function ShareAndBookmark({ slug, title }: ShareAndBookmarkProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);

    // Check if bookmarked in localStorage
    const saved = localStorage.getItem("praval-blog-bookmarks");
    if (saved) {
      try {
        const bookmarks = JSON.parse(saved) as string[];
        setBookmarked(bookmarks.includes(slug));
      } catch (e) {
        console.error(e);
      }
    }
  }, [slug]);

  function copyLink() {
    navigator.clipboard.writeText(shareUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleBookmark() {
    const saved = localStorage.getItem("praval-blog-bookmarks");
    let bookmarks: string[] = [];
    if (saved) {
      try {
        bookmarks = JSON.parse(saved) as string[];
      } catch (e) {
        console.error(e);
      }
    }

    if (bookmarks.includes(slug)) {
      bookmarks = bookmarks.filter((s) => s !== slug);
      setBookmarked(false);
    } else {
      bookmarks.push(slug);
      setBookmarked(true);
    }

    localStorage.setItem("praval-blog-bookmarks", JSON.stringify(bookmarks));
  }

  const encodedUrl = encodeURIComponent(shareUrl || `https://pravalsaxena.com/blog/${slug}`);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-col gap-4">
      {/* Share Section */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-stone uppercase tracking-wider select-none">Share Journal</span>
        <div className="flex flex-wrap gap-2">
          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="w-9 h-9 rounded-full border border-line hover:bg-[#F7F5EF] hover:-translate-y-0.5 transition-all flex items-center justify-center text-ink bg-paper cursor-pointer"
            title="Copy Link"
            aria-label="Copy link to clipboard"
          >
            {copied ? <Check size={14} className="text-gold" /> : <LinkIcon size={14} />}
          </button>
          
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-line hover:bg-[#F7F5EF] hover:-translate-y-0.5 transition-all flex items-center justify-center text-ink bg-paper"
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={14} />
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-line hover:bg-[#F7F5EF] hover:-translate-y-0.5 transition-all flex items-center justify-center text-ink bg-paper"
            title="Share on Twitter"
            aria-label="Share on Twitter"
          >
            <Twitter size={13} />
          </a>

          {/* GitHub Profile */}
          <a
            href="https://github.com/Praval07"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-line hover:bg-[#F7F5EF] hover:-translate-y-0.5 transition-all flex items-center justify-center text-ink bg-paper"
            title="Author GitHub Profile"
            aria-label="Author GitHub Profile"
          >
            <Github size={14} />
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
            className="w-9 h-9 rounded-full border border-line hover:bg-[#F7F5EF] hover:-translate-y-0.5 transition-all flex items-center justify-center text-ink bg-paper"
            title="Share via Email"
            aria-label="Share via Email"
          >
            <Mail size={14} />
          </a>
        </div>
      </div>

      {/* Bookmark Section */}
      <div className="flex flex-col gap-2 border-t border-line pt-4">
        <span className="font-mono text-[10px] text-stone uppercase tracking-wider select-none">Save & Bookmark</span>
        <button
          onClick={toggleBookmark}
          className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-mono transition-all w-max cursor-pointer ${
            bookmarked
              ? "bg-gold border-gold text-ink font-semibold hover:bg-gold-hover hover:border-gold-hover"
              : "bg-paper border-line text-ink-soft hover:bg-[#F7F5EF]"
          }`}
          aria-label={bookmarked ? "Remove bookmark" : "Save article for later"}
        >
          <Bookmark size={13} fill={bookmarked ? "currentColor" : "none"} />
          <span>{bookmarked ? "Bookmarked" : "Save Article"}</span>
        </button>
      </div>
    </div>
  );
}

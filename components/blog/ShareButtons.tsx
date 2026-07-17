"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, Linkedin } from "lucide-react";

export function ShareButtons({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(`https://pravalsaxena.com/blog/${slug}`);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, [slug]);

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] text-stone uppercase tracking-wider">SHARE ARTICLE</span>
      <div className="flex gap-2">
        <button
          onClick={copyLink}
          className="w-8 h-8 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-ink bg-paper cursor-pointer"
          aria-label="Copy article link"
        >
          {copied ? <span className="text-[10px] font-mono text-gold-deep font-bold">✓</span> : <LinkIcon size={13} />}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-line hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-ink bg-paper"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={13} />
        </a>
      </div>
    </div>
  );
}

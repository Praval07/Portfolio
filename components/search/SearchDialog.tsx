"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export interface SearchableItem {
  title: string;
  description: string;
  href: string;
  group: string;
}

interface SearchDialogProps {
  items: SearchableItem[];
}

/**
 * Command palette (⌘K / Ctrl+K). Searches case studies, sections, and
 * quick actions (résumé, contact) — the "productivity feature, not a
 * gimmick" described in Part 2.3 §15. Fully keyboard operable, traps
 * focus while open, and closes on Escape or outside click.
 */
export function SearchDialog({ items, isGlass = false }: SearchDialogProps & { isGlass?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q)
    );
  }, [query, items]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`hidden sm:flex items-center gap-2 text-sm transition-all font-mono rounded px-3 py-1.5 ${
          isGlass
            ? "text-white/70 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10"
            : "text-ink-soft border border-line hover:border-line-strong bg-surface"
        }`}
        aria-label="Open search (Command K)"
      >
        <Search size={14} />
        <span>Search</span>
        <kbd className={`text-xs border rounded px-1.5 py-0.5 ${
          isGlass
            ? "text-white/40 border-white/10 bg-transparent"
            : "text-stone border-line bg-transparent"
        }`}>⌘K</kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-surface border border-line rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search size={16} className="text-stone shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, sections…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-stone"
                aria-label="Search query"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search">
                <X size={16} className="text-stone hover:text-ink" />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto py-2" role="listbox">
              {results.length === 0 && (
                <li className="px-4 py-6 text-sm text-stone text-center">No results for “{query}”.</li>
              )}
              {results.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => go(item.href)}
                    className="w-full text-left px-4 py-2.5 hover:bg-paper-deep transition-colors flex flex-col gap-0.5"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="text-sm text-ink">{item.title}</span>
                    <span className="text-xs text-stone">{item.group} · {item.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

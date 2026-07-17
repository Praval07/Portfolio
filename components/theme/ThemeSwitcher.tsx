"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "praval-theme";

/**
 * Light is the primary, designed experience (per the design bible's
 * "quiet luxury" direction). Dark is an optional secondary mode — it
 * inverts the paper/ink relationship rather than introducing new hues,
 * so brand consistency holds in both states.
 */
export function ThemeSwitcher({ isGlass = false }: { isGlass?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
  }

  // Avoid a flash of incorrect state before hydration reads localStorage.
  if (!mounted) return <div className="w-9 h-9" aria-hidden="true" />;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
        isGlass
          ? "border border-white/10 hover:border-white/30 bg-white/5 text-white/80 hover:bg-white/10"
          : "border border-line hover:border-forest text-ink bg-surface"
      }`}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

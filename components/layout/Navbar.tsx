"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/data/nav";
import { SearchDialog, type SearchableItem } from "@/components/search/SearchDialog";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Menu, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const searchItems: SearchableItem[] = [
  { title: "AlpURL", description: "AI URL shortener", href: "/projects/alpurl", group: "Projects" },
  { title: "MOHINI AI Assistant", description: "Conversational AI voice assistant", href: "/projects/mohini-ai", group: "Projects" },
  { title: "Nexora AI", description: "Education management platform", href: "/projects/nexora-ai", group: "Projects" },
  { title: "N.E.T.R.A.-R", description: "Computer vision road extraction", href: "/projects/netra-r", group: "Projects" },
  { title: "Rapid Revision Hub", description: "Smart notes EdTech platform", href: "/projects/rapid-revision-hub", group: "Projects" },
  { title: "About", description: "Journey, education and values", href: "/about", group: "Pages" },
  { title: "Skills", description: "Core technical stack and domains", href: "/skills", group: "Pages" },
  { title: "Experience", description: "Professional history and timeline", href: "/experience", group: "Pages" },
  { title: "Blog", description: "Technical articles and tutorials", href: "/blog", group: "Pages" },
  { title: "Contact", description: "Inquiries and meeting scheduler", href: "/contact", group: "Pages" },
  { title: "Resume", description: "ATS-friendly interactive resume", href: "/resume", group: "Pages" },
  { title: "FAQ", description: "Frequently asked questions", href: "/faq", group: "Pages" },
  { title: "Certificates", description: "Professional credentials and achievements", href: "/certificates", group: "Pages" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 sm:pt-6 transition-all duration-300">
        <div
          className={`w-[88%] max-w-[1240px] flex items-center justify-between rounded-full backdrop-blur-md transition-all duration-300 ${
            scrolled
              ? "bg-black/60 border border-white/10 px-5 py-2.5 shadow-lg shadow-black/20"
              : "bg-black/45 border border-white/5 px-6 py-4"
          }`}
        >
          <Link href="/#top" className="font-display text-lg font-semibold text-white tracking-tight hover:scale-105 transition-all duration-300">
            PS<span className="text-gold">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-8 list-none m-0 p-0">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <SearchDialog items={searchItems} isGlass />
            <ThemeSwitcher isGlass />
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 bg-white/5 text-white/80 hover:bg-white/10"
            >
              <Mail size={15} />
            </a>
            <Link
              href="/contact"
              className="font-mono text-sm bg-white/15 text-white border border-white/10 hover:border-white/30 hover:bg-white/25 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full px-6 py-2 inline-flex items-center gap-1.5 shadow-md shadow-black/10"
            >
              Let&rsquo;s Talk <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitcher isGlass />
            <button
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={primaryNav} />
    </>
  );
}

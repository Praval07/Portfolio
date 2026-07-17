"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { NavItem } from "@/data/nav";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={`fixed inset-0 z-200 bg-paper flex flex-col px-6 py-5 transition-transform duration-500 ease-out ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center mb-16">
        <span className="font-display text-lg">
          Praval<span className="text-copper">.</span>Saxena
        </span>
        <button ref={closeRef} onClick={onClose} aria-label="Close menu" className="font-mono text-sm">
          Close ✕
        </button>
      </div>
      <nav aria-label="Mobile">
        <ul className="flex flex-col gap-6 list-none p-0 m-0">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onClose} className="font-display text-4xl">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

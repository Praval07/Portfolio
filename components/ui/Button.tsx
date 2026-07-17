import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text" | "gold" | "outline-light";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-gold hover:text-ink hover:-translate-y-0.5",
  secondary:
    "border border-ink text-ink hover:border-gold hover:text-gold-deep hover:-translate-y-0.5",
  text: "text-ink-soft border-b border-line-strong rounded-none pb-0.5 hover:text-gold-deep hover:border-gold",
  gold: "bg-gold text-ink hover:bg-gold-soft hover:-translate-y-0.5",
  "outline-light":
    "border border-paper/50 text-paper hover:bg-paper hover:text-ink hover:-translate-y-0.5",
};

const BASE =
  "inline-flex items-center gap-2 font-mono text-sm px-6 py-3.5 rounded-full transition-all duration-200 ease-out";

/** Anchor-style Button — for in-page anchors, external links, and routed links. */
export function LinkButton({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href.startsWith("http");
  const classes = `${BASE} ${VARIANT_STYLES[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** True <button> — for form submissions and JS-triggered actions. */
export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${BASE} ${VARIANT_STYLES[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

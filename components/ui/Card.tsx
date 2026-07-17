import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Generic surface card used for skill categories, small info blocks, etc.
 *  Case studies and timeline items use their own dedicated components since
 *  they carry more specific structure — see components/case-study and
 *  components/sections/Experience.tsx. */
export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`bg-surface border border-line rounded-lg p-6 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

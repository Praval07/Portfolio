interface SectionRailProps {
  number: string;
  label: string;
}

/**
 * The numbered vertical rail label used throughout the reference layout
 * (e.g. "01 — ABOUT ME"). Desktop-only editorial detail; hidden below the
 * lg breakpoint where there's no room for a side rail without crowding
 * the actual content.
 */
export function SectionRail({ number, label }: SectionRailProps) {
  return (
    <div className="hidden lg:flex flex-col items-center w-14 shrink-0 pt-1.5" aria-hidden="true">
      <span className="font-mono text-xs text-stone">{number}</span>
      <span className="w-px flex-1 bg-line my-3" />
      <span
        className="font-mono text-[0.65rem] tracking-[0.2em] text-stone uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        {label}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3" />
    </div>
  );
}

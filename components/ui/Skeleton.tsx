interface SkeletonProps {
  className?: string;
  "aria-label"?: string;
}

/** Loading placeholder. Uses a static pulse (not motion-heavy) and is
 *  announced to screen readers via aria-busy on the parent + a label here. */
export function Skeleton({ className = "", ...rest }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-line-strong/40 rounded ${className}`}
      role="status"
      {...rest}
    >
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function CaseStudySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-16" aria-busy="true">
      <Skeleton className="aspect-[16/11] w-full" aria-label="Loading case study preview" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

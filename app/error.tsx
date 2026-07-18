"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire this up to your error tracking (Sentry, etc.) before launch.
    // Intentionally not logging to console in production
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-6 pt-56 pb-32 text-center">
      <p className="eyebrow justify-center mb-4">Something went wrong</p>
      <h1 className="text-4xl mb-4">That didn&rsquo;t load correctly.</h1>
      <p className="text-ink-soft mb-8">
        This has been logged. You can try again, or head back to the homepage.
      </p>
      <div className="flex gap-4 justify-center">
        <button onClick={reset} className="font-mono text-sm border border-ink rounded px-4 py-2.5">
          Try again
        </button>
        <Link href="/" className="font-mono text-sm border-b border-ink pb-0.5 self-center">
          ← Homepage
        </Link>
      </div>
    </div>
  );
}

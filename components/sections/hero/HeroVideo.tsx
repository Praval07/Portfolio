"use client";

/**
 * HeroVideo — Temporary static fallback (video assets removed from repo).
 * TODO: Reconnect video via Vercel Blob / Cloudinary after initial deployment.
 * Original video: /videos/hero.mp4
 */
export function HeroVideo() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroGradientShift {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .hero-bg-fallback {
              background-size: 200% 200%;
              animation: heroGradientShift 12s ease infinite;
            }
          `,
        }}
      />
      {/* Static poster — fills the role of the video background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/images/hero-poster.webp')" }}
        aria-hidden="true"
      />
      {/* Subtle animated gradient overlay for depth */}
      <div
        className="hero-bg-fallback absolute inset-0 w-full h-full -z-10 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, #0a0908 0%, #1a1611 35%, #0f0d0a 60%, #1c1810 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

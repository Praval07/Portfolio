"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const POSTER = "/images/hero-poster.png";

type Status = "idle" | "loading" | "ready" | "error";

export function HeroVideo() {
  const [status, setStatus] = useState<Status>("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [muted, setMuted] = useState(true); // Must start muted for autoplay policy
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect prefers-reduced-motion
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (reducedMotion) return; // Stay on poster if motion is reduced

    setStatus("loading");

    fetch("/api/video-url?key=hero")
      .then((r) => {
        if (!r.ok) throw new Error(`API ${r.status}`);
        return r.json();
      })
      .then((data: { url?: string; error?: string }) => {
        if (data.url) {
          setVideoUrl(data.url);
        } else {
          throw new Error(data.error ?? "No URL");
        }
      })
      .catch((err) => {
        console.warn("[HeroVideo] Could not load video:", err);
        setStatus("error");
      });
  }, [reducedMotion]);

  const handleCanPlay = () => {
    setStatus("ready");
    // Small delay so the fade-in feels intentional
    setTimeout(() => setVisible(true), 100);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <>
      {/* ── Poster image — always rendered as the base layer ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url('${POSTER}')` }}
        aria-hidden="true"
      />

      {/* ── Video layer — fades in over the poster once ready ── */}
      {videoUrl && status !== "error" && (
        <video
          ref={videoRef}
          key={videoUrl}
          className={`absolute inset-0 w-full h-full object-cover -z-10 transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted        // Required for autoplay; user can unmute via button below
          loop
          playsInline
          preload="none"
          poster={POSTER}
          onCanPlay={handleCanPlay}
          onError={() => setStatus("error")}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* ── Unmute / Mute toggle — visible once video is playing ── */}
      {status === "ready" && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full
            bg-white/10 backdrop-blur-md border border-white/20
            text-paper text-xs font-mono tracking-wide
            hover:bg-white/20 active:scale-95
            transition-all duration-200 select-none"
        >
          {muted ? (
            <>
              <VolumeX size={13} />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 size={13} />
              <span>Mute</span>
            </>
          )}
        </button>
      )}
    </>
  );
}

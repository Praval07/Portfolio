"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react";

type Status = "loading" | "ready" | "error";

export function AboutGallery() {
  const [status, setStatus] = useState<Status>("loading");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false); // Audio ON by default per spec
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch OneDrive direct stream URL from our server-side API ──
  useEffect(() => {
    fetch("/api/video-url?key=gallery")
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
        console.warn("[AboutGallery] Could not load video:", err);
        setStatus("error");
      });
  }, []);

  // ── Controls auto-hide after 2.5 s of inactivity ──
  const revealControls = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  // Reset auto-hide when play/pause changes
  useEffect(() => {
    if (!playing) {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    } else {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 2500);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [playing]);

  // ── Playback helpers ──
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setStatus("error"));
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const enterFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="mb-24 rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-ink relative border border-line/10 shadow-2xl group"
      onMouseMove={revealControls}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* ── Loading skeleton ── */}
      {status === "loading" && (
        <div className="absolute inset-0 bg-ink animate-pulse flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <Loader2 size={36} className="text-gold/50 animate-spin z-10" />
        </div>
      )}

      {/* ── Error / fallback state ── */}
      {status === "error" && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/portrait-1200.webp"
            alt="Praval Saxena — Portfolio Gallery"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-paper/50 font-mono text-xs">Video unavailable</p>
          </div>
        </>
      )}

      {/* ── Video element ── */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            status === "ready" ? "opacity-90" : "opacity-0"
          }`}
          playsInline
          preload="metadata"
          /* No muted — audio is ON per spec */
          onCanPlay={() => setStatus("ready")}
          onError={() => setStatus("error")}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}

      {/* ── Cinematic gradient overlay ── */}
      {status === "ready" && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent pointer-events-none" />
      )}

      {/* ── Glassmorphism control bar ── */}
      {(status === "ready" || status === "loading") && (
        <div
          className={`absolute inset-x-0 bottom-0 px-5 pb-5 pt-16 z-20 transition-opacity duration-300 ${
            showControls || status === "loading" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to top, rgba(10,9,8,0.75) 0%, transparent 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Label */}
            <p className="text-paper/90 font-mono text-xs drop-shadow-md tracking-wide">
              Praval Saxena — Portfolio Gallery
            </p>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                  flex items-center justify-center
                  hover:bg-white/25 active:scale-95 transition-all duration-150"
              >
                {muted ? (
                  <VolumeX size={14} className="text-paper" />
                ) : (
                  <Volume2 size={14} className="text-paper" />
                )}
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                  flex items-center justify-center
                  hover:bg-white/25 active:scale-95 transition-all duration-150"
              >
                {playing ? (
                  <Pause size={14} className="text-paper" />
                ) : (
                  <Play size={14} className="text-paper" />
                )}
              </button>

              {/* Fullscreen */}
              <button
                onClick={enterFullscreen}
                aria-label="Fullscreen"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                  flex items-center justify-center
                  hover:bg-white/25 active:scale-95 transition-all duration-150"
              >
                <Maximize size={14} className="text-paper" />
              </button>

              {/* Live indicator */}
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* ── Big centre play button (when video is ready but not playing) ── */}
      {status === "ready" && !playing && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center z-10
            group/play"
        >
          <span
            className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30
              flex items-center justify-center
              group-hover/play:scale-110 group-hover/play:bg-white/25
              transition-all duration-200 shadow-xl"
          >
            <Play size={24} className="text-paper ml-1" />
          </span>
        </button>
      )}
    </section>
  );
}

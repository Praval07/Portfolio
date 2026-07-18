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
    <section className="mb-24 rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-ink relative border border-line/10 shadow-2xl group">
      <img
        src="/images/about-ai.png"
        alt="Praval Saxena Gallery"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { VideoProject } from "../../data";

// Kafelek filmu: odtwarza się bez dźwięku, gdy jest na ekranie, i pauzuje poza nim
function VideoTile({
  video,
  index,
  featured,
  onOpen,
}: {
  video: VideoProject;
  index: number;
  featured: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Odtwórz film: ${video.title}`}
      initial={{ opacity: 0, y: 80, clipPath: "inset(20% 0% 0% 0%)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay: (index % 2) * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative block w-full overflow-hidden bg-zinc-900 text-left ${
        featured ? "aspect-video md:col-span-2" : "aspect-[4/5] md:aspect-[4/3]"
      }`}
    >
      <video
        ref={ref}
        src={video.videoSrc}
        poster={video.thumbnail}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-700 group-hover:opacity-70" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-display text-4xl italic uppercase leading-none md:text-6xl">
            {video.title}
          </h3>
        </div>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/60 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent md:h-24 md:w-24">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}

// Siatka filmów + odtwarzacz pełnoekranowy z dźwiękiem
export default function VideoShowcase({ videos }: { videos: VideoProject[] }) {
  const [open, setOpen] = useState<VideoProject | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        {videos.map((v, i) => (
          <VideoTile
            key={v.id}
            video={v}
            index={i}
            featured={i === 0}
            onOpen={() => setOpen(v)}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={open.description}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black"
            onClick={() => setOpen(null)}
          >
            <video
              src={open.videoSrc}
              poster={open.thumbnail}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80dvh] w-[92vw] max-w-6xl outline-none"
            />
            <button
              type="button"
              autoFocus
              aria-label="Zamknij film"
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 hover:rotate-90 hover:border-accent hover:bg-accent md:right-10 md:top-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-2xl italic uppercase text-white/80">
              {open.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

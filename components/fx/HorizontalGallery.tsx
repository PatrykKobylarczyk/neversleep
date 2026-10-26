"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { Photo } from "../../data";

// Galeria, która przy przewijaniu w dół jedzie w poziomie (sekcja przyklejona do ekranu)
export default function HorizontalGallery({
  photos,
  alt,
  title,
}: {
  photos: Photo[];
  alt: string;
  title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Odległość do przejechania = szerokość taśmy minus szerokość ekranu
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100dvh + ${distance}px)` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pt-[128px]">
        <div className="mb-8 flex items-end justify-between px-8 md:px-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
            {title}
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">
            {String(photos.length).padStart(2, "0")} kadrów
          </span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-6 px-8 md:gap-10 md:px-20"
        >
          {photos.map((img, i) => (
            <figure
              key={img.src}
              className={`group relative shrink-0 overflow-hidden ${
                img.height > img.width ? "h-[48dvh] md:h-[56dvh]" : "h-[32dvh] md:h-[50dvh]"
              } ${i % 2 ? "md:translate-y-8" : "md:-translate-y-4"}`}
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                fill
                sizes="(min-width: 768px) 60vw, 85vw"
                alt={`${alt} – zdjęcie ${i + 1}`}
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
              />
              <figcaption className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.4em] text-white backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </motion.div>

        {/* Pasek postępu */}
        <div className="mx-8 mt-10 h-px bg-white/10 md:mx-20">
          <motion.div style={{ width: progressWidth }} className="h-full bg-accent" />
        </div>
      </div>
    </section>
  );
}

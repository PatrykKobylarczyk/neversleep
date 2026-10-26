"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { HeroMedia } from "./ParallaxHero";

// Karta osoby z duetu: przechyla się w 3D za kursorem, tło to praca danej osoby
export default function TeamCard({
  name,
  role,
  text,
  media,
  index,
}: {
  name: string;
  role: string;
  text: string;
  media: HeroMedia;
  index: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: 1200 }}
      className={index % 2 ? "md:mt-32" : ""}
    >
      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[3/4] overflow-hidden bg-zinc-900"
      >
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover grayscale transition-all duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:grayscale-0"
          />
        ) : (
          <video
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:grayscale-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-x-0 bottom-0 p-8 md:p-10"
        >
          <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-200">
            <span className="h-px w-8 bg-accent" />
            {role}
          </p>
          <h3 className="font-display text-4xl italic uppercase leading-[0.95] md:text-6xl">
            {name}
          </h3>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-300 md:text-base">
            {text}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

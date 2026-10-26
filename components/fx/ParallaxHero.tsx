"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitTitle from "./SplitTitle";

export type HeroMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

// Pełnoekranowy nagłówek podstrony: tło przesuwa się wolniej niż treść,
// a tytuł odjeżdża i gaśnie przy przewijaniu
export default function ParallaxHero({
  kicker,
  title,
  media,
  children,
}: {
  kicker: string;
  title: string;
  media: HeroMedia;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] min-h-[600px] overflow-hidden bg-black"
    >
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        {media.type === "image" ? (
          <Image
            src={media.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
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
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex h-full flex-col justify-end px-8 pb-20 md:px-20 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-200"
        >
          <span className="h-px w-12 bg-accent" />
          {kicker}
        </motion.p>
        <SplitTitle
          text={title}
          delay={0.3}
          className="font-display text-[13vw] italic uppercase leading-[0.9] md:text-[8.5vw]"
        />
        {children}
      </motion.div>

      {/* Wskazówka przewijania */}
      <motion.div
        style={{ opacity: fade }}
        aria-hidden="true"
        className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-3 md:right-20 md:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-400 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

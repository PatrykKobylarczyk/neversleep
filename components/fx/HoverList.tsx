"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export interface HoverListItem {
  href: string;
  label: string;
  meta: string;
  image: string;
}

// Duża lista linków; na desktopie za kursorem jedzie podgląd zdjęcia
export default function HoverList({ items }: { items: HoverListItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <ul className="border-t border-white/10">
        {items.map((item, i) => (
          <li key={item.href} className="border-b border-white/10">
            <Link
              href={item.href}
              onMouseEnter={() => setActive(i)}
              className="group flex items-center justify-between gap-6 py-8 md:py-10"
            >
              <span className="flex items-baseline gap-6 md:gap-10">
                <span className="text-[10px] font-bold tracking-[0.4em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl italic uppercase leading-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-4 group-hover:text-accent md:text-7xl">
                  {item.label}
                </span>
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 md:block">
                {item.meta}
              </span>
              <span className="flex h-12 w-12 shrink-0 -rotate-45 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-0 group-hover:border-accent group-hover:bg-accent md:h-16 md:w-16">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            aria-hidden="true"
            key="preview"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{ left: sx, top: sy }}
            className="pointer-events-none fixed z-40 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:block"
          >
            <Image
              src={items[active].image}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

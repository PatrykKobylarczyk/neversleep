"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Własny kursor na desktopie – podąża za myszą i powiększa się nad klikalnymi elementami.
// Na dotyku i przy wyłączonych animacjach chowa go CSS (klasa cursor-dot).
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 450, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 450, damping: 35, mass: 0.4 });
  const sScale = useSpring(scale, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const overTarget = Boolean(
        el?.closest("a, button, [role='button'], section"),
      );
      scale.set(overTarget ? 2.6 : 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, scale]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ left: sx, top: sy }}
      className="cursor-dot pointer-events-none fixed z-[500] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.span
        style={{ scale: sScale }}
        className="block h-3 w-3 rounded-full border border-white bg-white/20"
      />
    </motion.div>
  );
}

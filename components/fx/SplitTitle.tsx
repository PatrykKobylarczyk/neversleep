"use client";

import { motion } from "framer-motion";

// Duży nagłówek, którego litery wysuwają się spod maski jedna po drugiej
export default function SplitTitle({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let index = 0;

  return (
    <Tag aria-label={text} className={className}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} aria-hidden="true" className="-mt-[0.2em] inline-block overflow-hidden pb-[0.08em] pr-[0.12em] pt-[0.2em] align-bottom">
          {word.split("").map((char) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%", rotate: 8 }}
                whileInView={{ y: "0%", rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: delay + i * 0.035,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

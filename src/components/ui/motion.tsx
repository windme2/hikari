"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const settle = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word reveal: each word rises out of a soft blur, like text coming
 * into focus as light hits it. Use `\n` for line breaks.
 */
export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  as: Tag = "h2",
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
}) {
  const lines = text.split("\n");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-12% 0px" } })}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
      aria-label={text.replace(/\n/g, " ").replace(/\*/g, "")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, wi) => {
            const bold = word.startsWith("*") && word.endsWith("*");
            const w = bold ? word.slice(1, -1) : word;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className={`inline-block ${bold ? "font-semibold" : ""}`}
                  variants={{
                    hidden: { y: "60%", opacity: 0, filter: "blur(10px)" },
                    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: settle } },
                  }}
                >
                  {w}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}

/** Counts up to `value` once it scrolls into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  duration = 1.6,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, delay, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {(reduce ? value : n).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

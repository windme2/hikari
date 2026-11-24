"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import Arrow from "./Arrow";
import { CountUp, RevealText, settle } from "./ui/motion";
import { heroStats, photos } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Sunlight that follows the cursor
  const mx = useMotionValue(70);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgb(255 228 180 / 0.32), transparent 70%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section id="top" ref={ref}>
      <motion.div
        onPointerMove={onMove}
        initial={{ clipPath: "inset(6% 5% 6% 5% round 40px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px 0px 36px 36px)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-sumi text-white sm:h-[100svh] sm:max-h-[900px]"
      >
        <motion.div className="absolute inset-0 -z-10" style={{ y: imgY }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.25, filter: "brightness(0.35)" }}
            animate={{ scale: 1, filter: "brightness(1)" }}
            transition={{ duration: 2.2, ease: settle, delay: 0.1 }}
          >
            <Image
              src={photos.hero}
              alt="Living room with zebra blinds and soft daylight"
              fill
              preload
              quality={80}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        </motion.div>

        {/* One sweep of light across the room on load */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 -z-[5] w-1/2 bg-[linear-gradient(100deg,transparent,rgb(255_236_200/0.38)_45%,rgb(255_246_225/0.5)_50%,rgb(255_236_200/0.38)_55%,transparent)] mix-blend-soft-light"
          initial={{ x: "0%" }}
          animate={{ x: "420%" }}
          transition={{ duration: 2.4, ease: [0.45, 0, 0.2, 1], delay: 0.7 }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[5] hidden mix-blend-soft-light [@media(hover:hover)]:block"
          style={{ background: glow }}
        />

        <motion.div
          style={{ opacity: fade }}
          className="mx-auto mt-auto w-full max-w-[1440px] px-5 pb-5 pt-32 sm:px-8 sm:pb-8"
        >
          <RevealText
            as="h1"
            immediate
            delay={1.15}
            text={"Curtains and blinds in Bangkok\nmade to your size *from* *฿690/m*"}
            className="hidden text-[clamp(2.4rem,4.4vw,4rem)] font-light leading-[1.08] tracking-[-0.03em] sm:block"
          />
          <RevealText
            as="h1"
            immediate
            delay={1.15}
            text={"Curtains & blinds\nmade to your size\n*from* *฿690/m*"}
            className="text-[2.2rem] font-light leading-[1.08] tracking-[-0.03em] sm:hidden"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: settle }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-sumi transition-colors hover:bg-sunbeam"
            >
              Get a price
              <span className="grid size-9 place-items-center rounded-full bg-sumi text-white transition-transform duration-500 ease-[var(--ease-settle)] group-hover:rotate-[-45deg]">
                <Arrow />
              </span>
            </a>
            <a href="#studio" className="group inline-flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white">
                Try the Light Studio
              </span>
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { delayChildren: 1.8, staggerChildren: 0.08 } } }}
            className="mt-10 grid grid-cols-2 gap-2 sm:mt-16 sm:gap-3 lg:grid-cols-4"
          >
            {heroStats.map((s, i) => (
              <motion.li
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: settle } },
                }}
                className="group flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-4 ring-1 ring-white/15 backdrop-blur-[6px] transition-colors duration-500 hover:bg-white/15 sm:gap-5 sm:px-6 sm:py-5"
              >
                <span className="shrink-0 text-[clamp(1.6rem,2.8vw,2.5rem)] font-light leading-none">
                  <CountUp value={s.value} prefix={s.prefix} delay={1.9 + i * 0.08} />
                  {s.suffix && <span className="ml-0.5 text-[0.45em] font-normal text-white/70">{s.suffix}</span>}
                </span>
                <span className="whitespace-pre-line text-[11px] leading-snug text-white/75 sm:text-[13px]">
                  {s.label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Arrow from "./Arrow";
import { Chevron } from "./Catalog";
import { RevealText, settle } from "./ui/motion";
import { rooms } from "@/lib/content";

const DURATION = 6500;

type Box = { w: number; h: number };

/** Map a point in photo space to the container, honouring object-fit: cover. */
function project(spot: { x: number; y: number }, box: Box, ratio: number) {
  const wide = box.w / box.h > ratio;
  const rw = wide ? box.w : box.h * ratio;
  const rh = wide ? box.w / ratio : box.h;
  return { x: (box.w - rw) / 2 + spot.x * rw, y: (box.h - rh) / 2 + spot.y * rh };
}

export default function Rooms() {
  const [idx, setIdx] = useState(0);
  const [peek, setPeek] = useState(false);
  const [hover, setHover] = useState(false);
  const [box, setBox] = useState<Box | null>(null);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const frame = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);
  // Reduced motion: plain crossfades, no blur (MotionConfig already drops the transforms)
  const reduce = useReducedMotion();
  const soft = (px: number) => (reduce ? "blur(0px)" : `blur(${px}px)`);
  const inView = useInView(frame, { margin: "-20% 0px" });
  const room = rooms[idx];
  const playing = inView && !hover && !peek;

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % rooms.length), DURATION);
    return () => clearTimeout(t);
  }, [playing, idx]);

  const select = (i: number) => {
    setPeek(false);
    setIdx((i + rooms.length) % rooms.length);
  };

  const ratio = ratios[room.id];
  const pt = box && ratio ? project(room.spot, box, ratio) : null;
  const flip = pt && box ? pt.x > box.w * 0.55 : false;
  const below = pt ? pt.y < 190 : false;

  const tabs = (
    <div
      role="tablist"
      aria-label="Choose a room"
      className="flex gap-1.5 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] md:[mask-image:none]"
    >
      {rooms.map((r, i) => {
        const active = i === idx;
        return (
          <button
            key={r.id}
            role="tab"
            aria-selected={active}
            onClick={() => select(i)}
            className={`relative shrink-0 overflow-hidden rounded-full px-4 py-2.5 text-[13px] font-semibold leading-none transition-colors ${
              active ? "bg-sumi text-white md:bg-white md:text-sumi" : "bg-washi-deep text-sumi/70 hover:bg-white md:bg-white/70"
            }`}
          >
            {r.label}
            {active && (
              <motion.span
                key={`${r.id}-${playing}`}
                aria-hidden
                className="absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-sunbeam"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: playing ? 1 : 0 }}
                transition={{ duration: playing ? DURATION / 1000 : 0.3, ease: "linear" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
        <RevealText
          text={"Rooms we’ve dressed"}
          className="text-[clamp(1.9rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.03em]"
        />
        <a href="#catalog" className="hidden shrink-0 items-center gap-3 pb-2 text-[12px] font-semibold uppercase tracking-wider sm:flex">
          Browse catalog <Chevron />
        </a>
      </div>

      <div
        ref={frame}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onTouchStart={(e) => (swipe.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (swipe.current ?? e.changedTouches[0].clientX);
          swipe.current = null;
          if (Math.abs(dx) > 50) select(idx + (dx < 0 ? 1 : -1));
        }}
        className="relative isolate aspect-[4/5] overflow-hidden rounded-[24px] bg-sumi sm:aspect-[4/3] sm:rounded-[28px] md:aspect-auto md:h-[min(85svh,800px)] md:min-h-[560px]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={room.id}
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0, scale: 1.08, filter: soft(8) }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: settle }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: playing ? 1.06 : 1 }}
              transition={{ duration: DURATION / 1000, ease: "linear" }}
            >
              <Image
                src={room.src}
                alt={`${room.product} in a ${room.label.toLowerCase()}`}
                fill
                quality={80}
                sizes="(min-width:1440px) 1380px, 100vw"
                className="object-cover"
                onLoad={(e) => {
                  const im = e.currentTarget;
                  setRatios((r) => ({ ...r, [room.id]: im.naturalWidth / im.naturalHeight }));
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />

        {/* Room counter */}
        <div className="absolute left-5 top-5 flex items-baseline gap-1 text-white sm:left-7 sm:top-7">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={idx}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.5, ease: settle }}
              className="text-2xl font-light tabular-nums"
            >
              0{idx + 1}
            </motion.span>
          </AnimatePresence>
          <span className="text-[13px] text-white/60">/ 0{rooms.length}</span>
        </div>

        {/* Hotspot: dot sits on the curtain, label floats beside it */}
        <AnimatePresence mode="wait">
          {pt && (
            <motion.div
              key={room.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute z-10"
              style={{ left: pt.x, top: pt.y }}
            >
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
                className="absolute -left-2 -top-2 grid size-4 place-items-center rounded-full bg-white shadow-[0_0_0_6px_rgb(255_255_255/0.25)]"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
              </motion.span>
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.65, duration: 0.5, ease: settle }}
                className={`absolute left-0 h-14 w-px bg-white ${below ? "top-2 origin-top" : "-top-16 origin-bottom"}`}
              />
              <motion.div
                initial={{ opacity: 0, y: below ? -8 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: settle }}
                className={`absolute ${below ? "top-16" : "bottom-16"} ${flip ? "right-0 translate-x-6" : "left-0 -translate-x-6"}`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="w-max overflow-hidden rounded-[22px] bg-white text-sumi shadow-[0_12px_40px_rgb(0_0_0/0.25)]"
                >
                  <button
                    type="button"
                    onClick={() => setPeek((p) => !p)}
                    aria-expanded={peek}
                    className="flex items-center gap-3 py-1.5 pl-1.5 pr-5 text-left"
                  >
                    <motion.span layout className="grid size-9 place-items-center rounded-full bg-sumi text-white">
                      <Arrow className={`transition-transform duration-500 ${peek ? "rotate-[135deg]" : "-rotate-45"}`} />
                    </motion.span>
                    <motion.span layout="position">
                      <span className="block text-[14px] font-semibold leading-tight">{room.product}</span>
                      <span className="block text-[11px] text-sumi/55">{peek ? "Close" : "Take a closer look"}</span>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {peek && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: settle }}
                        className="max-w-[min(260px,70vw)]"
                      >
                        <div className="border-t border-sumi/10 px-4 pb-4 pt-3">
                          <p className="text-[13px] leading-snug text-sumi/70">{room.detail}</p>
                          <div className="mt-3 flex items-center justify-between gap-4">
                            <span className="text-[13px] font-semibold">{room.price}</span>
                            <a href="#catalog" className="text-[12px] font-semibold underline underline-offset-4">
                              View in catalog
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: one badge on the photo; the word swaps as each room finishes. Tap for the next room. */}
        <button
          type="button"
          onClick={() => select(idx + 1)}
          aria-label={`${room.label}. Show next room`}
          className="absolute bottom-4 left-4 flex items-center gap-2.5 overflow-hidden rounded-full bg-white/15 py-2 pl-2 pr-4 text-white ring-1 ring-white/30 backdrop-blur-md md:hidden"
        >
          <span className="grid size-7 place-items-center rounded-full bg-white text-sumi">
            <Arrow className="size-3" />
          </span>
          <span className="relative block h-[18px] overflow-hidden text-[14px] font-semibold leading-[18px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={room.id}
                className="block whitespace-nowrap"
                initial={{ y: "110%", opacity: 0, filter: soft(4) }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-110%", opacity: 0, filter: soft(4) }}
                transition={{ duration: 0.55, ease: settle }}
              >
                {room.label}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.span
            key={`${room.id}-${playing}`}
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-sunbeam"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: playing ? 1 : 0 }}
            transition={{ duration: playing ? DURATION / 1000 : 0.3, ease: "linear" }}
          />
        </button>

        {/* Desktop room tabs */}
        <div className="absolute inset-x-6 bottom-6 hidden justify-center md:flex">{tabs}</div>
      </div>

    </section>
  );
}

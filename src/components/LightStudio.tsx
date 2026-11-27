"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useState } from "react";
import Arrow from "./Arrow";
import { RevealText, settle } from "./ui/motion";
import { fabrics, photos } from "@/lib/content";

// tint: multiplied over the photo · grade: soft-light colour grade · shade: colour the room falls to as light drops
const times = [
  { id: "morning", label: "Morning", base: 0.85, tint: "rgb(255 214 160 / 0.18)", grade: "rgb(255 200 140 / 0)", shade: "#0d0c0b" },
  { id: "noon", label: "Noon", base: 1, tint: "rgb(255 255 255 / 0)", grade: "rgb(255 200 140 / 0)", shade: "#0d0c0b" },
  // Evening: golden-hour grade over the whole room, sinking into warm brown rather than grey
  { id: "evening", label: "Evening", base: 0.7, tint: "rgb(255 210 165 / 0.28)", grade: "rgb(255 170 100 / 0.22)", shade: "#120b07" },
] as const;

const spring = { stiffness: 110, damping: 22, mass: 0.6 };

export default function LightStudio() {
  const [fabricId, setFabricId] = useState("linen");
  const [timeId, setTimeId] = useState<(typeof times)[number]["id"]>("noon");
  const [closed, setClosed] = useState(65);
  const fabric = fabrics.find((f) => f.id === fabricId)!;
  const time = times.find((t) => t.id === timeId)!;
  const rangeId = useId();

  const c = useSpring(closed / 100, spring);
  const pass = useSpring(fabric.pass, spring);
  const base = useSpring(time.base, spring);
  useEffect(() => {
    c.set(closed / 100);
    pass.set(fabric.pass);
    base.set(time.base);
  }, [closed, fabric.pass, time.base, c, pass, base]);

  const panelW = useTransform(c, (v) => `${v * 50}%`);
  const panelOpacity = useTransform(pass, (p) => 1 - p * 0.72);
  const light = useTransform([c, pass, base], ([cv, pv, bv]: number[]) => bv * (1 - cv * (1 - pv)));
  const shade = useTransform(light, (l) => (1 - l) * 0.85);
  const [pct, setPct] = useState(Math.round(time.base * (1 - (closed / 100) * (1 - fabric.pass)) * 100));
  useMotionValueEvent(light, "change", (l) => setPct(Math.round(l * 100)));

  return (
    <section id="studio" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
        {/* Mobile intro sits above the stage, so the controls can live on the photo */}
        <div className="px-1 pb-2 md:hidden">
          <span className="inline-block rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider">
            Light Studio
          </span>
          <RevealText
            text={"See the light\nbefore you buy"}
            className="mt-4 text-[2rem] font-light leading-[1.1] tracking-[-0.03em]"
          />
          <p className="mt-3 text-[14px] leading-relaxed text-sumi/60">
            Pick a fabric and slide to draw the curtains, right on the photo.
          </p>
        </div>

        {/* Stage */}
        <div
          className="relative isolate aspect-[3/4] overflow-hidden rounded-[24px] bg-sumi sm:aspect-[16/11] lg:col-span-8 lg:aspect-auto lg:h-[720px]"
        >
          <Image
            src={photos.studio}
            alt="Bright room with a large bare window"
            fill
            quality={80}
            sizes="(min-width:1024px) 66vw, 100vw"
            className="-z-10 object-cover"
          />
          <motion.div aria-hidden className="absolute inset-0 -z-10 mix-blend-multiply" animate={{ backgroundColor: time.tint }} transition={{ duration: 0.8 }} />
          <motion.div aria-hidden className="absolute inset-0 -z-10 mix-blend-soft-light" animate={{ backgroundColor: time.grade }} transition={{ duration: 0.8 }} />
          <motion.div aria-hidden className="absolute inset-0" style={{ opacity: shade }} animate={{ backgroundColor: time.shade }} transition={{ duration: 0.8 }} />

          {[0, 1].map((side) => (
            <motion.div
              key={side}
              aria-hidden
              className={`pleats absolute inset-y-0 ${side ? "right-0 shadow-[-14px_0_40px_rgb(0_0_0/0.2)]" : "left-0 shadow-[14px_0_40px_rgb(0_0_0/0.2)]"}`}
              style={{ width: panelW, opacity: panelOpacity }}
              animate={{ backgroundColor: fabric.tone }}
              transition={{ duration: 0.6 }}
            >
              <span className={`absolute inset-y-0 w-px bg-white/40 ${side ? "left-0" : "right-0"}`} />
            </motion.div>
          ))}

          {/* Readout */}
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/35 py-1.5 pl-1.5 pr-3.5 sm:gap-3 sm:py-2 sm:pl-2 sm:pr-4 text-white ring-1 ring-white/20 backdrop-blur-md sm:left-5 sm:top-5">
            <span className="relative grid size-9 place-items-center rounded-full bg-sunbeam text-sumi">
              <motion.svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden animate={{ rotate: pct * 1.8 }}>
                <circle cx="9" cy="9" r="3.4" fill="currentColor" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d="M9 1.2v2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    transform={`rotate(${i * 45} 9 9)`}
                    opacity={pct / 100 > i / 8 ? 1 : 0.25}
                  />
                ))}
              </motion.svg>
            </span>
            <span className="leading-tight">
              <span className="hidden text-[11px] text-white/70 sm:block">Light in the room</span>
              <span className="block text-lg font-semibold tabular-nums">{pct}%</span>
            </span>
          </div>

          <div className="absolute right-3 top-3.5 flex gap-0.5 rounded-full bg-black/35 p-1 sm:right-5 sm:top-5 sm:gap-1 ring-1 ring-white/20 backdrop-blur-md sm:right-5 sm:top-5">
            {times.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeId(t.id)}
                aria-pressed={t.id === timeId}
                className={`relative rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors sm:px-3 sm:text-[12px] ${
                  t.id === timeId ? "text-sumi" : "text-white/80 hover:text-white"
                }`}
              >
                {t.id === timeId && (
                  <motion.span layoutId="studio-time" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile dock: fabric + curtains live on the photo, so every change is visible */}
          <div className="absolute inset-x-3 bottom-3 rounded-[22px] bg-black/40 p-3 text-white ring-1 ring-white/15 backdrop-blur-md md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div role="radiogroup" aria-label="Fabric" className="flex gap-1.5">
                {fabrics.map((f) => {
                  const active = f.id === fabricId;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={f.name}
                      onClick={() => setFabricId(f.id)}
                      className={`pleats size-10 rounded-full transition-[box-shadow,transform] duration-300 ${
                        active ? "scale-105 ring-2 ring-white ring-offset-2 ring-offset-black/40" : "ring-1 ring-white/25"
                      }`}
                      style={{ backgroundColor: f.tone }}
                    />
                  );
                })}
              </div>
              <motion.div
                key={fabric.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: settle }}
                className="min-w-0 text-right leading-tight"
              >
                <p className="truncate text-[13px] font-semibold">{fabric.name}</p>
                <p className="text-[11px] text-white/65">{Math.round(fabric.pass * 100)}% light through</p>
              </motion.div>
            </div>
            <div className="mt-2.5 flex items-center gap-3 border-t border-white/10 pt-2">
              <span className="shrink-0 text-[11px] font-medium text-white/70">Curtains</span>
              <input
                type="range"
                min={0}
                max={100}
                value={closed}
                aria-label="Curtains closed"
                onChange={(e) => setClosed(Number(e.target.value))}
                className="studio-range studio-range--light"
                style={{ "--fill": `${closed}%` } as React.CSSProperties}
              />
              <span className="w-10 shrink-0 text-right text-[12px] font-semibold tabular-nums">{closed}%</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col rounded-[24px] bg-white p-6 sm:p-8 lg:col-span-4 lg:h-[720px]">
          <span className="self-start rounded-full bg-washi px-3 max-md:hidden py-1.5 text-[11px] font-semibold uppercase tracking-wider">
            Light Studio
          </span>
          <RevealText
            text={"See the light\nbefore you buy"}
            className="mt-5 max-md:hidden text-[clamp(1.7rem,2.6vw,2.3rem)] font-light leading-[1.1] tracking-[-0.03em]"
          />
          <p className="mt-3 text-[14px] leading-relaxed text-sumi/60 max-md:hidden">
            Every fabric lets a different amount of daylight through. Pick one, then slide to draw the curtains.
          </p>

          <fieldset className="mt-7 max-md:hidden">
            <legend className="sr-only">Fabric</legend>
            <div className="grid grid-cols-2 gap-2">
              {fabrics.map((f) => {
                const active = f.id === fabricId;
                return (
                  <label
                    key={f.id}
                    className={`relative flex cursor-pointer flex-col gap-3 rounded-2xl p-3 ring-1 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-sunbeam ${
                      active ? "ring-sumi" : "ring-sumi/10 hover:ring-sumi/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fabric"
                      value={f.id}
                      checked={active}
                      onChange={() => setFabricId(f.id)}
                      className="sr-only"
                    />
                    <span
                      className="pleats h-10 rounded-lg ring-1 ring-black/5"
                      style={{ backgroundColor: f.tone, opacity: 1 - f.pass * 0.5 }}
                    />
                    <span>
                      <span className="block text-[13px] font-semibold leading-tight">{f.name}</span>
                      <span className="mt-0.5 block text-[11px] text-sumi/50">{Math.round(f.pass * 100)}% light through</span>
                    </span>
                    {active && (
                      <motion.span
                        layoutId="fabric-check"
                        className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-sumi text-white"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="m2 5.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </motion.span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6 max-md:hidden">
            <div className="mb-1 flex items-baseline justify-between text-[13px]">
              <label htmlFor={rangeId} className="text-sumi/60">
                Curtains closed
              </label>
              <span className="font-semibold tabular-nums">{closed}%</span>
            </div>
            <input
              id={rangeId}
              type="range"
              min={0}
              max={100}
              value={closed}
              onChange={(e) => setClosed(Number(e.target.value))}
              className="studio-range"
              style={{ "--fill": `${closed}%` } as React.CSSProperties}
            />
          </div>

          <motion.dl
            key={fabric.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: settle }}
            className="mt-6 grid grid-cols-2 gap-4 border-t border-sumi/10 pt-5 text-[13px] max-md:mt-0 max-md:border-t-0 max-md:pt-0"
          >
            <div>
              <dt className="text-sumi/50">Privacy</dt>
              <dd className="mt-0.5 min-h-[2.6em] font-medium">{fabric.privacy}</dd>
            </div>
            <div>
              <dt className="text-sumi/50">Best for</dt>
              <dd className="mt-0.5 min-h-[2.6em] font-medium">{fabric.best}</dd>
            </div>
          </motion.dl>

          <a
            href="#contact"
            className="group mt-8 max-md:mt-6 flex shrink-0 items-center lg:mt-auto justify-between gap-3 rounded-full bg-sumi py-1.5 pl-6 pr-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-sumi-soft"
          >
            Bring this fabric to my visit
            <span className="grid size-9 place-items-center rounded-full bg-white text-sumi transition-transform duration-500 group-hover:-rotate-45">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

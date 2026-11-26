"use client";

import { motion } from "motion/react";
import { CountUp, RevealText, settle } from "./ui/motion";
import { aboutStats } from "@/lib/content";

const milestones = [
  { year: "2014", text: "A two-person workroom in Nonthaburi" },
  { year: "2019", text: "Showroom opens in Bangna" },
  { year: "2026", text: "4,800+ windows across greater Bangkok" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-block rounded-full bg-washi-deep px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider">
            About Hikari
          </span>
          <RevealText
            text={"Light, made\nto measure"}
            className="mt-8 text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          />
          <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:max-w-[560px]">
            {aboutStats.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: settle, delay: i * 0.08 }}
                className="rounded-2xl bg-white px-4 pb-5 pt-4"
              >
                <p className="text-2xl font-semibold tracking-[-0.03em]">
                  <CountUp value={s.value} suffix={s.suffix} delay={i * 0.1} />
                </p>
                <p className="mt-2 text-[12px] leading-snug text-sumi/50">{s.label}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: settle }}
            className="max-w-[46ch] text-lg font-medium leading-snug sm:text-xl"
          >
            Hikari (光) means “light”. We believe a window treatment should shape the light in a room,
            not just cover the glass.
          </motion.p>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-sumi/60">
            Every project starts with the room itself: which way it faces, how bright the afternoon gets,
            who sleeps there and who works there. Then we cut, sew and fit everything ourselves.
          </p>

          <ol className="mt-10 border-t border-sumi/10">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: settle, delay: 0.1 + i * 0.1 }}
                className="grid grid-cols-[72px_1fr] items-baseline gap-4 border-b border-sumi/10 py-4 text-[14px]"
              >
                <span className="font-semibold tabular-nums">{m.year}</span>
                <span className="text-sumi/65">{m.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

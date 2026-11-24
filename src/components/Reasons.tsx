"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { RevealText, settle } from "./ui/motion";
import { reasons } from "@/lib/content";

function Copy({ n, title, body, dark = false }: { n: number; title: string; body: string; dark?: boolean }) {
  return (
    <div>
      <p className={`text-[11px] font-semibold tabular-nums ${dark ? "text-sumi/40" : "text-white/60"}`}>0{n}</p>
      <h3 className="mt-1 text-lg font-semibold uppercase tracking-[-0.01em]">{title}</h3>
      <p className={`mt-2 max-w-[30ch] text-[14px] leading-relaxed ${dark ? "text-sumi/60" : "text-white/85"}`}>{body}</p>
    </div>
  );
}

export default function Reasons() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <RevealText
        text={"4 reasons clients find us\neasy and reliable to work with"}
        className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em]"
      />

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:h-[620px] lg:grid-cols-4">
        {reasons.map((r, i) => {
          // After the reference: overlay / text below / overlay / text above
          const mode = (["overlay", "below", "overlay", "above"] as const)[i];
          return (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: settle, delay: i * 0.1 }}
              className="group flex flex-col gap-5"
            >
              {mode === "above" && (
                <div className="hidden px-1 lg:block">
                  <Copy n={i + 1} title={r.title} body={r.body} dark />
                </div>
              )}
              <div className="relative isolate min-h-[380px] flex-1 overflow-hidden rounded-[20px] bg-washi-deep">
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: settle, delay: i * 0.1 }}
                >
                  <Image
                    src={r.src}
                    alt=""
                    fill
                    quality={80}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-settle)] group-hover:scale-105"
                  />
                </motion.div>
                <div
                  className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-28 text-white ${
                    mode === "overlay" ? "" : "lg:hidden"
                  }`}
                >
                  <Copy n={i + 1} title={r.title} body={r.body} />
                </div>
              </div>
              {mode === "below" && (
                <div className="hidden px-1 lg:block">
                  <Copy n={i + 1} title={r.title} body={r.body} dark />
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

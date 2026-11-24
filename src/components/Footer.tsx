"use client";

import { useLenis } from "lenis/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import Arrow from "./Arrow";
import { brand } from "@/lib/content";

const nav = [
  { href: "#catalog", label: "Catalog" },
  { href: "#studio", label: "Light Studio" },
  { href: "#work", label: "Rooms" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const mark = useRef<HTMLParagraphElement>(null);
  const lit = useInView(mark, { once: true, margin: "-10% 0px" });
  const lenis = useLenis();

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mx-auto max-w-[1440px] px-5 pb-8 pt-20 sm:px-8 sm:pt-28">
      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p
            ref={mark}
            className={`sheen ${lit ? "is-lit" : ""} -ml-[0.06em] text-[clamp(4.5rem,15vw,13rem)] font-semibold leading-[0.8] tracking-[-0.06em]`}
          >
            Hikari
          </p>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-sumi/60">
            <span className="font-semibold text-sumi">Hikari (光)</span> is the Japanese word for light: the soft
            glow that settles into a room when a window is dressed just right. We measure, sew and fit every
            curtain and blind ourselves, so the light in your home feels calm at every hour.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:items-end lg:pb-2 lg:text-right">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium lg:justify-end">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-clay">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="max-w-[46ch] text-[13px] leading-relaxed text-sumi/55 lg:max-w-none">
            {brand.address} · <a href={brand.phoneHref} className="hover:text-sumi">{brand.phone}</a> · {brand.hours}
          </p>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-3 self-start rounded-full bg-sumi py-1.5 pl-5 pr-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-sumi-soft lg:self-end"
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-full bg-white text-sumi transition-transform duration-500 ease-[var(--ease-settle)] group-hover:-translate-y-0.5">
              <Arrow className="-rotate-90" />
            </span>
          </button>
        </div>
      </div>

      <div className="mt-12 border-t border-sumi/10 pt-6 text-[12px] text-sumi/45">
        <p>
          © 2026 Hikari <span className="text-sumi/30">by</span> windyoncloud
        </p>
      </div>
    </footer>
  );
}

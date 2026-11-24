"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import Arrow from "./Arrow";
import { RevealText, settle } from "./ui/motion";
import { products, type Category } from "@/lib/content";

export function Chevron() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden>
      <path d="m1 1 4.5 4.5L1 10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const filters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "curtains", label: "Curtains" },
  { id: "blinds", label: "Blinds" },
];

export default function Catalog() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const list = products.filter((p) => filter === "all" || p.type === filter);

  return (
    <section id="catalog" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <RevealText
          text={"Modern solutions\nfor home and office"}
          className="text-[clamp(1.9rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.03em]"
        />
        <div role="tablist" aria-label="Filter products" className="flex gap-1 self-start rounded-full bg-washi-deep p-1 sm:self-auto">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  active ? "text-white" : "text-sumi/60 hover:text-sumi"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="catalog-filter"
                    className="absolute inset-0 rounded-full bg-sumi"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <LayoutGroup>
        <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-14 sm:gap-x-4 sm:gap-y-10 md:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.li
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: settle }}
              >
                <motion.a
                  href="#contact"
                  className="group block"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6% 0px" }}
                  transition={{ duration: 0.9, ease: settle, delay: (i % 4) * 0.07 }}
                >
                  <div className="relative aspect-[7/8] overflow-hidden rounded-[18px] bg-washi-deep">
                    <Image
                      src={p.src}
                      alt={p.name}
                      fill
                      quality={80}
                      sizes="(min-width:768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-settle)] group-hover:scale-[1.06]"
                    />
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-sumi backdrop-blur-md">
                        {p.badge}
                      </span>
                    )}
                    {/* Hover detail */}
                    <div className="absolute inset-x-2 bottom-2 hidden translate-y-[calc(100%+0.5rem)] items-center justify-between gap-3 rounded-[14px] bg-white/85 p-3 pl-4 backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-y-0 group-focus-visible:translate-y-0 md:flex">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] text-sumi/55">{p.note}</p>
                        <p className="text-[14px] font-semibold">from {p.price}</p>
                      </div>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sumi text-white">
                        <Arrow className="-rotate-45 scale-90" />
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 flex items-center gap-3 px-0.5 text-[14px] font-medium sm:text-[15px]">
                    {p.name}
                    <span className="text-sumi/50 transition-transform duration-300 group-hover:translate-x-1">
                      <Chevron />
                    </span>
                  </p>
                  <p className="mt-0.5 px-0.5 text-[12px] text-sumi/50 md:hidden">from {p.price}</p>
                </motion.a>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}

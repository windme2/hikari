"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Arrow from "./Arrow";
import { brand } from "@/lib/content";

const links = [
  { href: "#catalog", label: "Catalog" },
  { href: "#studio", label: "Light Studio" },
  { href: "#work", label: "Rooms" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
];

const settle = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  // Where the page was when the menu opened; scrolling away from it closes the menu
  const openedAt = useRef<number | null>(null);
  // True while the menu rolls up after a scroll, so the header waits before sliding away
  const [closing, setClosing] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 60);
    // Only react to a clear direction, so Lenis easing at the end of a scroll
    // (tiny deltas) doesn't flip the header back into view.
    if (y < 120) setHidden(false);
    else if (y > prev + 1) setHidden(true);
    else if (y < prev - 4) setHidden(false);
    if (openedAt.current !== null && Math.abs(y - openedAt.current) > 40) {
      openedAt.current = null;
      setClosing(true);
      setOpen(false);
    }
  });

  useEffect(() => {
    // The page keeps scrolling while the menu is open (no scroll lock)
    openedAt.current = open ? window.scrollY : null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid && !open;

  // One background that morphs: a glass capsule behind the links at the top,
  // stretching sideways into the full white bar once the page scrolls.
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [geo, setGeo] = useState<{ nav: DOMRect; list: DOMRect | null } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const n = navRef.current;
      const l = listRef.current;
      if (!n) return;
      const listVisible = l && l.offsetWidth > 0;
      setGeo({
        nav: new DOMRect(0, 0, n.offsetWidth, n.offsetHeight),
        list: listVisible ? new DOMRect(l.offsetLeft, l.offsetTop, l.offsetWidth, l.offsetHeight) : null,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, []);

  const bar = geo
    ? light
      ? geo.list
        ? { left: geo.list.x, top: geo.list.y, width: geo.list.width, height: geo.list.height, opacity: 1 }
        : { left: geo.nav.width / 2, top: 0, width: 0, height: geo.nav.height, opacity: 0 }
      : { left: 0, top: 0, width: geo.nav.width, height: geo.nav.height, opacity: 1 }
    : null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: hidden && !open && !closing ? "-120%" : 0 }}
      transition={{ duration: 0.5, ease: settle, opacity: { delay: 1.0, duration: 0.8 } }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <nav
        ref={navRef}
        aria-label="Main"
        className="relative isolate mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center gap-3 rounded-full p-1.5 lg:grid-cols-[1fr_auto_1fr]"
      >
        {bar && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -z-10 rounded-full backdrop-blur-xl"
            initial={false}
            animate={{
              ...bar,
              backgroundColor: light ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.82)",
              boxShadow: light
                ? "0 0 0 1px rgba(255,255,255,0.25), 0 8px 30px rgba(0,0,0,0)"
                : "0 0 0 1px rgba(28,27,26,0.05), 0 8px 30px rgba(0,0,0,0.06)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
          />
        )}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2 justify-self-start pl-2.5 transition-colors sm:pl-3.5 duration-300 ${light ? "text-white" : "text-sumi"}`}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.4" />
            <path d="M6 4.5v13M11 1.5v19M16 4.5v13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="text-[19px] font-semibold tracking-[-0.03em]">Hikari</span>
        </a>

        <ul
          ref={listRef}
          className={`hidden items-center gap-0.5 rounded-full p-1 text-[13px] font-medium transition-colors duration-300 lg:flex ${
            light ? "text-white" : "text-sumi"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`block rounded-full px-4 py-2 transition-colors ${light ? "hover:bg-white/20" : "hover:bg-washi"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-1.5">
          <a
            href={brand.phoneHref}
            className={`hidden px-3 text-[13px] font-medium transition-colors duration-300 md:block ${light ? "text-white" : "text-sumi"}`}
          >
            {brand.phone}
          </a>
          <a
            href="#contact"
            className={`group hidden items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-semibold transition-colors duration-300 sm:flex ${
              light ? "bg-white text-sumi" : "bg-sumi text-white"
            }`}
          >
            Book a visit
            <span
              className={`grid size-7 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5 ${
                light ? "bg-sumi text-white" : "bg-white text-sumi"
              }`}
            >
              <Arrow className="scale-90" />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid size-10 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
              light ? "bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md" : "bg-washi text-sumi"
            }`}
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? "top-1 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? "top-1 -rotate-45" : "top-2"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence onExitComplete={() => setClosing(false)}>
        {open && (
          <motion.div
            id="mobile-menu"
            // On short screens the menu scrolls on its own instead of moving the page
            data-lenis-prevent
            // Clip extends past the card so its shadow isn't cut off while open
            initial={{ opacity: 0, y: -10, clipPath: "inset(-60px -60px -60px -60px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(-60px -60px -60px -60px)" }}
            // Close: roll up into the header like a blind being drawn, fading as it goes
            exit={{
              clipPath: "inset(-60px -60px 100% -60px)",
              opacity: 0,
              y: -6,
              transition: {
                clipPath: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
                y: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
                opacity: { duration: 0.3, delay: 0.25 },
              },
            }}
            transition={{ duration: 0.35, ease: settle }}
            className="mx-auto mt-2 flex max-h-[calc(100svh-5rem)] max-w-[1440px] flex-col overflow-y-auto overscroll-contain rounded-[28px] bg-white p-3 text-sumi shadow-2xl shadow-black/15 lg:hidden"
          >
            <ul>
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: settle }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[22px] font-medium tracking-[-0.02em] hover:bg-washi"
                  >
                    {l.label}
                    <Arrow className="text-sumi/40" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-sumi/10 px-1 pt-4 sm:grid-cols-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-sumi py-3.5 text-center text-sm font-semibold text-white"
              >
                Book a free visit
              </a>
              <a href={brand.phoneHref} className="rounded-full bg-washi py-3.5 text-center text-sm font-semibold">
                Call {brand.phone}
              </a>
            </div>
            <p className="px-4 pb-2 pt-4 text-[13px] text-sumi/50">{brand.address} · {brand.hours}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

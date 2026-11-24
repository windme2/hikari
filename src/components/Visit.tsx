"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Arrow from "./Arrow";
import { RevealText, settle } from "./ui/motion";
import { brand, photos, visitSteps } from "@/lib/content";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    path: "M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V14h2.7v8h3.2Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm5.25-1.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    label: "LINE",
    href: brand.line,
    path: "M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s5.9-3.5 8-6C21.4 14.3 22 12.7 22 11c0-4.4-4.5-8-10-8Z",
  },
];

export default function Visit() {
  const ref = useRef<HTMLElement>(null);
  const steps = useRef<HTMLOListElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const { scrollYProgress: stepP } = useScroll({ target: steps, offset: ["start 85%", "end 60%"] });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (phone.length < 9) {
      setError("Please enter a phone number with at least 9 digits.");
      return;
    }
    if (!data.get("consent")) {
      setError("Please agree to the processing of your personal data.");
      return;
    }
    setError("");
    setSent(true);
  }

  const field =
    "w-full rounded-2xl bg-washi px-5 py-3.5 text-[14px] ring-1 ring-transparent transition-shadow placeholder:text-sumi/40 focus:bg-white focus:outline-none focus:ring-sumi/25";

  return (
    <section id="contact" ref={ref} className="mx-auto max-w-[1440px] scroll-mt-4 px-5 sm:px-8">
      <div className="relative isolate grid gap-10 overflow-hidden rounded-[24px] p-5 pt-8 text-white sm:rounded-[28px] sm:p-10 lg:grid-cols-[1fr_440px] lg:gap-16 lg:p-12">
        <motion.div className="absolute inset-[-10%] -z-10" style={{ y }}>
          <Image
            src={photos.visit}
            alt=""
            fill
            quality={80}
            sizes="100vw"
            className="object-cover object-[70%_50%]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(20_18_16/0.92)_0%,rgb(20_18_16/0.78)_45%,rgb(20_18_16/0.35)_100%)]" />

        <div className="flex flex-col">
          <RevealText
            text={"Book a free\nhome visit"}
            className="text-[clamp(2.2rem,4.4vw,4rem)] font-light leading-[1.02] tracking-[-0.04em]"
          />
          <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-white/70">
            We bring our fabric library to you, measure every window and recommend the right style,
            mounting and material for how you use each room.
          </p>

          <ol ref={steps} className="relative mt-10 grid gap-7 pl-12">
            <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-white/15" />
            <motion.span
              aria-hidden
              style={{ scaleY: stepP }}
              className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-sunbeam"
            />
            {visitSteps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: settle, delay: i * 0.12 }}
                className="relative"
              >
                <span className="absolute -left-12 top-0 grid size-8 place-items-center rounded-full bg-white text-[12px] font-semibold text-sumi">
                  {i + 1}
                </span>
                <h3 className="text-[16px] font-semibold">{s.title}</h3>
                <p className="mt-1 max-w-[40ch] text-[14px] leading-relaxed text-white/65">{s.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-auto lg:pt-12">
            <a href={brand.phoneHref} className="text-[15px] font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-white">
              {brand.phone}
            </a>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="opacity-80 transition-opacity hover:opacity-100">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} fillRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: settle }}
          className="self-end rounded-[22px] bg-white p-6 text-sumi shadow-2xl shadow-black/30 sm:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: settle }}
                className="flex min-h-[380px] flex-col items-start justify-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-sunbeam">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
                    <motion.path
                      d="m6 13.5 4.5 4.5L20 8"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.25, duration: 0.6, ease: settle }}
                    />
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">Request received</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-sumi/65">
                  We’ll call you within one working day to book your free home visit.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full px-5 py-2.5 text-sm font-medium ring-1 ring-sumi/15 hover:bg-washi"
                >
                  Send another request
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="grid gap-3">
                <h3 className="text-[22px] font-semibold tracking-[-0.02em]">Leave a request</h3>
                <p className="mb-2 text-[13px] text-sumi/55">We reply within one working day.</p>
                <label className="sr-only" htmlFor="name">Your name</label>
                <input id="name" name="name" autoComplete="name" placeholder="Your name" className={field} />
                <label className="sr-only" htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Phone number"
                  aria-invalid={!!error}
                  aria-describedby={error ? "form-error" : undefined}
                  className={field}
                />
                <label className="sr-only" htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  placeholder="How many windows? Any rooms in mind?"
                  className={`${field} resize-none`}
                />
                <label className="mt-1 flex items-start gap-3 text-[11px] leading-snug text-sumi/55">
                  <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-sumi" />
                  By clicking “Send” you agree to the processing of your personal data
                </label>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="form-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[13px] text-red-700"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  className="group mt-2 flex items-center justify-between rounded-full bg-sumi py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-sumi-soft"
                >
                  Send
                  <span className="grid size-9 place-items-center rounded-full bg-white text-sumi transition-transform duration-500 group-hover:-rotate-45">
                    <Arrow />
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

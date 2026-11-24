import { RevealText } from "./ui/motion";
import { reviews } from "@/lib/content";

function Stars() {
  return (
    <span className="flex gap-0.5 text-sunbeam" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="m7 1 1.8 3.7 4 .6-2.9 2.8.7 4L7 10.2 3.4 12.1l.7-4L1.2 5.3l4-.6L7 1Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="marquee flex shrink-0 gap-3 pr-3 [--marquee-speed:70s]">
      {reviews.map((r) => (
        <li
          key={r.name}
          className="flex w-[300px] shrink-0 flex-col justify-between gap-8 rounded-[20px] bg-white p-6 sm:w-[380px] sm:p-7"
        >
          <div>
            <Stars />
            <blockquote className="mt-4 text-[15px] leading-relaxed text-sumi/80">“{r.quote}”</blockquote>
          </div>
          <p className="flex items-center gap-3 text-sm">
            <span className="grid size-9 place-items-center rounded-full bg-washi-deep text-[12px] font-semibold">
              {r.name[0]}
            </span>
            <span>
              <span className="block font-semibold">{r.name}</span>
              <span className="block text-[12px] text-sumi/50">{r.place}</span>
            </span>
          </p>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="reviews" className="pb-24 sm:pb-32">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <RevealText text="Reviews" className="text-[clamp(2rem,3.6vw,3.2rem)] font-semibold tracking-[-0.04em]" />
        <div className="flex items-center gap-3 pb-1">
          <span className="text-3xl font-semibold tracking-[-0.03em]">4.9</span>
          <span className="text-[12px] leading-tight text-sumi/55">
            <Stars />
            <span className="mt-1 block">from 620 Google reviews</span>
          </span>
        </div>
      </div>
      <div className="group mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

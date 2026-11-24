import { promises } from "@/lib/content";

function Spark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0 text-clay/60">
      <path d="M7 0c.4 3.6 2.4 5.6 7 7-4.6 1.4-6.6 3.4-7 7-.4-3.6-2.4-5.6-7-7 4.6-1.4 6.6-3.4 7-7Z" fill="currentColor" />
    </svg>
  );
}

export default function Ticker() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="marquee flex shrink-0 items-center gap-10 pr-10">
      {promises.map((p) => (
        <li key={p} className="flex items-center gap-10 whitespace-nowrap">
          <span>{p}</span>
          <Spark />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group flex overflow-hidden py-7 text-[13px] font-medium uppercase tracking-[0.14em] text-sumi/55 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:py-9">
      {row(false)}
      {row(true)}
    </div>
  );
}

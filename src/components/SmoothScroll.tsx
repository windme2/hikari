"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.09, anchors: { offset: -16 } }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}

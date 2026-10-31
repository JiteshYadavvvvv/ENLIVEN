import { motion } from "motion/react";

import type { TrackEmblemShape } from "@/content/tracks";

const DRAW = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.75, ease: "easeOut" },
} as const;

export default function TrackEmblem({ shape }: { shape: TrackEmblemShape }) {
  return (
    <svg viewBox="0 0 120 120" className="track-emblem" aria-hidden="true">
      {shape === "circuit" && (
        <>
          <motion.rect x="34" y="34" width="52" height="52" {...DRAW} />
          <motion.path
            d="M48 34V16M60 34V16M72 34V16M48 86v18M60 86v18M72 86v18M34 48H16M34 60H16M34 72H16M86 48h18M86 60h18M86 72h18"
            {...DRAW}
          />
          <motion.rect x="52" y="52" width="16" height="16" {...DRAW} />
        </>
      )}
      {shape === "orbit" && (
        <>
          <motion.circle cx="60" cy="60" r="16" {...DRAW} />
          <motion.ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="18"
            transform="rotate(-28 60 60)"
            {...DRAW}
          />
          <motion.circle cx="100.6" cy="38.4" r="6" {...DRAW} />
        </>
      )}
      {shape === "shield" && (
        <>
          <motion.path
            d="M60 12 98 26v32c0 25-16 41-38 50-22-9-38-25-38-50V26Z"
            {...DRAW}
          />
          <motion.path d="M42 58l12 12 26-26" {...DRAW} />
        </>
      )}
      {shape === "spark" && (
        <motion.path
          d="M60 8l10 42 42 10-42 10-10 42-10-42L8 60l42-10Z"
          {...DRAW}
        />
      )}
    </svg>
  );
}

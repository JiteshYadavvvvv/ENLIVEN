"use client";

import { MotionConfig, motion } from "motion/react";

export default function ContractStamp({ text }: { text: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.svg
        viewBox="0 0 160 160"
        className="contract-stamp"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.7, rotate: -38 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.32, delay: 0.55, ease: [0.3, 0, 0.2, 1] }}
      >
        <defs>
          <path
            id="contract-stamp-ring"
            d="M80 80m-56 0a56 56 0 1 1 112 0a56 56 0 1 1-112 0"
          />
        </defs>
        <circle cx="80" cy="80" r="74" className="contract-stamp-edge" />
        <circle cx="80" cy="80" r="40" className="contract-stamp-edge" />
        <text className="contract-stamp-text">
          <textPath href="#contract-stamp-ring" startOffset="0">
            {text}
          </textPath>
        </text>
        <path
          d="M80 54l6.5 19.5L106 80l-19.5 6.5L80 106l-6.5-19.5L54 80l19.5-6.5Z"
          className="contract-stamp-mark"
        />
      </motion.svg>
    </MotionConfig>
  );
}

"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

type RevealOnLoadProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function RevealOnLoad({
  children,
  className,
  delay = 0,
}: RevealOnLoadProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

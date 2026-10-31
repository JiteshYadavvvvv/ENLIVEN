"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

type VaultRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function VaultReveal({
  children,
  className,
  delay = 0,
}: VaultRevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

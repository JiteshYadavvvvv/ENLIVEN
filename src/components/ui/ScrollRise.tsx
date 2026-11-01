"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

type ScrollRiseProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function ScrollRise({
  id,
  className,
  children,
}: ScrollRiseProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end 62%"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    still ? [1, 1] : [0, 1],
  );
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [110, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    still ? [1, 1] : [0.92, 1],
  );

  return (
    <motion.h2
      ref={headingRef}
      id={id}
      className={className}
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.h2>
  );
}

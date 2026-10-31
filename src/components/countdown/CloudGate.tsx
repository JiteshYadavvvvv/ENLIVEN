"use client";

import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

const CLOUDS = "/assets/enliven-countdown/clouds";

export default function CloudGate() {
  const gateRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: gateRef,
    offset: ["start end", "end start"],
  });
  const reach = still ? 0 : 42;
  const leftX = useTransform(scrollYProgress, [0, 0.8], ["0vw", `${-reach}vw`]);
  const rightX = useTransform(scrollYProgress, [0, 0.8], ["0vw", `${reach}vw`]);
  const lift = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["0vh", still ? "0vh" : "-6vh"],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div ref={gateRef} className="cloud-gate" aria-hidden>
        <Image
          src={`${CLOUDS}/cloud-veil.webp`}
          alt=""
          loading="eager"
          width={2400}
          height={300}
          sizes="115vw"
          className="gate-veil"
        />
        <motion.div
          className="gate-wing gate-wing-left"
          style={{ x: leftX, y: lift }}
        >
          <Image
            src={`${CLOUDS}/cloud-sunlit-b.webp`}
            alt=""
            loading="eager"
            width={1458}
            height={778}
            sizes="70vw"
          />
        </motion.div>
        <div className="gate-core">
          <Image
            src={`${CLOUDS}/cloud-sunlit-a.webp`}
            alt=""
            loading="eager"
            width={1500}
            height={852}
            sizes="60vw"
          />
        </div>
        <motion.div
          className="gate-wing gate-wing-right"
          style={{ x: rightX, y: lift }}
        >
          <Image
            src={`${CLOUDS}/cloud-sunlit-a.webp`}
            alt=""
            loading="eager"
            width={1500}
            height={852}
            sizes="70vw"
          />
        </motion.div>
      </div>
    </MotionConfig>
  );
}

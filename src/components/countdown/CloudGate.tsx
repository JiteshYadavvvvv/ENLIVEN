"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

const CLOUD_BASE = "/assets/enliven-hero/clouds";
const BANK = [
  { left: "-14%", top: "3vh", width: "50vw", flip: false },
  { left: "24%", top: "6vh", width: "44vw", flip: true },
  { left: "60%", top: "1vh", width: "54vw", flip: false },
];

export default function CloudGate() {
  const gateRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: gateRef,
    offset: ["start end", "start start"],
  });
  const reach = still ? 0 : 38;
  const leftX = useTransform(scrollYProgress, [0, 1], ["0vw", `${-reach}vw`]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0vw", `${reach}vw`]);
  const swell = useTransform(scrollYProgress, [0, 1], [1, still ? 1 : 1.18]);

  return (
    <div ref={gateRef} className="cloud-gate" aria-hidden>
      <motion.div
        className="cloud-gate-wing cloud-gate-left"
        style={{ x: leftX, scale: swell }}
      >
        <Image
          src={`${CLOUD_BASE}/innerve-cloud-soft.webp`}
          alt=""
          width={1500}
          height={852}
          sizes="70vw"
        />
      </motion.div>
      <motion.div
        className="cloud-gate-wing cloud-gate-right"
        style={{ x: rightX, scale: swell }}
      >
        <Image
          src={`${CLOUD_BASE}/innerve-cloud-soft.webp`}
          alt=""
          width={1500}
          height={852}
          sizes="70vw"
        />
      </motion.div>
      <div className="cloud-gate-bank">
        {BANK.map((cloud) => (
          <Image
            key={cloud.left}
            src={`${CLOUD_BASE}/innerve-cloud-soft.webp`}
            alt=""
            width={1500}
            height={852}
            sizes="55vw"
            style={{ left: cloud.left, top: cloud.top, width: cloud.width }}
            className={cloud.flip ? "-scale-x-100" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

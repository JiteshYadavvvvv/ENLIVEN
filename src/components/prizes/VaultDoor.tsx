"use client";

import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

const BOLT_ANGLES = Array.from({ length: 24 }, (_, index) => index * 15);
const DIAL_TICKS = Array.from({ length: 60 }, (_, index) => index);
const SPOKE_ANGLES = [0, 120, 240];

export default function VaultDoor() {
  const doorRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const faceShade = useId();
  const { scrollYProgress } = useScroll({
    target: doorRef,
    offset: ["start end", "end start"],
  });
  const dialTurn = useTransform(
    scrollYProgress,
    [0, 1],
    still ? [0, 0] : [-75, 75],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div ref={doorRef}>
        <svg viewBox="0 0 400 400" className="vault-door" aria-hidden="true">
          <defs>
            <radialGradient id={faceShade} cx="38%" cy="32%" r="75%">
              <stop offset="0" stopColor="#2c1c40" />
              <stop offset="1" stopColor="#140b20" />
            </radialGradient>
          </defs>

          <circle cx="200" cy="200" r="197" className="vault-frame" />
          <circle cx="200" cy="200" r="182" className="vault-seam" />

          {BOLT_ANGLES.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 200 200)`}>
              <circle cx="200" cy="21" r="7.5" className="vault-bolt" />
              <circle cx="198" cy="19" r="2.4" className="vault-glint" />
            </g>
          ))}

          <circle
            cx="200"
            cy="200"
            r="166"
            className="vault-face"
            fill={`url(#${faceShade})`}
          />

          <motion.g style={{ rotate: dialTurn }}>
            <circle cx="200" cy="200" r="139" className="vault-dial" />
            {DIAL_TICKS.map((tick) => (
              <line
                key={tick}
                x1="200"
                y1={tick % 5 === 0 ? 50 : 56}
                x2="200"
                y2="71"
                transform={`rotate(${tick * 6} 200 200)`}
                className="vault-tick"
              />
            ))}
          </motion.g>

          <polygon points="200,48 191,35 209,35" className="vault-index" />
          <circle cx="200" cy="200" r="106" className="vault-core" />

          <motion.g
            key={still ? "wheel-still" : "wheel-spin"}
            initial={{ rotate: still ? 0 : -140 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 38, damping: 11 }}
          >
            <circle cx="200" cy="200" r="104" fill="none" />
            {SPOKE_ANGLES.map((angle) => (
              <g key={angle} transform={`rotate(${angle} 200 200)`}>
                <rect
                  x="191"
                  y="112"
                  width="18"
                  height="62"
                  rx="9"
                  className="vault-spoke"
                />
                <circle cx="200" cy="110" r="15" className="vault-grip" />
              </g>
            ))}
            <circle cx="200" cy="200" r="34" className="vault-hub" />
            <circle cx="200" cy="200" r="13" className="vault-hub-cap" />
          </motion.g>
        </svg>
      </div>
    </MotionConfig>
  );
}

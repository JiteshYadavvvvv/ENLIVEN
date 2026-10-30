"use client";

import {
  MotionConfig,
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

import { type CloudLayer, HERO_CLOUDS } from "./heroScene";
import { LayerArt, SceneImage } from "./SceneLayer";

const PART_DISTANCE_VW = 45;

function PartingCloud({
  cloud,
  progress,
  still,
}: {
  cloud: CloudLayer;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const reach = still ? 0 : cloud.part * PART_DISTANCE_VW;
  const x = useTransform(progress, [0, 1], ["0vw", `${reach}vw`]);

  return (
    <SceneImage layer={cloud}>
      <motion.div style={{ x }}>
        <LayerArt layer={cloud} />
      </motion.div>
    </SceneImage>
  );
}

export default function HeroCloudBank() {
  const bankRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: bankRef,
    offset: ["start start", "end start"],
  });

  return (
    <MotionConfig reducedMotion="user">
      <div ref={bankRef} className="cloud-bank">
        {HERO_CLOUDS.map((cloud) => (
          <PartingCloud
            key={cloud.id}
            cloud={cloud}
            progress={scrollYProgress}
            still={still}
          />
        ))}
      </div>
    </MotionConfig>
  );
}

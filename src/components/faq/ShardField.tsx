"use client";

import { useState } from "react";

import AeroShards from "@/components/backgrounds/AeroShards";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

export default function ShardField() {
  const still = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <div aria-hidden className="faq-shards" data-failed={failed || undefined}>
      {!failed && (
        <AeroShards
          shardColor="#7a2f86"
          accentColor="#ff2bd6"
          backgroundColor="transparent"
          material="glass"
          count={650}
          shardSize={0.9}
          speed={0.55}
          glow={0.22}
          grain={0.05}
          vignette={0.55}
          depthOfField={0.8}
          markers="plus"
          mouseInteraction={false}
          pulseOnClick={false}
          holdToGather={false}
          parallax={0.2}
          dpr={1.25}
          intro={!still}
          paused={still}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

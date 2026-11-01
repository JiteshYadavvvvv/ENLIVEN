"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

import type { SponsorLineup } from "@/content/sponsorship";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

import Billboard from "./Billboard";
import SponsorLogo from "./SponsorLogo";

const CROWDED_SLOT = 4;

function WallLightbox({ lineup }: { lineup: SponsorLineup }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const inView = useInView(slotRef, { amount: 0.35 });
  const still = usePrefersReducedMotion();

  return (
    <div
      ref={slotRef}
      className="ad-slot"
      data-crowded={lineup.sponsors.length > CROWDED_SLOT || undefined}
    >
      <Billboard
        label={lineup.category.label}
        size="lightbox"
        lit={still || inView}
      >
        <ul className="billboard-logos">
          {lineup.sponsors.map((sponsor, index) => (
            <SponsorLogo
              key={sponsor.name}
              sponsor={sponsor}
              index={index}
              sizes="(min-width: 48rem) 10rem, 40vw"
            />
          ))}
        </ul>
      </Billboard>
    </div>
  );
}

export default function AdWall({ lineups }: { lineups: SponsorLineup[] }) {
  return (
    <div className="ad-wall">
      {lineups.map((lineup) => (
        <WallLightbox key={lineup.category.id} lineup={lineup} />
      ))}
    </div>
  );
}

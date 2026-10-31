"use client";

import { MotionConfig, motion } from "motion/react";

import type { PrizeCategory } from "@/content/prizes";

import PrizeAmount from "./PrizeAmount";

export type PodiumTier = {
  rank: number;
  metal: "gold" | "silver" | "bronze";
  prize: PrizeCategory;
};

export default function PrizeLadder({ tiers }: { tiers: PodiumTier[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <ol className="prize-ladder">
        {tiers.map((tier, index) => (
          <motion.li
            key={tier.rank}
            className="prize-tier"
            data-metal={tier.metal}
            initial={{ opacity: 0, x: 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg viewBox="0 0 64 76" className="prize-medal" aria-hidden="true">
              <path d="M16 2H30L36 26H22Z" className="prize-medal-ribbon" />
              <path d="M34 2H48L42 26H28Z" className="prize-medal-ribbon" />
              <circle cx="32" cy="48" r="25" className="prize-medal-disc" />
              <circle cx="32" cy="48" r="18" className="prize-medal-rim" />
              <text x="32" y="49" className="prize-medal-rank">
                {tier.rank}
              </text>
            </svg>
            <div className="prize-tier-body">
              <h3 className="prize-tier-title">{tier.prize.title}</h3>
              {tier.prize.description && (
                <p className="prize-tier-note">{tier.prize.description}</p>
              )}
              {tier.prize.perks.length > 0 && (
                <ul className="prize-perks">
                  {tier.prize.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              )}
            </div>
            <PrizeAmount amount={tier.prize.amount} />
          </motion.li>
        ))}
      </ol>
    </MotionConfig>
  );
}

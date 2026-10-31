"use client";

import { MotionConfig, motion } from "motion/react";

import type { PlacePrize } from "@/content/prizes";

import PrizeAmount from "./PrizeAmount";

export type PodiumTier = {
  rank: number;
  title: string;
  metal: "gold" | "silver" | "bronze";
  prize: PlacePrize;
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
            <span className="prize-rank" aria-hidden>
              {String(tier.rank).padStart(2, "0")}
            </span>
            <div className="prize-tier-body">
              <h3 className="prize-tier-title">{tier.title}</h3>
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

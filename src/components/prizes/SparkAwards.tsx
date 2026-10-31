import type { PrizeCategory } from "@/content/prizes";

import PrizeAmount from "./PrizeAmount";

const SPARK_TONES = ["ingenious", "visionary"];

export default function SparkAwards({ awards }: { awards: PrizeCategory[] }) {
  return (
    <ul className="spark-awards">
      {awards.map((award, index) => (
        <li
          key={award.title}
          className="spark-award"
          data-tone={SPARK_TONES[index % SPARK_TONES.length]}
        >
          <svg viewBox="0 0 48 48" className="spark-mark" aria-hidden="true">
            <path d="M24 2l5.6 16.4L46 24l-16.4 5.6L24 46l-5.6-16.4L2 24l16.4-5.6Z" />
          </svg>
          <div className="spark-award-body">
            <h3 className="spark-award-title">{award.title}</h3>
            {award.description && (
              <p className="spark-award-note">{award.description}</p>
            )}
            {award.perks.length > 0 && (
              <ul className="prize-perks">
                {award.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            )}
          </div>
          <PrizeAmount amount={award.amount} />
        </li>
      ))}
    </ul>
  );
}

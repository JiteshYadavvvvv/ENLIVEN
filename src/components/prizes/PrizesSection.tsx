import ScrollReveal from "@/components/ui/ScrollReveal";
import { PRIZES } from "@/content/prizes";
import PrizeAmount from "./PrizeAmount";
import PrizeLadder, { type PodiumTier } from "./PrizeLadder";
import VaultDoor from "./VaultDoor";
import "./prizes.css";

const PODIUM: PodiumTier[] = [
  { rank: 1, title: "First place", metal: "gold", prize: PRIZES.first },
  { rank: 2, title: "Second place", metal: "silver", prize: PRIZES.second },
  { rank: 3, title: "Third place", metal: "bronze", prize: PRIZES.third },
];

function prizePoolTotal() {
  const placeAmounts = PODIUM.map((tier) => tier.prize.amount);
  if (placeAmounts.includes(null)) return null;
  const awardAmounts = PRIZES.specialAwards.map((award) => award.amount);
  return [...placeAmounts, ...awardAmounts].reduce<number>(
    (total, amount) => total + (amount ?? 0),
    0,
  );
}

export default function PrizesSection() {
  return (
    <section id="prizes" aria-labelledby="prizes-title" className="prize-vault">
      <div className="prize-vault-floor">
        <div aria-hidden className="grain-overlay" />
        <div className="prize-vault-inner">
          <ScrollReveal className="prize-heading">
            <h2 id="prizes-title" className="prize-title">
              The prize <span>vault</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="vault-stage" delay={0.1}>
            <VaultDoor />
            <div className="vault-readout">
              <span className="vault-readout-label">Total prize pool</span>
              <PrizeAmount amount={prizePoolTotal()} />
            </div>
          </ScrollReveal>

          <PrizeLadder tiers={PODIUM} />

          {PRIZES.specialAwards.length > 0 && (
            <ul className="vault-honours">
              {PRIZES.specialAwards.map((award) => (
                <li key={award.title}>
                  <h3>{award.title}</h3>
                  {award.description && <p>{award.description}</p>}
                  <PrizeAmount amount={award.amount} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

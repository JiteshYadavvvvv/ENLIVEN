import ScrollReveal from "@/components/ui/ScrollReveal";
import { PRIZES } from "@/content/prizes";
import PrizeAmount from "./PrizeAmount";
import PrizeLadder, { type PodiumTier } from "./PrizeLadder";
import SparkAwards from "./SparkAwards";
import VaultDoor from "./VaultDoor";
import "./prizes.css";

const METALS: PodiumTier["metal"][] = ["gold", "silver", "bronze"];

const PODIUM: PodiumTier[] = PRIZES.podium.map((prize, index) => ({
  rank: index + 1,
  metal: METALS[index],
  prize,
}));

function prizePoolTotal() {
  const amounts = [...PRIZES.podium, ...PRIZES.sparkAwards].map(
    (category) => category.amount,
  );
  if (amounts.includes(null)) return null;
  return amounts.reduce<number>((total, amount) => total + (amount ?? 0), 0);
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

          <div className="prize-standings">
            <PrizeLadder tiers={PODIUM} />
            {PRIZES.sparkAwards.length > 0 && (
              <SparkAwards awards={PRIZES.sparkAwards} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

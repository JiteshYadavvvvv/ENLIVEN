import { EVENT } from "@/content/event";
import { PRIZES } from "@/content/prizes";

import PrizeAmount from "./PrizeAmount";
import PrizeLadder from "./PrizeLadder";
import VaultDoor from "./VaultDoor";
import VaultReveal from "./VaultReveal";
import "./prizes.css";

export default function PrizesSection() {
  return (
    <section id="prizes" aria-labelledby="prizes-title" className="prize-vault">
      <div className="prize-vault-floor">
        <div className="prize-vault-inner">
          <VaultReveal className="prize-heading">
            <p className="prize-kicker">{EVENT.edition} · Rewards</p>
            <h2 id="prizes-title" className="prize-title">
              The prize <span>vault</span>
            </h2>
            <p className="prize-lede">{PRIZES.note}</p>
          </VaultReveal>

          <VaultReveal className="vault-stage" delay={0.1}>
            <VaultDoor />
            <div className="vault-readout">
              <span className="vault-readout-label">Total prize pool</span>
              <PrizeAmount amount={PRIZES.pool} />
            </div>
          </VaultReveal>

          <PrizeLadder tiers={PRIZES.podium} />

          {PRIZES.specialAwards.length > 0 && (
            <ul className="vault-honours">
              {PRIZES.specialAwards.map((award) => (
                <li key={award.title}>
                  <h3>{award.title}</h3>
                  <p>{award.description}</p>
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

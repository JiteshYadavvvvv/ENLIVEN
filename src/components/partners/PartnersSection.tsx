import { FiArrowUpRight, FiClock } from "react-icons/fi";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { EVENT } from "@/content/event";
import { SPONSORSHIP } from "@/content/sponsorship";

import ContractStamp from "./ContractStamp";
import "./partners.css";

const TEAR_TEETH = 44;

function tearEdge() {
  const points = Array.from({ length: TEAR_TEETH * 2 + 1 }, (_, index) => {
    const x = (index / (TEAR_TEETH * 2)) * 100;
    return `${x}% ${index % 2 === 0 ? "var(--partner-tear)" : "0"}`;
  });
  return `polygon(${points.join(", ")}, 100% 100%, 0 100%)`;
}

function PartnerCall() {
  const { enquiry, brochure } = SPONSORSHIP;
  return (
    <div className="partner-calls">
      {enquiry.href ? (
        <a
          href={enquiry.href}
          target="_blank"
          rel="noreferrer"
          className="partner-cta"
        >
          {enquiry.label}
          <FiArrowUpRight aria-hidden />
        </a>
      ) : (
        <p className="partner-cta" data-pending>
          <FiClock aria-hidden />
          {enquiry.pendingLabel}
        </p>
      )}
      {brochure.href && (
        <a
          href={brochure.href}
          target="_blank"
          rel="noreferrer"
          className="partner-brochure"
        >
          {brochure.label}
        </a>
      )}
    </div>
  );
}

export default function PartnersSection() {
  const { headline, pitch, contract, tiers, partners } = SPONSORSHIP;

  return (
    <section
      id="sponsor"
      aria-labelledby="sponsor-title"
      className="partner-room"
      style={{ clipPath: tearEdge() }}
    >
      <div aria-hidden className="grain-overlay" />
      <div className="partner-inner">
        <ScrollReveal className="partner-pitch">
          <h2 id="sponsor-title" className="partner-title">
            {headline.lead} <span>{headline.accent}</span>
          </h2>
          <p className="partner-copy">{pitch}</p>
          <PartnerCall />
        </ScrollReveal>

        <ScrollReveal className="partner-desk" delay={0.1}>
          <article
            className="partner-contract"
            aria-labelledby="contract-title"
          >
            <h3 id="contract-title" className="contract-title">
              {contract.title}
            </h3>
            <ol className="contract-clauses">
              {contract.clauses.map((clause, index) => (
                <li key={clause}>
                  <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  {clause}
                </li>
              ))}
            </ol>
            {tiers.length > 0 && (
              <ul className="contract-tiers">
                {tiers.map((tier) => (
                  <li key={tier.name}>
                    <strong>{tier.name}</strong>
                    {tier.summary && <span>{tier.summary}</span>}
                  </li>
                ))}
              </ul>
            )}
            <div className="contract-signatures">
              <div>
                <span className="contract-signature">{EVENT.edition}</span>
                <span className="contract-role">{contract.organiserRole}</span>
              </div>
              <div>
                <span className="contract-signature" data-open>
                  {contract.partnerLine}
                </span>
                <span className="contract-role">{contract.partnerRole}</span>
              </div>
            </div>
            <ContractStamp
              text={`${EVENT.edition} · Partnership · ${EVENT.edition} · Partnership ·`}
            />
          </article>
        </ScrollReveal>
      </div>

      {partners.length > 0 && (
        <ul className="partner-roster">
          {partners.map((partner) => (
            <li key={partner.name}>
              {partner.href ? (
                <a href={partner.href} target="_blank" rel="noreferrer">
                  {partner.name}
                </a>
              ) : (
                partner.name
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

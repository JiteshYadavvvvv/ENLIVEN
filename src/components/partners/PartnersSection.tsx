import { FiArrowUpRight, FiClock } from "react-icons/fi";

import { SPONSORSHIP } from "@/content/sponsorship";

import StageScene from "./StageScene";
import "./partners.css";

const VALANCE_SCALLOPS = 20;

function valancePath() {
  const step = 1600 / VALANCE_SCALLOPS;
  let path = "M0 0H1600V34";
  for (let index = VALANCE_SCALLOPS; index > 0; index--) {
    const x = index * step;
    path += `Q${x - step / 2} 78 ${x - step} 34`;
  }
  return `${path}Z`;
}

function PartnerCall() {
  const { enquiry, brochure } = SPONSORSHIP;
  return (
    <div className="stage-calls">
      {enquiry.href ? (
        <a
          href={enquiry.href}
          target="_blank"
          rel="noreferrer"
          className="stage-cta"
        >
          {enquiry.label}
          <FiArrowUpRight aria-hidden />
        </a>
      ) : (
        <p className="stage-cta" data-pending>
          <FiClock aria-hidden />
          {enquiry.pendingLabel}
        </p>
      )}
      {brochure.href && (
        <a
          href={brochure.href}
          target="_blank"
          rel="noreferrer"
          className="stage-brochure"
        >
          {brochure.label}
        </a>
      )}
    </div>
  );
}

export default function PartnersSection() {
  const { headline, invitation, stageWords } = SPONSORSHIP;

  return (
    <section
      id="sponsor"
      aria-labelledby="sponsor-title"
      className="partner-stage"
    >
      <svg
        viewBox="0 0 1600 80"
        preserveAspectRatio="none"
        className="stage-valance"
        aria-hidden="true"
      >
        <path d={valancePath()} />
      </svg>
      <StageScene words={stageWords} />
      <div className="stage-front">
        <div aria-hidden className="grain-overlay" />
        <div className="stage-front-inner">
          <h2 id="sponsor-title" className="stage-title">
            {headline}
          </h2>
          <p className="stage-invite">{invitation}</p>
          <PartnerCall />
        </div>
      </div>
    </section>
  );
}

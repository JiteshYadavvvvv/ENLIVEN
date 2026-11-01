import {
  SPONSOR_CATEGORIES,
  SPONSORS,
  type Sponsor,
  type SponsorLineup,
} from "@/content/sponsorship";

import AdWall from "./AdWall";
import DistrictRoute from "./DistrictRoute";
import DistrictScene from "./DistrictScene";
import "./partners.css";

function billingOrder(first: Sponsor, second: Sponsor) {
  const featured =
    Number(Boolean(second.featured)) - Number(Boolean(first.featured));
  if (featured !== 0) return featured;
  const order =
    (first.order ?? Number.MAX_SAFE_INTEGER) -
    (second.order ?? Number.MAX_SAFE_INTEGER);
  if (order !== 0) return order;
  return first.name.localeCompare(second.name);
}

function buildLineup(): SponsorLineup[] {
  return SPONSOR_CATEGORIES.map((category) => ({
    category,
    sponsors: SPONSORS.filter(
      (sponsor) => sponsor.category === category.id,
    ).sort(billingOrder),
  })).filter((lineup) => lineup.sponsors.length > 0);
}

function rooftopOrder(lineup: SponsorLineup[]) {
  const marquee = lineup.filter((entry) => entry.category.stage === "marquee");
  const flanks = lineup.filter((entry) => entry.category.stage === "billboard");
  const split = Math.ceil(flanks.length / 2);
  return [...flanks.slice(0, split), ...marquee, ...flanks.slice(split)];
}

const LINEUP = buildLineup();
const ROOFTOP = rooftopOrder(LINEUP);
const STREET = LINEUP.filter((entry) => entry.category.stage === "signboard");

export default function PartnersSection() {
  return (
    <section id="sponsor" aria-labelledby="sponsor-title" className="district">
      <DistrictScene rooftop={ROOFTOP} />
      {STREET.length > 0 && (
        <div className="district-wall">
          <div aria-hidden className="grain-overlay" />
          <AdWall lineups={STREET} />
        </div>
      )}
      <DistrictRoute />
    </section>
  );
}

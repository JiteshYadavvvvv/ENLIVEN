import { FiArrowDown } from "react-icons/fi";
import "./partners.css";

const STREET_LAMPS = 7;

type DistrictRouteProps = {
  to?: string;
  kicker?: string;
  name?: string;
};

export default function DistrictRoute({
  to = "#faq",
  kicker = "Next stop",
  name = "FAQ",
}: DistrictRouteProps) {
  return (
    <div className="district-route">
      <div aria-hidden className="route-lamps">
        {Array.from({ length: STREET_LAMPS }, (_, index) => (
          <span key={`lamp-${index * 2}`} className="route-lamp" />
        ))}
      </div>
      <span aria-hidden className="route-rail" />
      <div aria-hidden className="route-road">
        <span className="route-lane" />
      </div>
      <a href={to} className="route-sign">
        <span className="route-sign-kicker">{kicker}</span>
        <span className="route-sign-name">{name}</span>
        <FiArrowDown aria-hidden className="route-sign-arrow" />
      </a>
    </div>
  );
}

import { FiArrowDown } from "react-icons/fi";

const STREET_LAMPS = 7;

export default function DistrictRoute() {
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
      <a href="#faq" className="route-sign">
        <span className="route-sign-kicker">Next stop</span>
        <span className="route-sign-name">FAQ</span>
        <FiArrowDown aria-hidden className="route-sign-arrow" />
      </a>
    </div>
  );
}

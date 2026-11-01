import DistrictRoute from "@/components/partners/DistrictRoute";
import ScrollRise from "@/components/ui/ScrollRise";
import { TIMELINE } from "@/content/timeline";

import MissionMap from "./MissionMap";
import "./timeline.css";

export default function TimelineSection() {
  if (TIMELINE.length === 0) return null;

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-title"
      className="mission-timeline"
    >
      <div className="mission-floor">
        <div aria-hidden className="grain-overlay" />
        <div className="mission-inner">
          <ScrollRise id="timeline-title" className="mission-title">
            Mission <span>timeline</span>
          </ScrollRise>
          <MissionMap checkpoints={TIMELINE} />
        </div>
        <DistrictRoute to="#sponsor" kicker="Next stop" name="PARTNERS" />
      </div>
    </section>
  );
}

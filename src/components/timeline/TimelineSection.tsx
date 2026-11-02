import DistrictRoute from "@/components/partners/DistrictRoute";
import ScrollRise from "@/components/ui/ScrollRise";
import Topography from "@/components/ui/Topography";
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
        <div className="timeline-topography-bg" aria-hidden="true">
          <Topography
            color="#a855f7"
            lineCount={26}
            lineWidth={1.1}
            elevation={1.2}
            speed={0.2}
            morph={0.25}
            glow={0.5}
            opacity={0.42}
            mouseInteraction={true}
            hoverEffect="lift"
          />
        </div>
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

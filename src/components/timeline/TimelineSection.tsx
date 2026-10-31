import ScrollReveal from "@/components/ui/ScrollReveal";
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
          <ScrollReveal>
            <h2 id="timeline-title" className="mission-title">
              Mission timeline
            </h2>
          </ScrollReveal>
          <MissionMap checkpoints={TIMELINE} />
        </div>
      </div>
    </section>
  );
}

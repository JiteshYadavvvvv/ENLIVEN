import ScrollReveal from "@/components/ui/ScrollReveal";
import { TIMELINE } from "@/content/timeline";

import MissionRoute from "./MissionRoute";
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
          <MissionRoute milestones={TIMELINE} />
        </div>
      </div>
    </section>
  );
}

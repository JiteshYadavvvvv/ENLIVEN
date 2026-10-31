import ScrollReveal from "@/components/ui/ScrollReveal";
import { TRACKS } from "@/content/tracks";

import TrackSelect from "./TrackSelect";
import "./tracks.css";

export default function TracksSection() {
  if (TRACKS.length === 0) return null;

  return (
    <section id="tracks" aria-labelledby="tracks-title" className="track-arena">
      <div aria-hidden className="grain-overlay" />
      <div className="track-arena-inner">
        <ScrollReveal>
          <h2 id="tracks-title" className="track-title">
            Pick your track
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <TrackSelect tracks={TRACKS} />
        </ScrollReveal>
      </div>
    </section>
  );
}

import ScrollReveal from "@/components/ui/ScrollReveal";
import { TRACKS, type TrackPanel } from "@/content/tracks";

import TrackArt from "./TrackArt";
import "./tracks.css";

const PORTRAIT_PANELS: TrackPanel[] = ["tall", "slim"];

export default function TracksSection() {
  if (TRACKS.length === 0) return null;

  return (
    <section id="tracks" aria-labelledby="tracks-title" className="track-arena">
      <div className="track-paper">
        <div aria-hidden className="grain-overlay" />
        <div className="track-arena-inner">
          <ScrollReveal className="track-mosaic">
            <div className="track-cover">
              <span aria-hidden className="track-count">
                {TRACKS.length}
              </span>
              <h2 id="tracks-title" className="track-title">
                Pick your <span>track</span>
              </h2>
            </div>
            {TRACKS.map((track) => (
              <article
                key={track.id}
                className="track-panel"
                data-paint={track.paint}
                data-panel={track.panel}
              >
                <TrackArt
                  art={track.art}
                  portrait={PORTRAIT_PANELS.includes(track.panel)}
                />
                <div className="track-caption">
                  <h3 className="track-name">{track.name}</h3>
                  {track.description && (
                    <p className="track-note">{track.description}</p>
                  )}
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

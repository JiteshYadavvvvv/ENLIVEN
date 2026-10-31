"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { type KeyboardEvent, useId, useRef, useState } from "react";

import type { Track } from "@/content/tracks";

import TrackEmblem from "./TrackEmblem";

const STEP_KEYS: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

function trackNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function trackName(track: Track, index: number) {
  return track.name ?? `Track ${trackNumber(index)}`;
}

export default function TrackSelect({ tracks }: { tracks: Track[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const arenaId = useId();
  const current = tracks[active];

  const switchTrack = (event: KeyboardEvent<HTMLDivElement>) => {
    let next = -1;
    if (event.key in STEP_KEYS) {
      next = (active + STEP_KEYS[event.key] + tracks.length) % tracks.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tracks.length - 1;
    }
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="track-select">
        <div
          role="tablist"
          aria-label="Competition tracks"
          className="track-roster"
          onKeyDown={switchTrack}
        >
          {tracks.map((track, index) => (
            <button
              key={track.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${arenaId}-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`${arenaId}-stage`}
              tabIndex={index === active ? 0 : -1}
              className="track-tab"
              data-accent={track.accent}
              onClick={() => setActive(index)}
            >
              <span className="track-tab-number">{trackNumber(index)}</span>
              <span className="track-tab-name">{trackName(track, index)}</span>
            </button>
          ))}
        </div>

        <div
          id={`${arenaId}-stage`}
          role="tabpanel"
          aria-labelledby={`${arenaId}-tab-${active}`}
          className="track-stage"
          data-accent={current.accent}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="track-stage-content"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span aria-hidden className="track-stage-number">
                {trackNumber(active)}
              </span>
              <TrackEmblem shape={current.emblem} />
              <div className="track-stage-copy">
                <h3 className="track-stage-name">
                  {trackName(current, active)}
                </h3>
                <p className="track-stage-summary">
                  {current.summary ?? "Track details to be announced."}
                </p>
                {current.focus.length > 0 && (
                  <ul className="track-focus">
                    {current.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

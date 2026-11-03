"use client";

import { MotionConfig, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { TRACKS, type TrackPanel } from "@/content/tracks";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

import TrackArt from "./TrackArt";
import "./tracks.css";

const PORTRAIT_PANELS: TrackPanel[] = ["tall", "slim"];

type LayoutBreakpoint = "mobile" | "tablet" | "desktop";

function useLayoutBreakpoint(): LayoutBreakpoint {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mqlMobile = window.matchMedia("(max-width: 639px)");
    const mqlTablet = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );
    mqlMobile.addEventListener("change", callback);
    mqlTablet.addEventListener("change", callback);
    return () => {
      mqlMobile.removeEventListener("change", callback);
      mqlTablet.removeEventListener("change", callback);
    };
  };

  const getSnapshot = (): LayoutBreakpoint => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 640) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
  };

  const getServerSnapshot = (): LayoutBreakpoint => "desktop";

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function getTrackDelay(index: number, breakpoint: LayoutBreakpoint): number {
  if (breakpoint === "mobile") {
    // 2-column layout: pair stagger by active row to avoid cumulative scroll delay
    return (index % 2) * 0.08 + 0.04;
  }
  if (breakpoint === "tablet") {
    // 4-column layout: stagger across the active row's columns
    return (index % 4) * 0.07 + 0.04;
  }
  // Desktop 6-column mosaic: sequential cinematic wave across the 9 tracks
  return 0.04 + index * 0.055;
}

export default function TracksSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const breakpoint = useLayoutBreakpoint();

  if (TRACKS.length === 0) return null;

  const cardInitial = prefersReducedMotion
    ? false
    : { opacity: 0, y: 28, scale: 0.98 };

  const cardWhileInView = prefersReducedMotion
    ? undefined
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <section id="tracks" aria-labelledby="tracks-title" className="track-arena">
      <div className="track-paper">
        <div aria-hidden className="grain-overlay" />
        <div className="track-arena-inner">
          <MotionConfig reducedMotion="user">
            <div className="track-mosaic">
              {/* Mosaic Header / Cover Card */}
              <motion.div
                className="track-cover"
                initial={cardInitial}
                whileInView={cardWhileInView}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span aria-hidden className="track-count">
                  {TRACKS.length}
                </span>
                <h2 id="tracks-title" className="track-title">
                  Pick your <span>track</span>
                </h2>
              </motion.div>

              {/* All 9 Track Cards with Staggered Scroll Reveal */}
              {TRACKS.map((track, index) => (
                <motion.article
                  key={track.id}
                  className="track-panel"
                  data-paint={track.paint}
                  data-panel={track.panel}
                  initial={cardInitial}
                  whileInView={cardWhileInView}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion
                      ? 0
                      : getTrackDelay(index, breakpoint),
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                </motion.article>
              ))}
            </div>
          </MotionConfig>
        </div>
      </div>
    </section>
  );
}

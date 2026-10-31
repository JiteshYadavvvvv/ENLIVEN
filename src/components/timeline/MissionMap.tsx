"use client";

import { MotionConfig, motion } from "motion/react";
import { type CSSProperties, useSyncExternalStore } from "react";

import { EVENT } from "@/content/event";
import type { Checkpoint } from "@/content/timeline";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

import MapSigil from "./MapSigil";

type MapSize = "mob" | "tab" | "desk";
type LabelSide = "left" | "right" | "above" | "below";
type CheckpointState = "unscheduled" | "cleared" | "next" | "ahead";

type MapLayout = {
  width: number;
  height: number;
  road: string;
  marks: number[];
  points: [number, number, LabelSide][];
  rings: [number, number, number][];
  reveal: string;
};

const DAY = 86_400_000;
const MAP_SIZES: MapSize[] = ["mob", "tab", "desk"];
const REVEALED = "inset(0 0% 0% 0)";

const MAP_LAYOUTS: Record<MapSize, MapLayout> = {
  mob: {
    width: 400,
    height: 1240,
    road: "M100 -40C100 20 100 60 100 110C100 220 290 220 290 340C290 460 110 460 110 580C110 700 280 700 280 830C280 960 110 960 110 1090C110 1160 160 1200 220 1260",
    marks: [0.0921, 0.285, 0.4784, 0.6726, 0.8718],
    points: [
      [100, 110, "right"],
      [290, 340, "left"],
      [110, 580, "right"],
      [280, 830, "left"],
      [110, 1090, "right"],
    ],
    rings: [
      [320, 150, 34],
      [320, 150, 60],
      [330, 640, 40],
      [330, 640, 70],
      [80, 860, 36],
      [80, 860, 62],
    ],
    reveal: "inset(0 0% 100% 0)",
  },
  tab: {
    width: 800,
    height: 1000,
    road: "M-40 60C40 60 80 120 140 120C400 120 620 140 620 280C620 420 170 360 170 500C170 640 600 560 600 690C600 820 200 760 200 890C200 960 260 1000 320 1040",
    marks: [0.0779, 0.3013, 0.5186, 0.7238, 0.9185],
    points: [
      [140, 120, "below"],
      [620, 280, "left"],
      [170, 500, "right"],
      [600, 690, "left"],
      [200, 890, "right"],
    ],
    rings: [
      [420, 40, 40],
      [420, 40, 72],
      [660, 500, 50],
      [660, 500, 88],
      [440, 950, 44],
      [90, 720, 40],
    ],
    reveal: "inset(0 0% 100% 0)",
  },
  desk: {
    width: 1200,
    height: 620,
    road: "M-40 330C40 330 60 470 110 470C200 470 210 190 330 190C440 190 430 440 560 440C690 440 770 400 760 330C750 260 660 270 680 330C700 390 820 330 900 230C990 230 1010 470 1110 470C1180 470 1200 430 1250 420",
    marks: [0.1016, 0.2794, 0.4502, 0.7703, 0.9288],
    points: [
      [110, 470, "below"],
      [330, 190, "above"],
      [560, 440, "below"],
      [900, 230, "above"],
      [1110, 470, "below"],
    ],
    rings: [
      [160, 150, 36],
      [160, 150, 64],
      [1040, 130, 38],
      [1040, 130, 70],
      [740, 560, 34],
      [740, 560, 60],
      [440, 330, 24],
    ],
    reveal: "inset(0 100% 0% 0)",
  },
};

const SIDE_OFFSETS: Record<
  LabelSide,
  { dx: number; dy: number; tx: string; ty: string; align: string }
> = {
  right: { dx: 1, dy: 0, tx: "0%", ty: "-50%", align: "left" },
  left: { dx: -1, dy: 0, tx: "-100%", ty: "-50%", align: "right" },
  above: { dx: 0, dy: -1, tx: "-50%", ty: "-100%", align: "center" },
  below: { dx: 0, dy: 1, tx: "-50%", ty: "0%", align: "center" },
};

const ROUTE_STOPS = MAP_LAYOUTS.desk.points.length;

const CHECKPOINT_DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const subscribe = (tick: () => void) => {
  const timer = window.setInterval(tick, 60_000);
  return () => window.clearInterval(timer);
};

const readMinute = () => Math.floor(Date.now() / 60_000);

const serverMinute = () => null;

function checkpointTime(checkpoint: Checkpoint) {
  if (checkpoint.schedule === "results") {
    return EVENT.resultsAt ? Date.parse(EVENT.resultsAt) : null;
  }
  if (!EVENT.dateAnnounced) return null;
  const eventTime = Date.parse(EVENT.startsAt);
  if (checkpoint.schedule === "event-day") return eventTime;
  return eventTime - checkpoint.schedule.daysBeforeEvent * DAY;
}

function checkpointStates(times: (number | null)[], minute: number | null) {
  const now = minute === null ? null : minute * 60_000;
  let nextMarked = false;
  return times.map((time): CheckpointState => {
    if (time === null) return "unscheduled";
    if (now === null) return "ahead";
    if (time <= now) return "cleared";
    if (nextMarked) return "ahead";
    nextMarked = true;
    return "next";
  });
}

function placement(index: number) {
  const vars: Record<string, string | number> = {};
  for (const size of MAP_SIZES) {
    const layout = MAP_LAYOUTS[size];
    const [x, y, side] = layout.points[index];
    const offset = SIDE_OFFSETS[side];
    vars[`--${size}-x`] = `${(x / layout.width) * 100}%`;
    vars[`--${size}-y`] = `${(y / layout.height) * 100}%`;
    vars[`--${size}-dx`] = offset.dx;
    vars[`--${size}-dy`] = offset.dy;
    vars[`--${size}-tx`] = offset.tx;
    vars[`--${size}-ty`] = offset.ty;
    vars[`--${size}-align`] = offset.align;
  }
  return vars as CSSProperties;
}

export default function MissionMap({
  checkpoints,
}: {
  checkpoints: Checkpoint[];
}) {
  const minute = useSyncExternalStore(subscribe, readMinute, serverMinute);
  const still = usePrefersReducedMotion();
  const stops = checkpoints.slice(0, ROUTE_STOPS);
  const times = stops.map(checkpointTime);
  const states = checkpointStates(times, minute);
  const lastCleared = states.lastIndexOf("cleared");

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="mission-map"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.2 }}
      >
        {MAP_SIZES.map((size) => {
          const layout = MAP_LAYOUTS[size];
          const progress = lastCleared < 0 ? 0 : layout.marks[lastCleared];
          return (
            <motion.svg
              key={size}
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              className="map-terrain"
              data-size={size}
              aria-hidden="true"
              variants={{
                hidden: { clipPath: still ? REVEALED : layout.reveal },
                shown: {
                  clipPath: REVEALED,
                  transition: {
                    duration: still ? 0 : 1.5,
                    ease: [0.65, 0, 0.35, 1],
                  },
                },
              }}
            >
              <g className="map-rings">
                {layout.rings.map(([cx, cy, r]) => (
                  <circle key={`${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />
                ))}
              </g>
              <path d={layout.road} className="map-road-edge" />
              <path d={layout.road} className="map-road" />
              {progress > 0 && (
                <path
                  d={layout.road}
                  pathLength={1}
                  strokeDasharray={`${progress} 1`}
                  className="map-road-cleared"
                />
              )}
              <path d={layout.road} className="map-road-dashes" />
            </motion.svg>
          );
        })}

        <ol className="map-stops">
          {stops.map((checkpoint, index) => {
            const time = times[index];
            return (
              <motion.li
                key={checkpoint.id}
                className="map-stop"
                data-sigil={checkpoint.sigil}
                data-state={states[index]}
                style={placement(index)}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  shown: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.45,
                      delay: still ? 0 : 0.4 + index * 0.18,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                  },
                }}
              >
                <span className="map-node">
                  <MapSigil sigil={checkpoint.sigil} />
                </span>
                <div className="map-label">
                  <h3 className="map-label-title">{checkpoint.title}</h3>
                  <p className="map-label-date">
                    {time === null
                      ? "Date to be announced"
                      : CHECKPOINT_DATE.format(time)}
                  </p>
                  {checkpoint.description && (
                    <p className="map-label-note">{checkpoint.description}</p>
                  )}
                  {states[index] === "next" && (
                    <span className="sr-only">Next checkpoint</span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </MotionConfig>
  );
}

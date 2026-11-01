"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  type CSSProperties,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { EVENT } from "@/content/event";
import type { Checkpoint } from "@/content/timeline";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

import MapSigil from "./MapSigil";

type MapSize = "mob" | "tab" | "desk";
type LabelSide = "left" | "right" | "below";
type CheckpointState = "unscheduled" | "cleared" | "next" | "ahead";

type MapLayout = {
  width: number;
  height: number;
  road: string;
  marks: number[];
  points: [number, number, LabelSide][];
  exit: string;
};

const DAY = 86_400_000;
const MAP_SIZES: MapSize[] = ["mob", "tab", "desk"];
const MISSION_STOP = 3;
const FINISH_STOP = 4;

const MAP_LAYOUTS: Record<MapSize, MapLayout> = {
  mob: {
    width: 400,
    height: 1500,
    road: "M200 -40C200 40 90 40 90 130C90 260 310 260 310 400C310 540 90 520 90 670C90 820 290 800 290 960C290 1100 100 1100 100 1260C100 1350 160 1420 220 1540",
    exit: "M220 1540C236 1572 200 1580 200 1610V1900",
    marks: [0.1059, 0.2896, 0.4744, 0.6602, 0.8458],
    points: [
      [90, 130, "right"],
      [310, 400, "left"],
      [90, 670, "right"],
      [290, 960, "left"],
      [100, 1260, "right"],
    ],
  },
  tab: {
    width: 800,
    height: 1460,
    road: "M400 -40C400 60 180 40 180 140C180 280 620 260 620 410C620 560 180 530 180 680C180 820 660 800 640 920C630 990 580 1000 520 990C420 980 220 1120 220 1270C220 1370 320 1420 400 1500",
    exit: "M400 1500C424 1524 400 1540 400 1560V1900",
    marks: [0.1063, 0.2978, 0.4899, 0.739, 0.8946],
    points: [
      [180, 140, "right"],
      [620, 410, "left"],
      [180, 680, "right"],
      [520, 990, "below"],
      [220, 1270, "right"],
    ],
  },
  desk: {
    width: 1000,
    height: 1560,
    road: "M500 -40C500 60 250 50 250 150C250 290 750 280 750 430C750 580 250 560 250 710C250 860 820 800 800 930C790 1010 700 1040 600 1030C480 1020 320 1180 320 1340C320 1450 450 1490 500 1600",
    exit: "M500 1600C510 1622 500 1634 500 1650V1900",
    marks: [0.1042, 0.2929, 0.4822, 0.7565, 0.8991],
    points: [
      [250, 150, "right"],
      [750, 430, "left"],
      [250, 710, "right"],
      [600, 1030, "below"],
      [320, 1340, "right"],
    ],
  },
};

const SIDE_OFFSETS: Record<
  LabelSide,
  { dx: number; dy: number; tx: string; ty: string; align: string }
> = {
  right: { dx: 1, dy: 0, tx: "0%", ty: "-50%", align: "left" },
  left: { dx: -1, dy: 0, tx: "-100%", ty: "-50%", align: "right" },
  below: { dx: 0, dy: 1, tx: "-50%", ty: "0%", align: "center" },
};

const ROUTE_STOPS = MAP_LAYOUTS.desk.points.length;

const CHECKPOINT_DATE = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const WIDE_QUERY = "(min-width: 64rem)";
const MEDIUM_QUERY = "(min-width: 48rem)";

function subscribeToMedia(onChange: () => void) {
  const queries = [WIDE_QUERY, MEDIUM_QUERY].map((query) =>
    window.matchMedia(query),
  );
  for (const query of queries) query.addEventListener("change", onChange);
  return () => {
    for (const query of queries) query.removeEventListener("change", onChange);
  };
}

function readMapSize(): MapSize {
  if (window.matchMedia(WIDE_QUERY).matches) return "desk";
  if (window.matchMedia(MEDIUM_QUERY).matches) return "tab";
  return "mob";
}

const serverMapSize = (): MapSize => "desk";

const subscribeToClock = (tick: () => void) => {
  const timer = window.setInterval(tick, 60_000);
  return () => window.clearInterval(timer);
};

const readMinute = () => Math.floor(Date.now() / 60_000);

const serverMinute = () => null;

function checkpointTime(checkpoint: Checkpoint) {
  if (checkpoint.schedule === "results") {
    return EVENT.resultsAt ? Date.parse(EVENT.resultsAt) : null;
  }
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

function routeFraction(progress: number, layout: MapLayout) {
  const depths = [0, ...layout.points.map(([, y]) => y / layout.height), 1];
  const lengths = [0, ...layout.marks, 1];
  for (let index = 1; index < depths.length; index++) {
    if (progress <= depths[index]) {
      const span = depths[index] - depths[index - 1];
      const share = span > 0 ? (progress - depths[index - 1]) / span : 1;
      return lengths[index - 1] + share * (lengths[index] - lengths[index - 1]);
    }
  }
  return 1;
}

function padPath(x: number, y: number, radius: number) {
  const depth = radius * 0.42;
  const base = y + radius * 0.22;
  return `M${x - radius} ${base}L${x} ${base - depth}L${x + radius} ${base}L${x} ${base + depth}Z`;
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
  const mapRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const size = useSyncExternalStore(
    subscribeToMedia,
    readMapSize,
    serverMapSize,
  );
  const minute = useSyncExternalStore(
    subscribeToClock,
    readMinute,
    serverMinute,
  );
  const layout = MAP_LAYOUTS[size];
  const stops = checkpoints.slice(0, ROUTE_STOPS);
  const times = stops.map(checkpointTime);
  const states = checkpointStates(times, minute);
  const lit = useMotionValue(0);
  const [reached, setReached] = useState(0);
  const { scrollYProgress } = useScroll({
    target: mapRef,
    offset: ["start 72%", "end 72%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const fraction = routeFraction(progress, layout);
    lit.set(fraction);
    setReached(layout.marks.filter((mark) => fraction >= mark - 0.01).length);
  });

  const litCount = still ? stops.length : reached;
  const exitLit = useTransform(lit, [0.985, 1], [0, 1]);

  return (
    <div ref={mapRef} className="mission-map">
      {MAP_SIZES.map((mapSize) => {
        const terrain = MAP_LAYOUTS[mapSize];
        return (
          <svg
            key={mapSize}
            viewBox={`0 0 ${terrain.width} ${terrain.height}`}
            className="map-terrain"
            data-size={mapSize}
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={`map-grid-${mapSize}`}
                width="44"
                height="44"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="4" cy="4" r="1.8" />
              </pattern>
              <pattern
                id={`map-checker-${mapSize}`}
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <rect width="28" height="28" className="map-checker-light" />
                <path d="M0 0h14v14H0ZM14 14h14v14H14Z" />
              </pattern>
            </defs>
            <rect
              width={terrain.width}
              height={terrain.height}
              fill={`url(#map-grid-${mapSize})`}
              className="map-grid"
            />
            {terrain.points.map(([x, y], index) => {
              const radius =
                index === MISSION_STOP
                  ? terrain.width * 0.17
                  : terrain.width * 0.11;
              return (
                <g
                  key={`${x}-${y}`}
                  className="map-pad-group"
                  data-lit={index < litCount}
                >
                  <path
                    d={padPath(x + 8, y + 12, radius)}
                    className="map-pad-shadow"
                  />
                  <path
                    d={padPath(x, y, radius)}
                    className="map-pad"
                    fill={
                      index === FINISH_STOP
                        ? `url(#map-checker-${mapSize})`
                        : undefined
                    }
                    data-finish={index === FINISH_STOP || undefined}
                  />
                </g>
              );
            })}
            <path d={terrain.road} className="map-road-edge" />
            <path d={terrain.road} className="map-road" />
            <path d={terrain.road} className="map-road-dashes" />
            <motion.path
              d={terrain.road}
              className="map-road-lit"
              style={{ pathLength: still ? 1 : lit }}
            />
            <path d={terrain.exit} className="map-road-edge" />
            <path d={terrain.exit} className="map-road" />
            <path d={terrain.exit} className="map-road-dashes" />
            <motion.path
              d={terrain.exit}
              className="map-road-lit"
              style={{ pathLength: still ? 1 : exitLit }}
            />
          </svg>
        );
      })}

      <ol className="map-stops">
        {stops.map((checkpoint, index) => {
          const time = times[index];
          return (
            <li
              key={checkpoint.id}
              className="map-stop"
              data-sigil={checkpoint.sigil}
              data-state={states[index]}
              data-lit={index < litCount}
              style={placement(index)}
            >
              {checkpoint.sigil === "finish" && (
                <span aria-hidden className="map-burst" />
              )}
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
            </li>
          );
        })}
      </ol>
    </div>
  );
}

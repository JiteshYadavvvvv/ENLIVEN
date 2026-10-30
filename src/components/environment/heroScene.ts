const HERO_BASE = "/assets/enliven-hero";

export type ArtSize = { width: number; height: number };

type Amount = number | `${number}cqw`;

export type HoverPath = {
  bob: number;
  drift: [Amount, Amount];
  tilt: number;
};

export type HoverTiming = {
  bob: number;
  drift: number;
  tilt: number;
  delay: number;
};

export type Placement = {
  w?: number;
  rotate?: number;
  hover?: HoverPath;
} & ({ x: number } | { vx: number } | { vr: number; w: number }) &
  ({ y: number } | { vy: number });

export type HeroLayer = {
  id: string;
  className?: string;
  src: string;
  width: number;
  height: number;
  z: string;
  desktop: Placement;
  mobile?: Placement;
  hoverTiming?: HoverTiming;
};

export type CloudLayer = HeroLayer & { part: -1 | 1 };

export const HERO_ART = {
  desktop: {
    src: `${HERO_BASE}/backgrounds/city-desktop-v2.webp`,
    width: 1534,
    height: 769,
    cropLeftMax: 100,
  },
  mobile: {
    src: `${HERO_BASE}/backgrounds/city-mobile-v2.webp`,
    width: 501,
    height: 769,
  },
};

export const HERO_BRANDING = {
  cardSrc: `${HERO_BASE}/ui/enter-card.png`,
  mobileScale: 0.6376,
  desktop: { vx: 0.5, y: 495 } satisfies Placement,
  mobile: { vx: 0.5, y: 371 } satisfies Placement,
};

export const HERO_LAYERS: HeroLayer[] = [
  {
    id: "island-small",
    src: `${HERO_BASE}/islands/island-small.png`,
    width: 162,
    height: 101,
    z: "var(--layer-distant)",
    desktop: {
      vx: 0.435,
      y: 106,
      w: 61,
      hover: { bob: -4, drift: [-3, 3], tilt: 0.4 },
    },
    mobile: { vx: 0.44, vy: 0.14, w: 40 },
    hoverTiming: { bob: 13, drift: 23, tilt: 19, delay: -7 },
  },
  {
    id: "drone-02",
    src: `${HERO_BASE}/drones/drone-02.png`,
    width: 115,
    height: 80,
    z: "var(--layer-distant)",
    desktop: {
      vx: 0.22,
      y: 135,
      w: 45,
      hover: { bob: -6, drift: [-20, 2], tilt: 2.5 },
    },
    mobile: {
      vx: 0.31,
      vy: 0.195,
      w: 26,
      hover: { bob: -5, drift: [-10, 6], tilt: 2.5 },
    },
    hoverTiming: { bob: 2.7, drift: 10, tilt: 3.8, delay: -3 },
  },
  {
    id: "island-large-left",
    src: `${HERO_BASE}/islands/island-large-left.png`,
    width: 163,
    height: 113,
    z: "var(--layer-ambient)",
    desktop: {
      vx: 0.272,
      y: 123,
      w: 140,
      hover: { bob: -12, drift: [-6, 8], tilt: 0.8 },
    },
    mobile: {
      vx: 0.2,
      vy: 0.095,
      w: 70,
      hover: { bob: -7, drift: [-4, 5], tilt: 0.8 },
    },
    hoverTiming: { bob: 9.5, drift: 17, tilt: 13, delay: -2 },
  },
  {
    id: "island-large-right",
    src: `${HERO_BASE}/islands/island-large-right.png`,
    width: 234,
    height: 112,
    z: "var(--layer-ambient)",
    desktop: {
      vx: 0.585,
      y: 250,
      w: 110,
      hover: { bob: -9, drift: [5, -5], tilt: 0.6 },
    },
    mobile: {
      vx: 0.69,
      vy: 0.235,
      w: 100,
      hover: { bob: -6, drift: [4, -4], tilt: 0.6 },
    },
    hoverTiming: { bob: 11, drift: 19, tilt: 15, delay: -4 },
  },
  {
    id: "drone-01",
    src: `${HERO_BASE}/drones/drone-01.png`,
    width: 130,
    height: 87,
    z: "var(--layer-ambient)",
    desktop: {
      vx: 0.583,
      y: 147,
      w: 66,
      hover: { bob: -8, drift: [-20, 25], tilt: 3 },
    },
    mobile: {
      vx: 0.46,
      vy: 0.21,
      w: 30,
      hover: { bob: -6, drift: [-14, 6], tilt: 3 },
    },
    hoverTiming: { bob: 3.2, drift: 12, tilt: 4.5, delay: -1 },
  },
  {
    id: "rocket-bus",
    src: `${HERO_BASE}/vehicles/rocket-bus.png`,
    width: 333,
    height: 173,
    z: "var(--layer-ambient)",
    desktop: {
      vx: 0.667,
      y: 131,
      w: 205,
      hover: { bob: -10, drift: [0, "7cqw"], tilt: 1.2 },
    },
    mobile: {
      vx: 0.64,
      vy: 0.12,
      w: 124,
      hover: { bob: -6, drift: ["-6cqw", 0], tilt: 1.2 },
    },
    hoverTiming: { bob: 6.5, drift: 23, tilt: 9, delay: -5 },
  },
  {
    id: "metro",
    className: "metro-run",
    src: `${HERO_BASE}/vehicles/metro.png`,
    width: 512,
    height: 130,
    z: "var(--layer-transit)",
    desktop: { x: 222, y: 428, w: 272 },
    mobile: { x: 105, y: 416, w: 180 },
  },
  {
    id: "palm-occluder",
    src: `${HERO_BASE}/backgrounds/city-desktop-v2-palm.png`,
    width: 128,
    height: 176,
    z: "var(--layer-transit)",
    desktop: { x: 224, y: 300, w: 128 },
  },
  {
    id: "car",
    className: "car-drive",
    src: `${HERO_BASE}/vehicles/car.png`,
    width: 416,
    height: 173,
    z: "var(--layer-scenery)",
    desktop: { x: 110, y: 550, w: 317 },
    mobile: { x: 80, y: 646, w: 160 },
  },
];

export const HERO_CLOUDS: CloudLayer[] = [
  {
    id: "cloud-soft",
    part: 1,
    className: "scene-cloud",
    src: `${HERO_BASE}/clouds/innerve-cloud-soft.webp`,
    width: 1500,
    height: 852,
    z: "var(--layer-atmosphere)",
    desktop: { vx: 0.33, y: 600, w: 900 },
    mobile: { vx: 0.42, vy: 0.72, w: 300 },
  },
  {
    id: "cloud-wide-left",
    part: -1,
    className: "scene-cloud",
    src: `${HERO_BASE}/clouds/innerve-cloud-wide.webp`,
    width: 796,
    height: 301,
    z: "var(--layer-atmosphere)",
    desktop: { vx: 0.42, y: 690, w: 480 },
    mobile: { vx: 0.55, vy: 0.85, w: 220 },
  },
  {
    id: "cloud-wide-right",
    part: 1,
    className: "scene-cloud",
    src: `${HERO_BASE}/clouds/innerve-cloud-wide.webp`,
    width: 796,
    height: 301,
    z: "var(--layer-atmosphere)",
    desktop: { vx: 0.74, y: 668, w: 440 },
  },
];

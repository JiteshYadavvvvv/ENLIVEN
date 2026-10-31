const HERO_BASE = "/assets/enliven-hero";

export type ArtSize = { width: number; height: number };

export type Orbit = {
  rx: number;
  ry: number;
  bank: number;
  time: number;
  delay: number;
  reverse?: boolean;
};

export type Placement = {
  w?: number;
  rotate?: number;
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
  orbit?: Orbit;
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
  mobile: { vx: 0.5, y: 352 } satisfies Placement,
};

export const HERO_LAYERS: HeroLayer[] = [
  {
    id: "island-small",
    className: "scene-distant",
    src: `${HERO_BASE}/islands/island-small.png`,
    width: 162,
    height: 101,
    z: "var(--layer-distant)",
    desktop: { x: 790, y: 100, w: 50 },
    mobile: { x: 258, vy: 0.06, w: 26 },
    orbit: { rx: 2, ry: 4, bank: 0.2, time: 31, delay: -9 },
  },
  {
    id: "drone-02",
    src: `${HERO_BASE}/drones/drone-02.png`,
    width: 115,
    height: 80,
    z: "var(--layer-distant)",
    desktop: { x: 545, y: 70, w: 45 },
    mobile: { x: 255, vy: 0.24, w: 22 },
    orbit: { rx: 24, ry: 6, bank: 6, time: 9, delay: -2 },
  },
  {
    id: "island-large-left",
    src: `${HERO_BASE}/islands/island-large-left.png`,
    width: 163,
    height: 113,
    z: "var(--layer-ambient)",
    desktop: { x: 340, y: 60, w: 150 },
    mobile: { x: 160, vy: 0.07, w: 72 },
    orbit: { rx: 5, ry: 11, bank: 0.6, time: 23, delay: -4 },
  },
  {
    id: "island-large-right",
    src: `${HERO_BASE}/islands/island-large-right.png`,
    width: 234,
    height: 112,
    z: "var(--layer-ambient)",
    desktop: { x: 620, y: 135, w: 120 },
    mobile: { x: 320, vy: 0.225, w: 64 },
    orbit: { rx: 4, ry: 8, bank: 0.5, time: 19, delay: -11, reverse: true },
  },
  {
    id: "drone-01",
    src: `${HERO_BASE}/drones/drone-01.png`,
    width: 130,
    height: 87,
    z: "var(--layer-ambient)",
    desktop: { x: 900, y: 175, w: 60 },
    mobile: { x: 335, vy: 0.06, w: 26 },
    orbit: { rx: 32, ry: 7, bank: 7, time: 13, delay: -6, reverse: true },
  },
  {
    id: "rocket-bus",
    className: "bus-flight",
    src: `${HERO_BASE}/vehicles/rocket-bus.png`,
    width: 333,
    height: 173,
    z: "var(--layer-ambient)",
    desktop: { x: 1080, y: 120, w: 205 },
    mobile: { x: 240, vy: 0.145, w: 100 },
  },
  {
    id: "palm-crown",
    src: `${HERO_BASE}/backgrounds/city-desktop-v2-palm-crown.png`,
    width: 284,
    height: 250,
    z: "var(--layer-transit)",
    desktop: { x: 1250, y: 0, w: 284 },
  },
  {
    id: "metro",
    className: "metro-shuttle",
    src: `${HERO_BASE}/vehicles/metro.png`,
    width: 512,
    height: 130,
    z: "var(--layer-transit)",
    desktop: { vx: 0.5, y: 430, w: 272, rotate: -4 },
    mobile: { x: 245, y: 438, w: 180, rotate: 2.4 },
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
    mobile: { vx: 0.5, vy: 0.8, w: 260 },
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
    mobile: { vx: 0.62, vy: 0.9, w: 200 },
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

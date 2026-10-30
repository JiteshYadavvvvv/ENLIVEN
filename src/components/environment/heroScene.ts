const HERO_BASE = "/assets/enliven-hero";

export type ArtSize = { width: number; height: number };

export type Placement = {
  w?: number;
  rotate?: number;
  minFromCenter?: number;
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
};

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
  emblemSrc: `${HERO_BASE}/branding/enliven-emblem.png`,
  cardSrc: `${HERO_BASE}/ui/enter-card.png`,
  mobileScale: 0.6376,
  desktop: { vx: 0.5, y: 156 } satisfies Placement,
  mobile: { vx: 0.5, y: 155 } satisfies Placement,
};

export const HERO_LAYERS: HeroLayer[] = [
  {
    id: "island-small",
    src: `${HERO_BASE}/islands/island-small.png`,
    width: 162,
    height: 101,
    z: "var(--layer-distant)",
    desktop: { vx: 0.435, y: 106, w: 61 },
    mobile: { vx: 0.52, vy: 0.095, w: 40 },
  },
  {
    id: "drone-02",
    src: `${HERO_BASE}/drones/drone-02.png`,
    width: 115,
    height: 80,
    z: "var(--layer-distant)",
    desktop: { vx: 0.22, y: 135, w: 45 },
    mobile: { vx: 0.31, vy: 0.195, w: 26 },
  },
  {
    id: "island-large-left",
    src: `${HERO_BASE}/islands/island-large-left.png`,
    width: 163,
    height: 113,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.272, y: 123, w: 140 },
    mobile: { vx: 0.26, vy: 0.095, w: 70 },
  },
  {
    id: "island-large-right",
    src: `${HERO_BASE}/islands/island-large-right.png`,
    width: 234,
    height: 112,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.585, y: 250, w: 110 },
    mobile: { vx: 0.69, vy: 0.245, w: 100 },
  },
  {
    id: "drone-01",
    src: `${HERO_BASE}/drones/drone-01.png`,
    width: 130,
    height: 87,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.583, y: 147, w: 66 },
    mobile: { vx: 0.8, vy: 0.32, w: 30 },
  },
  {
    id: "rocket-bus",
    src: `${HERO_BASE}/vehicles/rocket-bus.png`,
    width: 333,
    height: 173,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.667, y: 131, w: 205 },
    mobile: { vx: 0.64, vy: 0.135, w: 124 },
  },
  {
    id: "metro",
    src: `${HERO_BASE}/vehicles/metro.png`,
    width: 512,
    height: 130,
    z: "var(--layer-transit)",
    desktop: { vr: 0.035, y: 430, w: 272, rotate: -3, minFromCenter: 236 },
    mobile: { x: 245, y: 438, w: 180, rotate: 2.6 },
  },
  {
    id: "cloud-soft",
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
    className: "scene-cloud",
    src: `${HERO_BASE}/clouds/innerve-cloud-wide.webp`,
    width: 796,
    height: 301,
    z: "var(--layer-atmosphere)",
    desktop: { vx: 0.74, y: 668, w: 440 },
  },
  {
    id: "car",
    src: `${HERO_BASE}/vehicles/car.png`,
    width: 416,
    height: 173,
    z: "var(--layer-scenery)",
    desktop: { x: 110, y: 550, w: 317 },
    mobile: { x: 80, y: 646, w: 160 },
  },
];

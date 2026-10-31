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
    src: `${HERO_BASE}/backgrounds/city-desktop-v3.webp`,
    width: 1672,
    height: 941,
    cropLeftMax: 40,
  },
  mobile: {
    src: `${HERO_BASE}/backgrounds/city-mobile-v3.webp`,
    width: 600,
    height: 941,
  },
};

export const HERO_BRANDING = {
  cardSrc: `${HERO_BASE}/ui/enter-card.png`,
  desktopScale: 1.221,
  mobileScale: 0.78,
  desktop: { vx: 0.5, y: 490 } satisfies Placement,
  mobile: { vx: 0.5, y: 520 } satisfies Placement,
};

export const HERO_LAYERS: HeroLayer[] = [
  {
    id: "island-small",
    className: "scene-distant",
    src: `${HERO_BASE}/islands/island-small.png`,
    width: 162,
    height: 101,
    z: "var(--layer-distant)",
    desktop: { vx: 0.514, y: 175, w: 50 },
    mobile: { x: 380, vy: 0.1, w: 30 },
    orbit: { rx: 2, ry: 4, bank: 0.2, time: 31, delay: -9 },
  },
  {
    id: "drone-02",
    src: `${HERO_BASE}/drones/drone-02.png`,
    width: 115,
    height: 80,
    z: "var(--layer-distant)",
    desktop: { vx: 0.43, y: 50, w: 45 },
    mobile: { x: 230, vy: 0.27, w: 22 },
    orbit: { rx: 24, ry: 6, bank: 6, time: 9, delay: -2 },
  },
  {
    id: "island-large-left",
    src: `${HERO_BASE}/islands/island-large-left.png`,
    width: 163,
    height: 113,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.281, y: 95, w: 150 },
    mobile: { x: 120, vy: 0.12, w: 80 },
    orbit: { rx: 5, ry: 11, bank: 0.6, time: 23, delay: -4 },
  },
  {
    id: "island-large-right",
    src: `${HERO_BASE}/islands/island-large-right.png`,
    width: 234,
    height: 112,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.855, y: 255, w: 120 },
    mobile: { x: 380, vy: 0.3, w: 70 },
    orbit: { rx: 4, ry: 8, bank: 0.5, time: 19, delay: -11, reverse: true },
  },
  {
    id: "drone-01",
    src: `${HERO_BASE}/drones/drone-01.png`,
    width: 130,
    height: 87,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.598, y: 120, w: 60 },
    mobile: { x: 250, vy: 0.06, w: 26 },
    orbit: { rx: 32, ry: 7, bank: 7, time: 13, delay: -6, reverse: true },
  },
  {
    id: "rocket-bus",
    className: "bus-flight",
    src: `${HERO_BASE}/vehicles/rocket-bus.png`,
    width: 333,
    height: 173,
    z: "var(--layer-ambient)",
    desktop: { vx: 0.706, y: 110, w: 205 },
    mobile: { x: 230, vy: 0.19, w: 100 },
  },
  {
    id: "palm-crown",
    src: `${HERO_BASE}/backgrounds/city-desktop-v3-palm-crown.png`,
    width: 202,
    height: 340,
    z: "var(--layer-transit)",
    desktop: { x: 1470, y: 0, w: 202 },
  },
  {
    id: "metro",
    className: "metro-run",
    src: `${HERO_BASE}/vehicles/metro.png`,
    width: 512,
    height: 130,
    z: "var(--layer-transit)",
    desktop: { x: 1235, y: 593, w: 230, rotate: 2.4 },
    mobile: { x: 470, y: 592, w: 60, rotate: 2.4 },
  },
  {
    id: "car",
    className: "car-run",
    src: `${HERO_BASE}/vehicles/car.png`,
    width: 416,
    height: 173,
    z: "var(--layer-transit)",
    desktop: { x: 227, y: 742, w: 187 },
    mobile: { x: 126, y: 742, w: 187 },
  },
];

const cloud = (
  id: string,
  part: -1 | 1,
  wide: boolean,
  desktop: Placement,
  mobile?: Placement,
): CloudLayer => ({
  id,
  part,
  className: "scene-cloud",
  src: `${HERO_BASE}/clouds/${wide ? "innerve-cloud-wide" : "innerve-cloud-soft"}.webp`,
  width: wide ? 796 : 1500,
  height: wide ? 301 : 852,
  z: "var(--layer-atmosphere)",
  desktop,
  mobile,
});

export const HERO_CLOUDS: CloudLayer[] = [
  cloud(
    "cloud-bank-left",
    -1,
    false,
    { vx: -0.16, vy: 0.82, w: 700 },
    { vx: -0.45, vy: 0.86, w: 330 },
  ),
  cloud(
    "cloud-bank-center",
    -1,
    true,
    { vx: 0.22, vy: 0.9, w: 520 },
    { vx: 0.12, vy: 0.92, w: 230 },
  ),
  cloud(
    "cloud-bank-right",
    1,
    false,
    { vx: 0.55, vy: 0.79, w: 780 },
    { vx: 0.45, vy: 0.84, w: 340 },
  ),
  cloud("cloud-bank-edge", 1, true, { vx: 0.82, vy: 0.86, w: 420 }),
];

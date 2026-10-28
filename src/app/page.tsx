import Image from "next/image";
import type { CSSProperties } from "react";

import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
import Messenger from "@/components/environment/Messenger";
import RegistrationPlate from "@/components/environment/RegistrationPlate";
import RevealOnLoad from "@/components/environment/RevealOnLoad";
import Navbar from "@/components/layout/Navbar";

const ASSET_BASE = "/assets/enliven-world";
const emblemSrc = `${ASSET_BASE}/branding/enliven-emblem.webp`;
const wordmarkSrc = `${ASSET_BASE}/branding/enliven-wordmark.png`;
// Clean city-sunset background — no baked-in floating islands
const heroBackgroundSrc = `${ASSET_BASE}/background/hero-background-clean.jpg`;
const floatingPlatformSrc = `${ASSET_BASE}/environment/floating-platform.webp`;
const rocketBusSrc = `${ASSET_BASE}/environment/rocket-bus.webp`;
const dragonLeftSrc = `${ASSET_BASE}/environment/dragon-left.webp`;
const dragonRightSrc = `${ASSET_BASE}/environment/dragon-right.webp`;
const cloudSrc = `${ASSET_BASE}/environment/cloud.webp`;
const plateDevpostSrc = `${ASSET_BASE}/ui/devpost-plate.webp`;
const plateUnstopSrc = `${ASSET_BASE}/ui/unstop-plate.webp`;

// Floating castle-island assets (extracted transparent PNGs)
const islandLeftSrc = `${ASSET_BASE}/environment/island-left.png`;
const islandCenterSrc = `${ASSET_BASE}/environment/island-center.png`;
const islandRightSrc = `${ASSET_BASE}/environment/island-right.png`;

const emblemFloat = {
  "--float-distance": "-5px",
  "--float-duration": "6s",
} as CSSProperties;

const platformFloat = {
  "--float-distance": "-8px",
  "--float-duration": "7s",
} as CSSProperties;

const rocketBusDrift = {
  "--drift-distance": "22px",
  "--drift-duration": "11s",
} as CSSProperties;

const dragonLeftFlight = {
  "--flight-x": "-16px",
  "--flight-y": "-12px",
  "--flight-duration": "14s",
} as CSSProperties;

const dragonRightFlight = {
  "--flight-x": "18px",
  "--flight-y": "-9px",
  "--flight-duration": "18s",
} as CSSProperties;

const cloudDrift = {
  "--cloud-distance": "36px",
  "--cloud-duration": "24s",
} as CSSProperties;

// Island float CSS custom props — different durations & phases for each
const islandLeftFloat = {
  "--island-float-y": "-14px",
  "--island-drift-x": "8px",
  "--island-duration": "9s",
  animationDelay: "0s",
} as CSSProperties;

const islandCenterFloat = {
  "--island-float-y": "-7px", // Less movement → appears farther away
  "--island-drift-x": "5px",
  "--island-duration": "12s",
  animationDelay: "-4s",
} as CSSProperties;

const islandRightFloat = {
  "--island-float-y": "-11px",
  "--island-drift-x": "-9px", // Drift in opposite direction
  "--island-duration": "10.5s",
  animationDelay: "-7s",
} as CSSProperties;

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EnvironmentScene className="min-h-screen">
        <EnvironmentBackground
          desktopSrc={heroBackgroundSrc}
          mobileSrc={heroBackgroundSrc}
          alt="A cinematic coastal city at golden-hour sunset, with bridges, palm trees, mountains and reflective water"
        />

        {/* === Floating Castle Islands (z-index: ambient, between bg and content) === */}

        {/* Island LEFT — large, left sky area */}
        <Image
          src={islandLeftSrc}
          alt=""
          width={534}
          height={492}
          sizes="(min-width: 1280px) 420px, (min-width: 768px) 340px, 220px"
          style={islandLeftFloat}
          className="animate-island-float pointer-events-none absolute top-[8%] left-[1%] z-[var(--layer-ambient)] hidden w-[220px] select-none md:block lg:w-[340px] xl:w-[420px]"
          draggable={false}
          priority
        />

        {/* Island CENTER — smaller, center-lower, appears more distant */}
        <Image
          src={islandCenterSrc}
          alt=""
          width={366}
          height={352}
          sizes="(min-width: 1280px) 220px, (min-width: 768px) 180px, 120px"
          style={islandCenterFloat}
          className="animate-island-float pointer-events-none absolute top-[26%] left-[36%] z-[var(--layer-ambient)] hidden w-[120px] select-none opacity-90 md:block lg:w-[180px] xl:w-[220px]"
          draggable={false}
          priority
        />

        {/* Island RIGHT — large, right sky area */}
        <Image
          src={islandRightSrc}
          alt=""
          width={438}
          height={484}
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 310px, 200px"
          style={islandRightFloat}
          className="animate-island-float pointer-events-none absolute top-[6%] right-[1%] z-[var(--layer-ambient)] hidden w-[200px] select-none md:block lg:w-[310px] xl:w-[380px]"
          draggable={false}
          priority
        />

        {/* === Existing ambient props === */}
        <Image
          src={rocketBusSrc}
          alt=""
          width={700}
          height={294}
          sizes="210px"
          style={rocketBusDrift}
          className="animate-drift-x absolute top-[22%] left-[85%] z-[var(--layer-ambient)] hidden w-[140px] md:block lg:w-[180px] xl:w-[210px]"
          draggable={false}
        />

        <Image
          src={dragonLeftSrc}
          alt=""
          width={520}
          height={305}
          sizes="105px"
          style={dragonLeftFlight}
          className="animate-flight-path absolute top-[13%] left-[6%] z-[var(--layer-ambient)] hidden w-[70px] md:block lg:w-[90px] xl:w-[105px]"
          draggable={false}
        />

        <Image
          src={dragonRightSrc}
          alt=""
          width={520}
          height={257}
          sizes="96px"
          style={dragonRightFlight}
          className="animate-flight-path absolute top-[9%] left-[63%] z-[var(--layer-ambient)] hidden w-[64px] md:block lg:w-[82px] xl:w-[96px]"
          draggable={false}
        />

        <Image
          src={cloudSrc}
          alt=""
          width={228}
          height={120}
          sizes="120px"
          style={cloudDrift}
          className="animate-cloud-drift absolute top-[6%] left-[36%] z-[var(--layer-ambient)] hidden w-[90px] opacity-80 md:block lg:w-[120px]"
          draggable={false}
        />

        <Navbar />

        <Messenger
          className="bottom-0 left-2 z-[var(--layer-content)] w-[140px] sm:left-3 sm:w-[260px] lg:left-6 lg:w-[340px] xl:w-[370px]"
          message="SAME CITY. NEW PLAYGROUND."
        />

        <div className="container-enliven relative z-[var(--layer-content)] flex min-h-screen flex-col items-center justify-center gap-4 pt-20 pb-56 text-center sm:py-28">
          <RevealOnLoad className="flex w-full flex-col items-center">
            <Image
              src={emblemSrc}
              alt=""
              priority
              width={546}
              height={897}
              sizes="(min-width: 1024px) 88px, (min-width: 640px) 78px, 58px"
              style={emblemFloat}
              className="animate-idle-float -mb-2 h-24 w-auto sm:h-32 lg:-mb-3 lg:h-36"
            />
            <Image
              src={wordmarkSrc}
              alt="ENLIVEN"
              priority
              width={675}
              height={173}
              sizes="(min-width: 1024px) 672px, (min-width: 640px) 576px, 384px"
              className="relative z-10 -mb-4 w-full max-w-sm sm:-mb-6 sm:max-w-xl lg:max-w-2xl"
            />
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-3xl">
              <Image
                src={floatingPlatformSrc}
                alt=""
                width={1400}
                height={496}
                sizes="(min-width: 1024px) 768px, (min-width: 640px) 448px, 384px"
                style={platformFloat}
                className="animate-idle-float w-full"
              />
              <div className="absolute inset-x-0 top-[14%] flex flex-wrap items-center justify-center gap-5 sm:gap-7">
                <RegistrationPlate
                  src={plateDevpostSrc}
                  width={700}
                  height={124}
                  badge="D"
                  href="/"
                  aria-label="Register on Devpost"
                >
                  Devpost
                </RegistrationPlate>
                <RegistrationPlate
                  src={plateUnstopSrc}
                  width={700}
                  height={111}
                  badge="U"
                  href="/"
                  aria-label="Register on Unstop"
                >
                  Unstop
                </RegistrationPlate>
              </div>
            </div>
          </RevealOnLoad>
        </div>
      </EnvironmentScene>
    </main>
  );
}

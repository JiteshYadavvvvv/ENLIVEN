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

// Island float CSS custom props — restrained independent motion with different durations & phases
const islandLeftFloat = {
  "--island-float-y": "-12px",
  "--island-drift-x": "6px",
  "--island-duration": "9.5s",
  animationDelay: "0s",
} as CSSProperties;

const islandCenterFloat = {
  "--island-float-y": "-5px", // Less movement → atmospheric distance
  "--island-drift-x": "3px",
  "--island-duration": "13s",
  animationDelay: "-4.5s",
} as CSSProperties;

const islandRightFloat = {
  "--island-float-y": "-9px",
  "--island-drift-x": "-6px", // Drift in opposite direction
  "--island-duration": "11s",
  animationDelay: "-8s",
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

        {/* === Floating Castle Islands === */}

        {/* Island LEFT — large, left sky area */}
        <Image
          src={islandLeftSrc}
          alt=""
          width={534}
          height={492}
          sizes="(min-width: 1440px) 340px, (min-width: 1024px) 250px, (min-width: 768px) 190px, 150px"
          style={islandLeftFloat}
          className="animate-island-float pointer-events-none absolute top-[15%] sm:top-[16%] lg:top-[17%] left-[1%] sm:left-[2%] xl:left-[3%] z-[var(--layer-ambient)] w-[100px] sm:w-[150px] md:w-[190px] lg:w-[250px] xl:w-[340px] select-none"
          draggable={false}
          priority
        />

        {/* Island CENTER — smaller, distant sky between left island and central branding */}
        <Image
          src={islandCenterSrc}
          alt=""
          width={366}
          height={352}
          sizes="(min-width: 1440px) 165px, (min-width: 1024px) 135px, 110px"
          style={islandCenterFloat}
          className="animate-island-float pointer-events-none absolute top-[16%] md:top-[17%] lg:top-[18%] xl:top-[19%] left-[20%] md:left-[21%] lg:left-[22%] xl:left-[23%] z-[var(--layer-distant)] hidden sm:block w-[90px] md:w-[110px] lg:w-[135px] xl:w-[165px] select-none opacity-85"
          draggable={false}
          priority
        />

        {/* Island RIGHT — large, right-middle area of the sky */}
        <Image
          src={islandRightSrc}
          alt=""
          width={438}
          height={484}
          sizes="(min-width: 1440px) 320px, (min-width: 1024px) 240px, (min-width: 768px) 170px, 140px"
          style={islandRightFloat}
          className="animate-island-float pointer-events-none absolute top-[29%] md:top-[30%] lg:top-[31%] xl:top-[32%] right-[1%] sm:right-[1.5%] md:right-[2%] lg:right-[2.5%] xl:right-[3%] z-[var(--layer-ambient)] w-[90px] sm:w-[140px] md:w-[170px] lg:w-[240px] xl:w-[320px] select-none"
          draggable={false}
          priority
        />

        {/* === Ambient props (scenery & atmosphere) === */}
        <Image
          src={rocketBusSrc}
          alt=""
          width={700}
          height={294}
          sizes="200px"
          style={rocketBusDrift}
          className="animate-drift-x pointer-events-none absolute top-[13%] md:top-[14%] right-[10%] xl:right-[13%] z-[6] hidden md:block w-[120px] lg:w-[160px] xl:w-[185px] select-none"
          draggable={false}
        />

        <Image
          src={dragonLeftSrc}
          alt=""
          width={520}
          height={305}
          sizes="105px"
          style={dragonLeftFlight}
          className="animate-flight-path pointer-events-none absolute top-[10%] md:top-[11%] left-[22%] md:left-[24%] z-[var(--layer-distant)] hidden md:block w-[65px] lg:w-[85px] xl:w-[95px] select-none"
          draggable={false}
        />

        <Image
          src={dragonRightSrc}
          alt=""
          width={520}
          height={257}
          sizes="96px"
          style={dragonRightFlight}
          className="animate-flight-path pointer-events-none absolute top-[9%] md:top-[10%] left-[62%] md:left-[64%] z-[var(--layer-distant)] hidden md:block w-[60px] lg:w-[75px] xl:w-[88px] select-none"
          draggable={false}
        />

        <Navbar />

        <Messenger
          className="bottom-0 left-2 sm:left-3 md:left-4 lg:left-5 xl:left-7 z-[var(--layer-character)] w-[135px] sm:w-[190px] md:w-[210px] lg:w-[250px] xl:w-[290px]"
          message="SAME CITY. NEW PLAYGROUND."
        />

        <div className="container-enliven relative z-[var(--layer-content)] flex min-h-screen flex-col items-center justify-center pt-16 pb-44 text-center sm:pt-20 sm:pb-48 lg:pt-24 lg:pb-52">
          <RevealOnLoad className="flex w-full flex-col items-center">
            {/* Central geometric emblem with tightened gap above wordmark */}
            <Image
              src={emblemSrc}
              alt=""
              priority
              width={546}
              height={897}
              sizes="(min-width: 1440px) 135px, (min-width: 1024px) 120px, (min-width: 640px) 100px, 80px"
              style={emblemFloat}
              className="animate-idle-float mb-0.5 sm:mb-1 lg:mb-1 h-20 w-auto sm:h-24 lg:h-28 xl:h-32"
            />

            {/* Central ENLIVEN wordmark — positioned very close under emblem */}
            <Image
              src={wordmarkSrc}
              alt="ENLIVEN"
              priority
              width={675}
              height={173}
              sizes="(min-width: 1440px) 650px, (min-width: 1024px) 560px, (min-width: 640px) 460px, 300px"
              className="relative z-10 -mt-1 sm:-mt-1.5 lg:-mt-2 mb-2 sm:mb-3 lg:mb-4 w-full max-w-[300px] sm:max-w-md lg:max-w-xl xl:max-w-2xl"
            />

            {/* Central floating platform with registration plates on upper surface */}
            <div
              style={platformFloat}
              className="animate-idle-float relative w-full max-w-[310px] sm:max-w-md lg:max-w-xl xl:max-w-2xl"
            >
              <Image
                src={floatingPlatformSrc}
                alt=""
                priority
                width={1400}
                height={496}
                sizes="(min-width: 1440px) 700px, (min-width: 1024px) 580px, (min-width: 640px) 440px, 310px"
                className="h-auto w-full select-none pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-x-0 top-[26%] sm:top-[28%] lg:top-[30%] flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 px-2 sm:px-4">
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

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

// ─── Animation custom props ──────────────────────────────────────────────────
// Emblem floats gently; shorter duration than platform so they never move
// in perfect lockstep.
const emblemFloat = {
  "--float-distance": "-6px",
  "--float-duration": "5.5s",
  animationDelay: "0s",
} as CSSProperties;

// Platform float is slower, negative delay → starts mid-cycle on mount.
// This prevents the whole central composition from feeling synchronised.
const platformFloat = {
  "--float-distance": "-9px",
  "--float-duration": "7s",
  animationDelay: "-2.8s",
} as CSSProperties;

const rocketBusDrift = {
  "--drift-distance": "20px",
  "--drift-duration": "12s",
} as CSSProperties;

const dragonLeftFlight = {
  "--flight-x": "-14px",
  "--flight-y": "-10px",
  "--flight-duration": "16s",
  animationDelay: "-5s",
} as CSSProperties;

const dragonRightFlight = {
  "--flight-x": "16px",
  "--flight-y": "-8px",
  "--flight-duration": "20s",
  animationDelay: "-11s",
} as CSSProperties;

const cloudDrift = {
  "--cloud-distance": "32px",
  "--cloud-duration": "26s",
} as CSSProperties;

// Island floats — independent durations & staggered phases so they never sync.
const islandLeftFloat = {
  "--island-float-y": "-10px",
  "--island-drift-x": "5px",
  "--island-duration": "10s",
  animationDelay: "0s",
} as CSSProperties;

const islandCenterFloat = {
  "--island-float-y": "-5px",
  "--island-drift-x": "2px",
  "--island-duration": "14s",
  animationDelay: "-6s",
} as CSSProperties;

const islandRightFloat = {
  "--island-float-y": "-8px",
  "--island-drift-x": "-4px",
  "--island-duration": "12s",
  animationDelay: "-3s",
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

        {/* ═══ Floating Castle Islands ════════════════════════════════════════
            Positioned using inline clamp() expressions so both viewport-width
            and viewport-height contribute to placement. This is the root cause
            of the MacBook-vs-external-monitor divergence: pure vw values scale
            only with width, not with the taller/shorter vertical space available.
            clamp() with vh-based midpoints resolves the height dimension.
        ════════════════════════════════════════════════════════════════════════ */}

        {/* Island LEFT — large, left sky quadrant */}
        <div
          className="pointer-events-none absolute z-[var(--layer-ambient)] select-none"
          style={{
            top: "clamp(56px, 12vh, 160px)",
            left: "clamp(8px, 2vw, 48px)",
            width: "clamp(130px, 16vw, 310px)",
            ...islandLeftFloat,
          }}
        >
          <Image
            src={islandLeftSrc}
            alt=""
            width={534}
            height={492}
            sizes="(min-width: 1440px) 310px, (min-width: 1024px) 240px, (min-width: 768px) 185px, 130px"
            className="animate-island-float h-auto w-full"
            draggable={false}
            priority
          />
        </div>

        {/* Island CENTER — small/distant, hidden on small screens */}
        <div
          className="pointer-events-none absolute z-[var(--layer-distant)] hidden select-none sm:block"
          style={{
            top: "clamp(76px, 16vh, 200px)",
            left: "clamp(18%, 20vw, 26%)",
            width: "clamp(80px, 8.5vw, 150px)",
            opacity: 0.82,
            ...islandCenterFloat,
          }}
        >
          <Image
            src={islandCenterSrc}
            alt=""
            width={366}
            height={352}
            sizes="(min-width: 1440px) 150px, (min-width: 1024px) 120px, 90px"
            className="animate-island-float h-auto w-full"
            draggable={false}
            priority
          />
        </div>

        {/* Island RIGHT — right-middle sky, counterbalances the left island */}
        <div
          className="pointer-events-none absolute z-[var(--layer-ambient)] select-none"
          style={{
            top: "clamp(110px, 25vh, 310px)",
            right: "clamp(8px, 2.5vw, 60px)",
            width: "clamp(115px, 15vw, 290px)",
            ...islandRightFloat,
          }}
        >
          <Image
            src={islandRightSrc}
            alt=""
            width={438}
            height={484}
            sizes="(min-width: 1440px) 290px, (min-width: 1024px) 225px, (min-width: 768px) 160px, 115px"
            className="animate-island-float h-auto w-full"
            draggable={false}
            priority
          />
        </div>

        {/* ═══ Ambient props (scenery & atmosphere) ═══════════════════════════ */}

        {/* Rocket bus — hidden below md */}
        <div
          className="pointer-events-none absolute z-[6] hidden select-none md:block"
          style={{
            top: "clamp(64px, 13vh, 148px)",
            right: "clamp(80px, 10vw, 200px)",
            width: "clamp(110px, 10vw, 178px)",
            ...rocketBusDrift,
          }}
        >
          <Image
            src={rocketBusSrc}
            alt=""
            width={700}
            height={294}
            sizes="178px"
            className="animate-drift-x h-auto w-full"
            draggable={false}
          />
        </div>

        {/* Dragon left */}
        <div
          className="pointer-events-none absolute z-[var(--layer-distant)] hidden select-none md:block"
          style={{
            top: "clamp(48px, 10vh, 118px)",
            left: "clamp(22%, 24vw, 28%)",
            width: "clamp(58px, 4.8vw, 92px)",
            ...dragonLeftFlight,
          }}
        >
          <Image
            src={dragonLeftSrc}
            alt=""
            width={520}
            height={305}
            sizes="92px"
            className="animate-flight-path h-auto w-full"
            draggable={false}
          />
        </div>

        {/* Dragon right */}
        <div
          className="pointer-events-none absolute z-[var(--layer-distant)] hidden select-none md:block"
          style={{
            top: "clamp(42px, 9vh, 108px)",
            left: "clamp(60%, 64vw, 68%)",
            width: "clamp(52px, 4.4vw, 86px)",
            ...dragonRightFlight,
          }}
        >
          <Image
            src={dragonRightSrc}
            alt=""
            width={520}
            height={257}
            sizes="86px"
            className="animate-flight-path h-auto w-full"
            draggable={false}
          />
        </div>

        {/* Cloud */}
        <div
          className="pointer-events-none absolute z-[var(--layer-distant)] hidden select-none md:block"
          style={{
            top: "clamp(36px, 7vh, 88px)",
            left: "34%",
            width: "clamp(74px, 6vw, 112px)",
            opacity: 0.75,
            ...cloudDrift,
          }}
        >
          <Image
            src={cloudSrc}
            alt=""
            width={228}
            height={120}
            sizes="112px"
            className="animate-cloud-drift h-auto w-full"
            draggable={false}
          />
        </div>

        <Navbar />

        <Messenger
          className="bottom-0 left-2 sm:left-3 md:left-4 lg:left-5 xl:left-7 z-[var(--layer-character)] w-[135px] sm:w-[190px] md:w-[210px] lg:w-[250px] xl:w-[290px]"
          message="SAME CITY. NEW PLAYGROUND."
        />

        {/* ═══ Central composition ═════════════════════════════════════════════
            The flex column is vertically centred inside a min-h-screen container.
            Bottom padding is sized to keep the composition above the Messenger
            character that sits at bottom-0. Top padding clears the Navbar.
            Both use clamp() so the clearance scales with viewport height rather
            than snapping between fixed px breakpoints.
        ════════════════════════════════════════════════════════════════════════ */}
        <div
          className="container-enliven relative z-[var(--layer-content)] flex flex-col items-center justify-center text-center"
          style={{
            minHeight: "100svh",
            paddingTop: "clamp(72px, 10vh, 120px)",
            paddingBottom: "clamp(160px, 22vh, 240px)",
          }}
        >
          <RevealOnLoad className="flex w-full flex-col items-center">
            {/*
              Geometric emblem.
              Height is set in px via h-[...] so the 546×897 aspect ratio is
              always respected. Margin-bottom is tightened vs. the previous
              implementation to visually connect emblem to wordmark.
            */}
            <Image
              src={emblemSrc}
              alt=""
              priority
              width={546}
              height={897}
              sizes="(min-width: 1440px) 108px, (min-width: 1024px) 94px, (min-width: 640px) 82px, 70px"
              style={emblemFloat}
              className="animate-idle-float mb-1 sm:mb-1.5 lg:mb-2 h-[70px] w-auto sm:h-[82px] lg:h-[94px] xl:h-[108px]"
            />

            {/* ENLIVEN wordmark */}
            <Image
              src={wordmarkSrc}
              alt="ENLIVEN"
              priority
              width={675}
              height={173}
              sizes="(min-width: 1440px) 620px, (min-width: 1024px) 510px, (min-width: 640px) 400px, 268px"
              className="relative z-10 mb-3 sm:mb-4 lg:mb-5 w-full max-w-[268px] sm:max-w-[400px] lg:max-w-[510px] xl:max-w-[620px]"
            />

            {/*
              Central floating platform + registration buttons.

              The platform artwork (1400×496) shows a wide floating mountain.
              Its visible upper ledge is at approximately 28% from the image top.
              The button row uses `top-[28%]` on the absolute container so it
              rides on that surface at every width.

              Platform width grows wider than the wordmark max-width because the
              rock base should feel like it extends horizontally beyond the text —
              this is intentional for depth/grounding.

              A separate animationDelay (-2.8s) means it's never in sync with
              the emblem above it.
            */}
            <div
              style={platformFloat}
              className="animate-idle-float relative w-full max-w-[300px] sm:max-w-[460px] lg:max-w-[590px] xl:max-w-[700px]"
            >
              <Image
                src={floatingPlatformSrc}
                alt=""
                priority
                width={1400}
                height={496}
                sizes="(min-width: 1440px) 700px, (min-width: 1024px) 590px, (min-width: 640px) 460px, 300px"
                className="h-auto w-full select-none pointer-events-none"
                draggable={false}
              />
              {/* Buttons anchored to the platform upper surface */}
              <div className="absolute inset-x-0 top-[28%] flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-5 px-2 sm:px-4">
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

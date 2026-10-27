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
const heroBackgroundSrc = `${ASSET_BASE}/background/hero-background.webp`;
const floatingPlatformSrc = `${ASSET_BASE}/environment/floating-platform.webp`;
const rocketBusSrc = `${ASSET_BASE}/environment/rocket-bus.webp`;
const dragonLeftSrc = `${ASSET_BASE}/environment/dragon-left.webp`;
const dragonRightSrc = `${ASSET_BASE}/environment/dragon-right.webp`;
const cloudSrc = `${ASSET_BASE}/environment/cloud.webp`;
const plateDevpostSrc = `${ASSET_BASE}/ui/devpost-plate.webp`;
const plateUnstopSrc = `${ASSET_BASE}/ui/unstop-plate.webp`;

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

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EnvironmentScene className="min-h-screen">
        <EnvironmentBackground
          desktopSrc={heroBackgroundSrc}
          mobileSrc={heroBackgroundSrc}
          alt="A bright floating city at golden hour, with waterfalls, bridges, palm trees and floating islands"
        />

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

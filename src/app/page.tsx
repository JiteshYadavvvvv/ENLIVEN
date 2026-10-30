import Image from "next/image";
import type { CSSProperties } from "react";

import EnterButton from "@/components/environment/EnterButton";
import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
// Character is temporarily disabled for the GTA hero rebuild (see below).
// import Messenger from "@/components/environment/Messenger";
import RevealOnLoad from "@/components/environment/RevealOnLoad";
import Navbar from "@/components/layout/Navbar";

const HERO_BASE = "/assets/enliven-hero";
const backgroundDesktopSrc = `${HERO_BASE}/backgrounds/city-desktop-v1.webp`;
const backgroundMobileSrc = `${HERO_BASE}/backgrounds/city-mobile-v1.webp`;
const emblemSrc = `${HERO_BASE}/branding/enliven-emblem.webp`;
const carSrc = `${HERO_BASE}/vehicles/car.webp`;
const metroSrc = `${HERO_BASE}/vehicles/metro.webp`;
const rocketBusSrc = `${HERO_BASE}/vehicles/rocket-bus.webp`;

const ENTER_HREF = "/";

const emblemFloat = {
  "--float-distance": "-5px",
  "--float-duration": "6s",
} as CSSProperties;

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Positions are artwork pixels / percentages of the 1672x941 desktop
          art, or of its 706x941 portrait crop (x 495-1201). */}
      <EnvironmentScene className="hero-scene h-svh min-h-[32rem] [--art-h:941] [--art-w:1672] portrait:[--art-w:706]">
        <div className="hero-stage">
          <EnvironmentBackground
            desktopSrc={backgroundDesktopSrc}
            mobileSrc={backgroundMobileSrc}
            alt="A bright tropical coastal city at sunset with floating islands, palm-lined road, an elevated railway bridge and pink event banners"
          />

          <Image
            src={rocketBusSrc}
            alt=""
            width={249}
            height={123}
            sizes="(orientation: portrait) 40vw, 17vw"
            loading="eager"
            className="pointer-events-none absolute top-[16.9%] left-[66.75%] z-[var(--layer-ambient)] w-[14.89%] select-none portrait:top-[9%] portrait:left-[55%] portrait:w-[24%]"
            draggable={false}
          />

          <Image
            src={metroSrc}
            alt=""
            width={332}
            height={57}
            sizes="22vw"
            loading="eager"
            className="pointer-events-none absolute top-[66.63%] left-[75.54%] z-[var(--layer-ambient)] w-[19.86%] select-none portrait:hidden"
            draggable={false}
          />

          <Image
            src={carSrc}
            alt=""
            width={393}
            height={162}
            sizes="26vw"
            loading="eager"
            className="pointer-events-none absolute top-[72.37%] left-[4.49%] z-[var(--layer-scenery)] w-[23.5%] select-none portrait:hidden"
            draggable={false}
          />

          {/* Anchor = centre of the painted wordmark (849, 538); children
              are offset from it in artwork pixels (--a). */}
          <div className="absolute top-[57.17%] left-[50.78%] z-[var(--layer-content)] portrait:left-[50.14%]">
            <RevealOnLoad>
              <Image
                src={emblemSrc}
                alt=""
                loading="eager"
                width={546}
                height={897}
                sizes="(orientation: portrait) 30vw, 11vw"
                style={emblemFloat}
                className="animate-idle-float absolute top-[calc(var(--a)*-342)] left-[calc(var(--a)*-10)] w-[calc(var(--a)*165)] max-w-none -translate-x-1/2"
              />
              <h1 className="wordmark-enliven absolute top-[calc(var(--a)*-33)] left-0 -translate-x-1/2 -translate-y-1/2 text-[calc(var(--a)*189)] whitespace-nowrap">
                ENLIVEN
              </h1>
              <EnterButton
                href={ENTER_HREF}
                className="absolute top-[calc(var(--a)*58)] left-[calc(var(--a)*-174)] aspect-[347/98] w-[calc(var(--a)*347)] text-[calc(var(--a)*32)]"
              />
            </RevealOnLoad>
          </div>
        </div>

        <Navbar />

        {/* Character temporarily disabled for the GTA hero rebuild. The
            Messenger component and its assets are intact — restore by
            uncommenting this block and its import above.
        <Messenger
          className="bottom-0 left-2 sm:left-3 md:left-4 lg:left-5 xl:left-7 z-[var(--layer-character)] w-[135px] sm:w-[190px] md:w-[210px] lg:w-[250px] xl:w-[290px]"
          message="SAME CITY. NEW PLAYGROUND."
        />
        */}
      </EnvironmentScene>
    </main>
  );
}

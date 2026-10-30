import Image from "next/image";
import type { CSSProperties } from "react";

import EnterButton from "@/components/environment/EnterButton";
import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
// Character is temporarily disabled for the GTA hero rebuild (see below).
// import Messenger from "@/components/environment/Messenger";
import RevealOnLoad from "@/components/environment/RevealOnLoad";
import Navbar from "@/components/layout/Navbar";

const ASSET_BASE = "/assets/enliven-world";
const HERO_BASE = "/assets/enliven-hero";
const emblemSrc = `${ASSET_BASE}/branding/enliven-emblem.webp`;
const rocketBusSrc = `${ASSET_BASE}/environment/rocket-bus.webp`;

// Interim artwork: city-bright desktop/mobile from src/assets, with the
// desktop sky retouched clear of its painted airship and small craft. The
// production 3840x2160 / 1080x1920 renders with a clear road and rail bridge
// haven't been supplied yet. When they are, give them new filenames (image
// URLs are served `immutable`, so overwriting in place serves stale art),
// update the --art-ratio values on the scene below, and re-tune the
// stage-percentage positions (rocket bus, brand anchor) against the new art.
const backgroundDesktopSrc = `${HERO_BASE}/backgrounds/city-desktop-interim.webp`;
const backgroundMobileSrc = `${HERO_BASE}/backgrounds/city-mobile-interim.webp`;

const emblemFloat = {
  "--float-distance": "-5px",
  "--float-duration": "6s",
} as CSSProperties;

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* --art-ratio = background width / height (1672x941 landscape, 820x941 portrait) */}
      <EnvironmentScene className="hero-scene h-svh min-h-[32rem] [--art-ratio:1.7768] portrait:[--art-ratio:0.8714]">
        <div className="hero-stage">
          <EnvironmentBackground
            desktopSrc={backgroundDesktopSrc}
            mobileSrc={backgroundMobileSrc}
            alt="A tropical futuristic coastal city at sunset, with floating islands, waterfalls, event banners, palm trees and bridges over a turquoise bay"
          />

          {/* Rocket bus — upper-right sky, the patch retouched clear of the
              painting's own airship so the two never double up. */}
          <Image
            src={rocketBusSrc}
            alt=""
            width={700}
            height={294}
            sizes="(orientation: portrait) 50vw, 16vw"
            loading="eager"
            className="pointer-events-none absolute top-[19%] left-[66%] z-[var(--layer-ambient)] w-[14%] select-none portrait:top-[13%] portrait:left-[56%] portrait:w-[17%]"
            draggable={false}
          />

          {/* Branding hangs from the bridge line: its bottom edge (the CTA)
              sits at the deck, so it stays attached to the bridge as the
              stage crops at different aspect ratios. */}
          <div className="absolute inset-x-0 top-[64%] z-[var(--layer-content)] -translate-y-full portrait:top-[60%]">
            <RevealOnLoad className="flex flex-col items-center">
              <Image
                src={emblemSrc}
                alt=""
                priority
                width={546}
                height={897}
                sizes="(orientation: portrait) 18vw, 8vw"
                style={emblemFloat}
                className="hero-emblem animate-idle-float"
              />
              <h1 className="wordmark-enliven mt-[calc(var(--u)*-1)]">
                ENLIVEN
              </h1>
              <div className="mt-[calc(var(--u)*0.6)]">
                <EnterButton href="/" />
              </div>
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

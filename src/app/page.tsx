import Image from "next/image";
import type { CSSProperties } from "react";

import emblem from "@/assets/brand/enliven-logo.webp";
import wordmark from "@/assets/brand/enliven-wordmark.svg";
import cityWideDesktop from "@/assets/environment/background/city-wide-desktop.webp";
import cityWideMobile from "@/assets/environment/background/city-wide-mobile.webp";
import floatingPlatform from "@/assets/environment/midground/floating-platform.webp";
import plateDevpost from "@/assets/interface/plate-devpost.webp";
import plateUnstop from "@/assets/interface/plate-unstop.webp";
import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
import Messenger from "@/components/environment/Messenger";
import RegistrationPlate from "@/components/environment/RegistrationPlate";
import RevealOnLoad from "@/components/environment/RevealOnLoad";
import Navbar from "@/components/layout/Navbar";

const emblemFloat = {
  "--float-distance": "-5px",
  "--float-duration": "6s",
} as CSSProperties;

const platformFloat = {
  "--float-distance": "-8px",
  "--float-duration": "7s",
} as CSSProperties;

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EnvironmentScene className="min-h-screen">
        <EnvironmentBackground
          desktopSrc={cityWideDesktop}
          mobileSrc={cityWideMobile}
          alt="A bright floating city at golden hour, with waterfalls, bridges, palm trees, floating islands and an airship"
        />

        <Navbar />

        <Messenger className="bottom-0 left-[2%] z-[var(--layer-content)] w-[110px] sm:left-[4%] sm:w-[220px] lg:w-[300px] xl:w-[340px]" />

        <div className="container-enliven relative z-[var(--layer-content)] flex min-h-screen flex-col items-center justify-center gap-4 pt-20 pb-56 text-center sm:py-28">
          <RevealOnLoad className="flex w-full flex-col items-center">
            <Image
              src={emblem}
              alt=""
              priority
              style={emblemFloat}
              className="animate-idle-float h-24 w-auto sm:h-32"
            />
            <Image
              src={wordmark}
              alt="ENLIVEN"
              priority
              className="relative z-10 -mb-10 w-full max-w-lg sm:-mb-16 sm:max-w-3xl"
            />
            <div className="relative w-full max-w-sm lg:max-w-2xl">
              <Image
                src={floatingPlatform}
                alt=""
                style={platformFloat}
                className="animate-idle-float w-full"
              />
              <div className="absolute inset-x-0 top-[14%] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <RegistrationPlate
                  src={plateDevpost}
                  badge="D"
                  disabled
                  title="Devpost registration coming soon"
                  aria-label="Register on Devpost, coming soon"
                >
                  Devpost
                </RegistrationPlate>
                <RegistrationPlate
                  src={plateUnstop}
                  badge="U"
                  disabled
                  title="Unstop registration coming soon"
                  aria-label="Register on Unstop, coming soon"
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

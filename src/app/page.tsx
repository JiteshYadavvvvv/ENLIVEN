import Image from "next/image";

import emblem from "@/assets/brand/enliven-logo.webp";
import wordmark from "@/assets/brand/enliven-wordmark.svg";
import cityBrightDesktop from "@/assets/environment/background/city-bright-desktop.webp";
import cityBrightMobile from "@/assets/environment/background/city-bright-mobile.webp";
import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
import Messenger from "@/components/environment/Messenger";
import RevealOnLoad from "@/components/environment/RevealOnLoad";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EnvironmentScene className="min-h-screen">
        <EnvironmentBackground
          desktopSrc={cityBrightDesktop}
          mobileSrc={cityBrightMobile}
          alt="A bright floating city at golden hour, with waterfalls, bridges, palm trees, floating islands and an airship"
        />

        <Navbar />

        <Messenger className="bottom-0 left-[2%] z-[var(--layer-content)] w-[110px] sm:left-[4%] sm:w-[220px] lg:w-[300px] xl:w-[340px]" />

        <div className="container-enliven content-scrim relative z-[var(--layer-content)] flex min-h-screen flex-col items-center justify-center gap-4 pt-20 pb-56 text-center sm:gap-5 sm:py-28">
          <RevealOnLoad className="flex flex-col items-center gap-5">
            <SectionLabel>Edition 04 · GDG AIT Pune</SectionLabel>
            <Image
              src={emblem}
              alt=""
              priority
              className="h-16 w-auto sm:h-20"
            />
            <Image
              src={wordmark}
              alt="ENLIVEN"
              priority
              className="w-full max-w-md sm:max-w-xl"
            />
            <p className="max-w-md text-sm text-paper sm:text-base">
              Welcome to the floating city of Enliven 4. Registrations open soon
              — the missions, timeline, and sponsors are still taking shape.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                disabled
                title="Devpost registration coming soon"
                aria-label="Register on Devpost, coming soon"
              >
                Devpost
              </Button>
              <Button
                variant="secondary"
                disabled
                title="Unstop registration coming soon"
                aria-label="Register on Unstop, coming soon"
              >
                Unstop
              </Button>
            </div>
          </RevealOnLoad>
        </div>
      </EnvironmentScene>
    </main>
  );
}

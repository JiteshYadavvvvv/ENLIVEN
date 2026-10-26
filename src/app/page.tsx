import Image from "next/image";

import emblem from "@/assets/brand/enliven-logo.webp";
import wordmark from "@/assets/brand/enliven-wordmark.svg";
import cityBrightDesktop from "@/assets/environment/background/city-bright-desktop.webp";
import cityBrightMobile from "@/assets/environment/background/city-bright-mobile.webp";
import plateDevpost from "@/assets/interface/plate-devpost.webp";
import plateUnstop from "@/assets/interface/plate-unstop.webp";
import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
import Messenger from "@/components/environment/Messenger";
import RegistrationPlate from "@/components/environment/RegistrationPlate";
import RevealOnLoad from "@/components/environment/RevealOnLoad";
import Navbar from "@/components/layout/Navbar";

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

        <div className="container-enliven relative z-[var(--layer-content)] flex min-h-screen flex-col items-center justify-center gap-6 pt-20 pb-56 text-center sm:py-28">
          <RevealOnLoad className="flex flex-col items-center gap-6">
            <Image
              src={emblem}
              alt=""
              priority
              className="h-24 w-auto sm:h-32"
            />
            <Image
              src={wordmark}
              alt="ENLIVEN"
              priority
              className="w-full max-w-lg sm:max-w-3xl"
            />
            <div className="flex flex-wrap items-center justify-center gap-4">
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
          </RevealOnLoad>
        </div>
      </EnvironmentScene>
    </main>
  );
}

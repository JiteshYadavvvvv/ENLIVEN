import Image from "next/image";
import wordmark from "@/assets/brand/enliven-wordmark.svg";
import cityDuskDesktop from "@/assets/environment/background/city-dusk-desktop.webp";
import cityDuskMobile from "@/assets/environment/background/city-dusk-mobile.webp";
import palmTree from "@/assets/environment/foreground/palm-tree.svg";
import buildingSilhouette from "@/assets/environment/midground/building-silhouette.svg";
import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentProp from "@/components/environment/EnvironmentProp";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EnvironmentScene className="min-h-screen">
        <EnvironmentBackground
          desktopSrc={cityDuskDesktop}
          mobileSrc={cityDuskMobile}
          alt="Stylized night skyline fading into a magenta sunset horizon"
        />
        <EnvironmentProp
          src={buildingSilhouette}
          className="right-[4%] bottom-0 w-[110px] sm:right-[8%] sm:w-[160px] lg:w-[210px]"
          parallax={6}
        />
        <EnvironmentProp
          src={palmTree}
          className="left-[2%] bottom-0 w-[140px] sm:left-[5%] sm:w-[200px] lg:w-[260px]"
          parallax={14}
        />

        <div className="container-enliven relative z-[var(--layer-content)] flex min-h-screen flex-col items-center justify-center gap-6 py-24 text-center">
          <SectionLabel>Edition 04 · GDG AIT Pune</SectionLabel>
          <Image
            src={wordmark}
            alt="ENLIVEN"
            priority
            className="w-full max-w-md sm:max-w-xl"
          />
          <p className="max-w-md text-sm text-paper/70 sm:text-base">
            The visual foundation is live. Missions, timeline, and the full city
            are still in development.
          </p>
          <Divider />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary">Notify Me</Button>
            <Button variant="secondary">Explore Tracks</Button>
            <Button variant="ghost">Learn More</Button>
          </div>
        </div>
      </EnvironmentScene>
    </main>
  );
}

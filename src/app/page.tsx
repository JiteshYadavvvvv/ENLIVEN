import type { CSSProperties } from "react";

import EnvironmentBackground from "@/components/environment/EnvironmentBackground";
import EnvironmentScene from "@/components/environment/EnvironmentScene";
import HeroBranding from "@/components/environment/HeroBranding";
import HeroCloudBank from "@/components/environment/HeroCloudBank";
import { HERO_ART, HERO_LAYERS } from "@/components/environment/heroScene";
// Character is temporarily disabled for the GTA hero rebuild (see below).
// import Messenger from "@/components/environment/Messenger";
import { SceneImage } from "@/components/environment/SceneLayer";
import Navbar from "@/components/layout/Navbar";

const ENTER_HREF = "/";

const stageVars = {
  "--desk-w": HERO_ART.desktop.width,
  "--desk-h": HERO_ART.desktop.height,
  "--desk-crop-left": HERO_ART.desktop.cropLeftMax,
  "--mob-w": HERO_ART.mobile.width,
  "--mob-h": HERO_ART.mobile.height,
} as CSSProperties;

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <EnvironmentScene className="hero-scene h-svh min-h-[32rem]">
        <div className="hero-stage" style={stageVars}>
          <EnvironmentBackground
            desktopSrc={HERO_ART.desktop.src}
            mobileSrc={HERO_ART.mobile.src}
            alt="A bright tropical coastal city at sunset with a palm-lined road, an elevated railway bridge, waterfalls and a turquoise bay"
          />

          {HERO_LAYERS.map((layer) => (
            <SceneImage key={layer.id} layer={layer} />
          ))}

          <HeroCloudBank />

          <HeroBranding href={ENTER_HREF} />
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

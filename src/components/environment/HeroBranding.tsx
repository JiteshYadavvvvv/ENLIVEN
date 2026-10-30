import Image from "next/image";
import type { CSSProperties } from "react";

import EnterButton from "./EnterButton";
import { HERO_BRANDING } from "./heroScene";
import RevealOnLoad from "./RevealOnLoad";
import { SceneLayer } from "./SceneLayer";

const emblemFloat = {
  "--float-distance": "-5px",
  "--float-duration": "6s",
} as CSSProperties;

export default function HeroBranding({ href }: { href: string }) {
  return (
    <SceneLayer
      id="branding"
      z="var(--layer-content)"
      desktop={HERO_BRANDING.desktop}
      mobile={HERO_BRANDING.mobile}
      className="hero-branding pointer-events-auto -translate-x-1/2"
      style={{ "--mbs": HERO_BRANDING.mobileScale } as CSSProperties}
    >
      <RevealOnLoad className="flex flex-col items-center">
        <Image
          src={HERO_BRANDING.emblemSrc}
          alt=""
          width={546}
          height={897}
          sizes="(orientation: portrait) 24vw, 11vw"
          loading="eager"
          style={emblemFloat}
          className="animate-idle-float h-[calc(var(--b)*214)] w-auto max-w-none"
          draggable={false}
        />
        <h1 className="wordmark-enliven mt-[calc(var(--b)*-4)]">ENLIVEN</h1>
        <EnterButton
          href={href}
          imageSrc={HERO_BRANDING.cardSrc}
          className="mt-[calc(var(--b)*-2)] w-[calc(var(--b)*281)] text-[calc(var(--b)*26)]"
        />
      </RevealOnLoad>
    </SceneLayer>
  );
}

import type { CSSProperties } from "react";

import EnterButton from "./EnterButton";
import { HERO_BRANDING } from "./heroScene";
import RevealOnLoad from "./RevealOnLoad";
import { SceneLayer } from "./SceneLayer";

export default function HeroBranding({ href }: { href: string }) {
  return (
    <SceneLayer
      id="branding"
      z="var(--layer-content)"
      desktop={HERO_BRANDING.desktop}
      mobile={HERO_BRANDING.mobile}
      className="hero-branding pointer-events-auto -translate-x-1/2"
      style={
        {
          "--bs": HERO_BRANDING.desktopScale,
          "--mbs": HERO_BRANDING.mobileScale,
        } as CSSProperties
      }
    >
      <RevealOnLoad className="relative flex flex-col items-center">
        <h1 className="wordmark-enliven">
          ENLIVEN
          <span className="sr-only">
            {" "}
            4 — Flagship Technology Event by GDG AIT Pune
          </span>
        </h1>
        <EnterButton
          href={href}
          imageSrc={HERO_BRANDING.cardSrc}
          className="mt-[calc(var(--b)*-2)] w-[calc(var(--b)*281)] text-[calc(var(--b)*26)]"
        />
      </RevealOnLoad>
    </SceneLayer>
  );
}

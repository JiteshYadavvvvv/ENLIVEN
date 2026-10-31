import Image from "next/image";
import type { CSSProperties } from "react";

import { HERO_BRANDING, METRO_TRACK } from "./heroScene";

export default function MetroTrack() {
  return (
    <div
      className="metro-track"
      style={{ "--bs": HERO_BRANDING.desktopScale } as CSSProperties}
      aria-hidden
    >
      <div className="metro-train">
        <Image
          src={METRO_TRACK.src}
          alt=""
          width={METRO_TRACK.width}
          height={METRO_TRACK.height}
          sizes="25vw"
          loading="eager"
          draggable={false}
        />
      </div>
    </div>
  );
}

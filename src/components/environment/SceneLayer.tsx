import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import {
  type ArtSize,
  HERO_ART,
  type HeroLayer,
  type Placement,
} from "./heroScene";

const percent = (value: number, total: number) =>
  `${+((value / total) * 100).toFixed(3)}%`;

function anchoredLeft(placement: Placement, art: ArtSize) {
  if ("x" in placement) return percent(placement.x, art.width);
  if ("vx" in placement)
    return `calc(var(--view-left) + ${placement.vx * 100}cqw)`;
  return `calc(var(--view-left) + ${(1 - placement.vr) * 100}cqw - ${percent(placement.w, art.width)})`;
}

function left(placement: Placement, art: ArtSize) {
  const anchored = anchoredLeft(placement, art);
  if (placement.minFromCenter === undefined) return anchored;
  return `max(${anchored}, calc(var(--view-left) + 50cqw + ${placement.minFromCenter} * var(--a)))`;
}

function top(placement: Placement, art: ArtSize) {
  if ("y" in placement) return percent(placement.y, art.height);
  return `calc(var(--view-top) + ${placement.vy * 100}cqh)`;
}

function placementVars(
  placement: Placement,
  art: ArtSize,
  prefix: "" | "m",
): Record<string, string> {
  return {
    [`--${prefix}x`]: left(placement, art),
    [`--${prefix}y`]: top(placement, art),
    ...(placement.w !== undefined && {
      [`--${prefix}w`]: percent(placement.w, art.width),
    }),
    [`--${prefix}r`]: `${placement.rotate ?? 0}deg`,
  };
}

type SceneLayerProps = {
  id: string;
  z: string;
  desktop: Placement;
  mobile?: Placement;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function SceneLayer({
  id,
  z,
  desktop,
  mobile,
  className = "",
  style,
  children,
}: SceneLayerProps) {
  return (
    <div
      data-layer={id}
      data-portrait={mobile ? undefined : "hidden"}
      className={`scene-layer ${className}`}
      style={
        {
          zIndex: z,
          ...placementVars(desktop, HERO_ART.desktop, ""),
          ...(mobile && placementVars(mobile, HERO_ART.mobile, "m")),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

function sizes({ desktop, mobile }: HeroLayer) {
  const vw = (w: number | undefined, art: ArtSize, stageRatio: number) =>
    `${Math.ceil(((w ?? art.width) / art.width) * stageRatio * 100)}vw`;
  const desktopSize = vw(desktop.w, HERO_ART.desktop, 1.25);
  return mobile
    ? `(orientation: portrait) ${vw(mobile.w, HERO_ART.mobile, 1.4)}, ${desktopSize}`
    : desktopSize;
}

export function SceneImage({ layer }: { layer: HeroLayer }) {
  return (
    <SceneLayer
      id={layer.id}
      z={layer.z}
      className={layer.className}
      desktop={layer.desktop}
      mobile={layer.mobile}
    >
      <Image
        src={layer.src}
        alt=""
        width={layer.width}
        height={layer.height}
        sizes={sizes(layer)}
        loading="eager"
        draggable={false}
      />
    </SceneLayer>
  );
}

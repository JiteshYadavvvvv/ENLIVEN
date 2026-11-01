import type { CSSProperties, ReactNode } from "react";

export type BillboardSize = "marquee" | "billboard" | "lease" | "lightbox";

const LAMP_COUNT: Record<BillboardSize, number> = {
  marquee: 3,
  billboard: 2,
  lease: 3,
  lightbox: 2,
};

type BillboardProps = {
  label: string;
  size: BillboardSize;
  side?: "left" | "center" | "right";
  cue?: { from: number; span: number };
  lit?: boolean;
  children: ReactNode;
};

export default function Billboard({
  label,
  size,
  side = "center",
  cue,
  lit,
  children,
}: BillboardProps) {
  const timing = cue
    ? ({ "--from": cue.from, "--span": cue.span } as CSSProperties)
    : undefined;

  return (
    <div
      className="billboard"
      data-size={size}
      data-side={side}
      data-mode={cue ? "scroll" : "view"}
      data-lit={lit}
      style={timing}
    >
      <p className="billboard-plaque">{label}</p>
      <div className="billboard-frame">
        <div className="billboard-face">
          <span aria-hidden className="billboard-shade" />
          <span aria-hidden className="billboard-glow" />
          {children}
        </div>
        <div aria-hidden className="billboard-lamps">
          {Array.from({ length: LAMP_COUNT[size] }, (_, index) => (
            <span
              key={`lamp-${index * 3}`}
              className="billboard-lamp"
              style={{ "--k": index } as CSSProperties}
            >
              <span className="billboard-beam" />
            </span>
          ))}
        </div>
      </div>
      <span aria-hidden className="billboard-catwalk" />
      <span aria-hidden className="billboard-pylons" />
    </div>
  );
}

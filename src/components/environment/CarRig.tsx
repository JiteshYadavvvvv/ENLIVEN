import Image from "next/image";

import { CAR_RIG } from "./heroScene";
import { SceneLayer } from "./SceneLayer";

const EXHAUSTS = [
  { side: "left", x: 32 },
  { side: "right", x: 69 },
];

const PUFFS = [0, 1, 2, 3];

export default function CarRig() {
  return (
    <SceneLayer
      id="car"
      z="var(--layer-transit)"
      desktop={CAR_RIG.desktop}
      mobile={CAR_RIG.mobile}
      className="car-rig"
    >
      <span className="car-shadow" aria-hidden />
      <div className="car-body">
        <Image
          src={CAR_RIG.src}
          alt=""
          width={CAR_RIG.width}
          height={CAR_RIG.height}
          sizes="(orientation: portrait) 90vw, 35vw"
          loading="eager"
          draggable={false}
        />
        {EXHAUSTS.map((exhaust) => (
          <span
            key={exhaust.side}
            className="exhaust"
            data-side={exhaust.side}
            style={{ left: `${exhaust.x}%` }}
            aria-hidden
          >
            <span className="exhaust-glow" />
            {PUFFS.map((puff) => (
              <span
                key={puff}
                className="exhaust-puff"
                style={{ animationDelay: `${puff * -0.4}s` }}
              />
            ))}
          </span>
        ))}
      </div>
    </SceneLayer>
  );
}

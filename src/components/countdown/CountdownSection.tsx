import Image from "next/image";

import { EVENT } from "@/content/event";

import CloudGate from "./CloudGate";
import SkySignal from "./SkySignal";
import "./countdown.css";

const ASSETS = "/assets/enliven-countdown";

const launchFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function launchLabel(startsAt: string) {
  const parts = Object.fromEntries(
    launchFormat
      .formatToParts(new Date(startsAt))
      .map((part) => [part.type, part.value]),
  );
  return `${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute} IST`;
}

const ATMOSPHERE = [
  { id: "horizon-haze", src: "cloud-haze.webp", width: 2400, height: 360 },
  { id: "distant-left", src: "cloud-dusk.webp", width: 796, height: 301 },
  { id: "distant-right", src: "cloud-dusk.webp", width: 796, height: 301 },
  { id: "castle-left", src: "cloud-sunlit-b.webp", width: 1458, height: 778 },
  { id: "castle-right", src: "cloud-sunlit-a.webp", width: 1500, height: 852 },
  { id: "terrace-wisp", src: "cloud-wisp.webp", width: 1800, height: 300 },
  { id: "terrace-bank", src: "cloud-sunlit-a.webp", width: 1500, height: 852 },
];

export default function CountdownSection() {
  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="overlook"
    >
      <picture className="overlook-backdrop">
        <source
          media="(orientation: landscape)"
          srcSet={`${ASSETS}/backgrounds/overlook-desktop-v1.webp`}
        />
        <img
          src={`${ASSETS}/backgrounds/overlook-mobile-v1.webp`}
          alt="A sunset bay seen from a palm-lined terrace, with a skyline, a suspension bridge and floating castles over the water"
          loading="lazy"
          draggable={false}
        />
      </picture>

      <div className="overlook-atmosphere" aria-hidden>
        {ATMOSPHERE.map((cloud) => (
          <Image
            key={cloud.id}
            src={`${ASSETS}/clouds/${cloud.src}`}
            alt=""
            width={cloud.width}
            height={cloud.height}
            sizes="50vw"
            className={`atmosphere-cloud atmosphere-${cloud.id}`}
          />
        ))}
      </div>

      <CloudGate />

      <div className="overlook-content">
        <p className="signal-kicker">Skyline signal</p>
        <SkySignal startsAt={EVENT.startsAt} />
        <dl className="overlook-manifest">
          <div>
            <dt>Event</dt>
            <dd>{EVENT.edition}</dd>
          </div>
          <div>
            <dt>Hosted by</dt>
            <dd>{EVENT.host}</dd>
          </div>
          <div>
            <dt>Launch</dt>
            <dd>{launchLabel(EVENT.startsAt)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

import { EVENT } from "@/content/event";

import CloudGate from "./CloudGate";
import DepartureBoard from "./DepartureBoard";
import "./countdown.css";

const departureFormat = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function departureLabel(startsAt: string) {
  const parts = Object.fromEntries(
    departureFormat
      .formatToParts(new Date(startsAt))
      .map((part) => [part.type, part.value]),
  );
  return `${parts.day} ${parts.month} ${parts.year} · ${parts.hour}:${parts.minute} IST`;
}

export default function CountdownSection() {
  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="countdown"
    >
      <div aria-hidden className="grain-overlay" />
      <CloudGate />
      <div className="countdown-inner">
        <p className="mission-tag">
          <span>Mission 04</span>
          Launch sequence
        </p>
        <h2 id="countdown-title" className="countdown-title">
          The city goes live in
        </h2>
        <DepartureBoard
          line={EVENT.line}
          origin={EVENT.host}
          startsAt={EVENT.startsAt}
          departs={departureLabel(EVENT.startsAt)}
        />
      </div>
    </section>
  );
}

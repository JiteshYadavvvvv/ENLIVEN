"use client";

import { useSyncExternalStore } from "react";

import FlapDigit from "./FlapDigit";

type BoardProps = {
  line: string;
  origin: string;
  startsAt: string;
  departs: string;
};

const subscribe = (tick: () => void) => {
  const timer = window.setInterval(tick, 1000);
  return () => window.clearInterval(timer);
};

const readClock = () => Math.floor(Date.now() / 1000);

const serverClock = () => null;

function splitRemaining(seconds: number) {
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function boardStatus(remaining: number | null) {
  if (remaining === null) return { key: "idle", label: "Syncing" };
  if (remaining === 0) return { key: "live", label: "Now live" };
  if (remaining <= 7 * 86400) return { key: "boarding", label: "Boarding" };
  return { key: "scheduled", label: "On schedule" };
}

export default function DepartureBoard({
  line,
  origin,
  startsAt,
  departs,
}: BoardProps) {
  const now = useSyncExternalStore(subscribe, readClock, serverClock);
  const launch = Math.floor(Date.parse(startsAt) / 1000);
  const remaining = now === null ? null : Math.max(0, launch - now);
  const time = remaining === null ? null : splitRemaining(remaining);
  const status = boardStatus(remaining);

  const units = [
    {
      label: "Days",
      digits: time
        ? String(time.days).padStart(time.days > 99 ? 3 : 2, "0")
        : "---",
    },
    { label: "Hrs", digits: time ? String(time.hours).padStart(2, "0") : "--" },
    {
      label: "Min",
      digits: time ? String(time.minutes).padStart(2, "0") : "--",
    },
    {
      label: "Sec",
      digits: time ? String(time.seconds).padStart(2, "0") : "--",
    },
  ];

  const spoken = time
    ? `${time.days} days, ${time.hours} hours and ${time.minutes} minutes to go`
    : "Countdown loading";

  return (
    <div className="mission-board" data-status={status.key}>
      <div className="board-header">
        <span className="board-line">{line}</span>
        <span className="board-route">Next departure</span>
        <span className="board-lamp" aria-hidden />
      </div>

      <div className="board-units" role="timer" aria-label={spoken}>
        {units.map((unit) => (
          <div key={unit.label} className="board-unit">
            <div className="board-digits">
              {[...unit.digits].map((digit, index) => (
                <FlapDigit key={`${unit.label}-${index}`} value={digit} />
              ))}
            </div>
            <span className="board-unit-label">{unit.label}</span>
          </div>
        ))}
      </div>

      <dl className="board-manifest">
        <div>
          <dt>From</dt>
          <dd>{origin}</dd>
        </div>
        <div>
          <dt>Departs</dt>
          <dd>{departs}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className="board-status">{status.label}</dd>
        </div>
      </dl>
    </div>
  );
}

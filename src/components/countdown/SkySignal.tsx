"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import DroneDigit from "./DroneDigit";

const subscribe = (tick: () => void) => {
  const timer = window.setInterval(tick, 250);
  return () => window.clearInterval(timer);
};

const readClock = () => Math.floor(Date.now() / 1000);

const serverClock = () => null;

const pad = (value: number, size = 2) => String(value).padStart(size, "0");

function splitRemaining(seconds: number) {
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function useFlightWindow() {
  const signalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const signal = signalRef.current;
    if (!signal) return;
    const watcher = new IntersectionObserver(([entry]) =>
      signal.toggleAttribute("data-flying", entry.isIntersecting),
    );
    watcher.observe(signal);
    return () => watcher.disconnect();
  }, []);

  return signalRef;
}

export default function SkySignal({ startsAt }: { startsAt: string }) {
  const signalRef = useFlightWindow();
  const now = useSyncExternalStore(subscribe, readClock, serverClock);
  const launch = Math.floor(Date.parse(startsAt) / 1000);
  const remaining = now === null ? null : Math.max(0, launch - now);
  const time = remaining === null ? null : splitRemaining(remaining);
  const live = remaining === 0;

  const units = [
    {
      label: "Days",
      pace: "steady",
      digits: time ? pad(time.days, time.days > 99 ? 3 : 2) : "--",
    },
    { label: "Hours", pace: "steady", digits: time ? pad(time.hours) : "--" },
    {
      label: "Minutes",
      pace: "steady",
      digits: time ? pad(time.minutes) : "--",
    },
    {
      label: "Seconds",
      pace: "quick",
      digits: time ? pad(time.seconds) : "--",
    },
  ];

  const spoken = live
    ? "ENLIVEN is live now"
    : time
      ? `${time.days} days, ${time.hours} hours and ${time.minutes} minutes to go`
      : "Countdown loading";

  return (
    <div ref={signalRef} className="sky-signal" data-live={live || undefined}>
      <h2 id="countdown-title" className="signal-title">
        {live ? "The city is live" : "The city goes live in"}
      </h2>
      <div className="signal-glow" aria-hidden />
      <div className="signal-units" role="timer" aria-label={spoken}>
        {units.map((unit) => (
          <div key={unit.label} className="signal-unit" data-pace={unit.pace}>
            <div className="signal-digits">
              {[...unit.digits].map((digit, index) => (
                <DroneDigit key={`${unit.label}-${index}`} value={digit} />
              ))}
            </div>
            <span className="signal-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { MotionConfig, motion } from "motion/react";
import { type CSSProperties, useSyncExternalStore } from "react";
import { FiLock } from "react-icons/fi";

import type { Milestone } from "@/content/timeline";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

type StageStatus = "locked" | "cleared" | "next" | "ahead";

const STAGE_DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

const subscribe = (tick: () => void) => {
  const timer = window.setInterval(tick, 60_000);
  return () => window.clearInterval(timer);
};

const readMinute = () => Math.floor(Date.now() / 60_000);

const serverMinute = () => null;

function stageStatuses(milestones: Milestone[], minute: number | null) {
  const now = minute === null ? null : minute * 60_000;
  let nextMarked = false;
  return milestones.map((milestone): StageStatus => {
    if (!milestone.title || !milestone.startsAt) return "locked";
    if (now === null) return "ahead";
    if (Date.parse(milestone.startsAt) <= now) return "cleared";
    if (nextMarked) return "ahead";
    nextMarked = true;
    return "next";
  });
}

function routeProgress(statuses: StageStatus[]) {
  const lastCleared = statuses.lastIndexOf("cleared");
  if (lastCleared < 0 || statuses.length < 2) return 0;
  return lastCleared / (statuses.length - 1);
}

export default function MissionRoute({
  milestones,
}: {
  milestones: Milestone[];
}) {
  const minute = useSyncExternalStore(subscribe, readMinute, serverMinute);
  const still = usePrefersReducedMotion();
  const statuses = stageStatuses(milestones, minute);
  const routeStyle = {
    "--stops": milestones.length,
    "--progress": routeProgress(statuses),
  } as CSSProperties;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mission-route" style={routeStyle}>
        <motion.div
          aria-hidden
          className="mission-rail"
          initial={{ "--rail-drawn": 0 }}
          whileInView={{ "--rail-drawn": 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: still ? 0 : 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className="mission-rail-progress" />
        </motion.div>

        <ol className="mission-stops">
          {milestones.map((milestone, index) => {
            const status = statuses[index];
            const date = milestone.startsAt
              ? `${STAGE_DATE.format(new Date(milestone.startsAt))} IST`
              : "Date to be announced";

            return (
              <motion.li
                key={milestone.id}
                className="mission-stop"
                data-status={status}
                data-side={index % 2 === 0 ? "high" : "low"}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: still ? 0 : 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="mission-badge" aria-hidden>
                  <span className="mission-hex">
                    <span>{index + 1}</span>
                  </span>
                </span>
                <div className="mission-brief">
                  <h3 className="mission-brief-title">
                    {status === "locked" && <FiLock aria-hidden />}
                    {milestone.title ?? "Classified"}
                  </h3>
                  <p className="mission-brief-date">{date}</p>
                  {milestone.details && (
                    <p className="mission-brief-note">{milestone.details}</p>
                  )}
                  {status === "next" && (
                    <span className="sr-only">Next stage</span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </MotionConfig>
  );
}

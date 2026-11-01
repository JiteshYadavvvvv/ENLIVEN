export type CheckpointSigil =
  | "unlock"
  | "deadline"
  | "announce"
  | "mission"
  | "finish";

export type CheckpointSchedule =
  | { daysBeforeEvent: number }
  | "event-day"
  | "results";

export type Checkpoint = {
  id: string;
  title: string;
  description: string | null;
  schedule: CheckpointSchedule;
  sigil: CheckpointSigil;
};

export const TIMELINE: Checkpoint[] = [
  {
    id: "registration-opens",
    title: "Registration Opens",
    description: null,
    schedule: { daysBeforeEvent: 100 },
    sigil: "unlock",
  },
  {
    id: "registration-closes",
    title: "Registration Closes",
    description: null,
    schedule: { daysBeforeEvent: 50 },
    sigil: "deadline",
  },
  {
    id: "teams-announced",
    title: "Selected Teams Announced",
    description: null,
    schedule: { daysBeforeEvent: 40 },
    sigil: "announce",
  },
  {
    id: "event-day",
    title: "Event Day",
    description: null,
    schedule: "event-day",
    sigil: "mission",
  },
  {
    id: "results",
    title: "Results Announced",
    description: null,
    schedule: "results",
    sigil: "finish",
  },
];

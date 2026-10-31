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
    description: "100 days before the event",
    schedule: { daysBeforeEvent: 100 },
    sigil: "unlock",
  },
  {
    id: "registration-closes",
    title: "Registration Closes",
    description: "50 days before the event",
    schedule: { daysBeforeEvent: 50 },
    sigil: "deadline",
  },
  {
    id: "teams-announced",
    title: "Selected Teams Announced",
    description: "40 days before the event",
    schedule: { daysBeforeEvent: 40 },
    sigil: "announce",
  },
  {
    id: "event-day",
    title: "Event Day",
    description: "Format to be announced",
    schedule: "event-day",
    sigil: "mission",
  },
  {
    id: "results",
    title: "Results Announced",
    description: "After the event concludes",
    schedule: "results",
    sigil: "finish",
  },
];

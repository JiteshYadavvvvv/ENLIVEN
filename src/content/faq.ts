import { PRIZES } from "@/content/prizes";
import { TRACKS } from "@/content/tracks";

export type FaqCategoryId = "general" | "registration" | "stay";

export type FaqEntry = {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string | string[] | null;
};

export const FAQ_PENDING =
  "Further details will be announced through our official channels.";

export const FAQ_COPY = {
  title: "FAQs",
  intro: "Everything you need to know before you roll into ENLIVEN 4.",
};

export const FAQ_CATEGORIES: { id: FaqCategoryId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "registration", label: "Registration" },
  { id: "stay", label: "Stay & Travel" },
];

export const CONFIDENCE_POOL = {
  startingTokens: 100,
  pitchMinutes: "3–4",
  bullseyeWithin: 2,
  bullseyeMultiplier: 3,
  safeZoneFrom: 5,
  safeZoneTo: 10,
  unsettledRule:
    "How a miss of 3–4 points is settled will be confirmed in the official briefing.",
};

function listOf(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const [FIRST, SECOND, THIRD] = PRIZES.podium.map((prize) => prize.title);
const [STAGE_SPARK, VISION_SPARK] = PRIZES.sparkAwards.map(
  (award) => award.title,
);

const pool = CONFIDENCE_POOL;

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: "what-is-enliven",
    category: "general",
    question: "What is ENLIVEN 4?",
    answer:
      "ENLIVEN is the flagship tech event by Google Developer Groups, Army Institute of Technology, Pune. ENLIVEN 4 is its fourth edition.",
  },
  {
    id: "who-can-participate",
    category: "general",
    question: "Who can participate in ENLIVEN 4?",
    answer: null,
  },
  {
    id: "format",
    category: "general",
    question: "What is the event format?",
    answer: [
      `The Build & Pitch: each team gets ${pool.pitchMinutes} minutes on stage to present a working prototype or idea. Judges ask direct questions about its technical quality, originality, usefulness and market relevance.`,
      `The Confidence Pool: every team starts with ${pool.startingTokens} virtual tokens. After judging, the judges privately lock a score out of 100. Before it's revealed, each team predicts that score and chooses how many tokens to wager.`,
      `The Reveal: predict within ${pool.bullseyeWithin} points for a Bullseye and your wager returns ${pool.bullseyeMultiplier}x. Land ${pool.safeZoneFrom}–${pool.safeZoneTo} points away, the Safe Zone, and you get your wager back. Outside the winning zones, the wager is lost. ${pool.unsettledRule}`,
      "Final leaderboard: your total is the judges' score plus the tokens you finish with.",
      `${FIRST}, ${SECOND} and ${THIRD} go to the highest combined totals. ${VISION_SPARK} recognises exceptional originality and futuristic thinking, and ${STAGE_SPARK} recognises outstanding stage presence and performance under pressure. Both are judged independently of the overall ranking.`,
    ],
  },
  {
    id: "tracks",
    category: "general",
    question: "Which domains or tracks can participants explore?",
    answer: `ENLIVEN 4 has ${TRACKS.length} tracks: ${listOf(TRACKS.map((track) => track.name))}.`,
  },
  {
    id: "how-to-register",
    category: "registration",
    question: "How can I register?",
    answer: null,
  },
  {
    id: "mixed-colleges",
    category: "registration",
    question: "Can teammates belong to different colleges?",
    answer: null,
  },
  {
    id: "registration-fee",
    category: "registration",
    question: "Is there a registration fee?",
    answer: null,
  },
  {
    id: "team-size",
    category: "registration",
    question: "What is the team size requirement?",
    answer: null,
  },
  {
    id: "accommodation",
    category: "stay",
    question: "Will accommodation be provided?",
    answer: null,
  },
  {
    id: "food",
    category: "stay",
    question: "Will food or refreshments be available?",
    answer: null,
  },
  {
    id: "travel",
    category: "stay",
    question: "Are travel expenses covered?",
    answer: null,
  },
  {
    id: "venue",
    category: "stay",
    question: "Where will the event take place?",
    answer: null,
  },
];

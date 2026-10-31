export type TrackArt =
  | "health"
  | "arvr"
  | "edutech"
  | "gamedev"
  | "fintech"
  | "cybersec"
  | "blockchain"
  | "logistics"
  | "defence";

export type TrackPaint =
  | "cyan"
  | "violet"
  | "sunset"
  | "magenta"
  | "gold"
  | "midnight"
  | "coral"
  | "cobalt"
  | "olive";

export type TrackPanel = "feature" | "tall" | "wide" | "block" | "slim";

export type Track = {
  id: string;
  name: string;
  description: string | null;
  art: TrackArt;
  paint: TrackPaint;
  panel: TrackPanel;
};

export const TRACKS: Track[] = [
  {
    id: "health",
    name: "Health",
    description: null,
    art: "health",
    paint: "cyan",
    panel: "feature",
  },
  {
    id: "ar-vr",
    name: "AR/VR",
    description: null,
    art: "arvr",
    paint: "violet",
    panel: "tall",
  },
  {
    id: "edutech",
    name: "EduTech",
    description: null,
    art: "edutech",
    paint: "sunset",
    panel: "tall",
  },
  {
    id: "gamedev",
    name: "GameDev",
    description: null,
    art: "gamedev",
    paint: "magenta",
    panel: "wide",
  },
  {
    id: "fintech",
    name: "FinTech",
    description: null,
    art: "fintech",
    paint: "gold",
    panel: "block",
  },
  {
    id: "cybersec",
    name: "CyberSec",
    description: null,
    art: "cybersec",
    paint: "midnight",
    panel: "feature",
  },
  {
    id: "blockchain",
    name: "BlockChain",
    description: null,
    art: "blockchain",
    paint: "coral",
    panel: "tall",
  },
  {
    id: "logistics",
    name: "Logistics",
    description: null,
    art: "logistics",
    paint: "cobalt",
    panel: "feature",
  },
  {
    id: "defence",
    name: "Defence",
    description: null,
    art: "defence",
    paint: "olive",
    panel: "slim",
  },
];

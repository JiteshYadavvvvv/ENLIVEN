export type TrackAccent = "magenta" | "cyan" | "sunset" | "violet";

export type TrackEmblemShape = "circuit" | "orbit" | "shield" | "spark";

export type Track = {
  id: string;
  name: string | null;
  summary: string | null;
  focus: string[];
  accent: TrackAccent;
  emblem: TrackEmblemShape;
};

export const TRACKS: Track[] = [
  {
    id: "track-placeholder-1",
    name: null,
    summary: null,
    focus: [],
    accent: "magenta",
    emblem: "circuit",
  },
  {
    id: "track-placeholder-2",
    name: null,
    summary: null,
    focus: [],
    accent: "cyan",
    emblem: "orbit",
  },
  {
    id: "track-placeholder-3",
    name: null,
    summary: null,
    focus: [],
    accent: "sunset",
    emblem: "shield",
  },
  {
    id: "track-placeholder-4",
    name: null,
    summary: null,
    focus: [],
    accent: "violet",
    emblem: "spark",
  },
];

export type SponsorStage = "marquee" | "billboard" | "signboard";

export type SponsorCategoryId =
  | "title"
  | "powered"
  | "co-powered"
  | "associate"
  | "technology"
  | "education"
  | "community"
  | "media"
  | "other";

export type SponsorCategory = {
  id: SponsorCategoryId;
  label: string;
  stage: SponsorStage;
};

export type Sponsor = {
  name: string;
  category: SponsorCategoryId;
  logo: string;
  url?: string;
  order?: number;
  featured?: boolean;
  surface?: "light" | "dark";
};

export type SponsorLineup = {
  category: SponsorCategory;
  sponsors: Sponsor[];
};

export const SPONSOR_FORM_URL: string | null = null;

export const SPONSOR_CATEGORIES: SponsorCategory[] = [
  { id: "title", label: "Title Partner", stage: "marquee" },
  { id: "powered", label: "Powered By", stage: "billboard" },
  { id: "co-powered", label: "Co-Powered By", stage: "billboard" },
  { id: "associate", label: "Associate Partners", stage: "signboard" },
  { id: "technology", label: "Technology Partners", stage: "signboard" },
  { id: "education", label: "Education Partners", stage: "signboard" },
  { id: "community", label: "Community Partners", stage: "signboard" },
  { id: "media", label: "Media Partners", stage: "signboard" },
  { id: "other", label: "Partners", stage: "signboard" },
];

export const SPONSORS: Sponsor[] = [
  // {
  //   name: "Example Studio",
  //   category: "title",
  //   logo: "/assets/sponsors/example-studio.svg",
  //   url: "https://example.com",
  //   order: 1,
  // },
  // {
  //   name: "Example Cloud",
  //   category: "technology",
  //   logo: "/assets/sponsors/example-cloud.png",
  //   url: "https://example.com",
  //   order: 1,
  //   featured: true,
  // },
  // {
  //   name: "Example Media",
  //   category: "media",
  //   logo: "/assets/sponsors/example-media-white.webp",
  //   order: 2,
  //   surface: "dark",
  // },
];

export const SPONSOR_CALL = {
  title: "The Partners",
  plaque: "Space available",
  signPlaque: "Now leasing",
  gate: "Partners District",
  headline: "Put your brand in the world.",
  line: "Join ENLIVEN 4 and connect your brand with the next generation of builders, creators and innovators.",
  button: "Become a partner",
  pendingTitle: "Partner applications open soon",
  pendingMessage:
    "The ENLIVEN 4 partnership form isn't live yet. Check back here soon to put your brand in the world.",
  pendingClose: "Got it",
};

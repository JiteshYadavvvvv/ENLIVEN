export type SponsorshipContent = {
  headline: string;
  invitation: string;
  stageWords: string[];
  enquiry: { label: string; href: string | null; pendingLabel: string };
  brochure: { label: string; href: string | null };
};

export const SPONSORSHIP: SponsorshipContent = {
  headline: "Partner with ENLIVEN 4",
  invitation:
    "Take the stage with GDG AIT Pune and connect with the student and developer community.",
  stageWords: ["Your", "brand"],
  enquiry: {
    label: "Start a partnership",
    href: null,
    pendingLabel: "Sponsorship enquiries open soon",
  },
  brochure: { label: "Sponsorship brochure", href: null },
};

export type SponsorTier = {
  name: string;
  summary: string | null;
  perks: string[];
};

export type PartnerBrand = {
  name: string;
  href: string | null;
};

export type SponsorshipContent = {
  headline: { lead: string; accent: string };
  pitch: string;
  contract: {
    title: string;
    clauses: string[];
    organiserRole: string;
    partnerLine: string;
    partnerRole: string;
  };
  enquiry: { label: string; href: string | null; pendingLabel: string };
  brochure: { label: string; href: string | null };
  tiers: SponsorTier[];
  partners: PartnerBrand[];
};

export const SPONSORSHIP: SponsorshipContent = {
  headline: { lead: "Partner with", accent: "ENLIVEN 4" },
  pitch:
    "ENLIVEN is the flagship tech event by Google Developer Groups, Army Institute of Technology, Pune. Bring your brand into its fourth edition and connect with the student and developer community that drives it.",
  contract: {
    title: "Partnership agreement",
    clauses: [
      "Associate your brand with the flagship tech event by GDG AIT Pune.",
      "Connect with the student and developer community at ENLIVEN 4.",
      "Partnership tiers and benefits will be announced.",
    ],
    organiserRole: "GDG AIT Pune",
    partnerLine: "Your brand",
    partnerRole: "Partner",
  },
  enquiry: {
    label: "Start a partnership",
    href: null,
    pendingLabel: "Sponsorship enquiries open soon",
  },
  brochure: { label: "Sponsorship brochure", href: null },
  tiers: [],
  partners: [],
};

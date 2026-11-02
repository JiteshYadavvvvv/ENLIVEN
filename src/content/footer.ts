export type ContactPerson = {
  name: string;
  role?: string;
  phone?: string;
  whatsapp?: string;
  isPlaceholder?: boolean;
};

export type VenueConfig = {
  title: string;
  name: string;
  campus: string;
  city: string;
  coordinates: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  isConfigured: boolean;
};

export type FooterQuickLink = {
  label: string;
  href: string;
};

export type FooterSocialLink = {
  name: string;
  href: string;
  icon: "instagram" | "discord" | "twitter" | "linkedin" | "github" | "email";
};

export type FooterConfig = {
  /**
   * Configurable background image path.
   * Provide a string like "/assets/enliven-footer/skyline.webp" to display a custom artwork,
   * or keep null to display the procedural cinematic GTA city night atmosphere.
   */
  backgroundSrc: string | null;

  // Closing banner typography
  destinationKicker: string;
  headline: string;
  cityTag: string;
  tagline: string;

  // Venue & GPS Location
  venue: VenueConfig;

  // Two Organiser Contact Profiles (fill in when provided)
  contacts: [ContactPerson, ContactPerson];

  // Quick Navigation Links
  quickLinks: FooterQuickLink[];

  // Social Links
  socials: FooterSocialLink[];

  // Legal & Credits
  credits: {
    host: string;
    organization: string;
    codeOfConductUrl: string;
    copyright: string;
  };
};

export const FOOTER_CONFIG: FooterConfig = {
  backgroundSrc: null,

  destinationKicker: "FINAL DESTINATION // TERMINAL EN-04",
  headline: "THE LAST STOP",
  cityTag: "ENLIVEN CITY",
  tagline:
    "Where code meets the streets. Assemble your crew, lock in your pitch, and claim your legacy in the city.",

  venue: {
    title: "Mission Coordinates // Terminal GPS",
    name: "Army Institute of Technology",
    campus: "AIT Pune Campus, Dighi Hills",
    city: "Pune, Maharashtra 411015",
    coordinates: "18.6069° N, 73.8753° E",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2698970162237!2d73.87251157617055!3d18.606926382503538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c70090000001%3A0x160a20f3d0273495!2sArmy%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1763620455906!5m2!1sen!2sin",
    directionsUrl:
      "https://maps.google.com/?q=Army+Institute+of+Technology+Pune",
    isConfigured: true,
  },

  contacts: [
    {
      name: "Lead Organiser 01",
      role: "Event Operations & Logistics",
      phone: "",
      whatsapp: "",
      isPlaceholder: true,
    },
    {
      name: "Lead Organiser 02",
      role: "Participant Relations & Support",
      phone: "",
      whatsapp: "",
      isPlaceholder: true,
    },
  ],

  quickLinks: [
    { label: "Home", href: "#branding" },
    { label: "Prizes", href: "#prizes" },
    { label: "Tracks", href: "#tracks" },
    { label: "Timeline", href: "#timeline" },
    { label: "Sponsors", href: "#sponsor" },
    { label: "FAQs", href: "#faq" },
  ],

  socials: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/gdg_ait/",
      icon: "instagram",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/gdg-ait/",
      icon: "linkedin",
    },
    {
      name: "Discord",
      href: "https://discord.gg/rBrnsHZ6SA",
      icon: "discord",
    },
    {
      name: "X / Twitter",
      href: "https://x.com/gdg_ait",
      icon: "twitter",
    },
    {
      name: "GitHub",
      href: "https://github.com/aitoss",
      icon: "github",
    },
    {
      name: "Email",
      href: "mailto:enliven@aitpune.edu.in",
      icon: "email",
    },
  ],

  credits: {
    host: "Google Developer Groups (GDG)",
    organization: "Army Institute of Technology, Pune",
    codeOfConductUrl:
      "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
    copyright: "© 2026–2027 ENLIVEN 4. All rights reserved.",
  },
};

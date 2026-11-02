export type ContactPerson = {
  name: string;
  phone: string;
};

export type FooterSocialLink = {
  name: string;
  href: string;
  icon: "email" | "instagram" | "meta" | "github" | "linkedin";
};

export type FooterConfig = {
  background: {
    desktopSrc: string;
    mobileSrc: string;
  };
  contacts: [ContactPerson, ContactPerson];
  venue: {
    name: string;
    mapEmbedUrl: string;
  };
  socials: FooterSocialLink[];
  credit: string;
};

export const FOOTER_CONFIG: FooterConfig = {
  background: {
    desktopSrc: "/assets/enliven-footer/footer-bg-desktop.jpg",
    mobileSrc: "/assets/enliven-footer/footer-bg-mobile.jpg",
  },
  contacts: [
    {
      name: "Peush Yadav",
      phone: "+91 70153 43384",
    },
    {
      name: "Palak Kumari",
      phone: "+91 6387 314 945",
    },
  ],
  venue: {
    name: "Army Institute of Technology, Pune",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2698970162237!2d73.87251157617055!3d18.606926382503538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c70090000001%3A0x160a20f3d0273495!2sArmy%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1763620455906!5m2!1sen!2sin",
  },
  socials: [
    {
      name: "Email",
      href: "mailto:enliven@aitpune.edu.in",
      icon: "email",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/gdsc_aitpune/",
      icon: "instagram",
    },
    {
      name: "Meta",
      href: "https://www.facebook.com/groups/gdsc_aitpune/",
      icon: "meta",
    },
    {
      name: "GitHub",
      href: "https://github.com/GDG-AIT-PUNE",
      icon: "github",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/dsc_ait/",
      icon: "linkedin",
    },
  ],
  credit: "Made with ❤️ by GDG",
};

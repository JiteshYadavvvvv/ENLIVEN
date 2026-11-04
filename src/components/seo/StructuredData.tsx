/**
 * StructuredData — injects JSON-LD schema into <head> via Next.js script
 * rendering. Covers WebSite, Organization and Event entities so Google can
 * surface rich results for ENLIVEN 4.
 */
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://enlivenn.tech/#website",
        url: "https://enlivenn.tech/",
        name: "ENLIVEN 4",
        description:
          "Flagship technology event by Google Developer Groups, Army Institute of Technology, Pune.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://enlivenn.tech/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://enlivenn.tech/#organization",
        name: "GDG AIT Pune",
        alternateName:
          "Google Developer Groups, Army Institute of Technology, Pune",
        url: "https://enlivenn.tech/",
        email: "enliven@aitpune.edu.in",
        sameAs: [
          "https://www.instagram.com/gdsc_aitpune/",
          "https://github.com/GDG-AIT-PUNE",
          "https://www.linkedin.com/company/dsc_ait/",
          "https://www.facebook.com/groups/gdsc_aitpune/",
        ],
        logo: {
          "@type": "ImageObject",
          url: "https://enlivenn.tech/assets/enliven-world/branding/enliven-logo-lockup.webp",
        },
      },
      {
        "@type": "Event",
        "@id": "https://enlivenn.tech/#event",
        name: "ENLIVEN 4",
        description:
          "ENLIVEN 4 is the fourth edition of the flagship technology event organised by Google Developer Groups at Army Institute of Technology, Pune. Compete across nine innovation tracks including Health, AR/VR, EduTech, GameDev, FinTech, CyberSec, BlockChain, Logistics and Defence.",
        startDate: "2027-03-13T09:00:00+05:30",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Army Institute of Technology",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Dighi Hills",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            postalCode: "411015",
            addressCountry: "IN",
          },
        },
        organizer: {
          "@id": "https://enlivenn.tech/#organization",
        },
        url: "https://enlivenn.tech/",
        image: "https://enlivenn.tech/og-image.png",
        keywords:
          "ENLIVEN, ENLIVEN 4, GDG AIT Pune, hackathon, technology event, Pune",
      },
      {
        "@type": "FAQPage",
        "@id": "https://enlivenn.tech/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is ENLIVEN 4?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ENLIVEN is the flagship tech event by Google Developer Groups, Army Institute of Technology, Pune. ENLIVEN 4 is its fourth edition.",
            },
          },
          {
            "@type": "Question",
            name: "Which domains or tracks can participants explore?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ENLIVEN 4 features nine innovation tracks: Health, AR/VR, EduTech, GameDev, FinTech, CyberSec, BlockChain, Logistics, and Defence.",
            },
          },
          {
            "@type": "Question",
            name: "Where will the event take place?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ENLIVEN 4 will take place at Army Institute of Technology (AIT), Dighi Hills, Pune, Maharashtra 411015.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD schema
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

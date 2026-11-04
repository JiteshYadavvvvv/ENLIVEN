import type { Metadata, Viewport } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import { preload } from "react-dom";

import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import SmoothScrollProvider from "@/utils/SmoothScrollProvider";

// Bebas Neue is only the swap-period fallback for Pricedown (declared via
// @font-face in globals.css), so the layout doesn't jump to a system font
// while the GTA face loads. Its variable class goes on <html>: the theme's
// --font-display is declared on :root and references --font-bebas, and a
// var() that's undefined where it's declared invalidates the whole stack.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Must match the @font-face src URL in globals.css exactly, or the browser
// downloads the font twice.
const PRICEDOWN_SRC = "/fonts/pricedown/Pricedown%20Bl.otf";

export const metadata: Metadata = {
  metadataBase: new URL("https://enlivenn.tech"),

  title: {
    default: "ENLIVEN 4 | GDG AIT Pune — Flagship Technology Event",
    template: "%s | ENLIVEN 4",
  },
  description:
    "ENLIVEN 4 is the flagship technology event by Google Developer Groups at Army Institute of Technology, Pune. Explore nine innovation tracks, prizes and opportunities to build, compete and connect.",
  keywords: [
    "ENLIVEN",
    "ENLIVEN 4",
    "ENLIVEN AIT Pune",
    "ENLIVEN GDG",
    "GDG AIT Pune",
    "GDG AIT Pune ENLIVEN",
    "ENLIVEN technology event",
    "ENLIVEN hackathon Pune",
    "Google Developer Groups AIT",
    "Army Institute of Technology tech event",
  ],
  authors: [{ name: "GDG AIT Pune", url: "https://enlivenn.tech/" }],
  creator: "GDG AIT Pune",

  alternates: {
    canonical: "https://enlivenn.tech/",
  },

  openGraph: {
    title: "ENLIVEN 4 | GDG AIT Pune — Flagship Technology Event",
    description:
      "ENLIVEN 4 is the flagship technology event by Google Developer Groups at Army Institute of Technology, Pune. Nine innovation tracks. One epic destination.",
    url: "https://enlivenn.tech/",
    siteName: "ENLIVEN 4",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ENLIVEN 4 — Flagship Technology Event by GDG AIT Pune",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ENLIVEN 4 | GDG AIT Pune — Flagship Technology Event",
    description:
      "ENLIVEN 4 is the flagship technology event by GDG AIT Pune. Nine innovation tracks. One epic destination.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04050a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preload(PRICEDOWN_SRC, {
    as: "font",
    type: "font/otf",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlow.variable}`}>
      <body className="antialiased">
        <StructuredData />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

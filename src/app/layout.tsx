import type { Metadata, Viewport } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import { preload } from "react-dom";

import "./globals.css";
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
  title: "ENLIVEN",
  description:
    "ENLIVEN is the flagship tech event by Google Developer Groups, Army Institute of Technology, Pune. Enliven 4 marks its fourth edition.",
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
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import SmoothScrollProvider from "@/utils/SmoothScrollProvider";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// Pricedown (the GTA logo/UI typeface) integration point: no such font file
// exists anywhere in this project, and the Innerve reference doesn't use it
// either (it uses a local "Clash" font via next/font/local, loaded the same
// way this would be). Navbar/UI text currently falls back to Bebas Neue via
// the --font-display-gta CSS variable in globals.css. To activate the real
// font once a licensed file is supplied, add it to src/assets/fonts/ and
// uncomment:
//
// import localFont from "next/font/local";
// const pricedown = localFont({
//   src: "../assets/fonts/pricedown.woff2",
//   variable: "--font-pricedown",
//   weight: "400",
// });
//
// ...then add `${pricedown.variable}` to the body className below. No
// other code needs to change -- --font-display-gta already prefers
// --font-pricedown whenever it's defined.

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
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

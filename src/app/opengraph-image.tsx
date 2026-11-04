import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph image for ENLIVEN 4.
 * Served at /opengraph-image.png and referenced by the og:image meta tag.
 * Uses Pricedown (local OTF) for the GTA headline and Bebas Neue for the sub-line.
 */
export default async function OGImage() {
  const pricedownData = await readFile(
    path.join(process.cwd(), "public/fonts/pricedown/Pricedown Bl.otf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 60%, #2a1040 0%, #0d0718 55%, #04050a 100%)",
        fontFamily: "Pricedown, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid dots — decorative */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-80px",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(228,0,124,0.18)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-60px",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,200,0,0.14)",
          filter: "blur(70px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          zIndex: 1,
        }}
      >
        {/* GDG label */}
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#c084fc",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          GDG AIT PUNE PRESENTS
        </p>

        {/* ENLIVEN */}
        <p
          style={{
            fontFamily: "Pricedown",
            fontSize: 160,
            lineHeight: 0.9,
            color: "#ffc800",
            textShadow:
              "0 0 40px rgba(255,200,0,0.5), 4px 4px 0 #000, -2px -2px 0 #000",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          ENLIVEN
        </p>

        {/* Edition number */}
        <p
          style={{
            fontFamily: "Pricedown",
            fontSize: 72,
            lineHeight: 1,
            color: "#e4007c",
            textShadow: "3px 3px 0 #000, -1px -1px 0 #000",
            margin: 0,
            marginTop: 4,
            letterSpacing: "0.08em",
          }}
        >
          4
        </p>

        {/* Divider */}
        <div
          style={{
            width: 320,
            height: 3,
            background:
              "linear-gradient(to right, transparent, #ffc800, transparent)",
            margin: "24px 0",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.75)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          13 MARCH 2027 · ARMY INSTITUTE OF TECHNOLOGY, PUNE
        </p>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Pricedown",
          data: pricedownData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { type CSSProperties, useRef } from "react";

import { SPONSOR_CALL, type SponsorLineup } from "@/content/sponsorship";
import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

import Billboard from "./Billboard";
import PartnerCall from "./PartnerCall";
import SponsorLogo from "./SponsorLogo";

const BAY_SRC = "/assets/enliven-partners/partners-bay-v1.webp";
const BOARD_LEAD = 0.14;
const BOARD_STAGGER = 0.08;
const BOARD_SPAN = 0.42;

function boardSide(index: number, rooftop: SponsorLineup[]) {
  const marquee = rooftop.findIndex(
    (lineup) => lineup.category.stage === "marquee",
  );
  const center = marquee >= 0 ? marquee : (rooftop.length - 1) / 2;
  if (index < center) return "left";
  if (index > center) return "right";
  return "center";
}

function FacadeBanner({ side }: { side: "left" | "right" }) {
  return (
    <span aria-hidden className="facade-banner" data-side={side}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 4l5 15 15 5-15 5-5 15-5-15-15-5 15-5Z" />
      </svg>
    </span>
  );
}

export default function DistrictScene({
  rooftop,
}: {
  rooftop: SponsorLineup[];
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 80%", "end end"],
  });
  const headliners = rooftop.length > 0;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    sceneRef.current?.style.setProperty("--scroll", progress.toFixed(4));
  });

  return (
    <div
      ref={sceneRef}
      className="district-scene"
      data-headliners={headliners || undefined}
      style={{ "--scroll": still ? 1 : 0 } as CSSProperties}
    >
      <svg
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        className="district-horizon"
        aria-hidden="true"
      >
        <path
          d="M0 0H1600V100Q800 -60 0 100Z"
          className="district-horizon-night"
        />
        <path d="M0 100Q800 -60 1600 100" className="district-horizon-rim" />
      </svg>

      <div className="district-stage">
        <div aria-hidden className="district-backdrop">
          <Image src={BAY_SRC} alt="" fill sizes="100vw" draggable={false} />
        </div>
        <span aria-hidden className="district-dusk" />

        <h2 id="sponsor-title" className="district-title">
          {SPONSOR_CALL.title}
        </h2>

        <div className="district-rooftop">
          {headliners ? (
            rooftop.map((lineup, index) => {
              const size =
                lineup.category.stage === "marquee" ? "marquee" : "billboard";
              return (
                <Billboard
                  key={lineup.category.id}
                  label={lineup.category.label}
                  size={size}
                  side={boardSide(index, rooftop)}
                  cue={{
                    from: BOARD_LEAD + index * BOARD_STAGGER,
                    span: BOARD_SPAN,
                  }}
                >
                  <ul className="billboard-logos">
                    {lineup.sponsors.map((sponsor, logoIndex) => (
                      <SponsorLogo
                        key={sponsor.name}
                        sponsor={sponsor}
                        index={logoIndex}
                        sizes={
                          size === "marquee"
                            ? "(min-width: 48rem) 20rem, 70vw"
                            : "(min-width: 48rem) 12rem, 40vw"
                        }
                      />
                    ))}
                  </ul>
                </Billboard>
              );
            })
          ) : (
            <Billboard
              label={SPONSOR_CALL.plaque}
              size="lease"
              cue={{ from: BOARD_LEAD, span: 0.5 }}
            >
              <PartnerCall placement="billboard" />
            </Billboard>
          )}
        </div>

        <div className="district-facade">
          <FacadeBanner side="left" />
          <FacadeBanner side="right" />
          {headliners && (
            <div className="district-sign">
              <p className="district-sign-plaque">{SPONSOR_CALL.signPlaque}</p>
              <PartnerCall placement="sign" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

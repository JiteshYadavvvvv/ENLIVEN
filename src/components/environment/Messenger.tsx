"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { useParallax } from "@/utils/useParallax";

const MESSENGER_SRC = "/assets/enliven-world/character/hero-character.webp";

import SpeechBubble from "./SpeechBubble";

type MessengerProps = {
  className?: string;
  parallax?: number;
  message: string;
};

export default function Messenger({
  className = "",
  parallax = 8,
  message,
}: MessengerProps) {
  const offset = useParallax(parallax);

  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 300ms var(--ease-cinematic)",
      }}
    >
      <SpeechBubble className="absolute top-[22px] left-[39px] w-40 sm:top-[39px] sm:left-[71px] sm:w-56 lg:top-[52px] lg:left-[93px] lg:w-44 xl:top-[66px] xl:left-[40px] xl:w-[260px] min-[1400px]:top-[70px] min-[1400px]:left-[42px] min-[1400px]:w-[270px] 2xl:top-[76px] 2xl:left-[45px] 2xl:w-[320px]">
        {message}
      </SpeechBubble>
      <div
        className="animate-idle-float"
        style={
          {
            "--float-distance": "-3px",
            "--float-duration": "5s",
          } as CSSProperties
        }
      >
        <Image
          src={MESSENGER_SRC}
          alt=""
          priority
          width={900}
          height={1350}
          className="h-auto w-full"
          draggable={false}
        />
      </div>
    </div>
  );
}

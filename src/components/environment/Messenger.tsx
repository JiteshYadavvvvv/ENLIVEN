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
      className={`absolute select-none ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 300ms var(--ease-cinematic)",
      }}
    >
      <SpeechBubble className="absolute -top-2 left-[48%] z-10 w-[140px] sm:-top-3 sm:left-[50%] sm:w-[175px] lg:-top-4 lg:left-[52%] lg:w-[210px] xl:w-[230px]">
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
          alt="Enliven character in tropical shirt with sunglasses"
          priority
          width={900}
          height={1350}
          className="h-auto w-full select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

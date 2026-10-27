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
      <SpeechBubble className="absolute -top-6 left-[28px] w-32 sm:-top-8 sm:left-[55px] sm:w-48 lg:-top-10 lg:left-[70px] lg:w-36 xl:left-10 xl:w-[220px] min-[1400px]:left-16 min-[1400px]:w-[230px] 2xl:left-[90px] 2xl:w-[280px]">
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
          width={1300}
          height={1199}
          className="h-auto w-full"
          draggable={false}
        />
      </div>
    </div>
  );
}

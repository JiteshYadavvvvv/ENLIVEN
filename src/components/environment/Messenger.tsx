"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { useParallax } from "@/utils/useParallax";

const MESSENGER_SRC = "/assets/enliven-world/character/hero-character.webp";

import SpeechBubble from "./SpeechBubble";

type MessengerProps = {
  className?: string;
  parallax?: number;
};

export default function Messenger({
  className = "",
  parallax = 8,
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
      <SpeechBubble className="absolute -top-6 left-1 w-32 sm:-top-8 sm:left-2 sm:w-48 lg:-top-10 lg:left-0 lg:w-36 xl:w-[260px] min-[1400px]:w-[310px] 2xl:w-[335px]">
        Welcome to Enliven 4!
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

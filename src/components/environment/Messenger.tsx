"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import messenger from "@/assets/characters/messenger.webp";
import { useParallax } from "@/utils/useParallax";

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
      <SpeechBubble className="absolute -top-5 left-1 w-28 sm:left-2 sm:w-36 lg:-top-6 lg:left-0 lg:w-40">
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
          src={messenger}
          alt=""
          priority
          className="h-auto w-full"
          draggable={false}
        />
      </div>
    </div>
  );
}

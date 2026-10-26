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
      <SpeechBubble className="absolute -top-6 left-2 w-32 sm:left-6 sm:w-40 lg:-top-10 lg:left-8 lg:w-56">
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

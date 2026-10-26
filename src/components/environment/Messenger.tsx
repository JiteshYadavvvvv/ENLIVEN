"use client";

import Image from "next/image";

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
      <SpeechBubble className="absolute -top-6 left-2 w-36 sm:-top-10 sm:left-8 sm:w-56">
        Welcome to Enliven 4!
      </SpeechBubble>
      <Image
        src={messenger}
        alt=""
        priority
        className="h-auto w-full"
        draggable={false}
      />
    </div>
  );
}

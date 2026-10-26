"use client";

import Image, { type StaticImageData } from "next/image";

import { useParallax } from "@/utils/useParallax";

type EnvironmentPropProps = {
  src: StaticImageData;
  alt?: string;
  className: string;
  parallax?: number;
  priority?: boolean;
};

export default function EnvironmentProp({
  src,
  alt = "",
  className,
  parallax = 0,
  priority = false,
}: EnvironmentPropProps) {
  const offset = useParallax(parallax);

  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 300ms var(--ease-cinematic)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        className="h-auto w-full"
        draggable={false}
      />
    </div>
  );
}

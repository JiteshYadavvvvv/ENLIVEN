"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

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
  const prefersReducedMotion = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion || parallax === 0) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * parallax;
      const y = (event.clientY / window.innerHeight - 0.5) * parallax;
      setOffset({ x, y });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [prefersReducedMotion, parallax]);

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

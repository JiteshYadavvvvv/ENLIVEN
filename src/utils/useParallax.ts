"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

export function useParallax(strength: number) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion || strength === 0) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [prefersReducedMotion, strength]);

  return offset;
}

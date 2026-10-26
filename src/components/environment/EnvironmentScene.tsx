import type { ReactNode } from "react";

type EnvironmentSceneProps = {
  children: ReactNode;
  className?: string;
};

export default function EnvironmentScene({
  children,
  className = "",
}: EnvironmentSceneProps) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {children}
      <div aria-hidden className="overlay-cinematic" />
      <div aria-hidden className="grain-overlay" />
    </div>
  );
}

import type { ReactNode } from "react";

export default function SpeechBubble({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`speech-bubble ${className}`}>
      <p className="text-sm font-medium text-void">{children}</p>
    </div>
  );
}

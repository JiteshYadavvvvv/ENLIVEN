import Image from "next/image";

import bubble from "@/assets/interface/speech-bubble.webp";

export default function SpeechBubble({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image src={bubble} alt="" className="w-full" draggable={false} />
      <p className="absolute inset-x-[12%] top-[14%] text-center text-xs leading-tight font-bold text-[#3a2410] sm:text-sm">
        {children}
      </p>
    </div>
  );
}

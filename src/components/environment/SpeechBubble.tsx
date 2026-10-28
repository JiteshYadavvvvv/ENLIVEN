import Image from "next/image";

const MESSAGE_CARD_SRC = "/assets/enliven-world/messages/message-card.webp";

export default function SpeechBubble({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={MESSAGE_CARD_SRC}
        alt=""
        width={366}
        height={184}
        className="h-auto w-full select-none drop-shadow-md"
        draggable={false}
      />
      <p className="absolute inset-x-[11%] top-[17%] text-center text-[10px] font-bold tracking-wide text-[#3a2410] uppercase select-none leading-snug sm:text-xs lg:text-[13px]">
        {children}
      </p>
    </div>
  );
}

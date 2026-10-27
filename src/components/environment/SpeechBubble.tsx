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
        width={560}
        height={237}
        className="w-full"
        draggable={false}
      />
      <p className="absolute inset-x-[12%] top-[14%] text-center text-xs leading-tight font-bold text-[#3a2410] sm:text-sm">
        {children}
      </p>
    </div>
  );
}

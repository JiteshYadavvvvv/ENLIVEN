import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type EnterButtonProps = {
  href: string;
  imageSrc: string;
  className?: string;
};

export default function EnterButton({
  href,
  imageSrc,
  className = "",
}: EnterButtonProps) {
  return (
    <Link href={href} className={`enter-cta ${className}`}>
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(orientation: portrait) 50vw, 23vw"
        loading="eager"
        className="pointer-events-none select-none"
        draggable={false}
      />
      <span className="relative flex -rotate-3 items-center gap-[0.4em]">
        Enter Enliven
        <FiArrowRight aria-hidden className="shrink-0" />
      </span>
    </Link>
  );
}

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type EnterButtonProps = {
  href: string;
  className?: string;
};

export default function EnterButton({
  href,
  className = "",
}: EnterButtonProps) {
  return (
    <Link href={href} className={`enter-cta ${className}`}>
      <span className="flex -rotate-[2.5deg] items-center gap-[0.4em]">
        Enter Enliven
        <FiArrowRight aria-hidden className="shrink-0" />
      </span>
    </Link>
  );
}

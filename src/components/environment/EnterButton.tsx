import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function EnterButton({ href }: { href: string }) {
  return (
    <Link href={href} className="enter-cta">
      Enter Enliven
      <FiArrowRight aria-hidden className="shrink-0" />
    </Link>
  );
}

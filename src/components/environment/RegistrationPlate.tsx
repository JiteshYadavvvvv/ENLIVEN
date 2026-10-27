import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type RegistrationPlateProps = {
  src: string;
  width: number;
  height: number;
  badge: string;
  children: string;
  href: string;
  title?: string;
  "aria-label"?: string;
};

export default function RegistrationPlate({
  src,
  width,
  height,
  badge,
  children,
  href,
  title,
  ...rest
}: RegistrationPlateProps) {
  return (
    <Link href={href} className="plate-button" title={title} {...rest}>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="h-auto w-[190px] sm:w-[230px] lg:w-[270px]"
        draggable={false}
      />
      <span className="absolute inset-0 flex items-center justify-center gap-2 px-4 text-sm font-bold tracking-[0.06em] text-white uppercase sm:text-base">
        <span className="plate-button-badge text-[0.65em] text-void">
          {badge}
        </span>
        {children}
        <FiArrowRight aria-hidden />
      </span>
    </Link>
  );
}

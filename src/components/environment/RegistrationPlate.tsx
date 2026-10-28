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
    <Link
      href={href}
      className="plate-button flex-shrink-0"
      title={title}
      {...rest}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="h-auto w-[130px] sm:w-[185px] md:w-[215px] lg:w-[255px]"
        draggable={false}
      />
      <span className="absolute inset-0 flex items-center justify-center gap-1.5 px-2 text-xs font-bold tracking-[0.06em] text-white uppercase sm:gap-2 sm:px-3 sm:text-sm lg:px-4 lg:text-base">
        <span className="plate-button-badge text-[0.65em] text-void">
          {badge}
        </span>
        {children}
        <FiArrowRight aria-hidden className="text-xs sm:text-sm" />
      </span>
    </Link>
  );
}

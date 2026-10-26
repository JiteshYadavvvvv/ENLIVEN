import Image, { type StaticImageData } from "next/image";
import { FiArrowRight } from "react-icons/fi";

type RegistrationPlateProps = {
  src: StaticImageData;
  badge: string;
  children: string;
  disabled?: boolean;
  title?: string;
  "aria-label"?: string;
};

export default function RegistrationPlate({
  src,
  badge,
  children,
  disabled,
  title,
  ...rest
}: RegistrationPlateProps) {
  return (
    <button
      type="button"
      className="plate-button"
      disabled={disabled}
      title={title}
      {...rest}
    >
      <Image
        src={src}
        alt=""
        className="h-auto w-[220px] sm:w-[280px] lg:w-[320px]"
        draggable={false}
      />
      <span className="absolute inset-0 flex items-center justify-center gap-2 px-4 text-sm font-bold tracking-[0.06em] text-white uppercase sm:text-base">
        <span className="plate-button-badge text-[0.65em] text-void">
          {badge}
        </span>
        {children}
        <FiArrowRight aria-hidden />
      </span>
    </button>
  );
}

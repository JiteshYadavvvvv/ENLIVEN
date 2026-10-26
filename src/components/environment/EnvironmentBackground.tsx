import type { StaticImageData } from "next/image";

type EnvironmentBackgroundProps = {
  desktopSrc: StaticImageData;
  mobileSrc: StaticImageData;
  alt: string;
};

export default function EnvironmentBackground({
  desktopSrc,
  mobileSrc,
  alt,
}: EnvironmentBackgroundProps) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrc.src} />
      <img
        src={mobileSrc.src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </picture>
  );
}

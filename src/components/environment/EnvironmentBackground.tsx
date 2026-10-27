type EnvironmentBackgroundProps = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
};

export default function EnvironmentBackground({
  desktopSrc,
  mobileSrc,
  alt,
}: EnvironmentBackgroundProps) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrc} />
      <img
        src={mobileSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </picture>
  );
}

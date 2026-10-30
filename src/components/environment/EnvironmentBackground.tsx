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
      {/* Orientation, not width: portrait tablets get the tall artwork too.
          Must match the `portrait:` art-ratio switch in page.tsx. */}
      <source media="(orientation: landscape)" srcSet={desktopSrc} />
      <img
        src={mobileSrc}
        alt={alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </picture>
  );
}

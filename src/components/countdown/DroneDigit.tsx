import { DRONE_GLYPHS, DRONES_PER_DIGIT, GLYPH_RATIO } from "./droneGlyphs";

const HEIGHT = 100;
const WIDTH = HEIGHT * GLYPH_RATIO;
const DRONE_IDS = Array.from(
  { length: DRONES_PER_DIGIT },
  (_, index) => `drone-${index}`,
);

export default function DroneDigit({ value }: { value: string }) {
  const formation = DRONE_GLYPHS[value] ?? DRONE_GLYPHS["-"];

  return (
    <svg
      className="drone-digit"
      viewBox={`-4 -4 ${WIDTH + 8} ${HEIGHT + 8}`}
      aria-hidden="true"
    >
      {DRONE_IDS.map((id, slot) => (
        <circle
          key={id}
          className="drone"
          r="2.5"
          style={{
            transform: `translate(${formation[slot * 2] * WIDTH}px, ${formation[slot * 2 + 1] * HEIGHT}px)`,
            transitionDelay: `${(slot % 16) * 9}ms`,
          }}
        />
      ))}
    </svg>
  );
}

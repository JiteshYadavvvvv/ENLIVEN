import type { CheckpointSigil } from "@/content/timeline";

const GLYPHS: Record<CheckpointSigil, React.ReactNode> = {
  unlock: (
    <>
      <rect x="10" y="22" width="28" height="20" rx="3" />
      <path d="M16 22v-6a8 8 0 0 1 15.6-2.6" />
      <circle cx="24" cy="31.5" r="2.6" className="map-sigil-fill" />
    </>
  ),
  deadline: (
    <>
      <path d="M13 7h22M13 41h22" />
      <path d="M16 7c0 10 16 11 16 17s-16 7-16 17M32 7c0 10-16 11-16 17s16 7 16 17" />
      <path d="M19 37c2-4 8-4 10 0Z" className="map-sigil-fill" />
    </>
  ),
  announce: (
    <>
      <path d="M8 20v8h6l15 8V12l-15 8Z" />
      <path d="M34 18a8 8 0 0 1 0 12M38 13a15 15 0 0 1 0 22" />
      <path d="M14 28l3 10h5l-2-9" />
    </>
  ),
  mission: (
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="7" />
      <path d="M24 3v9M24 36v9M3 24h9M36 24h9" />
      <circle cx="24" cy="24" r="2.4" className="map-sigil-fill" />
    </>
  ),
  finish: (
    <>
      <path d="M12 6v38" />
      <rect x="12" y="8" width="27" height="18" />
      <path
        d="M12 8h9v9h-9ZM30 8h9v9h-9ZM21 17h9v9h-9Z"
        className="map-sigil-fill"
      />
    </>
  ),
};

export default function MapSigil({ sigil }: { sigil: CheckpointSigil }) {
  return (
    <svg viewBox="0 0 48 48" className="map-sigil" aria-hidden="true">
      {GLYPHS[sigil]}
    </svg>
  );
}

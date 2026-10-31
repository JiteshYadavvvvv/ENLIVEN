import type { ReactNode } from "react";

import type { TrackArt as TrackArtName } from "@/content/tracks";

const INK = "#1b0f24";
const CREAM = "#fff3e2";
const GOLD = "#ffd23f";
const MAGENTA = "#ff2bd6";
const CYAN = "#27e8ff";
const VIOLET = "#8b2fe8";
const SUNSET = "#ff7a3d";

function sparkle(x: number, y: number, size: number) {
  const k = size * 0.28;
  return `M${x} ${y - size}L${x + k} ${y - k}L${x + size} ${y}L${x + k} ${y + k}L${x} ${y + size}L${x - k} ${y + k}L${x - size} ${y}L${x - k} ${y - k}Z`;
}

function cross(x: number, y: number) {
  return `M${x - 7} ${y - 21}h14v14h14v14h-14v14h-14v-14h-14v-14h14Z`;
}

function cubeFaces(cx: number, cy: number, s: number) {
  const w = s * 0.87;
  const h = s * 0.5;
  return {
    outline: `${cx},${cy - s} ${cx + w},${cy - h} ${cx + w},${cy + h} ${cx},${cy + s} ${cx - w},${cy + h} ${cx - w},${cy - h}`,
    top: `${cx},${cy - s} ${cx + w},${cy - h} ${cx},${cy} ${cx - w},${cy - h}`,
    left: `${cx - w},${cy - h} ${cx},${cy} ${cx},${cy + s} ${cx - w},${cy + h}`,
    right: `${cx},${cy} ${cx + w},${cy - h} ${cx + w},${cy + h} ${cx},${cy + s}`,
  };
}

function Cube({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  const face = cubeFaces(cx, cy, s);
  return (
    <>
      <polygon points={face.outline} fill={INK} transform="translate(8 8)" />
      <polygon points={face.top} fill={CREAM} className="art-ink" />
      <polygon points={face.left} fill={GOLD} className="art-ink" />
      <polygon points={face.right} fill={VIOLET} className="art-ink" />
    </>
  );
}

const HEART =
  "M200 268C120 214 78 168 98 120C116 78 170 74 200 116C230 74 284 78 302 120C322 168 280 214 200 268Z";

const CONTROLLER =
  "M110 128H290C340 128 365 173 372 223C380 278 345 303 318 288C298 277 285 250 262 243H138C115 250 102 277 82 288C55 303 20 278 28 223C35 173 60 128 110 128Z";

const JET =
  "M200 92L214 140L262 176V192L214 182L212 222L232 238V250L200 242L168 250V238L188 222L186 182L138 192V176L186 140Z";

const SHIELD =
  "M200 58L302 98V188C302 254 256 300 200 326C144 300 98 254 98 188V98Z";

const CODE_ROWS = [40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340, 370];

const ARTWORK: Record<TrackArtName, ReactNode> = {
  health: (
    <>
      <g fill="#12bfd6">
        {[
          [-120, 80],
          [-40, 300],
          [56, 64],
          [340, 52],
          [356, 304],
          [450, 150],
          [520, 330],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={cross(x, y)} />
        ))}
      </g>
      <path d={HEART} fill={INK} transform="translate(9 9)" />
      <path d={HEART} fill={MAGENTA} className="art-ink" />
      <path
        d="M128 124Q138 102 162 100"
        fill="none"
        stroke={CREAM}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M48 182H128L148 150L170 222L192 104L214 236L234 182H352"
        className="art-live art-pulse"
        pathLength={1}
        fill="none"
        stroke={INK}
        strokeWidth="11"
        strokeLinejoin="round"
      />
    </>
  ),
  arvr: (
    <>
      <defs>
        <clipPath id="arvr-visor-clip">
          <rect x="115" y="128" width="170" height="66" rx="30" />
        </clipPath>
      </defs>
      <g stroke="#a865f6" strokeWidth="3" fill="none">
        <path d="M-400 236H800M-400 262H800M-400 298H800M-400 350H800" />
        <path d="M200 236L-420 420M200 236L-140 420M200 236L60 420M200 236L200 420M200 236L340 420M200 236L540 420M200 236L820 420" />
      </g>
      <path
        d="M96 160Q50 156 18 124M304 160Q350 156 382 124"
        stroke={INK}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="103" y="118" width="210" height="104" rx="44" fill={INK} />
      <rect
        x="95"
        y="110"
        width="210"
        height="104"
        rx="44"
        fill={CREAM}
        className="art-ink"
      />
      <rect
        x="115"
        y="128"
        width="170"
        height="66"
        rx="30"
        fill={MAGENTA}
        className="art-ink"
      />
      <g clipPath="url(#arvr-visor-clip)">
        <path
          d="M134 128H160L136 194H110Z"
          fill={CREAM}
          opacity="0.85"
          className="art-live art-shine"
        />
      </g>
      <path d="M176 214Q200 184 224 214" fill={VIOLET} className="art-ink" />
      <path d={sparkle(322, 74, 16)} fill={CYAN} className="art-ink-thin" />
      <path d={sparkle(70, 86, 11)} fill={GOLD} className="art-ink-thin" />
    </>
  ),
  edutech: (
    <>
      <g fill="#e8622a">
        {[-60, -20, 20, 60, 340, 380, 420, 460].map((x) =>
          [60, 100, 140, 300, 340].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
          )),
        )}
      </g>
      <path
        d="M200 278L86 254V330L200 354L314 330V254Z"
        fill={INK}
        transform="translate(8 8)"
      />
      <path d="M200 270L78 246V322L200 346Z" fill={CREAM} className="art-ink" />
      <path
        d="M200 270L322 246V322L200 346Z"
        fill="#fffaf2"
        className="art-ink"
      />
      <path
        d="M96 266L182 283M96 284L182 301M96 302L182 319M218 283L304 266M218 301L304 284M218 319L304 302"
        stroke={INK}
        strokeWidth="3"
        opacity="0.45"
      />
      <g className="art-live art-cap">
        <path d="M148 150V190C148 208 252 208 252 190V150" fill={INK} />
        <polygon points="200,90 318,138 200,186 82,138" fill={INK} />
        <polygon
          points="200,100 296,138 200,176 104,138"
          fill="none"
          stroke="#3c2b4a"
          strokeWidth="3"
        />
        <path
          d="M200 138L292 150V196"
          stroke={GOLD}
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="284"
          y="194"
          width="16"
          height="28"
          rx="4"
          fill={GOLD}
          className="art-ink-thin"
        />
        <circle cx="200" cy="138" r="7" fill={GOLD} />
      </g>
    </>
  ),
  gamedev: (
    <>
      <g fill="#ffd1f4">
        {[
          [-560, 80],
          [-430, 40],
          [-300, 110],
          [-150, 60],
          [-90, 300],
          [470, 70],
          [520, 290],
        ].map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y}h12v-12h12v12h12v-12h12v12h12v12h-12v12h-12v12h-12v-12h-12v-12h-12Z`}
          />
        ))}
      </g>
      <circle cx="338" cy="70" r="20" fill={GOLD} className="art-ink" />
      <rect x="333" y="58" width="10" height="24" rx="3" fill={INK} />
      <g className="art-live art-pad">
        <path d={CONTROLLER} fill={INK} transform="translate(9 9)" />
        <path d={CONTROLLER} fill={CREAM} className="art-ink" />
        <rect x="86" y="178" width="48" height="24" rx="4" fill={INK} />
        <rect x="98" y="166" width="24" height="48" rx="4" fill={INK} />
        <rect x="170" y="186" width="24" height="10" rx="5" fill={INK} />
        <rect x="206" y="186" width="24" height="10" rx="5" fill={INK} />
        <circle cx="290" cy="166" r="12" fill={CYAN} className="art-ink-thin" />
        <circle cx="313" cy="190" r="12" fill={GOLD} className="art-ink-thin" />
        <circle
          cx="267"
          cy="190"
          r="12"
          fill={VIOLET}
          className="art-ink-thin"
        />
        <circle
          cx="290"
          cy="214"
          r="12"
          fill={SUNSET}
          className="art-ink-thin"
        />
      </g>
    </>
  ),
  fintech: (
    <>
      <path d="M-400 340H800" stroke={INK} strokeWidth="6" />
      {[
        [70, 250, SUNSET],
        [140, 200, MAGENTA],
        [210, 150, VIOLET],
        [280, 100, CYAN],
      ].map(([x, y, paint]) => (
        <g key={String(x)}>
          <rect
            x={Number(x) + 8}
            y={Number(y) + 8}
            width="50"
            height={340 - Number(y)}
            fill={INK}
          />
          <rect
            x={x}
            y={y}
            width="50"
            height={340 - Number(y)}
            fill={String(paint)}
            className="art-ink"
          />
        </g>
      ))}
      <g className="art-live art-rise">
        <path
          d="M52 236L140 168L196 196L316 92"
          stroke={INK}
          strokeWidth="12"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="340,70 296,80 330,114" fill={INK} />
      </g>
      <circle cx="96" cy="100" r="40" fill={CREAM} className="art-ink" />
      <circle
        cx="96"
        cy="100"
        r="28"
        fill="none"
        stroke={INK}
        strokeWidth="3"
      />
      <text x="96" y="114" textAnchor="middle" className="art-rupee">
        ₹
      </text>
    </>
  ),
  cybersec: (
    <>
      <g fill={CYAN} opacity="0.32">
        {CODE_ROWS.map((y, index) => (
          <g key={y}>
            <rect x={-260 + (index % 3) * 18} y={y} width="70" height="8" />
            <rect x={-150 + (index % 4) * 14} y={y} width="36" height="8" />
            <rect
              x={20 + (index % 2) * 20}
              y={y}
              width={30 + (index % 3) * 12}
              height="8"
            />
            <rect x={330 - (index % 3) * 14} y={y} width="44" height="8" />
            <rect x={430 + (index % 2) * 24} y={y} width="80" height="8" />
            <rect x={560 - (index % 4) * 10} y={y} width="40" height="8" />
          </g>
        ))}
      </g>
      <path d={SHIELD} fill={INK} transform="translate(9 9)" />
      <path
        d={SHIELD}
        fill="#1f2a5c"
        stroke={CYAN}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <g className="art-live art-shackle">
        <path
          d="M174 186V158C174 126 226 126 226 158V186"
          stroke={INK}
          strokeWidth="21"
          fill="none"
        />
        <path
          d="M174 186V158C174 126 226 126 226 158V186"
          stroke={CREAM}
          strokeWidth="11"
          fill="none"
        />
      </g>
      <rect
        x="154"
        y="182"
        width="92"
        height="74"
        rx="10"
        fill={CREAM}
        className="art-ink"
      />
      <circle cx="200" cy="212" r="10" fill={INK} />
      <rect x="196" y="214" width="8" height="24" rx="2" fill={INK} />
    </>
  ),
  blockchain: (
    <>
      <g fill="#ffb3a6">
        {[
          [-120, 90],
          [-60, 320],
          [40, 70],
          [360, 330],
          [440, 110],
          [520, 260],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="18" height="18" />
        ))}
      </g>
      <rect
        x="138"
        y="186"
        width="50"
        height="24"
        rx="12"
        transform="rotate(-40 163 198)"
        fill="none"
        stroke={INK}
        strokeWidth="10"
      />
      <rect
        x="224"
        y="186"
        width="50"
        height="24"
        rx="12"
        transform="rotate(40 249 198)"
        fill="none"
        stroke={INK}
        strokeWidth="10"
      />
      <Cube cx={112} cy={246} s={52} />
      <Cube cx={292} cy={250} s={50} />
      <g className="art-live art-lift">
        <Cube cx={202} cy={150} s={58} />
      </g>
    </>
  ),
  logistics: (
    <>
      <path
        d="M-200 140C-80 60 20 150 110 92C200 34 260 124 318 74"
        fill="none"
        stroke={CREAM}
        strokeWidth="6"
        strokeDasharray="14 12"
        strokeLinecap="round"
      />
      <path
        d="M318 30C298 30 284 45 284 63C284 88 318 116 318 116C318 116 352 88 352 63C352 45 338 30 318 30Z"
        fill={MAGENTA}
        className="art-ink"
      />
      <circle cx="318" cy="62" r="10" fill={CREAM} />
      <path d="M-400 290H800" stroke={INK} strokeWidth="6" />
      <g className="art-live art-truck">
        <path
          d="M14 196H66M4 222H56M24 248H64"
          stroke={CREAM}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M92 156H260V186H310L342 222V266H92Z"
          fill={INK}
          transform="translate(8 8)"
        />
        <rect
          x="84"
          y="150"
          width="168"
          height="108"
          rx="6"
          fill={CREAM}
          className="art-ink"
        />
        <rect x="87" y="214" width="162" height="14" fill={GOLD} />
        <path
          d="M252 178H302L334 214V258H252Z"
          fill={GOLD}
          className="art-ink"
        />
        <path
          d="M264 190H298L316 212H264Z"
          fill={CYAN}
          className="art-ink-thin"
        />
        <circle cx="126" cy="264" r="25" fill={INK} />
        <circle cx="296" cy="264" r="25" fill={INK} />
        <circle cx="126" cy="264" r="9" fill={CREAM} />
        <circle cx="296" cy="264" r="9" fill={CREAM} />
      </g>
    </>
  ),
  defence: (
    <>
      <g fill="none" stroke="#8b9a47" strokeWidth="4">
        <circle cx="200" cy="200" r="70" />
        <circle cx="200" cy="200" r="125" />
        <circle cx="200" cy="200" r="180" />
        <circle cx="200" cy="200" r="240" />
        <path d="M200 -60V460M-120 200H520" />
      </g>
      <path
        d="M200 200L200 20A180 180 0 0 1 327 73Z"
        fill="#93a24f"
        className="art-live art-sweep"
      />
      <circle cx="268" cy="112" r="8" fill={GOLD} className="art-ink-thin" />
      <circle cx="104" cy="262" r="7" fill={GOLD} className="art-ink-thin" />
      <g transform="rotate(35 200 200)">
        <path d={JET} fill={INK} transform="translate(8 8)" />
        <path d={JET} fill={CREAM} className="art-ink" />
      </g>
    </>
  ),
};

export default function TrackArt({
  art,
  portrait,
}: {
  art: TrackArtName;
  portrait: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio={portrait ? "xMidYMin meet" : "xMaxYMid meet"}
      className="track-art"
      aria-hidden="true"
    >
      {ARTWORK[art]}
    </svg>
  );
}

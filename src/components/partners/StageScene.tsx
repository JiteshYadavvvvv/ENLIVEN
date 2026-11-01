"use client";

import { MotionConfig, motion } from "motion/react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

type StageShape = "wide" | "tall";

type StageRig = {
  width: number;
  height: number;
  curtain: { step: number; height: number };
  truss: {
    left: number;
    right: number;
    top: number;
    depth: number;
    legsTo: number;
  };
  cans: number[];
  targets: number[];
  beamFloor: number;
  beamSpread: number;
  floor: { back: [number, number, number]; front: [number, number, number] };
  planks: number;
};

const STAGE_RIGS: Record<StageShape, StageRig> = {
  wide: {
    width: 1600,
    height: 796,
    curtain: { step: 80, height: 600 },
    truss: { left: 70, right: 1530, top: 40, depth: 62, legsTo: 640 },
    cans: [360, 640, 960, 1240],
    targets: [520, 700, 900, 1080],
    beamFloor: 700,
    beamSpread: 150,
    floor: { back: [600, 200, 1400], front: [780, 0, 1600] },
    planks: 16,
  },
  tall: {
    width: 400,
    height: 556,
    curtain: { step: 40, height: 430 },
    truss: { left: 16, right: 384, top: 24, depth: 44, legsTo: 450 },
    cans: [120, 280],
    targets: [170, 230],
    beamFloor: 500,
    beamSpread: 82,
    floor: { back: [430, 50, 350], front: [540, 0, 400] },
    planks: 8,
  },
};

const STAGE_SHAPES: StageShape[] = ["tall", "wide"];

function trussZigzag(rig: StageRig) {
  const { left, right, top, depth } = rig.truss;
  const step = depth * 0.85;
  let path = `M${left + 22} ${top + depth}`;
  let up = true;
  for (let x = left + 22 + step; x < right - 22; x += step) {
    path += `L${x} ${up ? top + 8 : top + depth}`;
    up = !up;
  }
  return path;
}

function plankLines(rig: StageRig) {
  const [backY, backLeft, backRight] = rig.floor.back;
  const [frontY, frontLeft, frontRight] = rig.floor.front;
  return Array.from({ length: rig.planks + 1 }, (_, index) => {
    const share = index / rig.planks;
    const backX = backLeft + (backRight - backLeft) * share;
    const frontX = frontLeft + (frontRight - frontLeft) * share;
    return `M${backX} ${backY}L${frontX} ${frontY}`;
  }).join("");
}

function StageRigArt({ shape }: { shape: StageShape }) {
  const rig = STAGE_RIGS[shape];
  const { truss, floor } = rig;
  const [backY, backLeft, backRight] = floor.back;
  const [frontY, frontLeft, frontRight] = floor.front;
  const lensY = truss.top + truss.depth + 58;

  return (
    <svg
      viewBox={`0 0 ${rig.width} ${rig.height}`}
      className="stage-rig"
      data-shape={shape}
      aria-hidden="true"
    >
      <rect width={rig.width} height={rig.height} className="stage-backdrop" />
      {Array.from(
        { length: Math.ceil(rig.width / rig.curtain.step) },
        (_, index) => (
          <rect
            key={`fold-${index * rig.curtain.step}`}
            x={index * rig.curtain.step}
            width={rig.curtain.step / 2}
            height={rig.curtain.height}
            className="stage-fold"
          />
        ),
      )}
      <rect
        y={rig.curtain.height - 8}
        width={rig.width}
        height="16"
        className="stage-hem"
      />

      <rect
        x={truss.left}
        y={truss.top}
        width="22"
        height={truss.legsTo - truss.top}
        className="stage-truss"
      />
      <rect
        x={truss.right - 22}
        y={truss.top}
        width="22"
        height={truss.legsTo - truss.top}
        className="stage-truss"
      />
      <rect
        x={truss.left}
        y={truss.top}
        width={truss.right - truss.left}
        height="10"
        className="stage-truss"
      />
      <rect
        x={truss.left}
        y={truss.top + truss.depth}
        width={truss.right - truss.left}
        height="10"
        className="stage-truss"
      />
      <path d={trussZigzag(rig)} className="stage-truss-web" />

      {rig.cans.map((x, index) => (
        <motion.g
          key={`beam-${x}`}
          variants={{
            dark: { opacity: 0 },
            lit: {
              opacity: 1,
              transition: { delay: 0.12 + index * 0.16, duration: 0.3 },
            },
          }}
        >
          <polygon
            points={`${x - 20},${lensY} ${x + 20},${lensY} ${rig.targets[index] + rig.beamSpread},${rig.beamFloor} ${rig.targets[index] - rig.beamSpread},${rig.beamFloor}`}
            className="stage-beam"
          />
          <ellipse
            cx={rig.targets[index]}
            cy={rig.beamFloor}
            rx={rig.beamSpread}
            ry={rig.beamSpread * 0.2}
            className="stage-pool"
          />
        </motion.g>
      ))}

      {rig.cans.map((x) => (
        <g key={`can-${x}`}>
          <path
            d={`M${x} ${truss.top + truss.depth + 10}V${lensY - 46}`}
            className="stage-truss-web"
          />
          <polygon
            points={`${x - 28},${lensY - 46} ${x + 28},${lensY - 46} ${x + 21},${lensY} ${x - 21},${lensY}`}
            className="stage-can"
          />
          <ellipse cx={x} cy={lensY} rx="21" ry="6" className="stage-lens" />
        </g>
      ))}

      <polygon
        points={`${backLeft},${backY} ${backRight},${backY} ${frontRight},${frontY} ${frontLeft},${frontY}`}
        className="stage-floor"
      />
      <path d={plankLines(rig)} className="stage-plank" />
      <ellipse
        cx={rig.width / 2}
        cy={rig.beamFloor + rig.beamSpread * 0.1}
        rx={rig.width * 0.32}
        ry={rig.beamSpread * 0.18}
        className="stage-cast"
      />
      <rect
        y={frontY}
        width={rig.width}
        height={rig.height - frontY}
        className="stage-lip"
      />
      <path d={`M0 ${frontY}H${rig.width}`} className="stage-trim" />
    </svg>
  );
}

export default function StageScene({ words }: { words: string[] }) {
  const still = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="stage-scene"
        initial={still ? "lit" : "dark"}
        whileInView="lit"
        viewport={{ amount: 0.35 }}
      >
        {STAGE_SHAPES.map((shape) => (
          <StageRigArt key={shape} shape={shape} />
        ))}
        <motion.p
          aria-hidden
          className="stage-words"
          variants={{
            dark: { opacity: 0, y: "35%" },
            lit: {
              opacity: 1,
              y: "0%",
              transition: {
                delay: 0.75,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {words.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </motion.p>
      </motion.div>
    </MotionConfig>
  );
}

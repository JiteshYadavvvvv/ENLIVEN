"use client";

import {
  MotionConfig,
  motion,
  type SpringOptions,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useId,
  useRef,
  useState,
} from "react";

import { usePrefersReducedMotion } from "@/utils/useReducedMotion";

const BOLT_ANGLES = Array.from({ length: 24 }, (_, index) => index * 15);
const DIAL_TICKS = Array.from({ length: 60 }, (_, index) => index);
const DIAL_NUMBERS = Array.from({ length: 12 }, (_, index) => index * 5);
const SPOKE_ANGLES = [0, 120, 240];
const HUB_BOLT_ANGLES = [60, 180, 300];

const TOUCH_SLOP = 16;

const TURN_KEYS: Record<string, number> = {
  ArrowRight: 1,
  ArrowUp: 1,
  ArrowLeft: -1,
  ArrowDown: -1,
};

type GripFeel = {
  step: number;
  detent: number;
  maxFling: number;
  weight: SpringOptions;
};

const DIAL_FEEL: GripFeel = {
  step: 6,
  detent: 6,
  maxFling: 42,
  weight: { stiffness: 300, damping: 32, mass: 0.9 },
};

const HANDLE_FEEL: GripFeel = {
  step: 15,
  detent: 0,
  maxFling: 28,
  weight: { stiffness: 170, damping: 24, mass: 1.5 },
};

function pointerAngle(event: PointerEvent<SVGGElement>) {
  const box = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
  if (!box) return 0;
  const x = event.clientX - (box.left + box.width / 2);
  const y = event.clientY - (box.top + box.height / 2);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function shortestTurn(delta: number) {
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
}

function compassReading(turn: number) {
  return ((Math.round(turn) % 360) + 360) % 360;
}

function useVaultGrip(feel: GripFeel, still: boolean) {
  const target = useMotionValue(0);
  const heavy = useSpring(target, feel.weight);
  const [turning, setTurning] = useState(false);
  const [reading, setReading] = useState(0);
  const grip = useRef({
    pointer: -1,
    engaged: false,
    startX: 0,
    startY: 0,
    startTurn: 0,
    angle: 0,
    time: 0,
    speed: 0,
  });

  const settle = (turn: number) => {
    const rested =
      feel.detent > 0 ? Math.round(turn / feel.detent) * feel.detent : turn;
    target.set(rested);
    setReading(compassReading(rested));
  };

  const letGo = (event: PointerEvent<SVGGElement>) => {
    if (grip.current.pointer !== event.pointerId) return false;
    grip.current.pointer = -1;
    setTurning(false);
    return true;
  };

  return {
    turn: still ? target : heavy,
    turning,
    reading,
    controls: {
      onPointerDown(event: PointerEvent<SVGGElement>) {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        grip.current = {
          pointer: event.pointerId,
          engaged: event.pointerType !== "touch",
          startX: event.clientX,
          startY: event.clientY,
          startTurn: target.get(),
          angle: pointerAngle(event),
          time: event.timeStamp,
          speed: 0,
        };
        setTurning(true);
      },
      onPointerMove(event: PointerEvent<SVGGElement>) {
        if (grip.current.pointer !== event.pointerId) return;
        if (!grip.current.engaged) {
          const travel = Math.hypot(
            event.clientX - grip.current.startX,
            event.clientY - grip.current.startY,
          );
          if (travel < TOUCH_SLOP) return;
          grip.current.engaged = true;
        }
        const angle = pointerAngle(event);
        const delta = shortestTurn(angle - grip.current.angle);
        const elapsed = Math.max(event.timeStamp - grip.current.time, 1);
        grip.current = {
          ...grip.current,
          angle,
          time: event.timeStamp,
          speed: delta / elapsed,
        };
        target.set(target.get() + delta);
      },
      onPointerUp(event: PointerEvent<SVGGElement>) {
        if (!letGo(event)) return;
        const fresh = event.timeStamp - grip.current.time < 90;
        const fling =
          fresh && !still
            ? Math.max(
                -feel.maxFling,
                Math.min(feel.maxFling, grip.current.speed * 160),
              )
            : 0;
        settle(target.get() + fling);
      },
      onPointerCancel(event: PointerEvent<SVGGElement>) {
        if (letGo(event)) settle(grip.current.startTurn);
      },
      onKeyDown(event: KeyboardEvent<SVGGElement>) {
        const direction = TURN_KEYS[event.key];
        if (!direction) return;
        event.preventDefault();
        settle(target.get() + direction * feel.step * (event.shiftKey ? 5 : 1));
      },
    },
  };
}

export default function VaultDoor() {
  const mountRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<SVGPolygonElement>(null);
  const notch = useRef(0);
  const still = usePrefersReducedMotion();
  const faceShade = useId();
  const dial = useVaultGrip(DIAL_FEEL, still);
  const handle = useVaultGrip(HANDLE_FEEL, still);
  const { scrollYProgress } = useScroll({
    target: mountRef,
    offset: ["start end", "end start"],
  });
  const scrollTurn = useTransform(
    scrollYProgress,
    [0, 1],
    still ? [0, 0] : [-75, 75],
  );

  useMotionValueEvent(dial.turn, "change", (turn) => {
    const next = Math.round(turn / DIAL_FEEL.detent);
    if (next === notch.current) return;
    notch.current = next;
    if (!still) {
      indexRef.current?.animate([{ scale: "1.4" }, { scale: "1" }], {
        duration: 160,
        easing: "ease-out",
      });
    }
  });

  return (
    <MotionConfig reducedMotion="user">
      <div ref={mountRef} className="vault-mount">
        <svg viewBox="0 0 400 400" className="vault-door">
          <title>Prize vault door</title>
          <defs>
            <radialGradient id={faceShade} cx="38%" cy="32%" r="75%">
              <stop offset="0" stopColor="#2c1c40" />
              <stop offset="1" stopColor="#140b20" />
            </radialGradient>
          </defs>

          <circle cx="200" cy="200" r="197" className="vault-frame" />
          <path
            d="M19.6 134.3 A192 192 0 0 1 265.7 19.6"
            className="vault-bevel"
          />
          <circle cx="200" cy="200" r="182" className="vault-seam" />

          {BOLT_ANGLES.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 200 200)`}>
              <circle cx="200" cy="21" r="7.5" className="vault-bolt" />
              <circle cx="198" cy="19" r="2.4" className="vault-glint" />
            </g>
          ))}

          <circle
            cx="200"
            cy="200"
            r="166"
            className="vault-face"
            fill={`url(#${faceShade})`}
          />

          <motion.g style={{ rotate: scrollTurn }}>
            <motion.g
              {...dial.controls}
              style={{ rotate: dial.turn }}
              className="vault-control"
              data-turning={dial.turning}
              role="slider"
              tabIndex={0}
              aria-label="Vault combination dial"
              aria-valuemin={0}
              aria-valuemax={359}
              aria-valuenow={dial.reading}
              aria-valuetext={`${dial.reading} degrees`}
            >
              <circle cx="200" cy="200" r="139" className="vault-dial-grip" />
              <circle cx="200" cy="200" r="139" className="vault-dial" />
              {DIAL_TICKS.map((tick) => (
                <line
                  key={tick}
                  x1="200"
                  y1="50"
                  x2="200"
                  y2={tick % 5 === 0 ? 60 : 56}
                  transform={`rotate(${tick * 6} 200 200)`}
                  className="vault-tick"
                />
              ))}
              {DIAL_NUMBERS.map((value) => (
                <text
                  key={value}
                  x="200"
                  y="69"
                  transform={`rotate(${value * 6} 200 200)`}
                  className="vault-numeral"
                >
                  {value}
                </text>
              ))}
              <circle cx="200" cy="200" r="161" className="vault-focus" />
            </motion.g>
          </motion.g>

          <polygon
            ref={indexRef}
            points="200,49 191,36 209,36"
            className="vault-index"
          />
          <circle cx="200" cy="200" r="106" className="vault-core" />
          <circle cx="200" cy="200" r="98" className="vault-core-bevel" />

          <motion.g
            key={still ? "handle-still" : "handle-spin"}
            initial={{ rotate: still ? 0 : -140 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 38, damping: 11 }}
          >
            <motion.g
              {...handle.controls}
              style={{ rotate: handle.turn }}
              className="vault-control"
              data-turning={handle.turning}
              role="slider"
              tabIndex={0}
              aria-label="Vault handle"
              aria-valuemin={0}
              aria-valuemax={359}
              aria-valuenow={handle.reading}
              aria-valuetext={`${handle.reading} degrees`}
            >
              <circle cx="200" cy="200" r="112" className="vault-handle-grip" />
              {SPOKE_ANGLES.map((angle) => (
                <g key={angle} transform={`rotate(${angle} 200 200)`}>
                  <rect
                    x="191"
                    y="112"
                    width="18"
                    height="62"
                    rx="9"
                    className="vault-spoke"
                  />
                  <line
                    x1="200"
                    y1="122"
                    x2="200"
                    y2="166"
                    className="vault-spoke-groove"
                  />
                  <circle cx="200" cy="110" r="15" className="vault-grip" />
                  <circle cx="200" cy="110" r="5.5" className="vault-socket" />
                </g>
              ))}
              <circle cx="200" cy="200" r="34" className="vault-hub" />
              <circle cx="200" cy="200" r="24" className="vault-hub-ring" />
              {HUB_BOLT_ANGLES.map((angle) => (
                <circle
                  key={angle}
                  cx="200"
                  cy="171"
                  r="3"
                  transform={`rotate(${angle} 200 200)`}
                  className="vault-hub-bolt"
                />
              ))}
              <circle cx="200" cy="200" r="11" className="vault-hub-cap" />
              <circle cx="200" cy="200" r="116" className="vault-focus" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    </MotionConfig>
  );
}

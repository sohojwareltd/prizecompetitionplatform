"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "classnames";
import { NeonButton } from "../ui/NeonButton";

type SpinSegment = {
  id: string;
  label: string;
  description?: string;
  color: string;
};

type SpinWheelProps = {
  segments: SpinSegment[];
};

export function SpinWheel({ segments }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<SpinSegment | null>(null);

  const handleSpin = () => {
    if (isSpinning || segments.length === 0) return;

    setIsSpinning(true);
    setResult(null);

    const segmentAngle = 360 / segments.length;
    const targetIndex = Math.floor(Math.random() * segments.length);
    // 8–11 full spins for a more dramatic effect
    const baseTurns = 8 + Math.floor(Math.random() * 4);

    // We want the pointer at the top to land in the center of the target segment,
    // and we always rotate CLOCKWISE (increasing rotation value).
    const targetCenterAngle = targetIndex * segmentAngle + segmentAngle / 2;

    const currentNorm = ((rotation % 360) + 360) % 360;
    // Extra angle needed (beyond full turns) so that after the spin,
    // the target segment center is aligned with the top pointer (0deg).
    const extraAngle =
      (360 - targetCenterAngle - currentNorm + 360) % 360;

    const finalRotation = rotation + baseTurns * 360 + extraAngle;

    setRotation(finalRotation);

    // After animation, show result
    window.setTimeout(() => {
      setIsSpinning(false);
      setResult(segments[targetIndex]);
    }, 4200);
  };

  const segmentAngle = 360 / segments.length;
  const gradientStops = segments
    .map((segment, index) => {
      const start = index * segmentAngle;
      const end = start + segmentAngle;
      return `${segment.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="relative h-80 w-80 sm:h-96 sm:w-96">
        {/* Outer glowing rim – tuned to King Comps royal/neon palette */}
        <div className="pointer-events-none absolute inset-0 rounded-full border-[10px] border-[#1D4ED8]/70 bg-[radial-gradient(circle_at_30%_30%,rgba(248,250,252,0.35),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(10,15,30,1),rgba(5,6,21,1))] shadow-[0_0_60px_rgba(56,189,248,0.75)]" />

        {/* Rim lights */}
        <div className="pointer-events-none absolute inset-1">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * 360;
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e5f5ff] shadow-[0_0_14px_rgba(56,189,248,1)]"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -178px)`,
                }}
              />
            );
          })}
        </div>

        {/* Pointer at top (triangle) – royal blue + gold */}
        <div className="pointer-events-none absolute inset-x-0 -top-5 z-30 flex justify-center">
          <div className="relative h-12 w-12">
            {/* Badge circle */}
            <div className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full border border-[#38bdf8]/70 bg-[radial-gradient(circle_at_30%_20%,#e0f2fe,#0ea5e9)] shadow-[0_0_22px_rgba(56,189,248,1)]" />
            {/* Triangle arrow pointing down */}
            <div className="absolute left-1/2 top-7 -ml-3.5 h-0 w-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent border-t-[#FACC15] drop-shadow-[0_2px_12px_rgba(250,204,21,0.9)]" />
          </div>
        </div>

        {/* Wheel */}
        <motion.div
          className="relative h-full w-full rounded-full border border-white/10 bg-[#050516] shadow-[0_0_70px_rgba(88,28,135,0.9)]"
          style={{
            backgroundImage: `conic-gradient(${gradientStops})`,
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Central spin button – neon royal gradient */}
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className={clsx(
              "absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#FACC15]/90 bg-[conic-gradient(from_200deg_at_30%_30%,#0ea5e9,#6366f1,#ec4899,#0ea5e9)] text-base font-heading font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_32px_rgba(56,189,248,1)] transition-transform",
              isSpinning ? "scale-95 opacity-90" : "hover:scale-105"
            )}
          >
            {isSpinning ? "..." : "Spin"}
          </button>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-slate-400">
          Tap the wheel centre to spin. Visual demo only – not the main draw.
        </p>
        {result && (
          <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-slate-100">
            <div className="font-heading text-xs uppercase tracking-[0.18em] text-neon-gold">
              You landed on
            </div>
            <div className="mt-1 text-base font-semibold text-white">
              {result.label}
            </div>
            {result.description && (
              <div className="mt-1 text-xs text-slate-300">
                {result.description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



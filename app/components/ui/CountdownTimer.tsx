"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date | string | number;
  size?: "sm" | "md" | "lg";
}

function getRemaining(target: number) {
  const now = Date.now();
  const diff = Math.max(target - now, 0);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}

const sizeMap = {
  sm: { ring: 52, stroke: 6, text: "text-xs" },
  md: { ring: 72, stroke: 7, text: "text-sm" },
  lg: { ring: 96, stroke: 8, text: "text-base" },
} as const;

export function CountdownTimer({
  targetDate,
  size = "md",
}: CountdownTimerProps) {
  const targetMs =
    targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(targetMs));
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = getRemaining(targetMs);
        if (next.totalSeconds !== prev.totalSeconds) {
          controls.start({ scale: [1, 1.05, 1], transition: { duration: 0.35 } });
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetMs, controls]);

  const total = 7 * 24 * 3600;
  const progress = total ? remaining.totalSeconds / total : 0;

  const { ring, stroke, text } = sizeMap[size];
  const center = ring;
  const radius = ring - stroke * 1.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={controls}
        className="relative flex items-center justify-center"
      >
        <svg
          width={ring * 2}
          height={ring * 2}
          className=""
        >
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5A2BFF" />
              <stop offset="50%" stopColor="#4DA6FF" />
              <stop offset="100%" stopColor="#E8C96F" />
            </linearGradient>
          </defs>
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke="url(#timerGradient)"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/60">
              Ends in
            </span>
            <span className="font-heading text-xs">
              {remaining.days}d {remaining.hours}h
            </span>
          </div>
        </div>
      </motion.div>
        <div className={`flex flex-col ${text}`}>
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          Time remaining
        </span>
          <span className="font-heading text-white">
          {remaining.days}d {remaining.hours}h {remaining.minutes}m{" "}
          {remaining.seconds}s
        </span>
      </div>
    </div>
  );
}



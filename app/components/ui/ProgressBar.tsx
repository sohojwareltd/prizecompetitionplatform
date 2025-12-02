"use client";

import { motion } from "framer-motion";
import clsx from "classnames";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  className,
  showLabel = true,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={clsx(
          "relative h-2.5 w-full overflow-hidden rounded-full bg-[#202036]",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
          className
        )}
      >
        <motion.div
          className="h-full w-full rounded-full bg-royal-gradient shadow-neon-blue"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),transparent_55%)] opacity-60" />
      </div>
      {showLabel && (
        <div className="flex items-center justify-between text-[11px] text-slate-300">
          <span>Tickets sold</span>
          <span className="font-heading text-xs text-neon-gold">
            {clamped.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}



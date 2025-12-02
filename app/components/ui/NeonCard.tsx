"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "classnames";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NeonCard({ children, className, onClick }: NeonCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      className={clsx(
        "relative rounded-2xl bg-[#1A1A2C] border border-[#2E2E42] shadow-[0_16px_32px_rgba(0,0,0,0.65)] cursor-pointer",
        "overflow-hidden",
        "hover:border-royal-purple hover:shadow-[0_18px_36px_rgba(0,0,0,0.75)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}



"use client";

import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "classnames";

type Variant = "primary" | "gold" | "outline";
type Size = "sm" | "md" | "lg";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const baseClasses =
  "relative inline-flex items-center justify-center rounded-xl font-heading tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed";

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-royal-gradient text-white shadow-[0_10px_24px_rgba(0,0,0,0.65)] hover:brightness-110",
  gold:
    "bg-[linear-gradient(135deg,#E8C96F,#F0DFA5)] text-[#0F0F19] shadow-[0_10px_24px_rgba(0,0,0,0.6)] hover:brightness-110",
  outline:
    "bg-transparent text-white border border-[#2E2E42] hover:border-royal-purple hover:text-white hover:bg-white/5",
};

export function NeonButton({
  children,
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth,
  ...props
}: NeonButtonProps & {
  onDrag?: never;
  onDragStart?: never;
  onDragEnd?: never;
  onAnimationStart?: never;
}) {
  return (
    <motion.button
      whileHover={{ y: -1, boxShadow: "0 10px 28px rgba(46,204,113,0.35)" }}
      whileTap={{ scale: 0.97, y: 0 }}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </span>
    </motion.button>
  );
}



"use client";

import type { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "classnames";

interface GlassPanelProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  maxWidthClass?: string;
}

export function GlassPanel({
  open,
  onClose,
  title,
  children,
  maxWidthClass = "max-w-lg",
}: GlassPanelProps) {
  // Render modals at the document body level so the overlay always
  // covers the entire viewport and sits above nav/body content.
  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 32, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className={clsx(
              "glass-panel neon-border-primary shadow-glass",
              "w-full mx-4 rounded-3xl p-6 sm:p-8",
              maxWidthClass
            )}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-heading text-lg sm:text-xl font-semibold">
                  {title}
                </h2>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:border-neon-blue/70 hover:text-white"
                  >
                    Close
                  </button>
                )}
              </div>
            )}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}



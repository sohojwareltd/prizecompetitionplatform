"use client";

import { NeonButton } from "../ui/NeonButton";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileCTABar() {
  const pathname = usePathname();
  const hideOn = ["/auth/login", "/auth/register"];
  const hidden = hideOn.includes(pathname);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-[#0F0F19]/95 pb-4 pt-3 backdrop-blur-2xl md:hidden"
        >
          <div className="mx-auto flex max-w-md items-center gap-3 px-4">
            <div className="flex-1 text-xs text-slate-300">
              <p className="font-heading text-[11px] uppercase tracking-[0.18em] text-neon-gold">
                Live now
              </p>
              <p>Tap to enter tonight&apos;s premium draws.</p>
            </div>
            <Link href="/competitions" className="flex-1">
              <NeonButton fullWidth size="sm">
                Enter now
              </NeonButton>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



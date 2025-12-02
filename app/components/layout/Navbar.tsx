"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "classnames";
import { useState } from "react";
import { createPortal } from "react-dom";
import { NeonButton } from "../ui/NeonButton";
import { LoginDialog } from "../auth/LoginDialog";
import { RegisterDialog } from "../auth/RegisterDialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/competitions", label: "Competitions" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/winners", label: "Winners" },
  { href: "/spin", label: "Spin wheel" },
];

export function Navbar() {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0F0F19]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-royal-gradient">
            <span className="text-lg font-heading font-semibold text-white">
              KC
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-xl border border-white/20" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-sm font-semibold tracking-[0.18em] uppercase text-white">
              King Comps
            </span>
            <span className="text-xs text-slate-400">
              Premium prize competitions
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative text-sm text-slate-300 hover:text-white transition-colors",
                  "font-body"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-7 rounded-full bg-royal-gradient shadow-neon-blue"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm text-slate-300 hover:text-white"
          >
            Log in
          </button>
          <NeonButton size="sm" onClick={() => setShowRegister(true)}>
            Play now
          </NeonButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setShowLogin(true)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
          >
            Log in
          </button>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-100 shadow-[0_0_15px_rgba(106,0,255,0.45)]"
          >
            <span className="relative block h-4 w-4">
              <span
                className={clsx(
                  "absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform duration-200",
                  mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-opacity duration-150",
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-3 h-0.5 w-full rounded-full bg-current transition-transform duration-200",
                  mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile off-canvas menu (rendered at page level via portal) */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-40 bg-black md:hidden"
                />
                {/* Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="fixed inset-y-0 right-0 z-50 w-3/4 max-w-xs border-l border-white/10 bg-[#050516] px-5 pb-6 pt-20 shadow-[0_0_40px_rgba(106,0,255,0.5)] md:hidden"
                >
                  <div className="flex flex-col gap-6">
                    <nav className="flex flex-col gap-3">
                      {links.map((link) => {
                        const active = pathname === link.href;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={clsx(
                              "relative rounded-lg px-2 py-1.5 text-sm transition-colors",
                              active
                                ? "bg-white/5 text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {link.label}
                            {active && (
                              <span className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-royal-gradient" />
                            )}
                          </Link>
                        );
                      })}
                    </nav>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setShowLogin(true);
                        }}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
                      >
                        Log in
                      </button>
                      <NeonButton
                        fullWidth
                        size="sm"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setShowRegister(true);
                        }}
                      >
                        Play now
                      </NeonButton>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      <LoginDialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterDialog
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </header>
  );
}



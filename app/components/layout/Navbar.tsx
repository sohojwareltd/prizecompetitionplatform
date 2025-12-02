"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "classnames";
import { useState } from "react";
import { NeonButton } from "../ui/NeonButton";
import { LoginDialog } from "../auth/LoginDialog";
import { RegisterDialog } from "../auth/RegisterDialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/competitions", label: "Competitions" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/winners", label: "Winners" },
];

export function Navbar() {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
        </div>
      </div>

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



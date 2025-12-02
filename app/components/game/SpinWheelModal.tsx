"use client";

import { useEffect, useState } from "react";
import { GlassPanel } from "../ui/GlassPanel";
import { SpinWheel } from "./SpinWheel";
import { NeonButton } from "../ui/NeonButton";
import { LoginDialog } from "../auth/LoginDialog";

type PrizeSegment = {
  id: string;
  label: string;
  description?: string;
  color: string;
  isWin: boolean;
};

const segments: readonly PrizeSegment[] = [
  {
    id: "iphone-15",
    label: "iPhone 15",
    description: "Flagship Apple prize – demo only.",
    color: "#22c55e",
    isWin: true,
  },
  {
    id: "cash-100",
    label: "$100 Cash",
    description: "Instant wallet boost.",
    color: "#0ea5e9",
    isWin: true,
  },
  {
    id: "two-free-spins",
    label: "2 Free Spins",
    description: "Two extra demo spins.",
    color: "#eab308",
    isWin: true,
  },
  {
    id: "almost",
    label: "So Close!",
    description: "Brush with greatness – try again.",
    color: "#64748b",
    isWin: false,
  },
  {
    id: "better-luck",
    label: "Better Luck",
    description: "No prize this time.",
    color: "#334155",
    isWin: false,
  },
  {
    id: "nothing",
    label: "No Win",
    description: "Warm up spin only.",
    color: "#4b5563",
    isWin: false,
  },
];

export function SpinWheelModal() {
  const [spinOpen, setSpinOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [lastSegment, setLastSegment] = useState<PrizeSegment | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Open once shortly after client mount
  useEffect(() => {
    if (!mounted) return;
    const timer = window.setTimeout(() => {
      setSpinOpen(true);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  const handleResult = (segment: PrizeSegment) => {
    setHasSpun(true);
    setLastSegment(segment);
    // Move to result step after the wheel finishes and we have a prize.
    setSpinOpen(false);
    setResultOpen(true);
  };

  const isWin = lastSegment?.isWin ?? false;

  // Avoid any server/client markup differences by only rendering on the client.
  if (!mounted) {
    return null;
  }

  return (
    <>
      <GlassPanel
        open={spinOpen}
        onClose={() => setSpinOpen(false)}
        title="Spin to preview prizes"
        maxWidthClass="max-w-xl"
      >
        {/* Step 1: just the wheel. On mobile, fill most of the popup and centre the wheel both ways. */}
        <div className="flex h-[60vh] items-center justify-center px-1 sm:h-auto sm:max-h-[90vh] sm:items-stretch sm:justify-center">
          <div className="w-full max-w-sm">
            <SpinWheel
              segments={segments}
              compact
              onResult={(segment) => handleResult(segment as PrizeSegment)}
            />
          </div>
        </div>
      </GlassPanel>

      <GlassPanel
        open={resultOpen}
        onClose={() => setResultOpen(false)}
        title="Your spin result"
        maxWidthClass="max-w-sm"
      >
        {/* Step 2: simple win/lose summary and login CTA, with win glow around the popup */}
        <div className="relative">
          {isWin && hasSpun && lastSegment && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-[radial-gradient(circle_at_20%_0%,rgba(129,230,217,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(250,204,21,0.35),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.4),transparent_55%)] opacity-80 animate-[pulse_2s_ease-in-out_infinite]"
            />
          )}

          <div className="relative max-h-[90vh] overflow-y-auto px-1 sm:max-h-none sm:overflow-visible">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-sm text-xs text-slate-200">
                {hasSpun && lastSegment ? (
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 via-[#050516]/90 to-black p-[1px] shadow-[0_18px_45px_rgba(15,23,42,0.95)]">
                    <div className="relative rounded-2xl bg-black/60 px-4 py-3">
                      {isWin ? (
                        <>
                          <p className="text-xs font-heading font-semibold uppercase tracking-[0.32em] text-emerald-300">
                            Congratulations
                          </p>
                          <p className="mt-1 text-lg font-semibold text-white">
                            You won{" "}
                            <span className="text-neon-gold">
                              {lastSegment.label}
                            </span>
                            !
                          </p>
                          {lastSegment.description && (
                            <p className="mt-2 text-[11px] text-slate-300">
                              {lastSegment.description}
                            </p>
                          )}

                          <p className="mt-3 text-[11px] text-slate-400">
                            Log in to your King Comps account to see how a real
                            prize claim would work. This spin is for demo
                            purposes only.
                          </p>

                          <div className="mt-4">
                            <NeonButton
                              size="sm"
                              fullWidth
                              type="button"
                              onClick={() => setShowLogin(true)}
                            >
                              Log in
                            </NeonButton>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-300">
                            No win
                          </p>
                          <p className="mt-1 text-base font-medium text-white">
                            You landed on{" "}
                            <span className="text-slate-100">{lastSegment.label}</span>.
                          </p>
                          {lastSegment.description && (
                            <p className="mt-1 text-[11px] text-slate-300">
                              {lastSegment.description}
                            </p>
                          )}
                          <p className="mt-3 text-[11px] text-slate-400">
                            Try another spin later or enter a live competition for
                            real prizes.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

      </GlassPanel>

      <LoginDialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}



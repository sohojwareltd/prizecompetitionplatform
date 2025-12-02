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
  const [open, setOpen] = useState(false);
  const [lastSegment, setLastSegment] = useState<PrizeSegment | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Open once shortly after mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const handleResult = (segment: PrizeSegment) => {
    setHasSpun(true);
    setLastSegment(segment);
  };

  const isWin = lastSegment?.isWin ?? false;

  return (
    <>
      <GlassPanel
        open={open}
        onClose={() => setOpen(false)}
        title="Spin to preview prizes"
        maxWidthClass="max-w-3xl"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          <div className="flex justify-center">
            <SpinWheel
              // Narrow to shape expected by wheel component
              segments={segments}
              onResult={(segment) =>
                handleResult(segment as PrizeSegment)
              }
            />
          </div>

          <div className="space-y-4 text-sm text-slate-200">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neon-gold">
                Demo wheel
              </p>
              <p className="mt-1 text-base font-medium text-white">
                Spin for a chance at demo prizes before you play for real.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                This wheel is just a visual preview to show how instant wins
                could feel in King Comps. Real competitions use verified random
                draws.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/40 p-3 text-xs text-slate-200">
              <p className="font-semibold text-slate-100">Demo prizes</p>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <span className="text-emerald-300">iPhone 15</span> – top tech
                  showcase.
                </li>
                <li>
                  <span className="text-sky-300">$100 Cash</span> – instant
                  balance boost.
                </li>
                <li>
                  <span className="text-amber-300">2 Free Spins</span> – extra
                  demo goes.
                </li>
                <li className="text-slate-400">
                  Plus a few{" "}
                  <span className="font-medium text-slate-200">duds</span> to
                  keep it real.
                </li>
              </ul>
            </div>

            {hasSpun && lastSegment && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs">
                {isWin ? (
                  <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      Demo win unlocked
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      You spun <span className="text-neon-gold">{lastSegment.label}</span>
                      !
                    </p>
                    {lastSegment.description && (
                      <p className="mt-1 text-[11px] text-slate-300">
                        {lastSegment.description}
                      </p>
                    )}
                    <p className="mt-3 text-[11px] text-slate-400">
                      This is a demo win example. Tap below to open the login
                      popup – no real account required.
                    </p>
                    <div className="mt-3">
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                      No win this time
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      You landed on{" "}
                      <span className="text-slate-100">{lastSegment.label}</span>.
                    </p>
                    {lastSegment.description && (
                      <p className="mt-1 text-[11px] text-slate-300">
                        {lastSegment.description}
                      </p>
                    )}
                    <p className="mt-3 text-[11px] text-slate-400">
                      This wheel is just for fun – you can still enter the live
                      competitions from the homepage.
                    </p>
                  </>
                )}
              </div>
            )}

            {!hasSpun && (
              <p className="text-[11px] text-slate-400">
                Tap the centre of the wheel to spin. One quick demo spin, no
                account needed.
              </p>
            )}
          </div>
        </div>

        {isWin && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          >
            {/* Simple confetti-style sparkles using animated dots */}
            <div className="absolute inset-0 animate-[ping_1.5s_ease-out_infinite] bg-[radial-gradient(circle_at_20%_20%,rgba(129,230,217,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(250,204,21,0.35),transparent_55%),radial-gradient(circle_at_10%_80%,rgba(56,189,248,0.4),transparent_55%)]" />
          </div>
        )}
      </GlassPanel>

      <LoginDialog
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}



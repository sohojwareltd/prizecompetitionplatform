"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { competitions } from "../../data/competitions";
import { NeonButton } from "../../components/ui/NeonButton";
import { CountdownTimer } from "../../components/ui/CountdownTimer";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { GlassPanel } from "../../components/ui/GlassPanel";
import { motion } from "framer-motion";
import { useState } from "react";

type Step = 1 | 2 | 3;

const CONFETTI_COLORS = ["#5A2BFF", "#E8C96F", "#4DA6FF", "#FFFFFF"];

function ConfettiBurst() {
  const pieces = Array.from({ length: 48 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, index) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const rotate = Math.random() * 360;
        const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];

        return (
          <motion.span
            key={index}
            className="absolute h-2 w-1 rounded-sm"
            style={{
              left: `${left}%`,
              top: -10,
              backgroundColor: color,
            }}
            initial={{ y: -20, opacity: 0, scale: 0.9, rotate }}
            animate={{ y: [ -20, 140, -20 ], opacity: [0, 1, 0.4] }}
            transition={{
              duration: 7,
              ease: "easeOut",
              delay,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
}

export default function EnterCompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const competition = competitions.find((c) => c.id === id);
  const [step, setStep] = useState<Step>(1);
  const [ticketCount, setTicketCount] = useState(5);
  const [showSummary, setShowSummary] = useState(false);
  const reference = `KC-${String(id).padStart(6, "0")}`;

  if (!competition) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-semibold text-white">
          Competition not found
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          This entry link may be outdated or the competition has already ended.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/competitions">
            <NeonButton>View live competitions</NeonButton>
          </Link>
        </div>
      </div>
    );
  }

  const target = new Date();
  target.setDate(target.getDate() + competition.endsInDays);

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-3">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-emerald-400">
          Enter competition
        </p>
        <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          {competition.title}
        </h1>
        <p className="max-w-xl text-sm text-slate-300">
          Follow the three simple steps below to complete your entry. You&apos;ll
          see a confirmation in your dashboard as soon as payment is processed.
        </p>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-[#121222] px-3 py-1 text-slate-200">
            Ticket price{" "}
            <span className="ml-1 font-heading text-neon-gold">
              {competition.price}
            </span>
          </span>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-[#121222] px-3 py-1 text-slate-300">
            Max {competition.ticketsPerUser ?? 50} tickets per player
          </span>
        </div>
      </header>

      {/* Step indicator */}
      <section className="mb-6 rounded-2xl border border-white/10 bg-[#121222] p-4">
        <div className="mb-3 flex flex-col gap-3 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {["Tickets", "Login", "Payment"].map((label, index) => {
              const current = (index + 1) as Step;
              const active = step === current;
              const done = step > current;
              return (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-royal-gradient text-white"
                        : "border border-white/30 text-slate-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={
                      active ? "text-white font-medium" : "text-slate-400"
                    }
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <span className="mx-2 h-px w-5 bg-white/10" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
          <span className="text-[11px] text-slate-400">
            Step {step} of 3 • {progress}% complete
          </span>
        </div>
        <ProgressBar value={progress} showLabel={false} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
        {/* Left: main step content */}
        <section className="space-y-4">
          {step === 1 && (
            <div className="rounded-2xl border border-white/10 bg-[#121222] p-5">
              <h2 className="font-heading text-base font-semibold text-white">
                1. Select your tickets
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Adjust how many tickets you want. You&apos;ll see a running total
                before moving on.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#17172a] px-4 py-3">
                <div>
                  <p className="text-xs text-slate-400">Tickets</p>
                  <p className="font-heading text-lg text-white">
                    {ticketCount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="h-9 w-9 rounded-full border border-white/20 bg-transparent text-lg text-slate-200 disabled:opacity-40"
                    onClick={() =>
                      setTicketCount((c) => Math.max(1, c - 1))
                    }
                    disabled={ticketCount <= 1}
                  >
                    -
                  </button>
                  <button
                    className="h-9 w-9 rounded-full bg-royal-gradient text-lg text-white"
                    onClick={() =>
                      setTicketCount((c) => Math.min(99, c + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                <span>Estimated total</span>
                <span className="font-heading text-base text-neon-gold">
                  £{(ticketCount * 2.99).toFixed(2)}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <NeonButton size="sm" onClick={() => setStep(2)}>
                  Continue to login
                </NeonButton>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-white/10 bg-[#121222] p-5">
              <h2 className="font-heading text-base font-semibold text-white">
                2. Log in or confirm details
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Use your King Comps account so we can assign tickets and contact
                you if you win.
              </p>
              <form className="mt-4 space-y-3 text-xs text-slate-300">
                <label className="block space-y-1">
                  <span>Email</span>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block space-y-1">
                  <span>Password</span>
                  <input
                    type="password"
                    className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
                    placeholder="••••••••"
                  />
                </label>
                <p className="text-[11px] text-slate-400">
                  No account yet? Use this step as a placeholder for your
                  combined login / sign-up flow.
                </p>
              </form>
              <div className="mt-4 flex justify-between gap-3">
                <NeonButton
                  size="sm"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </NeonButton>
                <NeonButton size="sm" onClick={() => setStep(3)}>
                  Continue to payment
                </NeonButton>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl border border-white/10 bg-[#121222] p-5">
              <h2 className="font-heading text-base font-semibold text-white">
                3. Choose payment method
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Card and PayPal blocks below are placeholders – replace with your
                live integrations.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#17172a] p-4 text-xs text-slate-300">
                  <p className="font-heading text-sm text-white">
                    Card payment (Stripe)
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Drop your Stripe Elements or payment sheet here.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#17172a] p-4 text-xs text-slate-300">
                  <p className="font-heading text-sm text-white">PayPal</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Use the official PayPal button component or SDK integration.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between gap-3 text-[11px] text-slate-400">
                <NeonButton
                  size="sm"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Back
                </NeonButton>
                <NeonButton size="sm" onClick={() => setShowSummary(true)}>
                  Confirm &amp; place entries
                </NeonButton>
              </div>
            </div>
          )}
        </section>

        {/* Right: summary */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#121222] p-5 text-xs text-slate-300">
            <h2 className="font-heading text-sm font-semibold text-white">
              Entry summary
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              A quick snapshot of the competition and your current selection.
            </p>
            <div className="mt-3 space-y-2">
              <p className="font-heading text-sm text-white">
                {competition.title}
              </p>
              <p className="text-slate-300">
                {ticketCount} ticket(s) • {competition.price} each
              </p>
              <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
                <div className="space-y-0.5">
                  <p className="text-slate-500">Estimated total</p>
                  <p className="font-heading text-neon-gold">
                    £{(ticketCount * 2.99).toFixed(2)}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-slate-500">Entry reference</p>
                  <p className="font-mono text-slate-200">{reference}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-[#17172a] p-3">
              <CountdownTimer targetDate={target} size="sm" />
            </div>
          </div>
        </aside>
      </div>

      <GlassPanel
        open={showSummary}
        onClose={() => setShowSummary(false)}
        title="Entry placed"
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#121222] p-4 sm:p-5">
          <ConfettiBurst />
          <div className="relative space-y-3 text-sm text-slate-200">
            <p className="font-heading text-base text-white">
              🎉 You&apos;re in the draw! Your entries have been recorded and will
              appear in your dashboard within a few seconds.
            </p>
            <div className="rounded-xl bg-[#17172a] p-3 text-xs text-slate-200">
              <p className="font-heading text-sm text-white">
                {competition.title}
              </p>
              <p className="mt-1 text-slate-300">
                {ticketCount} ticket(s) • est. total £
                {(ticketCount * 2.99).toFixed(2)}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Entry ID: <span className="text-neon-gold">{reference}</span>{" "}
                • Player: player***@mail.com
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              In a real build, replace the placeholder email and entry ID with
              values returned from your API, and include a link back to the
              player&apos;s dashboard so they can review all of their active
              competitions.
            </p>
            <div className="mt-3 flex justify-end gap-3">
              <Link href="/dashboard">
                <NeonButton size="sm" variant="outline">
                  Go to dashboard
                </NeonButton>
              </Link>
              <NeonButton
                size="sm"
                onClick={() => setShowSummary(false)}
              >
                Close
              </NeonButton>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}



"use client";

import { useParams, useRouter } from "next/navigation";
import { competitions } from "../../data/competitions";
import { CountdownTimer } from "../../components/ui/CountdownTimer";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { NeonButton } from "../../components/ui/NeonButton";
import { GlassPanel } from "../../components/ui/GlassPanel";
import { useState } from "react";

const faqs = [
  {
    q: "How do I know if I’ve won?",
    a: "We email and notify the winner in their dashboard immediately after the live draw finishes. Winner details are also added to the Winners page.",
  },
  {
    q: "Is there a maximum number of tickets?",
    a: "Yes. Every competition has a clearly displayed maximum ticket limit per user and total ticket cap for fairness.",
  },
  {
    q: "When does the draw take place?",
    a: "Draws are scheduled when either the timer ends or the competition sells out, whichever comes first. The countdown on this page stays in sync.",
  },
];

export default function CompetitionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [ticketCount, setTicketCount] = useState(5);
  const [showSummary, setShowSummary] = useState(false);

  const competition = competitions.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-slate-900">
          Competition not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This competition may have ended or doesn&apos;t exist.
        </p>
        <div className="mt-6 flex justify-center">
          <NeonButton onClick={() => router.push("/competitions")}>
            Back to competitions
          </NeonButton>
        </div>
      </div>
    );
  }

  const target = new Date();
  target.setDate(target.getDate() + competition.endsInDays);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Hero / prize */}
        <section className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#a2d9ff] via-[#c7ffe8] to-[#ffe6a7] p-[2px] shadow-neon-purple">
            <div className="glass-panel rounded-[1.4rem] p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.9),transparent_55%),radial-gradient(circle_at_85%_120%,rgba(255,255,255,0.9),transparent_55%)] mix-blend-screen" />
                <div className="relative flex h-52 items-end justify-between p-4 sm:h-64 sm:p-6">
                  <div>
                    <span className="inline-flex rounded-full bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white">
                      {competition.category}
                    </span>
                    <h1 className="mt-3 max-w-xl font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
                      {competition.title}
                    </h1>
                  </div>
                  <div className="rounded-2xl bg-black/65 px-4 py-2 text-right text-xs text-emerald-200">
                    <p>Ticket price</p>
                    <p className="font-heading text-lg font-semibold text-white">
                      {competition.price}
                    </p>
                    <p>Max {competition.ticketsPerUser ?? 50} / user</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl bg-white/80 p-4 shadow-sm sm:grid-cols-2">
            <div>
              <h2 className="font-heading text-sm font-semibold text-slate-900">
                Draw details
              </h2>
              <div className="mt-2 text-xs text-slate-600 space-y-1.5">
                <p>Draw in {competition.endsInDays} days (or earlier if sold out).</p>
                <p>Fully randomised, independently verified digital draw.</p>
                <p>Instant winner reveal and dashboard update.</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold text-slate-900">
                Tickets &amp; odds
              </h2>
              <div className="mt-2 text-xs text-slate-600 space-y-1.5">
                <p>Low ticket caps keep odds friendly and transparent.</p>
                <p>No subscription needed – pay only for the draws you enter.</p>
                <p>Entries visible in your dashboard in real time.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CountdownTimer targetDate={target} size="md" />
              <div className="min-w-[220px] flex-1">
                <ProgressBar value={competition.progress} />
              </div>
            </div>
          </div>
        </section>

        {/* Ticket selector */}
        <aside className="space-y-5">
          <div className="glass-panel rounded-3xl p-5 shadow-glass">
            <h2 className="font-heading text-base font-semibold text-slate-900">
              Select your tickets
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Pick your entries for this competition. You can review everything
              before payment.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-xs text-slate-500">Tickets</p>
                <p className="font-heading text-lg text-slate-900">
                  {ticketCount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="h-9 w-9 rounded-full border border-slate-200 bg-white text-lg text-slate-600 disabled:opacity-40"
                  onClick={() =>
                    setTicketCount((c) => Math.max(1, c - 1))
                  }
                  disabled={ticketCount <= 1}
                >
                  -
                </button>
                <button
                  className="h-9 w-9 rounded-full border border-emerald-400 bg-emerald-50 text-lg text-emerald-700"
                  onClick={() =>
                    setTicketCount((c) => Math.min(99, c + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
              <span>Estimated total</span>
              <span className="font-heading text-base text-slate-900">
                {/* purely illustrative calculation */}
                £{(ticketCount * 2.99).toFixed(2)}
              </span>
            </div>

            <NeonButton
              fullWidth
              size="md"
              className="mt-4"
              onClick={() => setShowSummary(true)}
            >
              Continue to checkout
            </NeonButton>

            <p className="mt-2 text-[11px] text-slate-500">
              By continuing, you confirm you are over 18 and agree to the
              competition terms.
            </p>
          </div>

          <div className="space-y-3 rounded-3xl bg-white/80 p-4 shadow-sm">
            <h3 className="font-heading text-sm font-semibold text-slate-900">
              Frequently asked
            </h3>
            <div className="space-y-2">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-xs text-slate-700"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                    <span className="font-medium text-slate-900">
                      {item.q}
                    </span>
                    <span className="text-slate-400 group-open:rotate-90">
                      ▶
                    </span>
                  </summary>
                  <p className="mt-1.5 text-xs text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <GlassPanel
        open={showSummary}
        onClose={() => setShowSummary(false)}
        title="Checkout summary"
      >
        <div className="space-y-4 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-900">
              {competition.title}
            </span>
            <span className="text-xs text-slate-500">
              {ticketCount} tickets
            </span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <span>Tickets</span>
              <span>
                {ticketCount} × {competition.price}
              </span>
            </div>
            <div className="flex items-center justify-between font-medium text-slate-900">
              <span>Total</span>
              <span>£{(ticketCount * 2.99).toFixed(2)}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-3">
              <p className="text-xs font-semibold text-slate-900">
                Card (Stripe)
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Secure card payments handled by Stripe. Card UI placeholder.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-3">
              <p className="text-xs font-semibold text-slate-900">
                PayPal
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Express checkout using your PayPal account. Button placeholder.
              </p>
            </div>
          </div>
          <NeonButton fullWidth size="md">
            Confirm &amp; pay
          </NeonButton>
        </div>
      </GlassPanel>
    </div>
  );
}



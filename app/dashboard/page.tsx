"use client";

import { useState } from "react";
import { NeonButton } from "../components/ui/NeonButton";
import { NeonCard } from "../components/ui/NeonCard";

const tabs = ["My entries", "My wins", "Notifications", "Profile"] as const;

export default function DashboardPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("My entries");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.22em] text-emerald-400">
            Your space
          </p>
          <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
            Player dashboard 🎮
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Track entries, check wins, and keep your profile up to date.
          </p>
        </div>
        <NeonButton size="sm">Browse live competitions</NeonButton>
      </header>

      <nav className="mb-6 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const activeTab = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeTab
                  ? "bg-royal-gradient text-white shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
                  : "bg-[#17172a] text-slate-200 border border-white/10 hover:border-emerald-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {active === "My entries" && (
        <section className="grid gap-4 md:grid-cols-2">
          <NeonCard className="p-0">
            <div className="rounded-t-2xl border-b border-white/5 bg-[linear-gradient(135deg,#1A1A2C,#151526)] px-4 py-3">
              <h2 className="font-heading text-sm font-semibold text-white">
                Upcoming draws 🔔
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Your next few competitions. This is placeholder data.
              </p>
            </div>
            <div className="px-4 pb-4 pt-3 text-xs text-slate-200">
              <ul className="space-y-2">
                <li className="rounded-xl bg-[#17172a] px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-heading text-sm text-white">
                      Tesla Model X Plaid
                    </span>
                    <span className="rounded-full bg-[#0F0F19] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      Cars
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>5 tickets</span>
                    <span>Draws in 2 days</span>
                  </div>
                </li>
                <li className="rounded-xl bg-[#17172a] px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-heading text-sm text-white">
                      £50,000 cash drop
                    </span>
                    <span className="rounded-full bg-[#0F0F19] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      Cash
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>10 tickets</span>
                    <span>Draws in 1 day</span>
                  </div>
                </li>
              </ul>
            </div>
          </NeonCard>
          <NeonCard className="p-0">
            <div className="rounded-t-2xl border-b border-white/5 bg-[linear-gradient(135deg,#1A1A2C,#151526)] px-4 py-3">
              <h2 className="font-heading text-sm font-semibold text-white">
                Entry stats 📊
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Quick overview of your play pattern.
              </p>
            </div>
            <div className="px-4 pb-4 pt-3">
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-xl bg-[#17172a] px-3 py-2">
                  <p className="font-heading text-lg text-white">24</p>
                  <p className="text-[11px] text-slate-400">Entries</p>
                </div>
                <div className="rounded-xl bg-[#17172a] px-3 py-2">
                  <p className="font-heading text-lg text-white">3</p>
                  <p className="text-[11px] text-slate-400">Active</p>
                </div>
                <div className="rounded-xl bg-[#17172a] px-3 py-2">
                  <p className="font-heading text-lg text-white">1</p>
                  <p className="text-[11px] text-slate-400">Wins</p>
                </div>
              </div>
            </div>
          </NeonCard>
        </section>
      )}

      {active === "My wins" && (
        <section className="space-y-3">
          <NeonCard className="p-4">
            <h2 className="font-heading text-sm font-semibold text-white">
              Recent wins 🏆
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              This is placeholder content – wire up to your real data.
            </p>
            <div className="mt-3 rounded-2xl bg-[linear-gradient(135deg,#E8C96F,#F0DFA5)] px-4 py-3 text-xs text-[#0F0F19]">
              🎉 You won £500 tech voucher – ticket #KC10234
            </div>
          </NeonCard>
        </section>
      )}

      {active === "Notifications" && (
        <section className="space-y-3">
          <NeonCard className="p-4">
            <h2 className="font-heading text-sm font-semibold text-white">
              Alerts &amp; updates 🔔
            </h2>
            <ul className="mt-2 space-y-2 text-xs text-slate-200">
              <li>• Draw reminder: Tesla Model X Plaid – tomorrow at 8pm.</li>
              <li>• New competition: Ultimate Summer Cash Bundle now live.</li>
            </ul>
          </NeonCard>
        </section>
      )}

      {active === "Profile" && (
        <section className="space-y-3">
          <NeonCard className="p-4">
            <h2 className="font-heading text-sm font-semibold text-white">
              Profile settings 👤
            </h2>
            <form className="mt-3 space-y-3 text-xs text-slate-200">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1">
                  <span>Full name</span>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
                    placeholder="Jane Player"
                  />
                </label>
                <label className="space-y-1">
                  <span>Email</span>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="space-y-1 block">
                <span>Address</span>
                <input
                  className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
                  placeholder="For prize delivery"
                />
              </label>
              <NeonButton size="sm">Save profile</NeonButton>
            </form>
          </NeonCard>
        </section>
      )}
    </div>
  );
}



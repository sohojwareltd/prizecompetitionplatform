"use client";

import { useMemo, useState } from "react";
import { NeonButton } from "../components/ui/NeonButton";
import { NeonCard } from "../components/ui/NeonCard";

type Winner = {
  name: string;
  prize: string;
  ticket: string;
  location: string;
  date: string; // ISO date for filtering/sorting
};

const winners: Winner[] = [
  {
    name: "Alex M.",
    prize: "Tesla Model X Plaid",
    ticket: "#KC10421",
    location: "London, UK",
    date: "2025-11-28",
  },
  {
    name: "Priya S.",
    prize: "£50,000 tax-free cash",
    ticket: "#KC98231",
    location: "Birmingham, UK",
    date: "2025-11-24",
  },
  {
    name: "Liam R.",
    prize: "Ultimate Gaming Vault",
    ticket: "#KC76210",
    location: "Manchester, UK",
    date: "2025-11-15",
  },
];

export default function WinnersPage() {
  const [ticketQuery, setTicketQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "7" | "30">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    const now = new Date();

    let list = [...winners];

    // Filter by ticket (simple contains match, case-insensitive)
    if (ticketQuery.trim()) {
      const query = ticketQuery.trim().toLowerCase();
      list = list.filter((w) => w.ticket.toLowerCase().includes(query));
    }

    // Filter by date window
    if (dateFilter !== "all") {
      const days = parseInt(dateFilter, 10);
      const cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - days);

      list = list.filter((w) => {
        const d = new Date(w.date);
        return d >= cutoff;
      });
    }

    // Sort by date
    list.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return list;
  }, [ticketQuery, dateFilter, sortOrder]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-3 sm:mb-8">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-amber-400">
          Recent winners
        </p>
        <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          Hall of fame 🎉
        </h1>
        <p className="max-w-xl text-sm text-slate-300">
          Search by ticket number or filter by draw date so players can quickly
          find and understand real wins.
        </p>
      </header>

      {/* Filters */}
      <section className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#111122] p-4 text-xs text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
          <div className="w-full sm:max-w-md">
            <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Filter by ticket
            </label>
            <input
              value={ticketQuery}
              onChange={(e) => setTicketQuery(e.target.value)}
              placeholder="#KC12345"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/50"
            />
          </div>

          <div className="flex gap-2 sm:w-[320px]">
            <div className="flex-1">
              <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Date range
              </label>
              <div className="inline-flex gap-1 rounded-2xl border border-white/12 bg-black/30 p-1">
                {[
                  { value: "all", label: "All time" },
                  { value: "7", label: "Last 7 days" },
                  { value: "30", label: "Last 30 days" },
                ].map((opt) => {
                  const active = dateFilter === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setDateFilter(opt.value as "all" | "7" | "30")
                      }
                      className={`rounded-xl px-3 py-1.5 text-[11px] font-medium leading-none whitespace-nowrap transition-colors ${
                        active
                          ? "bg-amber-300 text-[#0F0F19] shadow-[0_0_0_1px_rgba(248,220,141,0.6)]"
                          : "bg-transparent text-slate-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 min-w-[140px]">
              <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Sort
              </label>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-100 outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/50"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        {(ticketQuery || dateFilter !== "all" || sortOrder !== "newest") && (
          <button
            type="button"
            onClick={() => {
              setTicketQuery("");
              setDateFilter("all");
              setSortOrder("newest");
            }}
            className="self-start rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[11px] text-slate-200 shadow-sm hover:border-amber-400/70 hover:bg-amber-400/10 hover:text-white sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </section>

      {/* Results */}
      <section className="grid gap-5 md:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center text-xs text-slate-300">
            No winners match those filters yet. Try adjusting the ticket or date
            range.
          </div>
        ) : (
          filtered.map((w) => {
            const formattedDate = new Date(w.date).toLocaleDateString(
              undefined,
              { year: "numeric", month: "short", day: "numeric" }
            );

            return (
              <NeonCard key={w.ticket} className="flex h-full flex-col p-0">
                <div className="relative rounded-t-2xl bg-[linear-gradient(135deg,#E8C96F,#F0DFA5)] px-4 py-3 text-xs text-[#0F0F19]">
                  <p className="font-heading font-semibold tracking-[0.16em] uppercase">
                    Winner
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold">
                    {w.name}
                  </p>
                  <p className="text-[11px] text-[#3d2b12]">{w.location}</p>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-2 rounded-b-2xl bg-[#151526] p-4 text-xs text-slate-200">
                  <div className="space-y-1.5">
                    <p className="font-heading text-sm text-white">{w.prize}</p>
                    <p className="text-slate-300">Winning ticket: {w.ticket}</p>
                    <p className="text-[11px] text-slate-400">
                      Draw date:{" "}
                      <span className="font-medium text-amber-200">
                        {formattedDate}
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Draw hosted live with instant verification and dashboard
                      update. Replace this copy with real draw notes or a link
                      to the draw recording.
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-400">
                    <span>Draw type: Standard</span>
                    <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                      Verified
                    </span>
                  </div>
                </div>
              </NeonCard>
            );
          })
        )}
      </section>

      <section className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-[#121222] px-4 py-6 text-center text-sm text-slate-200">
        <p className="max-w-2xl text-xs text-slate-300">
          Confetti animation placeholder – when connected to real draw results,
          trigger your preferred confetti effect the moment a winning ticket is
          confirmed.
        </p>
        <NeonButton size="sm">Enter a competition</NeonButton>
      </section>
    </div>
  );
}



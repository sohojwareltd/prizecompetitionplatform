"use client";

import { FiltersBar } from "../components/filters/FiltersBar";
import { CompetitionCard } from "../components/competitions/CompetitionCard";
import { competitions } from "../data/competitions";
import { useState } from "react";

export default function CompetitionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? competitions
      : competitions.filter((c) => c.category === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="mb-6 space-y-2">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-emerald-400">
          Live draws
        </p>
        <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          Choose your next{" "}
          <span className="bg-royal-gradient bg-clip-text text-transparent">
            fun competition
          </span>
        </h1>
        <p className="max-w-xl text-sm text-slate-300">
          All competitions are fully verified with transparent countdowns and
          capped ticket numbers.
        </p>
      </section>

      <section className="space-y-4">
        <FiltersBar active={activeFilter} onChange={setActiveFilter} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((comp) => (
            <CompetitionCard key={comp.id} competition={comp} />
          ))}
        </div>
      </section>
    </div>
  );
}



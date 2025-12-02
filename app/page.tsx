 "use client";

import { HeroSection } from "./components/sections/HeroSection";
import { FiltersBar } from "./components/filters/FiltersBar";
import { CompetitionCard } from "./components/competitions/CompetitionCard";
import { competitions } from "./data/competitions";
import { useState } from "react";

function LiveCompetitionsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? competitions
      : competitions.filter((c) => c.category === activeFilter);

  return (
    <section className="mx-auto mt-2 max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">
            Live competitions
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Bright, carefully structured draws with cars, cash and tech – built for mobile.
          </p>
        </div>
        <FiltersBar active={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((comp) => (
          <CompetitionCard key={comp.id} competition={comp} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveCompetitionsSection />
    </>
  );
}



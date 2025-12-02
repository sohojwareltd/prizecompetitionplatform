"use client";

import clsx from "classnames";

const categories = [
  { id: "all", label: "All" },
  { id: "cars", label: "Cars" },
  { id: "cash", label: "Cash" },
  { id: "tech", label: "Tech" },
  { id: "lifestyle", label: "Lifestyle" },
];

interface FiltersBarProps {
  active: string;
  onChange: (id: string) => void;
}

export function FiltersBar({ active, onChange }: FiltersBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={clsx(
              "relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              isActive
                ? "border-2 border-emerald-400 bg-white text-emerald-700 shadow-sm"
                : "border border-white/10 bg-white/5 text-slate-200 hover:border-emerald-300 hover:bg-white/10"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}



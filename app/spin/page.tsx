import { SpinWheel } from "../components/game/SpinWheel";

const demoSegments = [
  {
    id: "extra-entries-5",
    label: "5 extra entries",
    description: "We’ll add 5 bonus entries to your next eligible draw.",
    color: "#FACC15",
  },
  {
    id: "discount-10",
    label: "10% off",
    description: "Use your bonus on your next competition checkout.",
    color: "#22D3EE",
  },
  {
    id: "no-bonus",
    label: "Better luck",
    description: "No bonus this time, but you’re still in the main draw.",
    color: "#4B5563",
  },
  {
    id: "extra-entries-10",
    label: "10 extra entries",
    description: "Big boost to your odds on a future competition.",
    color: "#A855F7",
  },
  {
    id: "discount-5",
    label: "5% off",
    description: "Small discount for your next purchase.",
    color: "#0EA5E9",
  },
  {
    id: "free-ticket",
    label: "Free ticket",
    description: "A free standard ticket on a selected competition.",
    color: "#F97316",
  },
] as const;

export default function SpinPage() {
  return (
    <main className="min-h-screen bg-[#050516]">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Spin wheel only – no text above */}
        <SpinWheel segments={demoSegments} />

        {/* Legend showing which colour = which prize */}
        <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {demoSegments.map((segment) => (
            <div
              key={segment.id}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <span
                className="h-4 w-4 rounded-full border border-white/40"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-xs font-medium text-slate-100">
                {segment.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}



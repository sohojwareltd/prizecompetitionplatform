import { NeonCard } from "../components/ui/NeonCard";

const steps = [
  {
    title: "Pick a competition",
    body: "Browse cars, cash and tech competitions. Each card clearly shows ticket price, draw date and live ticket progress so you know exactly what you’re entering.",
    meta: ["See total ticket cap", "Check current fill %", "Review prize details up front"],
  },
  {
    title: "Choose your tickets",
    body: "Select how many tickets you want with a simple + / – control. Your estimated total updates instantly so there are no surprises at checkout.",
    meta: ["Secure card or PayPal checkout", "Instant entry confirmation", "Strict age & location checks"],
  },
  {
    title: "Watch the live draw",
    body: "When the timer reaches zero or the competition sells out, we run a verified digital draw and publish the winning ticket instantly in the Winners area.",
    meta: ["Independently verified RNG", "Public winner announcement", "Full audit trail of the draw"],
  },
];

const stepIcons = [
  // Browse / discover
  (
    <svg
      key="browse"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-neon-gold"
      aria-hidden="true"
    >
      <path
        d="M4 6.5C4 5.12 5.12 4 6.5 4h11A2.5 2.5 0 0 1 20 6.5V9H4V6.5Z"
        fill="currentColor"
      />
      <path
        d="M4 11h16v6.5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5V11Z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="8" cy="9" r="1" fill="#0F0F19" />
    </svg>
  ),
  // Tickets / cart
  (
    <svg
      key="tickets"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-neon-gold"
      aria-hidden="true"
    >
      <path
        d="M6 5h13l-1.2 7.2A2 2 0 0 1 15.82 14H9.1a2 2 0 0 1-1.96-1.6L6 5Z"
        fill="currentColor"
      />
      <path
        d="M9 18.5a1.25 1.25 0 1 1-2.5 0A1.25 1.25 0 0 1 9 18.5Zm8.5 0A1.25 1.25 0 1 1 15.25 17 1.25 1.25 0 0 1 17.5 18.5Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  ),
  // Live draw
  (
    <svg
      key="live"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-neon-gold"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M11 9v4l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-3">
        <p className="font-heading text-xs uppercase tracking-[0.22em] text-emerald-400">
          Simple flow
        </p>
        <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          How King Comps works
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          A calm, three–step experience designed for clarity and trust. No confusing
          rules, no hidden subscriptions – just clearly priced competitions, transparent
          countdowns and verified draws.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <NeonCard key={step.title} className="flex h-full flex-col gap-3 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon-gold/60 bg-[#141423] text-xs font-heading text-neon-gold">
                {stepIcons[index]}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Step {index + 1}
                </span>
                <h2 className="font-heading text-sm font-semibold text-white">
                  {step.title}
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-300">{step.body}</p>
            <ul className="mt-1 space-y-1 text-[11px] text-slate-400">
              {step.meta.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </NeonCard>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <NeonCard className="p-5 text-xs text-slate-300">
          <h3 className="font-heading text-sm font-semibold text-white">
            Fair play by design
          </h3>
          <p className="mt-2">
            Every competition has a clearly published ticket cap, draw date and set
            of rules. Once a competition is live, we don&apos;t change the odds or
            move the goalposts.
          </p>
        </NeonCard>
        <NeonCard className="p-5 text-xs text-slate-300">
          <h3 className="font-heading text-sm font-semibold text-white">
            Secure payments
          </h3>
          <p className="mt-2">
            Payments are handled by trusted providers like Stripe and PayPal. We
            never store raw card details on our servers.
          </p>
        </NeonCard>
        <NeonCard className="p-5 text-xs text-slate-300">
          <h3 className="font-heading text-sm font-semibold text-white">
            Responsible entries
          </h3>
          <p className="mt-2">
            We encourage sensible play with clear limits, optional reminders and easy
            access to your full entry history in the dashboard.
          </p>
        </NeonCard>
      </section>
    </div>
  );
}



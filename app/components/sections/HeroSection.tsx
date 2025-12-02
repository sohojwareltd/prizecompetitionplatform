"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NeonButton } from "../ui/NeonButton";
import { CountdownTimer } from "../ui/CountdownTimer";

export function HeroSection() {
  const router = useRouter();

  const target = new Date();
  target.setDate(target.getDate() + 3);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#131328,#0F0F19)] pb-10 pt-6 sm:pb-14 sm:pt-10">
      <div className="hero-particles opacity-70" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="relative z-10 flex-1 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-gold" />
            Nightly royal draws
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Win{" "}
            <span className="bg-royal-gradient bg-clip-text text-transparent">
              cars, cash &amp; tech
            </span>{" "}
            in solid Royale competitions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="max-w-xl text-sm text-slate-300 sm:text-base"
          >
            Low–odds, clearly structured competitions with transparent draws and
            instant entry tracking. Designed for a calm, premium experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <div className="flex gap-3">
              <NeonButton
                size="lg"
                onClick={() => router.push("/competitions")}
              >
                Browse live comps
              </NeonButton>
              <NeonButton
                size="lg"
                variant="outline"
                onClick={() => router.push("/winners")}
              >
                See recent winners
              </NeonButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-2"
          >
            <CountdownTimer targetDate={target} size="sm" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative z-10 mt-4 flex flex-1 justify-center lg:mt-0"
        >
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-10 rounded-[1.75rem] bg-royal-gradient opacity-35 blur-3xl" />
            <div className="relative rounded-[1.5rem] bg-[#11111F] p-[1px] shadow-[0_22px_40px_rgba(0,0,0,0.8)]">
              <div className="glass-panel rounded-[1.45rem] p-4 sm:p-5">
                <div className="relative overflow-hidden rounded-2xl bg-[#1A1A2C]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />
                  <div className="relative p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                        Featured draw
                      </span>
                      <span className="text-xs font-semibold text-neon-gold">
                        £2.99 / ticket
                      </span>
                    </div>
                    <p className="font-heading text-lg font-semibold text-white sm:text-xl">
                      2024 Lamborghini Huracán EVO + £20,000 cash
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Ultra–low odds. Max 10 tickets per person.
                    </p>
                    <div className="mt-4 rounded-2xl bg-[#141423] p-3 shadow-sm">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>Tickets sold</span>
                        <span>68% full</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#202036]">
                        <div className="h-full w-[68%] bg-royal-gradient" />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                        <span>Draws in 3 days</span>
                        <span className="font-semibold text-emerald-700">
                          Ticket #KC84231
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



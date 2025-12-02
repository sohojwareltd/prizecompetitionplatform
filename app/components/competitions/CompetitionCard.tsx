"use client";

import Image from "next/image";
import Link from "next/link";
import { NeonCard } from "../ui/NeonCard";
import { CountdownTimer } from "../ui/CountdownTimer";
import { ProgressBar } from "../ui/ProgressBar";
import { NeonButton } from "../ui/NeonButton";
import type { Competition } from "../../data/competitions";

interface CompetitionCardProps {
  competition: Competition;
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const target = new Date();
  target.setDate(target.getDate() + competition.endsInDays);

  // Map competition category to a hero image from /public/images
  const imageSrc =
    competition.category === "cars"
      ? "/images/tesla-model-x.jpg"
      : competition.category === "cash"
      ? "/images/cash.jpg"
      : competition.category === "tech"
      ? "/images/gamingpc.jpg"
      : "/images/tesla-model-x.jpg";

  return (
    <NeonCard className="p-4">
      <div className="flex flex-col gap-3">
        <div className="relative overflow-hidden rounded-xl bg-[#1A1A2C] aspect-[16/9]">
          <Image
            src={imageSrc}
            alt={competition.title}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={competition.id === "1"}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.65))]" />
          <div className="relative flex h-full items-start justify-between p-3 sm:p-4">
            <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
              {competition.category}
            </span>
            <span className="rounded-full bg-black/75 px-3 py-1 text-[11px] text-neon-gold">
              {competition.price} / ticket
            </span>
          </div>
        </div>

        <h3 className="font-heading text-sm font-semibold text-white sm:text-base">
          {competition.title}
        </h3>

        <div className="flex items-center justify-between text-[11px] text-slate-300">
          <span>Draw in {competition.endsInDays} days</span>
          <span className="text-neon-blue">
            Max {competition.ticketsPerUser ?? 50} tickets / user
          </span>
        </div>

        <ProgressBar value={competition.progress} />

        <div className="mt-1 flex items-center justify-between gap-2 rounded-xl bg-[#121222] px-3 py-2">
          <CountdownTimer targetDate={target} size="sm" />
        </div>

        <Link href={`/enter/${competition.id}`} className="mt-1 block">
          <NeonButton fullWidth size="sm">
            Enter this competition
          </NeonButton>
        </Link>
      </div>
    </NeonCard>
  );
}



"use client";

import { GlassPanel } from "../ui/GlassPanel";
import { NeonButton } from "../ui/NeonButton";
import type { FormEvent } from "react";

interface RegisterDialogProps {
  open: boolean;
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterDialog({
  open,
  onClose,
  onSwitchToLogin,
}: RegisterDialogProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <GlassPanel open={open} onClose={onClose} title="Create an account">
      <p className="mb-3 text-sm text-slate-300">
        Set up your King Comps account in seconds so you can track entries and
        wins.
      </p>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121222] px-3 py-1 text-[11px] text-slate-300">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-gold" />
        <span>New to King Comps</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-xs text-slate-200"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span>First name</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
              placeholder="First name"
            />
          </label>
          <label className="space-y-1">
            <span>Last name</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
              placeholder="Last name"
            />
          </label>
        </div>
        <label className="block space-y-1">
          <span>Email</span>
          <input
            type="email"
            className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
            placeholder="you@example.com"
          />
        </label>
        <label className="block space-y-1">
          <span>Password</span>
          <input
            type="password"
            className="w-full rounded-xl border border-white/15 bg-[#0F0F19] px-3 py-2 text-xs text-white"
            placeholder="Minimum 8 characters"
          />
        </label>
        <label className="flex items-center gap-2 text-[11px] text-slate-300">
          <input
            type="checkbox"
            className="h-3 w-3 rounded border-slate-500 bg-transparent"
          />
          <span>I confirm I&apos;m over 18 and accept the terms.</span>
        </label>
        <NeonButton fullWidth size="md" type="submit">
          Create account
        </NeonButton>
        <p className="text-[11px] text-slate-400">
          Already have an account?{" "}
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-neon-blue underline-offset-2 hover:underline"
            >
              Log in
            </button>
          ) : (
            <span className="text-neon-blue">Log in</span>
          )}
        </p>
      </form>
    </GlassPanel>
  );
}



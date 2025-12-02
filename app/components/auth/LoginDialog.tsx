"use client";

import { GlassPanel } from "../ui/GlassPanel";
import { NeonButton } from "../ui/NeonButton";
import type { FormEvent } from "react";

interface LoginDialogProps {
  open: boolean;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginDialog({
  open,
  onClose,
  onSwitchToRegister,
}: LoginDialogProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <GlassPanel open={open} onClose={onClose} title="Welcome back">
      <p className="mb-3 text-sm text-slate-300">
        Log in to track entries, view wins, and get draw reminders.
      </p>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121222] px-3 py-1 text-[11px] text-slate-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>Secure player area</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-xs text-slate-200"
      >
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
            placeholder="••••••••"
          />
        </label>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[11px] text-slate-300">
            <input
              type="checkbox"
              className="h-3 w-3 rounded border-slate-500 bg-transparent"
            />
            <span>Keep me logged in</span>
          </label>
          <button type="button" className="text-[11px] text-neon-blue">
            Forgot password?
          </button>
        </div>
        <NeonButton fullWidth size="md" type="submit">
          Log in
        </NeonButton>
        <p className="text-[11px] text-slate-400">
          New here?{" "}
          {onSwitchToRegister ? (
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-neon-blue underline-offset-2 hover:underline"
            >
              Create an account
            </button>
          ) : (
            <span className="text-neon-blue">Create an account</span>
          )}{" "}
          to save your entries.
        </p>
      </form>
    </GlassPanel>
  );
}



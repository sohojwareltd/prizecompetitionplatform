"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0F0F19]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} King Comps. All rights reserved. Licensed
          prize competitions platform.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/how-it-works" className="hover:text-white">
            How it works
          </Link>
          <Link href="/winners" className="hover:text-white">
            Winners
          </Link>
          <Link href="/legal/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}



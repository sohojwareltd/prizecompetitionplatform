import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { MobileCTABar } from "./components/layout/MobileCTABar";
import { Poppins, Inter } from "next/font/google";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "King Comps | Solid Royale Competitions",
  description:
    "Premium prize competitions with a clean, modern Solid Royale experience. Cars, cash, tech, and more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`min-h-screen bg-background text-white ${headingFont.variable} ${bodyFont.variable} font-body`}
      >
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          <div className="pointer-events-none fixed inset-0 bg-royal-radial opacity-70" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-20 md:pb-10">{children}</main>
            <Footer />
            <MobileCTABar />
          </div>
        </div>
      </body>
    </html>
  );
}



"use client";

import Header from "@/components/Header";
import HeroText from "@/components/HeroText";
import HeroChart from "@/components/HeroChart";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      {/* Fixed background layers */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 75% 35%, rgba(60,30,120,.36) 0%, transparent 70%)," +
            "radial-gradient(ellipse 45% 65% at 20% 75%, rgba(10,30,90,.38) 0%, transparent 70%)," +
            "radial-gradient(ellipse 35% 40% at 85% 85%, rgba(20,8,60,.28) 0%, transparent 70%)",
        }}
      />

      {/* Sticky nav */}
      <Header />

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen grid grid-cols-2 items-center pt-[68px] px-[52px] overflow-hidden z-[2]">
        {/* Left: text */}
        <HeroText className="pl-10" />

        {/* Right: chart image */}
        <div className="relative w-full h-full min-h-150">
          <HeroChart />
        </div>
      </section>

      {/* ── STATS ── */}
      <Stats />
    </>
  );
}


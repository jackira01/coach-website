"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroText from "@/components/HeroText";
import HeroChart from "@/components/HeroChart";
import Stats from "@/components/Stats";

// Client-only components (use canvas/DOM APIs)
const Starfield = dynamic(() => import("@/components/Starfield"), { ssr: false });
const RuneBackground = dynamic(() => import("@/components/RuneBackground"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Fixed background layers */}
      <Starfield />
      <div className="nebula-bg" />
      <RuneBackground />

      {/* Sticky nav */}
      <Header />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          paddingTop: "68px",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* Left: text */}
        <HeroText />

        {/* Right: chart image */}
        <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "500px" }}>
          <HeroChart />
        </div>
      </section>

      {/* ── STATS ── */}
      <Stats />
    </>
  );
}


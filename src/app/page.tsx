"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpecsSection from "@/components/SpecsSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Custom luxury trailing cursor with audio haptic response */}
      <CustomCursor />
      {/* 1. Preloader Screen (covers page on load, count to 100%) */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Primary Layout (mounts after preloader finishes) */}
      {isLoaded && (
        <SmoothScroll>
          {/* Animated 3D Parallax Canvas running in the background */}
          <ThreeBackground />

          {/* Floating Glass Navbar */}
          <Navbar />

          {/* Main Layout Sections */}
          <main className="relative w-full z-10 overflow-hidden">
            {/* Drifting Color Play Orbs */}
            <div className="absolute top-[10%] left-[-10%] glow-orb glow-orb-gold opacity-20 pointer-events-none" />
            <div className="absolute top-[40%] right-[-10%] glow-orb glow-orb-amber opacity-15 pointer-events-none" />
            <div className="absolute top-[75%] left-[-15%] glow-orb glow-orb-silver opacity-20 pointer-events-none" />

            <Hero />

            {/* Scroll Target Anchor */}
            <div id="overview" className="h-0 pointer-events-none" />

            {/* Stats — warm gold tinted background for color play */}
            <StatsSection />

            <FeaturedProperties />

            {/* Testimonials — dark amber mid section for color contrast */}
            <TestimonialsSection />

            <SpecsSection />

            <BookingSection />
          </main>

          {/* Footer Signoff */}
          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}

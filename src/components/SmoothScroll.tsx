"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cinematic ease-out
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly dampened scroll speed for elegance
      touchMultiplier: 1.5,
    });

    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Save lenis to window so other components (like GSAP ScrollTrigger) can reference it if needed
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

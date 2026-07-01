"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Web Audio API Synthesis for luxury haptic feedbacks
function playHoverSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    // Soft, low-frequency block hum
    osc.frequency.setValueAtTime(130, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.015, ctx.currentTime); // very soft
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    // Fail silently if browser blocks autoplay or AudioContext is restricted
  }
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  // Trailing ring coordinates (higher spring mass for smooth drag)
  const ringX = useSpring(mouse.x, { damping: 35, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouse.y, { damping: 35, stiffness: 220, mass: 0.6 });

  // Core dot coordinates (low damping for instant track)
  const dotX = useSpring(mouse.x, { damping: 15, stiffness: 450, mass: 0.1 });
  const dotY = useSpring(mouse.y, { damping: 15, stiffness: 450, mass: 0.1 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".glass-card") ||
        target.closest("select") ||
        target.closest("option");

      if (isInteractive) {
        setHovered((prev) => {
          if (!prev) {
            playHoverSound(); // Haptic play sound on hover entry
          }
          return true;
        });
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Outer spring trailing circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-brand-gold/40 pointer-events-none z-50 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: hovered ? 1.35 : 1,
          backgroundColor: hovered ? "rgba(200, 169, 106, 0.05)" : "rgba(200, 169, 106, 0)",
          borderColor: hovered ? "#C8A96A" : "rgba(200, 169, 106, 0.35)",
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner precise tracking dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-brand-gold rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: hovered ? 0.4 : 1,
          backgroundColor: hovered ? "#F7F5F2" : "#C8A96A",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

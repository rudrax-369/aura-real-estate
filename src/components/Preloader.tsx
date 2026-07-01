"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 400); // Small pause at 100%
          setTimeout(onComplete, 1200); // Complete animation time
          return 100;
        }
        return Math.min(prev + step + Math.random() * 2, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-brand-black p-10 select-none"
        >
          {/* Header decoration */}
          <div className="w-full flex justify-between text-[10px] tracking-[0.3em] text-brand-silver/40 uppercase font-sans">
            <span>Architectural Experience</span>
            <span>Est. 2026</span>
          </div>

          {/* Central Logo & Details */}
          <div className="flex flex-col items-center gap-4">
            <motion.h1 
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.8em", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-serif text-gold-gradient pl-[0.8em]"
            >
              AURA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xs tracking-[0.4em] uppercase text-brand-silver font-sans text-center"
            >
              Exclusive Estates & 3D Showrooms
            </motion.p>
          </div>

          {/* Bottom Progress Tracker */}
          <div className="w-full max-w-sm flex flex-col gap-3">
            <div className="flex justify-between text-xs tracking-widest text-brand-silver/60 font-sans">
              <span>INITIALIZING SYSTEM</span>
              <span>{Math.round(progress)}%</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="h-[2px] w-full bg-brand-graphite relative overflow-hidden">
              <motion.div 
                className="h-full bg-brand-gold absolute left-0 top-0"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <div className="text-[9px] tracking-wider text-brand-silver/30 text-center font-mono uppercase">
              Procedural shaders, spatial audio, wireframes compiling...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

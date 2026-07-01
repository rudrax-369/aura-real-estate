"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { Magnetic } from "./Navbar";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full border-t border-white/5 bg-brand-black px-6 md:px-12 py-12 z-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Details */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <h3 className="text-xl font-serif tracking-[0.2em] text-gold-gradient">
            AURA
          </h3>
          <p className="text-[10px] tracking-widest text-brand-silver/35 uppercase">
            ESTATE SYNDICATE &copy; {currentYear} // ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {["Privacy", "Terms", "Instagram", "Awwwards", "Agent Login"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] tracking-widest text-brand-silver/50 hover:text-brand-gold uppercase transition-colors duration-300 relative py-1"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Back to top magnetic button */}
        <div className="flex flex-col items-center gap-2">
          <Magnetic>
            <button
              onClick={handleScrollTop}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-silver/70 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={16} />
            </button>
          </Magnetic>
          <span className="text-[8px] tracking-widest text-brand-silver/20 uppercase">
            BACK TO SUMMIT
          </span>
        </div>
      </div>
      
      {/* Handcrafted signoff */}
      <div className="w-full text-center mt-8 border-t border-white/2 pt-6 flex items-center justify-center gap-1.5 text-[8px] tracking-[0.2em] text-brand-silver/20 uppercase">
        <span>Handcrafted with</span>
        <Heart size={8} className="text-brand-gold animate-pulse fill-brand-gold" />
        <span>by Antigravity for AURA Group</span>
      </div>
    </footer>
  );
}

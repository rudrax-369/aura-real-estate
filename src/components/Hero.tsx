"use client";

import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Building, ArrowRight } from "lucide-react";
import ThreeHeroScene from "./ThreeHeroScene";
import { Magnetic } from "./Navbar";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, delay: 1.8 + i * 0.18, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-black flex items-center">
      {/* Full-screen 3D background scene */}
      <ThreeHeroScene />

      {/* Dark overlay so text is always legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-black to-transparent pointer-events-none z-10" />

      {/* ─── CONTENT ─────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 py-36 flex flex-col lg:flex-row items-center lg:items-start gap-12">

        {/* ── LEFT COLUMN: Main Glass Content Card ── */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">

          {/* Live badge */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2.5 self-start border border-brand-gold/35 px-5 py-2.5 rounded-full bg-brand-black/60 backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="label-sm text-brand-gold tracking-[0.35em]">Virtual Showroom · Live</span>
          </motion.div>

          {/* ── HERO TEXT CARD ── */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="glass-card rounded-3xl p-8 md:p-12 border border-white/8 relative overflow-hidden"
          >
            {/* Gold shimmer top edge */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

            <div className="flex flex-col gap-5">
              {/* Oversized Headline */}
              <div>
                <p className="label-sm text-brand-silver/55 mb-3 tracking-[0.3em]">Est. 2008 · Monaco · Dubai · New York</p>
                <h1 className="font-serif text-brand-white uppercase leading-[0.95]"
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", letterSpacing: "0.04em" }}>
                  A New Era
                </h1>
                <h1 className="font-serif text-gold-gradient uppercase leading-[0.95] mt-1"
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", letterSpacing: "0.04em" }}>
                  of Luxury
                </h1>
                <h1 className="font-serif text-brand-white/30 uppercase leading-[0.95] mt-1"
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 7rem)", letterSpacing: "0.04em" }}>
                  Living.
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-brand-silver/80 font-light leading-relaxed max-w-lg"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}>
                Procedural 3D blueprints and cinematic virtual walkthroughs of the world's most ultra-premium global estates.
              </p>

              {/* CTA Row */}
              <div className="flex items-center gap-4 pt-2">
                <Magnetic>
                  <a href="#residences" className="shimmer-btn bg-brand-gold hover:bg-brand-white text-brand-black px-8 py-4 rounded-full flex items-center gap-3 font-sans text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors duration-300">
                    Explore Estates
                    <ArrowRight size={14} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#booking" className="px-8 py-4 rounded-full border border-white/15 text-brand-white hover:border-brand-gold/50 hover:text-brand-gold flex items-center gap-2 font-sans text-xs uppercase tracking-widest cursor-pointer transition-all duration-300">
                    Book Tour
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.div>

          {/* ── SEARCH CARD ── */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="glass-card rounded-2xl p-6 border border-white/8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

            <p className="label-sm text-brand-silver/40 mb-5 tracking-[0.3em]">Property Search</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {/* Location */}
              <div className="glass-panel rounded-xl p-4 flex items-start gap-3">
                <MapPin className="text-brand-gold mt-0.5 flex-shrink-0" size={16} />
                <div className="w-full">
                  <label className="block label-sm text-brand-silver/45 mb-1.5">Location</label>
                  <select className="w-full bg-transparent text-brand-white font-sans focus:outline-none appearance-none cursor-pointer font-light"
                    style={{ fontSize: "0.9rem" }}>
                    <option className="bg-brand-graphite">Monaco, Côte d'Azur</option>
                    <option className="bg-brand-graphite">Downtown Dubai</option>
                    <option className="bg-brand-graphite">Manhattan, NY</option>
                    <option className="bg-brand-graphite">St. Moritz, Swiss Alps</option>
                  </select>
                </div>
              </div>

              {/* Residence Type */}
              <div className="glass-panel rounded-xl p-4 flex items-start gap-3">
                <Building className="text-brand-gold mt-0.5 flex-shrink-0" size={16} />
                <div className="w-full">
                  <label className="block label-sm text-brand-silver/45 mb-1.5">Residence</label>
                  <select className="w-full bg-transparent text-brand-white font-sans focus:outline-none appearance-none cursor-pointer font-light"
                    style={{ fontSize: "0.9rem" }}>
                    <option className="bg-brand-graphite">Glass Penthouse</option>
                    <option className="bg-brand-graphite">Architectural Villa</option>
                    <option className="bg-brand-graphite">Sky Mansion</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div className="glass-panel rounded-xl p-4 flex items-start gap-3">
                <DollarSign className="text-brand-gold mt-0.5 flex-shrink-0" size={16} />
                <div className="w-full">
                  <label className="block label-sm text-brand-silver/45 mb-1.5">Budget</label>
                  <select className="w-full bg-transparent text-brand-white font-sans focus:outline-none appearance-none cursor-pointer font-light"
                    style={{ fontSize: "0.9rem" }}>
                    <option className="bg-brand-graphite">$5M – $12M USD</option>
                    <option className="bg-brand-graphite">$12M – $25M USD</option>
                    <option className="bg-brand-graphite">$25M+ USD</option>
                  </select>
                </div>
              </div>
            </div>

            <Magnetic>
              <button className="shimmer-btn w-full bg-brand-gold hover:bg-brand-white text-brand-black py-4 rounded-xl flex items-center justify-center gap-3 font-sans text-sm uppercase tracking-widest font-bold cursor-pointer transition-colors duration-300">
                <Search size={16} />
                Search Available Estates
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Quick-stat pills (float above the 3D scene) ── */}
        <div className="hidden lg:flex w-[45%] flex-col justify-center items-end gap-4 pt-24">
          {[
            { n: "380+", l: "Ultra-Premium\nEstates Curated" },
            { n: "$4.2B", l: "Portfolio Under\nManagement" },
            { n: "62", l: "Countries\nRepresented" },
          ].map((s, i) => (
            <motion.div
              key={i}
              custom={i + 3} variants={fadeUp} initial="hidden" animate="visible"
              className="glass-panel animated-border-gold rounded-2xl px-8 py-5 flex items-center gap-6 w-72"
            >
              <span className="font-serif text-gold-gradient shrink-0"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1 }}>
                {s.n}
              </span>
              <span className="label-sm text-brand-silver/60 leading-relaxed whitespace-pre-line">
                {s.l}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="label-sm text-brand-silver/35 tracking-[0.3em]">Scroll</span>
        <div className="w-[2px] h-10 bg-brand-silver/15 relative overflow-hidden rounded-full">
          <motion.div
            className="w-full h-4 bg-brand-gold rounded-full absolute top-0"
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

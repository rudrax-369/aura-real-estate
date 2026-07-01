"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  property: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "AURA didn't just sell us a penthouse — they delivered a new standard of living. The 3D walkthrough felt like being there a year before we moved in.",
    name: "Alexandre Delacroix",
    title: "Managing Partner, Meridian Capital",
    property: "Monaco Cliffside Villa",
    initials: "AD",
  },
  {
    quote: "I've bought six properties globally. Nothing compares to the AURA experience. The detail, the discretion, the craft — it is on another level entirely.",
    name: "Reya Nair",
    title: "Co-Founder, Nair Global Holdings",
    property: "Metropolitan Sky Mansion",
    initials: "RN",
  },
  {
    quote: "From the moment I entered the virtual showroom I knew this was different. The architecture speaks to the soul. A permanent collection of space and light.",
    name: "Stefan Holmberg",
    title: "Creative Director, Studio Holmberg",
    property: "Nordic Mirror Haven",
    initials: "SH",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setActive((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  const t = testimonials[active];

  return (
    <section className="relative w-full py-32 px-6 md:px-12 overflow-hidden section-mid-bg z-20">
      {/* Large ambient left glow (amber warm tone) */}
      <div className="absolute top-0 left-0 w-[500px] h-full bg-gradient-to-r from-brand-gold/5 to-transparent pointer-events-none" />
      {/* Right cool silver tone for contrast */}
      <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-brand-silver/3 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        {/* Section Label */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-sm text-brand-gold"
          >
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="display-md text-brand-white uppercase mt-3"
          >
            Voices of the <span className="text-gold-gradient">Privileged</span>
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="glass-card rounded-3xl p-10 md:p-16 border border-white/6 relative overflow-hidden"
            >
              {/* Gold top accent bar */}
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

              {/* Large quote icon */}
              <div className="absolute top-8 right-10 text-brand-gold/10">
                <Quote size={80} />
              </div>

              {/* The pull-quote — very large */}
              <p className="display-md text-brand-white leading-relaxed font-serif font-light italic mb-10 relative z-10" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-5 relative z-10">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-serif text-lg font-semibold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="body-md text-brand-white font-semibold">{t.name}</p>
                  <p className="body-md text-brand-silver/60 font-light">{t.title}</p>
                  <p className="label-sm text-brand-gold mt-1">{t.property}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand-silver hover:text-brand-white hover:border-brand-gold/50 transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`transition-all duration-400 rounded-full cursor-pointer ${
                  idx === active
                    ? "w-8 h-2 bg-brand-gold"
                    : "w-2 h-2 bg-brand-silver/30 hover:bg-brand-silver/60"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand-silver hover:text-brand-white hover:border-brand-gold/50 transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

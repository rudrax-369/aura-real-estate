"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Globe, Award, Users } from "lucide-react";

interface Stat {
  value: string;
  suffix: string;
  label: string;
  sub: string;
  icon: any;
}

const stats: Stat[] = [
  { value: "380", suffix: "+", label: "Ultra-Premium Estates", sub: "Curated globally", icon: Globe },
  { value: "$4.2", suffix: "B", label: "Portfolio Value", sub: "Under management 2026", icon: TrendingUp },
  { value: "18", suffix: "yr", label: "Design Legacy", sub: "Founding since 2008", icon: Award },
  { value: "9,400", suffix: "+", label: "Elite Clients", sub: "Across 62 countries", icon: Users },
];

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="stat-number">
      {inView ? value : "0"}
      <span className="text-brand-gold" style={{ fontSize: "0.6em" }}>{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative w-full py-28 px-6 md:px-12 overflow-hidden section-gold-bg border-y border-brand-gold/10 z-20">
      {/* Warm gold radial glow in the center — THE color play moment */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-gold/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 gold-line" />
      <div className="absolute bottom-0 inset-x-0 gold-line" />

      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(200,169,106,0.06)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Label */}
        <div className="text-center flex flex-col gap-3">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label-sm text-brand-gold"
          >
            By the Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="display-md text-brand-white uppercase"
          >
            A Decade of <span className="text-gold-gradient">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="body-md text-brand-silver/70 max-w-xl mx-auto"
          >
            AURA Group has redefined how the world's wealthiest acquire iconic residences.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: idx * 0.13 }}
                className="animated-border-gold glass-card rounded-3xl p-10 flex flex-col gap-6 items-center text-center group hover:bg-glass-gold transition-all duration-500 relative overflow-hidden"
              >
                {/* Hover glow bottom accent */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-brand-gold/0 group-hover:bg-brand-gold/50 transition-all duration-500 rounded-full" />

                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/15 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/20 group-hover:border-brand-gold/35 transition-all duration-300">
                  <Icon size={28} />
                </div>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <div className="flex flex-col gap-2">
                  <span className="text-brand-white font-semibold tracking-wide" style={{ fontSize: "1.1rem" }}>{stat.label}</span>
                  <span className="label-sm text-brand-silver/45 tracking-[0.25em]">{stat.sub}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

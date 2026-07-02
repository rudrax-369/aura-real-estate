"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Navbar";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: string;
  image: string;
  features: string[];
}

const properties: Property[] = [
  {
    id: 1,
    title: "Monaco Cliffside Villa",
    location: "Monaco, Côte d'Azur",
    price: "$38,500,000 USD",
    area: "9,400 SQ FT",
    image: "/img1.png",
    features: ["Infinity Pool", "Helipad", "Glass Elevator"],
  },
  {
    id: 2,
    title: "Metropolitan Sky Mansion",
    location: "Manhattan, NY",
    price: "$45,000,000 USD",
    area: "8,200 SQ FT",
    image: "/img1.png",
    features: ["360° Terrace", "Private Observatory", "Kinetic Walls"],
  },
  {
    id: 3,
    title: "Nordic Mirror Haven",
    location: "St. Moritz, Swiss Alps",
    price: "$29,000,000 USD",
    area: "7,100 SQ FT",
    image: "/img1.png",
    features: ["Heated Indoor Spa", "Thermal Glazing", "Floating Deck"],
  },
];

function PropertyCard({ property }: { property: Property }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse coordinate ratios to tilt rotation values
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const rotateXSpring = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate ratio from center: -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/5 flex flex-col h-[600px] relative"
    >
      {/* Dynamic Refracted Glass Hover Glow */}
      <div className="card-glow-play" />

      {/* 3D Highlight Shine Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(232,184,109,0.12)_0%,transparent_50%)] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Property Image with reveal Zoom effect */}
      <div className="h-[340px] w-full overflow-hidden relative">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
          loading="lazy"
          placeholder="empty"
        />

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="glass-panel px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-brand-gold border border-brand-gold/20 font-medium">
            Exclusive
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 flex-grow flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          {/* Location */}
          <div className="flex items-center gap-2 text-brand-silver/60 label-sm mb-2">
            <MapPin size={11} className="text-brand-gold" />
            <span>{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-serif text-brand-white group-hover:text-brand-gold transition-colors duration-300 tracking-wide mb-3">
            {property.title}
          </h3>

          {/* Features bullet row */}
          <div className="flex flex-wrap gap-2 mt-3">
            {property.features.map((feature, idx) => (
              <span
                key={idx}
                className="label-sm text-brand-silver/55 border border-white/8 bg-white/3 px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Booking Button Action */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
          <div className="flex flex-col">
            <span className="text-[9px] tracking-widest text-brand-silver/45 uppercase font-sans">
              Investment Valued At
            </span>
            <span className="text-base font-serif text-gold-gradient tracking-wide">
              {property.price}
            </span>
          </div>

          {/* Interactive Arrow Button */}
          <Magnetic>
            <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300">
              <ArrowUpRight size={16} />
            </div>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProperties() {
  return (
    <section id="residences" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-20">
      {/* Background radial soft light grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/3 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="flex flex-col gap-3 text-left">
          <span className="label-sm text-brand-gold">Curated Portfolio</span>
          <h2 className="display-lg text-brand-white uppercase">
            Signature
            <br />
            <span className="text-gold-gradient">Residences</span>
          </h2>
        </div>
        <p className="body-lg text-brand-silver/65 max-w-md text-left font-light">
          Each residence represents a custom architectural vision combining engineering excellence with the ultimate in aesthetic luxury.
        </p>
      </div>

      {/* Grid of properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}

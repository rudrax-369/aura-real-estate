"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Compass, Layers, Landmark, Calendar } from "lucide-react";

// Magnetic effect wrapper
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Restrict movement range for subtlety
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "#overview", icon: Compass },
    { name: "Residences", href: "#residences", icon: Layers },
    { name: "Architecture", href: "#architecture", icon: Landmark },
    { name: "Book Tour", href: "#booking", icon: Calendar },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-12 flex justify-between items-center"
    >
      {/* Background glass blur container */}
      <div className="absolute inset-x-0 top-0 h-20 glass-navbar -z-10 pointer-events-none" />

      {/* Brand Logo */}
      <Magnetic>
        <a 
          href="#" 
          className="text-2xl font-serif tracking-[0.2em] text-gold-gradient cursor-pointer"
        >
          AURA
        </a>
      </Magnetic>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Magnetic key={item.name}>
            <a
              href={item.href}
              className="text-sm font-sans tracking-widest text-brand-silver/70 hover:text-brand-white uppercase transition-colors duration-300 relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          </Magnetic>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="hidden md:block">
        <Magnetic>
          <a
            href="#booking"
            className="shimmer-btn px-6 py-2.5 rounded-full border border-brand-gold/40 text-brand-gold hover:border-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 text-xs uppercase tracking-widest font-sans"
          >
            Reserve Tour
          </a>
        </Magnetic>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-brand-white hover:text-brand-gold transition-colors duration-300 z-50 p-2"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 right-0 glass-navbar p-6 flex flex-col gap-6 md:hidden z-30"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-base font-sans tracking-widest text-brand-silver hover:text-brand-white uppercase py-2 transition-colors border-b border-white/5"
                >
                  <Icon size={16} className="text-brand-gold" />
                  {item.name}
                </a>
              );
            })}
          </div>
          <a
            href="#booking"
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-6 py-3 rounded-full bg-brand-gold text-brand-black hover:bg-white transition-colors duration-300 text-xs uppercase tracking-widest font-sans font-medium"
          >
            Reserve Tour
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

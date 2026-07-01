"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Mail, ShieldCheck, ArrowRight, Clock } from "lucide-react";
import { Magnetic } from "./Navbar";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    property: "villa",
    date: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;

    setIsSubmitting(true);
    
    // Simulate luxury API authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Generate a luxury-style reservation code
      setConfirmationCode(`AUR-${Math.floor(1000 + Math.random() * 9000)}-${formData.property.substring(0, 3).toUpperCase()}`);
    }, 1800);
  };

  return (
    <section id="booking" className="relative py-28 px-6 md:px-12 max-w-4xl mx-auto z-20">
      {/* Background glowing particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/2 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Title */}
      <div className="text-center flex flex-col items-center gap-4 mb-16">
        <span className="label-sm text-brand-gold">Secure Invitation</span>
        <h2 className="display-md text-brand-white uppercase">
          Private <span className="text-gold-gradient">Showroom</span> Tour
        </h2>
        <p className="body-lg text-brand-silver/65 max-w-lg leading-relaxed mt-2">
          Reserve a cinematic, real-time 3D walkthrough or coordinate an exclusive physical viewing at our property site.
        </p>
      </div>

      {/* Frame wrapper with gold gradient border */}
      <div className="glass-card border-glow-shift rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Top gold bar border */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="booking-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-brand-silver/60 font-sans pl-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/60" />
                    <input
                      type="text"
                      required
                      placeholder="Alexander Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass-input w-full pl-11 pr-4 py-3.5 rounded-lg text-sm text-brand-white placeholder-brand-silver/20 font-sans font-light"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-brand-silver/60 font-sans pl-1">
                    Corporate Email
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/60" />
                    <input
                      type="email"
                      required
                      placeholder="vance@corporate.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass-input w-full pl-11 pr-4 py-3.5 rounded-lg text-sm text-brand-white placeholder-brand-silver/20 font-sans font-light"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Residence Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-brand-silver/60 font-sans pl-1">
                    Preferred Residence
                  </label>
                  <select
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    className="glass-input w-full px-4 py-3.5 rounded-lg text-sm text-brand-white bg-brand-graphite focus:outline-none appearance-none cursor-pointer font-sans font-light"
                  >
                    <option value="villa">Monaco Cliffside Villa</option>
                    <option value="mansion">Metropolitan Sky Mansion</option>
                    <option value="haven">Nordic Mirror Haven</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-brand-silver/60 font-sans pl-1">
                    Requested Date
                  </label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/60" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="glass-input w-full pl-11 pr-4 py-3.2 rounded-lg text-sm text-brand-white font-sans font-light focus:text-brand-white"
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase text-brand-silver/60 font-sans pl-1">
                  Special Accommodations
                </label>
                <textarea
                  rows={3}
                  placeholder="Helipad access required, secure NDA request, private jet transport details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="glass-input w-full px-4 py-3.5 rounded-lg text-sm text-brand-white placeholder-brand-silver/20 font-sans font-light resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6">
                <div className="flex items-center gap-2.5 text-[10px] tracking-widest text-brand-silver/40 uppercase font-sans">
                  <Clock size={12} className="text-brand-gold/70" />
                  <span>VIP Review typically completes in 2 hours</span>
                </div>

                <Magnetic>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shimmer-btn bg-brand-gold hover:bg-brand-white text-brand-black px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-colors duration-300 font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing Code..." : "Request Access"}
                    <ArrowRight size={14} />
                  </button>
                </Magnetic>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center gap-6 py-8"
            >
              {/* Spinning luxury verification seal */}
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center text-brand-gold shadow-[0_0_20px_rgba(200,169,106,0.2)] animate-pulse">
                <ShieldCheck size={28} />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.4em] uppercase text-brand-gold font-sans font-medium">
                  Verification Complete
                </span>
                <h3 className="text-2xl font-serif text-brand-white tracking-wider uppercase">
                  Reservation Code Active
                </h3>
              </div>

              {/* Luxury ticket layout */}
              <div className="w-full max-w-md glass-panel p-6 rounded-xl border border-brand-gold/20 flex flex-col gap-4 text-left font-mono relative overflow-hidden mt-2">
                {/* Horizontal dash spacer line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-white/10" />

                <div className="flex justify-between text-[10px] tracking-wider text-brand-silver/50 uppercase">
                  <span>Client Code: {formData.name.toUpperCase().substring(0, 3)}-VIP</span>
                  <span>Confirmation ID</span>
                </div>
                
                <div className="text-xl text-gold-gradient font-serif tracking-widest text-center py-2">
                  {confirmationCode}
                </div>

                <div className="flex justify-between items-end mt-4 pt-2 text-[10px] tracking-wider text-brand-silver/50 uppercase">
                  <div>
                    <span className="block text-[8px] text-brand-silver/30">VISITATION DATE</span>
                    <span className="text-brand-white font-sans">{formData.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-brand-silver/30">SECURITY PROFILE</span>
                    <span className="text-brand-white font-sans">VIP PRIVATE TOUR</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-brand-silver/60 max-w-sm tracking-wide leading-relaxed font-light mt-4">
                Dear {formData.name}, a private representative has been assigned to your profile. The authorization credentials and layout blueprints have been transmitted to <span className="text-brand-white font-normal">{formData.email}</span>.
              </p>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-[10px] tracking-widest uppercase text-brand-gold hover:text-brand-white font-sans mt-2 underline cursor-pointer transition-colors duration-300"
              >
                Register Another Tour
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

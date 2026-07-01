"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Wind, Anchor } from "lucide-react";

interface Spec {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  coordinates: [number, number, number]; // Position of this spec in 3D space
}

const specs: Spec[] = [
  {
    id: "penthouse",
    title: "Infinity Sky Penthouse",
    subtitle: "Level 88-90",
    description: "Multi-level residence featuring standard-setting triple-height structural glazing and private sky observatory deck.",
    icon: Sparkles,
    coordinates: [0, 1.8, 0],
  },
  {
    id: "oasis",
    title: "Bio-Dome Sky Oasis",
    subtitle: "Level 45",
    description: "Suspended botanical garden and swimming deck engineered with active microclimate control systems.",
    icon: Wind,
    coordinates: [0, 0, 0],
  },
  {
    id: "dock",
    title: "Sub-level Marine Dock",
    subtitle: "Base Level",
    description: "Fully automated secure private marina vault and yacht docking bays integrated with subterranean garages.",
    icon: Anchor,
    coordinates: [0, -1.8, 0],
  },
];

// 3D Wireframe Blueprint Component
function BlueprintModel({ selectedId, mouse }: { selectedId: string; mouse: { x: number; y: number } }) {
  const blueprintRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!blueprintRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow rotational blueprint orbit
    blueprintRef.current.rotation.y = t * 0.05;
    // Hover tilt
    blueprintRef.current.rotation.x = THREE.MathUtils.lerp(blueprintRef.current.rotation.x, mouse.y * 0.1, 0.05);
    blueprintRef.current.rotation.z = THREE.MathUtils.lerp(blueprintRef.current.rotation.z, -mouse.x * 0.1, 0.05);
  });

  return (
    <group ref={blueprintRef}>
      {/* Structural Outer Grid Cage */}
      <mesh>
        <cylinderGeometry args={[2, 2, 4.5, 8, 8, true]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Floor Slabs in blueprint style */}
      {/* 1. Penthouse (Top Layer) */}
      <group position={[0, 1.8, 0]}>
        <mesh>
          <cylinderGeometry args={[1.6, 1.6, 0.1, 8]} />
          <meshBasicMaterial
            color={selectedId === "penthouse" ? "#C8A96A" : "#D9D9D9"}
            wireframe
            transparent
            opacity={selectedId === "penthouse" ? 0.75 : 0.15}
          />
        </mesh>
        {selectedId === "penthouse" && (
          <mesh>
            <cylinderGeometry args={[1.58, 1.58, 0.08, 8]} />
            <meshBasicMaterial
              color="#C8A96A"
              transparent
              opacity={0.2}
            />
          </mesh>
        )}
      </group>

      {/* 2. Sky Oasis (Middle Layer) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[2, 2, 0.15, 8]} />
          <meshBasicMaterial
            color={selectedId === "oasis" ? "#C8A96A" : "#D9D9D9"}
            wireframe
            transparent
            opacity={selectedId === "oasis" ? 0.75 : 0.15}
          />
        </mesh>
        {/* Floating deck design rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.02, 8, 32]} />
          <meshBasicMaterial
            color={selectedId === "oasis" ? "#C8A96A" : "#D9D9D9"}
            transparent
            opacity={selectedId === "oasis" ? 0.8 : 0.1}
          />
        </mesh>
        {selectedId === "oasis" && (
          <mesh>
            <cylinderGeometry args={[1.98, 1.98, 0.1, 8]} />
            <meshBasicMaterial
              color="#C8A96A"
              transparent
              opacity={0.15}
            />
          </mesh>
        )}
      </group>

      {/* 3. Marine Dock (Bottom Layer) */}
      <group position={[0, -1.8, 0]}>
        <mesh>
          <cylinderGeometry args={[1.8, 1.8, 0.1, 8]} />
          <meshBasicMaterial
            color={selectedId === "dock" ? "#C8A96A" : "#D9D9D9"}
            wireframe
            transparent
            opacity={selectedId === "dock" ? 0.75 : 0.15}
          />
        </mesh>
        {selectedId === "dock" && (
          <mesh>
            <cylinderGeometry args={[1.78, 1.78, 0.08, 8]} />
            <meshBasicMaterial
              color="#C8A96A"
              transparent
              opacity={0.2}
            />
          </mesh>
        )}
      </group>

      {/* Core structural trusses (Lines going down diagonally) */}
      <mesh>
        <cylinderGeometry args={[0.02, 1.8, 4.5, 6, 1, true]} />
        <meshBasicMaterial
          color="#D9D9D9"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}

export default function SpecsSection() {
  const [selectedId, setSelectedId] = useState("penthouse");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeSpec = specs.find((s) => s.id === selectedId) || specs[0];
  const IconComponent = activeSpec.icon;

  return (
    <section id="architecture" className="relative py-28 px-6 md:px-12 bg-brand-graphite/30 overflow-hidden border-y border-white/5 z-20">
      {/* Subtle blueprints cross grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Technical Specifications Details */}
        <div className="flex flex-col gap-8 text-left z-10">
          <div className="flex flex-col gap-2">
            <span className="label-sm text-brand-gold">Architectural Systems</span>
            <h2 className="display-md text-brand-white uppercase">
              Engineering
              <br />
              <span className="text-gold-gradient">Specs</span>
            </h2>
          </div>

          <p className="body-lg text-brand-silver/65 max-w-lg leading-relaxed">
            Interactive structural schematics. Click on any section below to highlight and inspect blueprint layouts inside the 3D vector model.
          </p>

          {/* Interactive hot-list */}
          <div className="flex flex-col gap-4 mt-4">
            {specs.map((spec) => {
              const SpecIcon = spec.icon;
              const isSelected = spec.id === selectedId;

              return (
                <button
                  key={spec.id}
                  onClick={() => setSelectedId(spec.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-500 flex items-center justify-between gap-6 cursor-pointer group ${
                    isSelected
                      ? "glass-card border-brand-gold/30 bg-glass-gold shadow-[0_10px_30px_rgba(200,169,106,0.03)]"
                      : "border-transparent hover:border-white/5 hover:bg-white/2"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                      isSelected ? "bg-brand-gold/15 text-brand-gold" : "bg-white/5 text-brand-silver/55 group-hover:text-brand-white"
                    }`}>
                      <SpecIcon size={18} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-sans uppercase tracking-widest font-semibold ${
                        isSelected ? "text-brand-gold" : "text-brand-white"
                      }`}>
                        {spec.title}
                      </h4>
                      <p className="text-[10px] tracking-wider text-brand-silver/45 uppercase mt-0.5">
                        {spec.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className={`text-xs uppercase tracking-widest font-mono transition-opacity duration-300 ${
                    isSelected ? "opacity-100 text-brand-gold" : "opacity-0 group-hover:opacity-50 text-brand-silver"
                  }`}>
                    ACTIVE LAYOUT //
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed dynamic card displaying the selected system specs */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 mt-4 min-h-[160px] relative overflow-hidden">
            {/* Shimmer line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent animate-pulse" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <IconComponent size={14} className="text-brand-gold" />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-brand-gold">
                    STRUCTURAL INTEGRITY ANALYSIS
                  </span>
                </div>
                <p className="text-xs text-brand-silver/70 font-light tracking-wide leading-relaxed">
                  {activeSpec.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3 border-t border-white/5 pt-3 text-[9px] tracking-widest text-brand-silver/50 font-sans">
                  <div>
                    LOAD BEARING LIMITS: <span className="text-brand-white font-medium">10,200 kN</span>
                  </div>
                  <div>
                    WIND FORCE RESISTANCE: <span className="text-brand-white font-medium">CLASS IV</span>
                  </div>
                  <div>
                    GLAZING PROFILE: <span className="text-brand-white font-medium">TRIPLE SILICA</span>
                  </div>
                  <div>
                    SEISMIC LEVEL: <span className="text-brand-white font-medium">ZONE II ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Immersive 3D wireframe render */}
        <div className="h-[400px] lg:h-[550px] w-full rounded-2xl overflow-hidden glass-card border border-white/5 shadow-2xl relative">
          
          {/* Blueprint markings styling */}
          <div className="absolute top-4 left-4 z-10 text-[9px] font-mono text-brand-silver/30 text-left uppercase flex flex-col gap-0.5">
            <span>DRAWING: STRUCT-VEC-88X</span>
            <span>SCALE: 1:250 METRIC</span>
            <span>SHADERS: GLSL COMPILING...</span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold relative" />
            <span className="text-[9px] font-mono text-brand-gold uppercase tracking-widest pl-1">
              LIVE WIREFRAME
            </span>
          </div>

          {mounted && (
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 20 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={1.5} />
              <pointLight position={[5, 5, 5]} intensity={50} color="#C8A96A" />
              <BlueprintModel selectedId={selectedId} mouse={mouse} />
            </Canvas>
          )}
        </div>
      </div>
    </section>
  );
}

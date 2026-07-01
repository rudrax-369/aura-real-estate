"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// ─── MAIN SKYSCRAPER (centre) ─────────────────────────────
function Skyscraper({ mouse }: { mouse: { x: number; y: number } }) {
  const modelRef = useRef<THREE.Group>(null);
  const floorCount = 7;
  const floorHeight = 0.8;
  const towerRadius = 1.6;

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y = t * 0.07;
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, mouse.y * 0.12, 0.05);
    modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, -mouse.x * 0.12, 0.05);
  });

  return (
    <group ref={modelRef} position={[0, -1.8, 0]}>
      {/* Glowing gold core */}
      <mesh position={[0, (floorCount * floorHeight) / 2, 0]}>
        <cylinderGeometry args={[0.3, 0.35, floorCount * floorHeight, 16]} />
        <meshStandardMaterial color="#C8A96A" emissive="#C8A96A" emissiveIntensity={2.5} transparent opacity={0.8} />
      </mesh>

      {/* Glass floors */}
      {Array.from({ length: floorCount }).map((_, idx) => {
        const yPos = idx * floorHeight + 0.1;
        const scale = 1 - idx * 0.055;
        return (
          <group key={idx} position={[0, yPos, 0]}>
            <mesh>
              <cylinderGeometry args={[towerRadius * scale, towerRadius * scale * 0.98, 0.06, 6]} />
              <meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} roughness={0.05} metalness={0.1} transmission={0.9} thickness={0.5} ior={1.6} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[towerRadius * scale, 0.015, 8, 6]} />
              <meshStandardMaterial color="#C8A96A" metalness={0.95} roughness={0.15} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[towerRadius * scale * 0.7, towerRadius * scale * 0.7, floorHeight, 6]} />
              <meshStandardMaterial color="#D9D9D9" wireframe transparent opacity={0.07} />
            </mesh>
          </group>
        );
      })}

      {/* Structural columns */}
      {Array.from({ length: 6 }).map((_, colIdx) => {
        const angle = (colIdx * Math.PI) / 3;
        return (
          <mesh key={colIdx} position={[Math.cos(angle) * towerRadius, (floorCount * floorHeight) / 2, Math.sin(angle) * towerRadius]}>
            <cylinderGeometry args={[0.018, 0.018, floorCount * floorHeight, 8]} />
            <meshStandardMaterial color="#D9D9D9" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── MODERN GLASS VILLA (left, floating) ──────────────────
function GlassVilla() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.position.y = -3.5 + Math.sin(t * 0.4) * 0.12;
  });

  return (
    <group ref={ref} position={[-5, -3.5, -1]} scale={0.85}>
      {/* Main villa body — flat-roof modernist box */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.8, 1.0, 1.6]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.18} roughness={0.05} metalness={0.15} transmission={0.85} thickness={0.4} ior={1.5} />
      </mesh>

      {/* Gold outline frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.8, 1.0, 1.6)]} />
        <lineBasicMaterial color="#C8A96A" transparent opacity={0.6} />
      </lineSegments>

      {/* Flat roof slab */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[3.0, 0.08, 1.8]} />
        <meshStandardMaterial color="#C8A96A" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wing extension (L-shape annex) */}
      <mesh position={[1.6, 0.25, 0.5]}>
        <boxGeometry args={[1.0, 0.5, 0.7]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={0.15} roughness={0.05} transmission={0.9} thickness={0.3} />
      </mesh>
      <lineSegments position={[1.6, 0.25, 0.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.0, 0.5, 0.7)]} />
        <lineBasicMaterial color="#E8B86D" transparent opacity={0.5} />
      </lineSegments>

      {/* Pool deck */}
      <mesh position={[0, -0.05, -1.1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.04, 0.6]} />
        <meshPhysicalMaterial color="#90caf9" transparent opacity={0.35} roughness={0} metalness={0} transmission={0.7} />
      </mesh>

      {/* Structural pillars */}
      {[-1.2, 0, 1.2].map((xp, i) => (
        <mesh key={i} position={[xp, -0.25, 0.8]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 6]} />
          <meshStandardMaterial color="#D9D9D9" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}

      {/* Glowing base pad */}
      <mesh position={[0, -0.52, 0]}>
        <boxGeometry args={[3.2, 0.04, 2.0]} />
        <meshStandardMaterial color="#C8A96A" emissive="#C8A96A" emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ─── LUXURY TOWNHOUSE (right, floating) ───────────────────
function Townhouse() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = -t * 0.05;
    ref.current.position.y = -3.2 + Math.sin(t * 0.35 + 1) * 0.1;
  });

  return (
    <group ref={ref} position={[5.2, -3.2, -0.5]} scale={0.78}>
      {/* Base podium */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2.4, 0.2, 1.8]} />
        <meshStandardMaterial color="#C8A96A" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
      </mesh>

      {/* Ground floor */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[2.2, 1.1, 1.6]} />
        <meshPhysicalMaterial color="#F7F5F2" transparent opacity={0.14} roughness={0.1} metalness={0.05} transmission={0.88} thickness={0.3} />
      </mesh>
      <lineSegments position={[0, 0.65, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.1, 1.6)]} />
        <lineBasicMaterial color="#D9D9D9" transparent opacity={0.4} />
      </lineSegments>

      {/* First floor */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[2.0, 1.0, 1.5]} />
        <meshPhysicalMaterial color="#F7F5F2" transparent opacity={0.12} roughness={0.05} transmission={0.9} thickness={0.3} />
      </mesh>
      <lineSegments position={[0, 1.85, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.0, 1.0, 1.5)]} />
        <lineBasicMaterial color="#C8A96A" transparent opacity={0.45} />
      </lineSegments>

      {/* Second floor (setback) */}
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[1.6, 0.85, 1.2]} />
        <meshPhysicalMaterial color="#F7F5F2" transparent opacity={0.10} roughness={0.05} transmission={0.92} thickness={0.2} />
      </mesh>
      <lineSegments position={[0, 2.9, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 0.85, 1.2)]} />
        <lineBasicMaterial color="#E8B86D" transparent opacity={0.5} />
      </lineSegments>

      {/* Pitched roof */}
      <mesh position={[0, 3.7, 0]}>
        <coneGeometry args={[1.3, 0.8, 4]} />
        <meshStandardMaterial color="#C8A96A" metalness={0.85} roughness={0.1} transparent opacity={0.8} />
      </mesh>

      {/* Window accents */}
      {[-0.55, 0.55].map((xp, i) => (
        <mesh key={i} position={[xp, 0.65, 0.81]}>
          <boxGeometry args={[0.45, 0.55, 0.03]} />
          <meshStandardMaterial color="#C8A96A" emissive="#E8B86D" emissiveIntensity={0.8} transparent opacity={0.9} />
        </mesh>
      ))}
      {[-0.4, 0.4].map((xp, i) => (
        <mesh key={i} position={[xp, 1.85, 0.76]}>
          <boxGeometry args={[0.4, 0.45, 0.03]} />
          <meshStandardMaterial color="#C8A96A" emissive="#E8B86D" emissiveIntensity={0.6} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Gold base glow */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[2.6, 0.03, 2.0]} />
        <meshStandardMaterial color="#C8A96A" emissive="#C8A96A" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// ─── CAMERA CONTROLLER ────────────────────────────────────
function HeroCameraController({ scrollPercent }: { scrollPercent: number }) {
  useFrame((state) => {
    const radius = 10 + scrollPercent * 4;
    const height = 1.5 + scrollPercent * 3.5;
    const t = state.clock.getElapsedTime() * 0.045;
    state.camera.position.x = Math.sin(t) * radius;
    state.camera.position.z = Math.cos(t) * radius;
    state.camera.position.y = height;
    state.camera.lookAt(new THREE.Vector3(0, 0.5, 0));
  });
  return null;
}

// ─── MAIN EXPORT ──────────────────────────────────────────
export default function ThreeHeroScene() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollPercent(Math.min(window.scrollY / window.innerHeight, 1.2));
    const handleMouseMove = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none select-none z-0">
      {/* Cinematic grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,106,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,106,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      <Canvas camera={{ position: [0, 1.5, 10], fov: 42, near: 0.1, far: 80 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />

        {/* Warm key light — gold top */}
        <spotLight position={[5, 12, 5]} angle={0.55} penumbra={1} intensity={160} color="#C8A96A" />

        {/* Cool fill light */}
        <pointLight position={[-6, 4, 3]} intensity={70} color="#D9D9D9" />

        {/* Rim light for villa */}
        <pointLight position={[-8, 2, -2]} intensity={40} color="#E8B86D" />

        {/* Rim light for townhouse */}
        <pointLight position={[8, 2, -2]} intensity={40} color="#C8A96A" />

        <HeroCameraController scrollPercent={scrollPercent} />

        {/* ── Three architectural models ── */}
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
          <GlassVilla />
        </Float>

        <Skyscraper mouse={mouse} />

        <Float speed={0.9} rotationIntensity={0} floatIntensity={0.25}>
          <Townhouse />
        </Float>
      </Canvas>
    </div>
  );
}

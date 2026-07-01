"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Particle System Component
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 45;      // X
      arr[i + 1] = (Math.random() - 0.5) * 45;  // Y
      arr[i + 2] = (Math.random() - 0.5) * 40;  // Z
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Slow drifting animation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C8A96A"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Drifting Geometric Elements Component
function DriftingArchitecture() {
  const shapesRef = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!shapesRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotate root container slowly
    shapesRef.current.rotation.y = t * 0.01;

    // Gently float each individual panel
    panelsRef.current.forEach((panel, i) => {
      if (panel) {
        panel.position.y += Math.sin(t + i * 1.5) * 0.0015;
        panel.rotation.z += 0.0003;
      }
    });
  });

  // Procedural panels: positions, scales, rotations
  const panelsData = [
    { pos: [-8, 2, -15], scale: [3, 6, 0.1], rot: [0.2, 0.4, 0.1] },
    { pos: [6, -4, -12], scale: [4, 8, 0.1], rot: [-0.1, -0.3, 0.2] },
    { pos: [-3, -6, -8], scale: [2, 4, 0.1], rot: [0.3, -0.2, -0.1] },
    { pos: [8, 5, -20], scale: [5, 10, 0.1], rot: [0.1, 0.5, 0.3] },
    { pos: [-12, -2, -18], scale: [4, 6, 0.1], rot: [-0.2, 0.2, -0.2] },
  ];

  return (
    <group ref={shapesRef}>
      {/* Translucent Glass Panels */}
      {panelsData.map((data, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) panelsRef.current[idx] = el;
          }}
          position={data.pos as [number, number, number]}
          rotation={data.rot as [number, number, number]}
        >
          <boxGeometry args={data.scale as [number, number, number]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.12}
            color="#ffffff"
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            thickness={1.2}
            ior={1.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Floating Metallic Rings (Champagne Gold) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[-5, 4, -10]} rotation={[1.2, 0.5, 0.1]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#C8A96A"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[5, -3, -8]} rotation={[0.4, 1.1, 0.5]}>
          <torusGeometry args={[2.2, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#D9D9D9"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Scene Camera Controller mapping to Scroll & Mouse
interface SceneControllerProps {
  scrollPercent: number;
  mouse: { x: number; y: number };
}

function SceneController({ scrollPercent, mouse }: SceneControllerProps) {
  useFrame((state) => {
    // Target camera position
    const targetZ = 12 - scrollPercent * 4;       // Pulls camera slightly closer on scroll
    const targetY = -scrollPercent * 8;          // Moves camera down as user scrolls
    const targetX = mouse.x * 1.5;               // Subtle tilt on mouse movement

    // Smooth damp camera coordinates
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    // Always look slightly downward/forward relative to the scroll depth
    state.camera.lookAt(new THREE.Vector3(0, targetY - 1, -10));
  });

  return null;
}

export default function ThreeBackground() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPercent(window.scrollY / scrollHeight);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates: -1 to 1
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-brand-black pointer-events-none">
      {/* Dark Vignette Overlay for Luxury Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B0B0B_100%)] z-10 opacity-70" />
      
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        
        {/* Soft volumetric spotlight in warm gold */}
        <spotLight
          position={[10, 15, 5]}
          angle={0.4}
          penumbra={1}
          intensity={400}
          color="#C8A96A"
          castShadow={false}
        />
        
        {/* Fill blue-silver light from bottom opposite angle */}
        <pointLight
          position={[-10, -10, -5]}
          intensity={150}
          color="#90a4ae"
        />

        <SceneController scrollPercent={scrollPercent} mouse={mouse} />
        <AmbientParticles />
        <DriftingArchitecture />
      </Canvas>
    </div>
  );
}

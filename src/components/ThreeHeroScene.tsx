"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Stylized procedural architectural model
function ArchitecturalShowpiece({ mouse }: { mouse: { x: number; y: number } }) {
  const modelRef = useRef<THREE.Group>(null);
  
  // High quality procedural structural design
  const floorCount = 7;
  const floorHeight = 0.8;
  const towerRadius = 1.6;

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth idle spin
    modelRef.current.rotation.y = t * 0.08;
    
    // Tilt response based on mouse pointer
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, mouse.y * 0.15, 0.05);
    modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, -mouse.x * 0.15, 0.05);
  });

  return (
    <group ref={modelRef} position={[0, -1.8, 0]}>
      {/* 1. Core Glowing Structure */}
      <mesh position={[0, (floorCount * floorHeight) / 2, 0]}>
        <cylinderGeometry args={[0.3, 0.35, floorCount * floorHeight, 16]} />
        <meshStandardMaterial
          color="#C8A96A"
          emissive="#C8A96A"
          emissiveIntensity={2.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 2. Floors Stack */}
      {Array.from({ length: floorCount }).map((_, idx) => {
        const yPos = idx * floorHeight + 0.1;
        const scale = 1 - (idx * 0.06); // Tapered top for skyscraper elegance
        
        return (
          <group key={idx} position={[0, yPos, 0]}>
            {/* Glass Slab */}
            <mesh>
              <cylinderGeometry args={[towerRadius * scale, towerRadius * scale * 0.98, 0.06, 6]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.35}
                roughness={0.05}
                metalness={0.1}
                transmission={0.9}
                thickness={0.5}
                ior={1.6}
              />
            </mesh>

            {/* Slab Outline / Ring (Gold metal rim) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[towerRadius * scale, 0.015, 8, 6]} />
              <meshStandardMaterial color="#C8A96A" metalness={0.95} roughness={0.15} />
            </mesh>

            {/* Inner room wall wireframe details */}
            <mesh>
              <cylinderGeometry args={[towerRadius * scale * 0.7, towerRadius * scale * 0.7, floorHeight, 6]} />
              <meshStandardMaterial
                color="#D9D9D9"
                wireframe
                transparent
                opacity={0.08}
              />
            </mesh>
          </group>
        );
      })}

      {/* 3. Structural Vertical Columns (Outside structural cage) */}
      {Array.from({ length: 6 }).map((_, colIdx) => {
        const angle = (colIdx * Math.PI) / 3;
        const xPos = Math.cos(angle) * towerRadius;
        const zPos = Math.sin(angle) * towerRadius;
        
        return (
          <mesh key={colIdx} position={[xPos, (floorCount * floorHeight) / 2, zPos]}>
            <cylinderGeometry args={[0.018, 0.018, floorCount * floorHeight, 8]} />
            <meshStandardMaterial
              color="#D9D9D9"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.65}
            />
          </mesh>
        );
      })}

      {/* 4. Abstract architectural floaters hovering around the tower */}
      <mesh position={[2.5, 4.5, -0.5]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhysicalMaterial
          color="#C8A96A"
          roughness={0.1}
          transmission={0.8}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[-2.2, 1.5, 1.5]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#D9D9D9" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Controls camera motion based on scroll state
function HeroCameraController({ scrollPercent }: { scrollPercent: number }) {
  useFrame((state) => {
    // Zoom out/pan up slightly as user scrolls down the page
    const radius = 9 + scrollPercent * 4;
    const height = 1.5 + scrollPercent * 3.5;
    
    // We orbit camera slowly on idle and allow scroll scrollPercent to modify zoom and height
    const t = state.clock.getElapsedTime() * 0.05;
    
    state.camera.position.x = Math.sin(t) * radius;
    state.camera.position.z = Math.cos(t) * radius;
    state.camera.position.y = height;
    
    state.camera.lookAt(new THREE.Vector3(0, 0.8, 0));
  });

  return null;
}

export default function ThreeHeroScene() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Capture relative scroll inside the hero viewport
      const height = window.innerHeight;
      setScrollPercent(Math.min(window.scrollY / height, 1.2));
    };

    const handleMouseMove = (e: MouseEvent) => {
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
    <div className="absolute inset-0 h-full w-full pointer-events-none select-none z-0">
      {/* Cinematic grid helper overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,106,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,106,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 40, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Soft volumetric spotlight */}
        <spotLight
          position={[5, 10, 5]}
          angle={0.6}
          penumbra={1}
          intensity={150}
          color="#C8A96A"
        />

        {/* Dynamic sliding point light representing sun flare */}
        <pointLight position={[-5, 4, 3]} intensity={80} color="#D9D9D9" />

        <HeroCameraController scrollPercent={scrollPercent} />
        <ArchitecturalShowpiece mouse={mouse} />
      </Canvas>
    </div>
  );
}

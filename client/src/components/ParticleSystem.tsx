import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  color?: string;
  area?: [number, number, number]; // [width, height, depth]
  speed?: number;
}

export default function ParticleSystem({ 
  count = 300, 
  size = 0.02, 
  color = "#ffffff",
  area = [40, 20, 40],
  speed = 0.3
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Generate random particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions within the defined area
      positions[i3] = (Math.random() - 0.5) * area[0];
      positions[i3 + 1] = Math.random() * area[1];
      positions[i3 + 2] = (Math.random() - 0.5) * area[2];
      
      // Random velocities for floating motion
      velocities[i3] = (Math.random() - 0.5) * speed * 0.5;
      velocities[i3 + 1] = Math.random() * speed * 0.2 + speed * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.5;
    }
    
    return [positions, velocities];
  }, [count, area, speed]);

  // Animate particles
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions based on velocities
      positions[i3] += velocities[i3] * delta;
      positions[i3 + 1] += velocities[i3 + 1] * delta;
      positions[i3 + 2] += velocities[i3 + 2] * delta;
      
      // Add some floating motion with sine waves
      positions[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * delta * 0.1;
      positions[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.2) * delta * 0.05;
      
      // Reset particles that go too high or out of bounds
      if (positions[i3 + 1] > area[1]) {
        positions[i3 + 1] = 0;
        positions[i3] = (Math.random() - 0.5) * area[0];
        positions[i3 + 2] = (Math.random() - 0.5) * area[2];
      }
      
      // Keep particles within horizontal bounds
      if (Math.abs(positions[i3]) > area[0] / 2) {
        positions[i3] = (Math.random() - 0.5) * area[0];
      }
      if (Math.abs(positions[i3 + 2]) > area[2] / 2) {
        positions[i3 + 2] = (Math.random() - 0.5) * area[2];
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Animate material opacity for subtle pulsing effect
    if (materialRef.current) {
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={size}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Dust particles component
export function DustParticles() {
  return (
    <ParticleSystem
      count={200}
      size={0.015}
      color="#E6E6FA"
      area={[35, 15, 35]}
      speed={0.2}
    />
  );
}

// Sparkle particles component
export function SparkleParticles() {
  return (
    <ParticleSystem
      count={100}
      size={0.025}
      color="#FFD700"
      area={[30, 18, 30]}
      speed={0.15}
    />
  );
}

// Floating orbs component
export function FloatingOrbs() {
  return (
    <ParticleSystem
      count={50}
      size={0.04}
      color="#87CEEB"
      area={[25, 12, 25]}
      speed={0.1}
    />
  );
}
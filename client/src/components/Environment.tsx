import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Environment() {
  const grassTexture = useTexture('/textures/grass.png');
  
  // Configure grass texture
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(8, 8);

  return (
    <>
      {/* Main ground plane */}
      <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshLambertMaterial map={grassTexture} color="#90EE90" />
      </mesh>
      
      {/* Decorative trees using simple geometries */}
      <Tree position={[-8, 0, -8]} />
      <Tree position={[8, 0, -10]} />
      <Tree position={[-10, 0, 6]} />
      <Tree position={[9, 0, 8]} />
      <Tree position={[0, 0, -15]} />
      <Tree position={[-15, 0, 0]} />
      
      {/* Small hills for visual interest */}
      <Hill position={[-12, -0.3, -12]} />
      <Hill position={[12, -0.3, 12]} />
      <Hill position={[0, -0.3, 15]} />
    </>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const foliageRef = useRef<THREE.Mesh>(null);
  
  // Pre-calculate random values for each tree to avoid using Math.random in render
  const swayOffset = position[0] * 0.1 + position[2] * 0.15;
  const swaySpeed = 0.5 + (position[0] + position[2]) * 0.01;
  const swayAmount = 0.02 + Math.abs(position[0] * 0.001);

  useFrame((state) => {
    if (!groupRef.current || !foliageRef.current) return;

    // Gentle swaying motion
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(time * swaySpeed + swayOffset) * swayAmount;
    
    // Additional foliage movement
    foliageRef.current.rotation.y = Math.cos(time * 0.3 + swayOffset) * 0.1;
    foliageRef.current.position.x = Math.sin(time * 0.4 + swayOffset) * 0.05;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Tree trunk */}
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      
      {/* Tree foliage */}
      <mesh ref={foliageRef} castShadow position={[0, 2.5, 0]}>
        <sphereGeometry args={[1.2]} />
        <meshLambertMaterial color="#32CD32" />
      </mesh>
    </group>
  );
}

function Hill({ position }: { position: [number, number, number] }) {
  return (
    <mesh receiveShadow position={position}>
      <sphereGeometry args={[3, 8, 6]} />
      <meshLambertMaterial color="#98FB98" />
    </mesh>
  );
}

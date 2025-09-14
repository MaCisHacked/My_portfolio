import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolio } from '../lib/stores/usePortfolio';
import { useControls } from '../lib/stores/useControls';
import { useAudio } from '../lib/stores/useAudio';

interface InteractiveObjectProps {
  position: [number, number, number];
  color: string;
  section: 'about' | 'projects' | 'skills' | 'contact';
  label: string;
  vehiclePosition: THREE.Vector3;
}

function InteractiveObject({ position, color, section, label, vehiclePosition }: InteractiveObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isNear, setIsNear] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [prevInteract, setPrevInteract] = useState(false);
  const { openSection } = usePortfolio();
  const { controls } = useControls();
  const { playInteractionSound } = useAudio();
  
  const [subscribe, getKeys] = useKeyboardControls();

  useFrame((state) => {
    if (!meshRef.current) return;

    const distance = vehiclePosition.distanceTo(new THREE.Vector3(...position));
    const wasNear = isNear;
    setIsNear(distance < 3);

    // Check for interaction
    const keys = getKeys();
    const interact = keys.interact || controls.interact;
    
    // Track interaction edge (key press, not hold)
    if (isNear && interact && !prevInteract) {
      console.log(`Interacting with ${section}`);
      playInteractionSound();
      openSection(section);
    }
    
    setPrevInteract(interact);

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    
    // Scale animation when near
    const targetScale = isNear ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        castShadow
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          if (isNear) {
            console.log(`Clicking on ${section}`);
            playInteractionSound();
            openSection(section);
          }
        }}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshLambertMaterial 
          color={hovered || isNear ? new THREE.Color(color).multiplyScalar(1.3) : color}
          emissive={isNear ? new THREE.Color(color).multiplyScalar(0.2) : new THREE.Color(0x000000)}
        />
      </mesh>
      
      {/* Floating text label */}
      <Text
        position={[position[0], position[1] + 2, position[2]]}
        fontSize={0.5}
        color={isNear ? "#FFFFFF" : "#333333"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      {/* Interaction prompt when near */}
      {isNear && (
        <Text
          position={[position[0], position[1] + 2.8, position[2]]}
          fontSize={0.3}
          color="#FFFF00"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Press E to explore
        </Text>
      )}
      
      {/* Pulsing ring effect when near */}
      {isNear && (
        <mesh position={[position[0], 0.1, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2, 2.5, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function InteractiveObjects() {
  const vehiclePosition = useRef(new THREE.Vector3(0, 0.5, 0));

  // Update vehicle position reference for proximity detection
  useFrame(() => {
    // This will be updated by the Vehicle component
    // For now, we'll use a simple approximation
  });

  return (
    <>
      <InteractiveObject
        position={[-6, 1, -6]}
        color="#FF6B6B"
        section="about"
        label="About Me"
        vehiclePosition={vehiclePosition.current}
      />
      
      <InteractiveObject
        position={[6, 1, -6]}
        color="#4ECDC4"
        section="projects"
        label="Projects"
        vehiclePosition={vehiclePosition.current}
      />
      
      <InteractiveObject
        position={[-6, 1, 6]}
        color="#45B7D1"
        section="skills"
        label="Skills"
        vehiclePosition={vehiclePosition.current}
      />
      
      <InteractiveObject
        position={[6, 1, 6]}
        color="#96CEB4"
        section="contact"
        label="Contact"
        vehiclePosition={vehiclePosition.current}
      />
    </>
  );
}

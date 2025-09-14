import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from '../lib/stores/useControls';

export default function Vehicle() {
  const vehicleRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { controls } = useControls();
  
  // Get keyboard controls without causing re-renders
  const [subscribe, getKeys] = useKeyboardControls();
  
  // Vehicle state
  const velocity = useRef(new THREE.Vector3());
  const position = useRef(new THREE.Vector3(0, 0.5, 0));
  const rotation = useRef(0);
  const targetRotation = useRef(0);

  useFrame((state, delta) => {
    if (!vehicleRef.current) return;

    const keys = getKeys();
    const moveSpeed = 5;
    const rotationSpeed = 3;
    const maxSpeed = 0.15;
    
    // Handle input from both keyboard and mobile controls
    const forward = keys.forward || controls.forward;
    const backward = keys.backward || controls.backward;
    const left = keys.left || controls.left;
    const right = keys.right || controls.right;

    // Calculate movement direction
    let moveDirection = 0;
    let turnDirection = 0;

    if (forward) moveDirection += 1;
    if (backward) moveDirection -= 1;
    if (left) turnDirection += 1;
    if (right) turnDirection -= 1;

    // Apply rotation
    if (turnDirection !== 0) {
      targetRotation.current += turnDirection * rotationSpeed * delta;
    }

    // Smooth rotation interpolation
    rotation.current = THREE.MathUtils.lerp(rotation.current, targetRotation.current, delta * 8);
    
    // Apply movement in the direction the vehicle is facing
    if (moveDirection !== 0) {
      const moveVector = new THREE.Vector3(
        Math.sin(rotation.current) * moveDirection * maxSpeed,
        0,
        Math.cos(rotation.current) * moveDirection * maxSpeed
      );
      
      velocity.current.lerp(moveVector, delta * 8);
    } else {
      velocity.current.lerp(new THREE.Vector3(0, 0, 0), delta * 6);
    }

    // Update position
    position.current.add(velocity.current);
    
    // Keep vehicle on the ground and within bounds
    position.current.y = 0.5;
    position.current.x = Math.max(-18, Math.min(18, position.current.x));
    position.current.z = Math.max(-18, Math.min(18, position.current.z));

    // Apply transforms
    vehicleRef.current.position.copy(position.current);
    vehicleRef.current.rotation.y = rotation.current;

    // Smooth camera follow
    const idealCameraPosition = new THREE.Vector3(
      position.current.x + 8,
      position.current.y + 8,
      position.current.z + 8
    );
    
    camera.position.lerp(idealCameraPosition, delta * 2);
    camera.lookAt(position.current);

    // Log movement for debugging
    if (moveDirection !== 0 || turnDirection !== 0) {
      console.log('Vehicle moving:', { 
        forward, backward, left, right,
        position: position.current,
        rotation: rotation.current 
      });
    }
  });

  // Set initial position
  useEffect(() => {
    if (vehicleRef.current) {
      vehicleRef.current.position.copy(position.current);
    }
  }, []);

  return (
    <group ref={vehicleRef} castShadow>
      {/* Vehicle body */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.4, 2]} />
        <meshLambertMaterial color="#FF69B4" />
      </mesh>
      
      {/* Vehicle roof */}
      <mesh castShadow position={[0, 0.6, -0.2]}>
        <boxGeometry args={[0.8, 0.4, 1]} />
        <meshLambertMaterial color="#FF1493" />
      </mesh>
      
      {/* Wheels */}
      <Wheel position={[-0.5, -0.1, 0.7]} />
      <Wheel position={[0.5, -0.1, 0.7]} />
      <Wheel position={[-0.5, -0.1, -0.7]} />
      <Wheel position={[0.5, -0.1, -0.7]} />
      
      {/* Headlights */}
      <mesh position={[0, 0.2, 1.1]}>
        <sphereGeometry args={[0.1]} />
        <meshLambertMaterial color="#FFFF00" emissive="#FFFF88" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <mesh castShadow position={position}>
      <cylinderGeometry args={[0.25, 0.25, 0.2]} />
      <meshLambertMaterial color="#2F4F4F" />
    </mesh>
  );
}

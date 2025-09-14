import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Vehicle from './Vehicle';
import Environment from './Environment';
import InteractiveObjects from './InteractiveObjects';
import Lighting from './Lighting';
import { DustParticles, SparkleParticles, FloatingOrbs } from './ParticleSystem';

export default function Scene() {
  const { camera } = useThree();

  useEffect(() => {
    // Set up isometric-style camera position
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <Lighting />
      
      {/* Camera controls for desktop - limited to prevent disorientation */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={8}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        target={[0, 0, 0]}
      />
      
      <Environment />
      <Vehicle />
      <InteractiveObjects />
      
      {/* Particle effects */}
      <DustParticles />
      <SparkleParticles />
      <FloatingOrbs />
    </>
  );
}

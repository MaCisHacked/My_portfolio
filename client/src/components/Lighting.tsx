export default function Lighting() {
  return (
    <>
      {/* Ambient light for soft overall illumination */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Main directional light with soft shadows */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        color="#FFF8DC"
      />
      
      {/* Fill light from opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#E6E6FA"
      />
      
      {/* Top light for even illumination */}
      <directionalLight
        position={[0, 20, 0]}
        intensity={0.2}
        color="#F0F8FF"
      />
    </>
  );
}

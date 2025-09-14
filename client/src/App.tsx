import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useIsMobile } from "./hooks/use-is-mobile";
import Scene from "./components/Scene";
import PortfolioOverlay from "./components/PortfolioOverlay";
import MobileControls from "./components/MobileControls";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

// WebGL detection utility
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
}

// Define control keys for the game
enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  interact = 'interact'
}

const controls = [
  { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
  { name: Controls.backward, keys: ['KeyS', 'ArrowDown'] },
  { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
  { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
  { name: Controls.interact, keys: ['KeyE', 'Space'] },
];

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [canvasError, setCanvasError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { initializeAudio, playBackgroundMusic, toggleMute, isMuted } = useAudio();

  // Check WebGL support and show the canvas once everything is loaded
  useEffect(() => {
    const checkWebGL = () => {
      if (!isWebGLAvailable()) {
        setWebglSupported(false);
        console.warn('WebGL not available, showing fallback');
        return;
      }
      setWebglSupported(true);
      setShowCanvas(true);
    };

    // Add a small delay to ensure proper initialization
    setTimeout(checkWebGL, 100);
  }, []);

  // Initialize audio system
  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  // Handle user interaction to start background music
  const handleUserInteraction = () => {
    if (!isMuted) {
      playBackgroundMusic();
    }
  };

  const handleCanvasError = (error: any) => {
    console.error('Canvas creation error:', error);
    setCanvasError(error.message || 'Failed to create 3D context');
    setShowCanvas(false);
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #98E4FF 50%, #B0E7FF 100%)'
    }}>
      {!webglSupported || canvasError ? (
        // WebGL Fallback UI
        <div className="flex items-center justify-center h-full">
          <div className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl text-center">
            <div className="text-6xl mb-6">🎨</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Interactive Portfolio</h1>
            <p className="text-lg text-gray-600 mb-8">
              This portfolio is designed as a 3D interactive experience, but your browser doesn't support WebGL or there was an initialization error.
            </p>
            
            {canvasError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm">Error: {canvasError}</p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-800 mb-3">About Me</h3>
                <p className="text-pink-700">Passionate developer creating immersive digital experiences</p>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-teal-800 mb-3">Projects</h3>
                <p className="text-teal-700">Interactive 3D applications and creative coding projects</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Skills</h3>
                <p className="text-blue-700">Three.js, React, WebGL, and modern web technologies</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-800 mb-3">Contact</h3>
                <p className="text-green-700">Ready to bring your ideas to life</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 To experience the full interactive 3D version, try using a modern browser with WebGL support.
              </p>
            </div>
          </div>
        </div>
      ) : showCanvas ? (
        <KeyboardControls map={controls}>
          <Canvas
            shadows
            camera={{
              position: [10, 10, 10],
              fov: 50,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false
            }}
            onCreated={({ gl }) => {
              console.log('WebGL context created successfully');
            }}
            onError={handleCanvasError}
            onPointerDown={handleUserInteraction}
          >
            <color attach="background" args={["#B0E7FF"]} />
            
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
          
          <PortfolioOverlay />
          
          {/* Audio Control */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => {
                toggleMute();
                if (isMuted) {
                  playBackgroundMusic();
                }
              }}
              className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              title={isMuted ? "Enable Sound" : "Mute Sound"}
            >
              {isMuted ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93A10 10 0 0 1 21 12a10 10 0 0 1-1.93 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.54 8.46A5 5 0 0 1 17 12a5 5 0 0 1-1.46 3.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          
          {isMobile && <MobileControls />}
          
          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
            <p className="text-sm text-gray-700 font-medium mb-1">
              🚗 Drive around and explore!
            </p>
            <p className="text-xs text-gray-600">
              {isMobile ? "Use touch controls below" : "WASD or arrows to move, E/Space to interact"}
            </p>
          </div>
        </KeyboardControls>
      ) : (
        // Loading state
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading 3D Portfolio...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

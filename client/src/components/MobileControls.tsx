import { useEffect, useRef } from 'react';
import { useControls } from '../lib/stores/useControls';

export default function MobileControls() {
  const { setControls } = useControls();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!touchStartRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const threshold = 20;

      // Reset all controls
      setControls({
        forward: false,
        backward: false,
        left: false,
        right: false,
        interact: false
      });

      // Determine direction based on largest delta
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            setControls(prev => ({ ...prev, right: true }));
          } else {
            setControls(prev => ({ ...prev, left: true }));
          }
        }
      } else {
        if (Math.abs(deltaY) > threshold) {
          if (deltaY < 0) {
            setControls(prev => ({ ...prev, forward: true }));
          } else {
            setControls(prev => ({ ...prev, backward: true }));
          }
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      setControls({
        forward: false,
        backward: false,
        left: false,
        right: false,
        interact: false
      });
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setControls]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-40">
      {/* Directional pad */}
      <div className="grid grid-cols-3 gap-1 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
        <div></div>
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold shadow-md active:scale-95 transition-transform"
          onTouchStart={() => setControls(prev => ({ ...prev, forward: true }))}
          onTouchEnd={() => setControls(prev => ({ ...prev, forward: false }))}
        >
          ↑
        </button>
        <div></div>
        
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold shadow-md active:scale-95 transition-transform"
          onTouchStart={() => setControls(prev => ({ ...prev, left: true }))}
          onTouchEnd={() => setControls(prev => ({ ...prev, left: false }))}
        >
          ←
        </button>
        <div></div>
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold shadow-md active:scale-95 transition-transform"
          onTouchStart={() => setControls(prev => ({ ...prev, right: true }))}
          onTouchEnd={() => setControls(prev => ({ ...prev, right: false }))}
        >
          →
        </button>
        
        <div></div>
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold shadow-md active:scale-95 transition-transform"
          onTouchStart={() => setControls(prev => ({ ...prev, backward: true }))}
          onTouchEnd={() => setControls(prev => ({ ...prev, backward: false }))}
        >
          ↓
        </button>
        <div></div>
      </div>

      {/* Interact button */}
      <button
        className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg active:scale-95 transition-transform"
        onTouchStart={() => setControls(prev => ({ ...prev, interact: true }))}
        onTouchEnd={() => setControls(prev => ({ ...prev, interact: false }))}
      >
        E
      </button>
    </div>
  );
}

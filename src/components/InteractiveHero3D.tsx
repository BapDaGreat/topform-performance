import React, { useRef } from 'react';
import { useHeroThreeScene } from '../hooks/useHeroThreeScene';

/**
 * Interactive 3D Hero Kinetic Sculpture.
 *
 * Renders an undulating brushed-titanium & refractive Torus Knot in Three.js
 * that responds smoothly to cursor coordinates and touch gestures with inertia.
 */
export const InteractiveHero3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useHeroThreeScene(canvasRef, containerRef);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

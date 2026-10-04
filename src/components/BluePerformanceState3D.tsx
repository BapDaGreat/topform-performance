import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Move3d } from 'lucide-react';

/**
 * Interactive 3D "Blue Performance State" Flow Sphere.
 *
 * Visualizes the mental flow state: calm outer composure, energized crystalline core,
 * and harmonious orbital momentum.
 *
 * Interactive Features:
 * - Touch & Drag to rotate with fluid physical inertia and momentum.
 * - Gentle autonomous breathing and rotation when idle.
 * - Capped 60fps with IntersectionObserver pausing when scrolled out of view.
 * - Fully GPU-accelerated Three.js physical rendering.
 */
export const BluePerformanceState3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // Fallback gracefully if WebGL unavailable
    }

    const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(getPixelRatio());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // Root Group for user rotation
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // 1. Inner Glowing Energy Core
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 4);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0099ff,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    // 2. High-Tech Hexagonal Facet Lattice
    const latticeGeo = new THREE.IcosahedronGeometry(1.28, 2);
    const latticeMat = new THREE.MeshPhysicalMaterial({
      color: 0x22c5fe,
      metalness: 0.85,
      roughness: 0.18,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    orbGroup.add(latticeMesh);

    // 3. Outer Translucent Refractive Horizon Shell
    const shellGeo = new THREE.SphereGeometry(1.5, 36, 36);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c2538,
      metalness: 0.2,
      roughness: 0.15,
      transmission: 0.7,
      transparent: true,
      opacity: 0.35,
      ior: 1.45,
      clearcoat: 1.0,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    orbGroup.add(shellMesh);

    // 4. Orbital Ring (Equatorial flow plane)
    const ringGeo = new THREE.TorusGeometry(1.85, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22c5fe,
      transparent: true,
      opacity: 0.55,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.8;
    orbGroup.add(ringMesh);

    // 5. Ambient Flow Particles
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.35 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x22c5fe,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    orbGroup.add(particles);

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0x0099ff, 4.0, 15, Math.PI / 3);
    rimLight.position.set(-4, -4, 3);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x051329, 1.8);
    scene.add(ambientLight);

    // Resize handling
    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setPixelRatio(getPixelRatio());
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Interaction physics state (drag & momentum)
    const physics = {
      isDragging: false,
      prevX: 0,
      prevY: 0,
      velX: 0,
      velY: 0,
      rotX: 0.25,
      rotY: 0.4,
    };

    const onPointerDown = (e: PointerEvent) => {
      physics.isDragging = true;
      physics.prevX = e.clientX;
      physics.prevY = e.clientY;
      physics.velX = 0;
      physics.velY = 0;
      setIsInteracting(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!physics.isDragging) return;
      const deltaX = e.clientX - physics.prevX;
      const deltaY = e.clientY - physics.prevY;
      physics.prevX = e.clientX;
      physics.prevY = e.clientY;

      physics.velX = deltaX * 0.005;
      physics.velY = deltaY * 0.005;

      physics.rotY += physics.velX;
      physics.rotX += physics.velY;
    };

    const onPointerUp = (e: PointerEvent) => {
      physics.isDragging = false;
      setIsInteracting(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe ignore
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation loop & viewport visibility
    let isInView = true;
    let isTabVisible = !document.hidden;
    let rafId: number | null = null;
    const clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      rafId = null;
      if (!isInView || !isTabVisible) return;

      const elapsed = clock.getElapsedTime();

      // Apply inertia momentum damping
      if (!physics.isDragging) {
        physics.velX *= 0.94;
        physics.velY *= 0.94;
        physics.rotY += physics.velX;
        physics.rotX += physics.velY;

        // Autonomous slow rotation when idle
        physics.rotY += 0.0035;
      }

      orbGroup.rotation.x = physics.rotX;
      orbGroup.rotation.y = physics.rotY;

      // Organic pulsation & wave breathing
      const breathe = 1 + Math.sin(elapsed * 1.8) * 0.035;
      coreMesh.scale.setScalar(breathe);
      coreMat.opacity = 0.75 + Math.sin(elapsed * 2.4) * 0.15;

      latticeMesh.rotation.y = elapsed * 0.08;
      latticeMesh.rotation.z = Math.sin(elapsed * 0.4) * 0.1;

      particles.rotation.y = -elapsed * 0.05;
      ringMesh.rotation.z = elapsed * 0.12;

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    const startLoop = () => {
      if (rafId === null && isInView && isTabVisible) {
        clock.getDelta();
        rafId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        isInView = Boolean(entries[0]?.isIntersecting);
        if (isInView) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) startLoop();
      else stopLoop();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    startLoop();

    return () => {
      stopLoop();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver.disconnect();
      io.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[340px] sm:max-w-[400px] mx-auto select-none touch-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing rounded-2xl"
        style={{ touchAction: 'none' }}
        title="Interactive 3D Blue Performance State — Drag to rotate"
      />

      {/* Floating Interactive Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-zinc-300 shadow-lg whitespace-nowrap transition-opacity duration-300">
        <Move3d className="w-3.5 h-3.5 text-[#22c5fe]" />
        <span>{isInteracting ? 'Rotating 3D State' : 'Drag to rotate 3D state'}</span>
        <Sparkles className="w-3 h-3 text-[#22c5fe]/70" />
      </div>
    </div>
  );
};

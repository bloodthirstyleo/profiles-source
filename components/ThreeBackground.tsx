"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTunisContext } from "@/contexts/TunisContext";

const SKIN_COLORS: Record<string, string> = {
  blue: "#60a5fa",
  green: "#34d399",
  orange: "#fb923c",
  pink: "#f472b6",
  purple: "#a78bfa",
  red: "#f87171",
  yellow: "#facc15",
};

const PARTICLE_COUNT = 950;

function getSkinColor(color: string) {
  return SKIN_COLORS[color] ?? SKIN_COLORS.blue;
}

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { color, dark } = useTunisContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const index = i * 3;
      positions[index] = (Math.random() - 0.5) * 52;
      positions[index + 1] = (Math.random() - 0.5) * 30;
      positions[index + 2] = (Math.random() - 0.5) * 26;
    }
    basePositions.set(positions);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: getSkinColor(color),
      opacity: dark ? 0.42 : 0.28,
      size: 0.075,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const pointer = new THREE.Vector2(0, 0);
    let animationFrame = 0;
    let visible = document.visibilityState === "visible";

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const movePointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = (time: number) => {
      if (!visible) return;

      const elapsed = time * 0.00035;
      const position = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const index = i * 3;
        const baseX = basePositions[index];
        const baseY = basePositions[index + 1];
        position.array[index] = baseX + Math.sin(elapsed + i * 0.17) * 0.18 + pointer.x * 0.9;
        position.array[index + 1] = baseY + Math.cos(elapsed + i * 0.11) * 0.18 - pointer.y * 0.7;
      }

      position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.12 + pointer.x * 0.04;
      particles.rotation.x = pointer.y * 0.03;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && animationFrame === 0) {
        animationFrame = requestAnimationFrame(animate);
      } else if (!visible && animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrame);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [color, dark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
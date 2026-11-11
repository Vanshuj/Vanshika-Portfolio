import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function LiquidGlassSculpture() {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = currentMount.clientWidth || 420;
    const height = currentMount.clientHeight || 420;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    currentMount.appendChild(renderer.domElement);

    // Geometry: Organic Smooth Torus Knot (Liquid sculpture feel)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);

    // Realistic Translucent Glass Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xdcd5f5), // Lavender base
      emissive: new THREE.Color(0x201535),
      roughness: 0.12,
      metalness: 0.05,
      transmission: 0.88, // Glass transparency
      thickness: 1.4,
      ior: 1.45, // Glass index of refraction
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.94,
    });

    const sculpture = new THREE.Mesh(geometry, glassMaterial);
    scene.add(sculpture);

    // Inner core glowing sphere for depth
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd5e8f5), // Powder blue core
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Studio Pastel Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfaf9f6, 1.2);
    scene.add(ambientLight);

    // Lavender Key Light
    const light1 = new THREE.DirectionalLight(0xdcd5f5, 2.5);
    light1.position.set(4, 5, 4);
    scene.add(light1);

    // Powder Blue Fill Light
    const light2 = new THREE.DirectionalLight(0xd5e8f5, 2.0);
    light2.position.set(-4, -3, 3);
    scene.add(light2);

    // Soft Peach Rim Light
    const light3 = new THREE.PointLight(0xf6dfd2, 2.2, 10);
    light3.position.set(0, 4, -3);
    scene.add(light3);

    // Java Orange Subtle Accent Rim
    const light4 = new THREE.PointLight(0xf89820, 1.5, 8);
    light4.position.set(3, -2, -2);
    scene.add(light4);

    // Mouse Tracking for Interactive Refraction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid gentle rotation
      sculpture.rotation.x = elapsedTime * 0.25;
      sculpture.rotation.y = elapsedTime * 0.35;

      // Smooth dampening to mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      sculpture.position.x = mouseX * 0.6;
      sculpture.position.y = -mouseY * 0.6;

      core.rotation.y = -elapsedTime * 0.2;
      core.position.x = sculpture.position.x * 0.5;
      core.position.y = sculpture.position.y * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      glassMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto flex items-center justify-center">
      {/* Ambient Pastel Glow Halos */}
      <div 
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-60 animate-pulse-subtle pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(220, 213, 245, 0.8) 0%, rgba(213, 232, 245, 0.4) 60%, transparent 100%)' }}
      />
      <div 
        className="absolute w-60 h-60 -top-4 -right-4 rounded-full blur-2xl opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(246, 223, 210, 0.7) 0%, transparent 70%)' }}
      />

      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <div ref={mountRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Refined CSS Glass Sculpture Fallback */
        <div className="relative z-10 w-72 h-72 rounded-3xl glass-panel tint-lavender flex items-center justify-center shadow-liquid-glow animate-float-slow">
          <div className="w-48 h-48 rounded-full border border-white/80 bg-white/40 backdrop-blur-xl shadow-inner flex items-center justify-center">
            <span className="font-display font-bold text-4xl text-pastel-ink tracking-widest">VJ</span>
          </div>
        </div>
      )}

      {/* Material Specular Sheen Rim */}
      <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none opacity-50" />
    </div>
  );
}

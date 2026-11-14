import React from 'react';
import GlassButterfly from './GlassButterfly';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* 
        ========================================================
        PHASE 2: PASTEL AURORA BACKGROUND (HIGH SATURATION / HIGH OPACITY)
        Increased opacity & vibrant gradients so the liquid glass 
        and backdrop-filter refraction are strikingly visible.
        - Lavender #B4B0FF / #C9C6FF
        - Mint #8EE8C4 / #CFF1E3
        - Peach #FFB894 / #FFD9C2
        - Pink #F79BD6 / #F7C6E8
        ========================================================
      */}

      {/* Blob 1: Vibrant Pastel Lavender - Placed behind Hero Console & Navbar */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-1 absolute top-[2%] right-[10%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full blur-[70px] opacity-80 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #B4B0FF 0%, #C9C6FF 40%, rgba(201, 198, 255, 0.65) 65%, transparent 85%)' 
        }}
      />

      {/* Blob 2: Vibrant Pastel Mint - Placed mid-screen across About & Skills */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-2 absolute top-[22%] left-[4%] w-[58vw] h-[58vw] max-w-[850px] max-h-[850px] rounded-full blur-[75px] opacity-75 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #8EE8C4 0%, #CFF1E3 45%, rgba(207, 241, 227, 0.6) 70%, transparent 85%)' 
        }}
      />

      {/* Blob 3: Vibrant Pastel Peach - Placed across Projects & Timeline */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-3 absolute top-[48%] right-[5%] w-[56vw] h-[56vw] max-w-[820px] max-h-[820px] rounded-full blur-[75px] opacity-80 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #FFB894 0%, #FFD9C2 45%, rgba(255, 217, 194, 0.6) 70%, transparent 85%)' 
        }}
      />

      {/* Blob 4: Vibrant Pastel Pink - Placed across Contact & Footer */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-4 absolute top-[72%] left-[8%] w-[60vw] h-[60vw] max-w-[880px] max-h-[880px] rounded-full blur-[75px] opacity-75 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #F79BD6 0%, #F7C6E8 45%, rgba(247, 198, 232, 0.6) 70%, transparent 85%)' 
        }}
      />

      {/* Additional Aurora Accent: Soft Violet/Blue in top-left to enrich Hero text */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-3 absolute -top-[5%] left-[2%] w-[48vw] h-[48vw] max-w-[700px] max-h-[700px] rounded-full blur-[70px] opacity-70 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #C9C6FF 0%, rgba(201, 198, 255, 0.5) 50%, transparent 80%)' 
        }}
      />

      {/* Studio Light Sheen across top-left */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 w-[85vw] h-[65vh] max-w-[1200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 12% 8%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.35) 45%, transparent 75%)'
        }}
      />

      {/* Warm Golden-Brown Depth Resonance Layers (Portfolio Brand Anchor) */}
      <div 
        aria-hidden="true"
        className="absolute top-[32%] right-[15%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, rgba(255, 235, 151, 0.4) 50%, transparent 80%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[80%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[150px] opacity-15 mix-blend-multiply pointer-events-none"
        style={{ background: 'radial-gradient(circle, #583714 0%, rgba(88, 55, 20, 0.3) 50%, transparent 80%)' }}
      />

      {/* Technical Precision Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(to right, #583714 1px, transparent 1px), linear-gradient(to bottom, #583714 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* 
        ========================================================
        PHASE 3: 3D REAL GLASS BUTTERFLY (Three.js)
        Procedural ExtrudeGeometry + MeshPhysicalMaterial with
        Transmission, Iridescence, RoomEnvironment PMREM,
        360° Continuous Rotation, Gentle Flap, Parallax Tilt.
        ========================================================
      */}
      <GlassButterfly />

      {/* Progressive Enhancement: SVG Liquid Distort Filter */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="lg-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

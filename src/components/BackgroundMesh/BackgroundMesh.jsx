import React from 'react';
import GlassButterfly from './GlassButterfly';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* 
        ========================================================
        PHASE 2: PASTEL AURORA BACKGROUND (REFRACTIVE CANVAS)
        4 large blurred radial-gradient blobs drifting slowly:
        - Lavender #C9C6FF
        - Mint #CFF1E3
        - Peach #FFD9C2
        - Pink #F7C6E8
        Over the site's existing #FAF7F0 background and warm tones.
        ========================================================
      */}

      {/* Blob 1: Soft Pastel Lavender (#C9C6FF) */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-1 absolute top-[5%] left-[8%] w-[58vw] h-[58vw] max-w-[820px] max-h-[820px] rounded-full blur-[80px] opacity-45 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #C9C6FF 0%, rgba(201, 198, 255, 0.45) 45%, transparent 75%)' 
        }}
      />

      {/* Blob 2: Soft Pastel Mint (#CFF1E3) */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-2 absolute top-[12%] right-[5%] w-[55vw] h-[55vw] max-w-[780px] max-h-[780px] rounded-full blur-[80px] opacity-40 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #CFF1E3 0%, rgba(207, 241, 227, 0.45) 45%, transparent 75%)' 
        }}
      />

      {/* Blob 3: Soft Pastel Peach (#FFD9C2) */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-3 absolute top-[42%] left-[2%] w-[52vw] h-[52vw] max-w-[740px] max-h-[740px] rounded-full blur-[80px] opacity-45 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #FFD9C2 0%, rgba(255, 217, 194, 0.45) 45%, transparent 75%)' 
        }}
      />

      {/* Blob 4: Soft Pastel Pink (#F7C6E8) */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-4 absolute top-[62%] right-[8%] w-[56vw] h-[56vw] max-w-[800px] max-h-[800px] rounded-full blur-[80px] opacity-40 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #F7C6E8 0%, rgba(247, 198, 232, 0.40) 45%, transparent 75%)' 
        }}
      />

      {/* Studio Light Sheen across top-left */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 w-[80vw] h-[60vh] max-w-[1100px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 12% 8%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.25) 45%, transparent 75%)'
        }}
      />

      {/* Warm Golden-Brown Depth Resonance Layers (Preserving Brand Identity) */}
      <div 
        aria-hidden="true"
        className="absolute top-[28%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] opacity-35 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, rgba(255, 235, 151, 0.35) 45%, transparent 80%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[75%] -right-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[150px] opacity-15 mix-blend-multiply pointer-events-none"
        style={{ background: 'radial-gradient(circle, #583714 0%, rgba(88, 55, 20, 0.25) 50%, transparent 80%)' }}
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

import React from 'react';
import GlassButterfly from './GlassButterfly';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* 
        ========================================================
        PHASE 2: PASTEL AURORA BACKGROUND (HIGH SATURATION / HIGH OPACITY)
        Vibrant, glowing pastel aurora gradients so the liquid glass 
        and backdrop-filter refraction are strikingly visible across
        all cards and modals with no empty/dead zones.
        - Lavender #9F95FF / #B8B0FF
        - Mint #4FE3AA / #7EEEBF
        - Peach #FFA175 / #FFBE9E
        - Pink #FF72C1 / #FFA2DA
        - Sky Blue #45CAFF / #8FE0FF
        - Warm Golden Light #FFD275
        ========================================================
      */}

      {/* Blob 1: Vibrant Pastel Lavender - Top Right */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-1 absolute -top-[5%] right-[2%] w-[70vw] h-[70vw] max-w-[1050px] max-h-[1050px] rounded-full blur-[65px] opacity-95 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #9F95FF 0%, #B8B0FF 35%, rgba(200, 195, 255, 0.80) 65%, transparent 88%)' 
        }}
      />

      {/* Blob 2: Vibrant Pastel Mint - Middle Left */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-2 absolute top-[15%] -left-[5%] w-[68vw] h-[68vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[65px] opacity-90 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #4FE3AA 0%, #7EEEBF 35%, rgba(180, 245, 220, 0.80) 65%, transparent 88%)' 
        }}
      />

      {/* Blob 3: Vibrant Pastel Peach & Coral - Middle Right */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-3 absolute top-[40%] right-[0%] w-[66vw] h-[66vw] max-w-[980px] max-h-[980px] rounded-full blur-[65px] opacity-95 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #FFA175 0%, #FFBE9E 35%, rgba(255, 220, 198, 0.85) 65%, transparent 88%)' 
        }}
      />

      {/* Blob 4: Vibrant Pastel Pink & Rose - Bottom Left */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-4 absolute top-[65%] -left-[3%] w-[70vw] h-[70vw] max-w-[1020px] max-h-[1020px] rounded-full blur-[65px] opacity-90 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #FF72C1 0%, #FFA2DA 35%, rgba(255, 205, 238, 0.80) 65%, transparent 88%)' 
        }}
      />

      {/* Blob 5: Vibrant Sky Blue / Cyan - Central Viewport Glow (directly behind modals and central cards) */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-1 absolute top-[28%] left-[16%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full blur-[70px] opacity-90 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #45CAFF 0%, #8FE0FF 35%, rgba(195, 238, 255, 0.80) 65%, transparent 88%)' 
        }}
      />

      {/* Blob 6: Luminous Pastel Amber Gold - Central Lower Viewport */}
      <div 
        aria-hidden="true"
        className="lg-aurora-blob-2 absolute top-[52%] left-[25%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full blur-[70px] opacity-85 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, #FFD275 0%, #FFE5A3 35%, rgba(255, 240, 195, 0.75) 65%, transparent 88%)' 
        }}
      />

      {/* Studio Light Sheen across top-left */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 w-[85vw] h-[65vh] max-w-[1200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 12% 8%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.40) 45%, transparent 75%)'
        }}
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

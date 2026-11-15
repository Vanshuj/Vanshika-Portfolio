import React from 'react';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* Clean, subtle studio ambient light sheen */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 w-[85vw] h-[65vh] max-w-[1200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 18% 12%, rgba(255, 255, 255, 0.85) 0%, rgba(245, 247, 250, 0.35) 55%, transparent 80%)'
        }}
      />

      {/* Faint, neutral architectural precision grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

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

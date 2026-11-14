import React from 'react';
import GlassButterfly from './GlassButterfly';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* 
        Three.js GlassButterfly WebGL canvas renders its own dynamic pastel aurora
        backdrop directly inside scene.background so transmission physically refracts
        the drifting lavender (#BDB8FF), mint (#B8EBD6), peach (#FFCDAE), and pink (#F5B8E2)
        blobs. The CSS aurora layer is removed to avoid duplicate rendering.
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

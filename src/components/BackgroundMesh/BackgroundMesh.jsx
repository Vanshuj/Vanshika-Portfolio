import React from 'react';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* 
        WARM GOLDEN-BROWN LIQUID GLASS AMBIENT ENVIRONMENT
        Primary Palette:
        - Light Golden Cream: #FFEB97
        - Deep Warm Brown: #583714
        Smooth gradients between light golden highlights and dark brown ambient depth.
      */}

      {/* Top Left: Light Golden Cream Highlight (Hero & Header) */}
      <div 
        aria-hidden="true"
        className="absolute -top-[12%] -left-[10%] w-[68vw] h-[68vw] max-w-[900px] max-h-[900px] rounded-full blur-[150px] opacity-65 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, rgba(255, 235, 151, 0.45) 45%, rgba(88, 55, 20, 0.08) 80%, transparent 90%)' }}
      />

      {/* Top Right: Deep Warm Brown Ambient Depth Pool (Hero Telemetry & Architecture) */}
      <div 
        aria-hidden="true"
        className="absolute top-[8%] -right-[12%] w-[55vw] h-[55vw] max-w-[780px] max-h-[780px] rounded-full blur-[160px] opacity-25 mix-blend-multiply pointer-events-none"
        style={{ background: 'radial-gradient(circle, #583714 0%, rgba(88, 55, 20, 0.35) 45%, transparent 75%)' }}
      />

      {/* Mid Left: Warm Golden Amber Light (About & Skills) */}
      <div 
        aria-hidden="true"
        className="absolute top-[28%] -left-[10%] w-[58vw] h-[58vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] opacity-55 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, rgba(229, 191, 90, 0.35) 45%, rgba(88, 55, 20, 0.06) 80%, transparent 90%)' }}
      />

      {/* Mid Center-Right: Rich Golden Glow (Featured Projects) */}
      <div 
        aria-hidden="true"
        className="absolute top-[48%] right-[5%] w-[52vw] h-[52vw] max-w-[720px] max-h-[720px] rounded-full blur-[150px] opacity-50 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, rgba(255, 246, 208, 0.5) 40%, rgba(88, 55, 20, 0.1) 85%, transparent 90%)' }}
      />

      {/* Mid Left: Warm Brown Contrast Horizon (Experience & Trajectory) */}
      <div 
        aria-hidden="true"
        className="absolute top-[66%] -left-[8%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[160px] opacity-20 mix-blend-multiply pointer-events-none"
        style={{ background: 'radial-gradient(circle, #583714 0%, rgba(123, 79, 31, 0.3) 50%, transparent 80%)' }}
      />

      {/* Bottom Center: Golden Cream & Warm Earth Resonance (Certificates & Contact) */}
      <div 
        aria-hidden="true"
        className="absolute -bottom-[10%] left-[12%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[150px] opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, rgba(255, 240, 175, 0.4) 45%, rgba(88, 55, 20, 0.12) 80%, transparent 90%)' }}
      />

      {/* Subtle Technical Grid Lines in Warm Brown */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(to right, #583714 1px, transparent 1px), linear-gradient(to bottom, #583714 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
}

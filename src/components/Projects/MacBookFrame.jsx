import React from 'react';
import './MacBookFrame.css';

/**
 * MacBookFrame
 * A realistic, hardware-accurate Apple MacBook Pro display mockup.
 * Wraps demo videos and project previews inside an anodized aluminum chassis,
 * Retina glass bezel, top camera notch with green status LED, recessed hinge,
 * and aluminum base deck with the iconic thumb-opening groove.
 */
export default function MacBookFrame({ children, className = '' }) {
  return (
    <div className={`macbook-mockup-wrapper ${className}`}>
      {/* 1. Display Lid (Aluminium casing + black bezel) */}
      <div className="macbook-lid">
        {/* Top Bezel with MacBook Pro Camera Notch */}
        <div className="macbook-top-bezel">
          <div className="macbook-notch" title="MacBook Pro FaceTime HD Camera">
            <span className="macbook-camera-lens">
              <span className="macbook-lens-reflection" />
            </span>
            <span className="macbook-sensor-led" />
          </div>
        </div>

        {/* Screen Display Area */}
        <div className="macbook-screen">
          {children}
          {/* Subtle Retina Glass Glare Reflection */}
          <div className="macbook-glass-glare" aria-hidden="true" />
        </div>
      </div>

      {/* 2. Recessed Display Hinge */}
      <div className="macbook-hinge" aria-hidden="true" />

      {/* 3. Aluminum Base Deck with Center Thumb Notch */}
      <div className="macbook-base" aria-hidden="true">
        <div className="macbook-thumb-groove" />
      </div>

      {/* 4. Ambient Base Shadow on Glass Card */}
      <div className="macbook-ambient-shadow" aria-hidden="true" />
    </div>
  );
}

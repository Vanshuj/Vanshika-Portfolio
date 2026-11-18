import React from 'react';
import './MacBookBrowserFrame.css';

/**
 * MacBookBrowserFrame
 * Front-on MacBook Pro screen mockup with jet-black bezel, centered display notch,
 * authentic macOS Chrome browser chrome (traffic lights, active tab, URL address bar),
 * extended anodized silver aluminum base deck, and bottom rubber feet.
 */
export default function MacBookBrowserFrame({ title = 'Demo', url = '', children }) {
  const displayUrl = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${title.toLowerCase().replace(/\s+/g, '-')}.app`;

  return (
    <div className="mbp-frame-wrapper">
      {/* 1. Jet-Black MacBook Pro Lid */}
      <div className="mbp-lid">
        <div className="mbp-display">
          {/* Top-Center MacBook Display Notch */}
          <div className="mbp-notch" aria-hidden="true" />

          {/* Row 1: macOS Traffic Lights + Active Tab + New Tab */}
          <div className="mbp-tab-strip" aria-hidden="true">
            <div className="mbp-traffic-lights">
              <span className="mbp-dot mbp-dot-red" />
              <span className="mbp-dot mbp-dot-yellow" />
              <span className="mbp-dot mbp-dot-green" />
            </div>

            <div className="mbp-active-tab">
              <span className="mbp-tab-title">{title}</span>
              <span className="mbp-tab-close">×</span>
            </div>

            <span className="mbp-new-tab">+</span>
          </div>

          {/* Row 2: Browser Navigation + Rounded URL Pill + Avatar & Menu */}
          <div className="mbp-toolbar" aria-hidden="true">
            <div className="mbp-nav-icons">
              {/* Back arrow */}
              <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 3.5L6 8l4.5 4.5" />
                <path d="M6 8h7" />
              </svg>
              {/* Forward arrow */}
              <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
                <path d="M5.5 3.5L10 8l-4.5 4.5" />
                <path d="M10 8H3" />
              </svg>
              {/* Reload */}
              <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 8a5 5 0 1 1-1.4-3.5L13 6" />
                <path d="M13 3v3h-3" />
              </svg>
            </div>

            {/* Rounded Address Pill */}
            <div className="mbp-url-pill">
              <span className="mbp-url-text">{displayUrl}</span>
              {/* Bookmark Star */}
              <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="#5F6368" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M8 2.2l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 2.2z" />
              </svg>
            </div>

            {/* Profile Avatar + 3-dot Menu */}
            <div className="mbp-toolbar-right">
              <span className="mbp-avatar">
                <svg viewBox="0 0 16 16">
                  <circle cx="8" cy="5.5" r="2.8" />
                  <path d="M3 13.5c.6-2.5 2.5-3.8 5-3.8s4.4 1.3 5 3.8" />
                </svg>
              </span>
              <svg width="9" height="9" viewBox="0 0 16 16" fill="#5F6368">
                <circle cx="8" cy="3.5" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="8" cy="12.5" r="1.2" />
              </svg>
            </div>
          </div>

          {/* 3. Video / Content Viewport */}
          <div className="mbp-viewport">{children}</div>
        </div>
      </div>

      {/* 4. Extended Silver Aluminum Base Deck */}
      <div className="mbp-base" aria-hidden="true">
        <div className="mbp-thumb-slot" />
      </div>

      {/* 5. Left & Right Rubber Feet */}
      <div className="mbp-feet-row" aria-hidden="true">
        <span className="mbp-foot" />
        <span className="mbp-foot" />
      </div>
    </div>
  );
}

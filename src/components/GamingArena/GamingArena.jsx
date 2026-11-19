import React, { useState } from 'react';
import { gamingArenaData } from '../../data/gamingArena';
import MacBookBrowserFrame from '../Projects/MacBookBrowserFrame';
import {
  Gamepad2,
  Play,
  Video,
  ExternalLink,
  Code2,
  CheckCircle2,
  RotateCcw,
  Keyboard,
} from 'lucide-react';
import './GamingArena.css';

export default function GamingArena() {
  const activeGame = gamingArenaData.featuredGames[0];
  const [mode, setMode] = useState('preview'); // 'preview' | 'play'
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <section
      id="gaming-arena"
      className="gaming-arena-section relative z-10"
      aria-label="The Gaming Arena — Interactive Playable Browser Games"
    >
      <div className="gaming-arena-container">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge mb-3">
            <Gamepad2 className="w-3.5 h-3.5 text-accent-spring" />
            <span className="font-mono text-xs text-pastel-slate">
              Interactive Browser Arcade
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-pastel-ink tracking-tight mb-3">
            The Gaming Arena
          </h2>

          <p className="max-w-2xl font-body text-sm sm:text-base text-pastel-slate leading-relaxed">
            Interactive browser games built from scratch with custom 60 FPS canvas physics loops and magnetic polarity mechanics. 
            Watch the gameplay preview or launch straight into a live run right inside the console.
          </p>
        </div>

        {/* Obsidian Arcade Cabinet Shell */}
        <div className="arena-cabinet">
          {/* Dipole Ambient Lighting (Red North / Blue South) */}
          <div className="arena-dipole-north" aria-hidden="true" />
          <div className="arena-dipole-south" aria-hidden="true" />

          {/* Top Console Bar */}
          <div className="arena-topbar">
            <div className="arena-cartridge-label">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-pastel-ink">{activeGame.title.toUpperCase()}</strong>
              <span className="arena-polarity-pill hidden sm:inline-flex" aria-hidden="true">
                <span className="arena-pole-n">N</span>
                <span className="arena-pole-s">S</span>
              </span>
            </div>

            {/* Interactive Mode Toggle: Preview Video vs Play Live Here */}
            <div className="flex items-center gap-2">
              <div className="arena-mode-switch" role="tablist" aria-label="Game viewer mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'preview'}
                  onClick={() => setMode('preview')}
                  className={`arena-mode-btn ${mode === 'preview' ? 'active' : ''}`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Preview Video</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'play'}
                  onClick={() => setMode('play')}
                  className={`arena-mode-btn ${mode === 'play' ? 'play-active' : ''}`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Play Live Here</span>
                </button>
              </div>

              {mode === 'play' && (
                <button
                  type="button"
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-pastel-ink border border-white/15 transition-colors cursor-pointer"
                  title="Reload Live Game"
                  aria-label="Reload Live Game"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Main 2-Column Arena Stage */}
          <div className="arena-stage-grid">
            
            {/* LEFT: Gameplay Video / Live Interactive Game inside MacBook Pro Browser Frame */}
            <div className="w-full">
              <MacBookBrowserFrame title={activeGame.title} url={activeGame.liveUrl}>
                {mode === 'preview' ? (
                  <video
                    src={activeGame.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    key={iframeKey}
                    src={activeGame.liveUrl}
                    title={`${activeGame.title} Live Playable Game`}
                    className="arena-live-iframe"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                )}
              </MacBookBrowserFrame>
            </div>

            {/* RIGHT: Game Briefing, Mechanical Keycap Controls & Launch CTAs */}
            <div className="arena-briefing">
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/35">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeGame.status}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full glass-badge font-mono text-[11px] text-pastel-ink">
                  {activeGame.genre}
                </span>
                <span className="arena-polarity-pill">
                  <span className="arena-pole-n">N</span>
                  <span className="arena-pole-s">S</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-pastel-ink tracking-tight mb-1">
                  {activeGame.title}
                </h3>
                <p className="font-mono text-xs text-accent-java font-medium">
                  {activeGame.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
                {activeGame.description}
              </p>

              {/* Tactile Mechanical Keycap Controls */}
              <div className="arena-controls-box">
                <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-pastel-slate pb-1 border-b border-white/10">
                  <Keyboard className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Game Controls</span>
                </div>
                {activeGame.controls.map((ctrl, idx) => (
                  <div key={idx} className="arena-control-row">
                    <div className="arena-keycaps">
                      {ctrl.keys.map((k, kIdx) => (
                        <span key={kIdx} className="arena-keycap">
                          {k}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] text-pastel-slate text-right">
                      {ctrl.action}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5">
                {activeGame.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-pastel-ink">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-spring shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {activeGame.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md glass-badge text-pastel-ink text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="arena-cta-row">
                <a
                  href={activeGame.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arena-play-cta"
                  data-magnetic="true"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={activeGame.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arena-source-cta"
                  data-magnetic="true"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Source Code</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Arena Cartridge Dock (More Playable Builds) */}
          <div className="arena-dock">
            <div className="flex items-center gap-2 font-mono text-[11px] text-pastel-slate">
              <Gamepad2 className="w-3.5 h-3.5 text-accent-spring" />
              <span>MORE PLAYABLE BUILDS IN ARENA:</span>
            </div>

            <div className="arena-dock-links">
              {gamingArenaData.quickLaunchExtras.map((extra) => (
                <a
                  key={extra.id}
                  href={extra.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arena-cartridge-chip"
                  data-magnetic="true"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: extra.accent, boxShadow: `0 0 8px ${extra.accent}` }}
                  />
                  <span>[{extra.slot}] {extra.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

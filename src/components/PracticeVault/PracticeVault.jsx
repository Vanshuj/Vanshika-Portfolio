import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { practiceVaultData } from '../../data/practiceVault';
import {
  Compass,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  GitBranch,
  Globe,
} from 'lucide-react';
import './PracticeVault.css';

const CX = 270;
const CY = 270;

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx, cy, r, startDeg, endDeg, reverse = false) {
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  if (reverse) {
    const start = polarToCartesian(cx, cy, r, endDeg);
    const end = polarToCartesian(cx, cy, r, startDeg);
    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  }
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function circularAngleDiff(a, b) {
  const diff = Math.abs(((a - b + 540) % 360) - 180);
  return diff;
}

const SECTOR_CONFIG = {
  'java-react': {
    startArc: 4,
    endArc: 116,
    nodeStart: 16,
    nodeEnd: 104,
    labelRadius: 224,
    labelText: 'JAVA + REACT SYSTEMS',
    reverseLabel: false,
  },
  'java-core': {
    startArc: 124,
    endArc: 236,
    nodeStart: 138,
    nodeEnd: 222,
    labelRadius: 234,
    labelText: 'CORE JAVA & DSA',
    reverseLabel: true,
  },
  'cpp-systems': {
    startArc: 244,
    endArc: 356,
    nodeStart: 268,
    nodeEnd: 332,
    labelRadius: 224,
    labelText: 'C++ SYSTEMS & LOGIC',
    reverseLabel: false,
  },
};

export default function PracticeVault() {
  // Build positioned compass nodes across the 3 120-degree sectors
  const compassNodes = useMemo(() => {
    const nodes = [];
    let globalIdx = 1;

    practiceVaultData.directories.forEach((dir) => {
      const cfg = SECTOR_CONFIG[dir.id];
      const dirFiles = practiceVaultData.files.filter((f) => f.dir === dir.id);
      const count = dirFiles.length;

      dirFiles.forEach((file, i) => {
        const angle =
          count === 1
            ? (cfg.nodeStart + cfg.nodeEnd) / 2
            : cfg.nodeStart + (i / (count - 1)) * (cfg.nodeEnd - cfg.nodeStart);

        nodes.push({
          ...file,
          indexNumber: String(globalIdx).padStart(2, '0'),
          globalIndex: globalIdx - 1,
          angle: Math.round(angle * 10) / 10,
          sectorColor: dir.color,
          sectorGlow: dir.glowColor,
          sectorLabel: dir.label,
        });
        globalIdx++;
      });
    });

    return nodes;
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [needleRotation, setNeedleRotation] = useState(() => compassNodes[0]?.angle || 16);
  const [isDragging, setIsDragging] = useState(false);

  const svgRef = useRef(null);
  const activeNode = compassNodes[activeIndex] || compassNodes[0];

  // Shortest-path needle rotation whenever activeIndex updates
  const selectIndex = useCallback(
    (newIndex) => {
      const normalized = ((newIndex % compassNodes.length) + compassNodes.length) % compassNodes.length;
      const targetAngle = compassNodes[normalized].angle;
      setActiveIndex(normalized);
      setNeedleRotation((prev) => {
        const currentMod = ((prev % 360) + 360) % 360;
        const delta = ((targetAngle - currentMod + 540) % 360) - 180;
        return prev + delta;
      });
    },
    [compassNodes]
  );

  const jumpToSector = useCallback(
    (dirId) => {
      const idx = compassNodes.findIndex((n) => n.dir === dirId);
      if (idx !== -1) selectIndex(idx);
    },
    [compassNodes, selectIndex]
  );

  // Convert pointer coordinates on SVG to nearest compass node
  const pickNodeFromPointer = useCallback(
    (clientX, clientY) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const px = ((clientX - rect.left) / rect.width) * 540;
      const py = ((clientY - rect.top) / rect.height) * 540;
      const dx = px - CX;
      const dy = py - CY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 28) return; // ignore center hub click

      const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;

      let bestIdx = 0;
      let bestDiff = 360;
      for (let i = 0; i < compassNodes.length; i++) {
        const d = circularAngleDiff(deg, compassNodes[i].angle);
        if (d < bestDiff) {
          bestDiff = d;
          bestIdx = i;
        }
      }
      selectIndex(bestIdx);
    },
    [compassNodes, selectIndex]
  );

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pickNodeFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    pickNodeFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard support when compass stage is focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectIndex(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectIndex(activeIndex - 1);
    }
  };

  // Precompute 72 precision bezel ticks (every 5 degrees)
  const bezelTicks = useMemo(() => {
    const arr = [];
    for (let deg = 0; deg < 360; deg += 5) {
      const isMajor = deg % 30 === 0;
      const isCardinal = deg % 120 === 0;
      const rOuter = 211;
      const rInner = isCardinal ? 196 : isMajor ? 202 : 206;
      const p1 = polarToCartesian(CX, CY, rInner, deg);
      const p2 = polarToCartesian(CX, CY, rOuter, deg);
      arr.push({ deg, p1, p2, isMajor, isCardinal });
    }
    return arr;
  }, []);

  const displayNode = hoveredIndex !== null ? compassNodes[hoveredIndex] : activeNode;
  const formattedBearing = `${String(Math.round(activeNode.angle)).padStart(3, '0')}°`;
  const activePos = polarToCartesian(CX, CY, 178, activeNode.angle);

  return (
    <section
      id="practice-vault"
      className="compass-vault-section relative z-10"
      aria-label="Practice Vault Magnetic Compass Dial"
    >
      <div className="compass-vault-container">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-badge mb-3">
            <Compass className="w-3.5 h-3.5 text-accent-spring animate-pulse" />
            <span className="font-mono text-xs text-pastel-slate">
              github.com/Vanshuj/practice-vault
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-pastel-ink tracking-tight mb-3">
            The Magnetic Compass Vault
          </h2>

          <p className="max-w-2xl font-body text-sm sm:text-base text-pastel-slate leading-relaxed">
            Spin or select any bearing around the 3-sector compass bezel to inspect secondary full-stack builds, 
            Core Java &amp; DSA modules, and C++20 algorithmic implementations directly from GitHub.
          </p>
        </div>

        {/* 3-Sector Quick-Jump Polarity Bar */}
        <div className="compass-sector-bar" role="tablist" aria-label="Compass Sectors">
          {practiceVaultData.directories.map((dir) => {
            const isActiveSector = activeNode.dir === dir.id;
            return (
              <button
                key={dir.id}
                type="button"
                role="tab"
                aria-selected={isActiveSector}
                onClick={() => jumpToSector(dir.id)}
                className={`compass-sector-pill ${isActiveSector ? 'active' : ''}`}
                style={{
                  '--sector-color': dir.color,
                  '--sector-glow': dir.glowColor,
                }}
              >
                <span className="compass-sector-dot" style={{ backgroundColor: dir.color }} />
                <span>{dir.label}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Instrument Shell: Compass Dial + Crystal Readout */}
        <div className="compass-instrument-shell">
          
          {/* LEFT: Precision Magnetic Compass Dial */}
          <div
            className="compass-dial-stage"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Interactive Magnetic Compass Dial. Use arrow keys or click around the dial to switch projects."
          >
            <svg
              ref={svgRef}
              viewBox="0 0 540 540"
              className="compass-svg"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <defs>
                {/* Machined Obsidian Bezel Gradient */}
                <radialGradient id="compassBezelGrad" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#262B36" />
                  <stop offset="55%" stopColor="#12151C" />
                  <stop offset="100%" stopColor="#08090C" />
                </radialGradient>

                {/* Inner Crystal Lens Face Gradient */}
                <radialGradient id="compassInnerLens" cx="50%" cy="42%" r="60%">
                  <stop offset="0%" stopColor="#171B24" />
                  <stop offset="70%" stopColor="#0C0E13" />
                  <stop offset="100%" stopColor="#06070A" />
                </radialGradient>

                {/* Red North Needle Metallic Shading */}
                <linearGradient id="needleNorthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>

                {/* Blue South Needle Metallic Shading */}
                <linearGradient id="needleSouthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>

                {/* Gimbal Center Cap */}
                <radialGradient id="gimbalCapGrad" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#1E2430" />
                  <stop offset="100%" stopColor="#0B0D12" />
                </radialGradient>

                {/* Glow Filters */}
                <filter id="sectorGlow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="needleGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Curved Text Paths for the 3 Sector Labels */}
                {practiceVaultData.directories.map((dir) => {
                  const cfg = SECTOR_CONFIG[dir.id];
                  return (
                    <path
                      key={`arc-path-${dir.id}`}
                      id={`sector-text-path-${dir.id}`}
                      d={describeArc(
                        CX,
                        CY,
                        cfg.labelRadius,
                        cfg.startArc + 6,
                        cfg.endArc - 6,
                        cfg.reverseLabel
                      )}
                      fill="none"
                    />
                  );
                })}
              </defs>

              {/* Outer Machined Metallic Bezel */}
              <circle
                cx={CX}
                cy={CY}
                r="254"
                fill="url(#compassBezelGrad)"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1.5"
              />
              <circle
                cx={CX}
                cy={CY}
                r="246"
                fill="none"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
              />

              {/* 72 Precision Watch-Bezel Degree Ticks */}
              <g aria-hidden="true">
                {bezelTicks.map((t) => (
                  <line
                    key={t.deg}
                    x1={t.p1.x}
                    y1={t.p1.y}
                    x2={t.p2.x}
                    y2={t.p2.y}
                    stroke={
                      t.isCardinal
                        ? 'rgba(255, 255, 255, 0.55)'
                        : t.isMajor
                        ? 'rgba(255, 255, 255, 0.25)'
                        : 'rgba(255, 255, 255, 0.10)'
                    }
                    strokeWidth={t.isCardinal ? 1.8 : t.isMajor ? 1.2 : 0.8}
                  />
                ))}
              </g>

              {/* 3 Glowing 120-Degree Polarity Sector Arcs & Etched Labels */}
              {practiceVaultData.directories.map((dir) => {
                const cfg = SECTOR_CONFIG[dir.id];
                const isActiveSector = activeNode.dir === dir.id;
                const arcPath = describeArc(CX, CY, 196, cfg.startArc, cfg.endArc, false);

                return (
                  <g key={`sector-${dir.id}`}>
                    {/* Glowing Sector Arc */}
                    <path
                      d={arcPath}
                      fill="none"
                      stroke={dir.color}
                      strokeWidth={isActiveSector ? 4.5 : 2.2}
                      strokeLinecap="round"
                      opacity={isActiveSector ? 0.95 : 0.32}
                      filter={isActiveSector ? 'url(#sectorGlow)' : undefined}
                      style={{ transition: 'opacity 0.3s ease, stroke-width 0.3s ease' }}
                    />

                    {/* Etched Curved Sector Title */}
                    <text
                      fill={isActiveSector ? dir.color : '#64748B'}
                      fontSize="10.5"
                      fontWeight="700"
                      letterSpacing="2.4"
                      fontFamily="'IBM Plex Mono', monospace"
                      style={{ transition: 'fill 0.3s ease', pointerEvents: 'none' }}
                    >
                      <textPath
                        href={`#sector-text-path-${dir.id}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {cfg.labelText}
                      </textPath>
                    </text>
                  </g>
                );
              })}

              {/* Inner Obsidian Crystal Lens Face */}
              <circle
                cx={CX}
                cy={CY}
                r="142"
                fill="url(#compassInnerLens)"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1.2"
              />

              {/* Concentric Dipole Field Rings & Hairline Crosshairs */}
              <g stroke="rgba(255, 255, 255, 0.06)" fill="none" strokeWidth="1" aria-hidden="true">
                <circle cx={CX} cy={CY} r="112" strokeDasharray="3 5" />
                <circle cx={CX} cy={CY} r="78" />
                <circle cx={CX} cy={CY} r="44" strokeDasharray="2 4" />
                <line x1={CX} y1={CY - 134} x2={CX} y2={CY + 134} />
                <line x1={CX - 134} y1={CY} x2={CX + 134} y2={CY} />
              </g>

              {/* Cardinal Pole Letters (N / E / S / W) */}
              <g
                fontFamily="'IBM Plex Mono', monospace"
                fontSize="10"
                fontWeight="700"
                fill="rgba(148, 163, 184, 0.45)"
                textAnchor="middle"
                aria-hidden="true"
              >
                <text x={CX} y={CY - 122} fill="rgba(239, 68, 68, 0.7)">N</text>
                <text x={CX} y={CY + 129} fill="rgba(59, 130, 246, 0.7)">S</text>
                <text x={CX + 124} y={CY + 3.5}>E</text>
                <text x={CX - 124} y={CY + 3.5}>W</text>
              </g>

              {/* Faint Active Target Beam from Center to Locked Node */}
              <line
                x1={CX}
                y1={CY}
                x2={activePos.x}
                y2={activePos.y}
                stroke={activeNode.sectorColor}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.45"
                style={{ pointerEvents: 'none' }}
              />

              {/* 14 Interactive Project Tick Nodes Around the Ring */}
              {compassNodes.map((node, idx) => {
                const isActive = idx === activeIndex;
                const isHovered = idx === hoveredIndex;
                const pos = polarToCartesian(CX, CY, 178, node.angle);
                const numPos = polarToCartesian(CX, CY, 155, node.angle);

                return (
                  <g
                    key={node.id}
                    className="compass-node-hit"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectIndex(idx);
                    }}
                    onPointerEnter={() => setHoveredIndex(idx)}
                    onPointerLeave={() => setHoveredIndex(null)}
                  >
                    {/* Invisible enlarged hit target for effortless clicking */}
                    <circle cx={pos.x} cy={pos.y} r="18" fill="transparent" />

                    {/* Outer Pulsing Halo when Active or Hovered */}
                    {(isActive || isHovered) && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isActive ? 14 : 11}
                        fill={`${node.sectorColor}26`}
                        stroke={node.sectorColor}
                        strokeWidth={isActive ? 1.6 : 1}
                        filter="url(#sectorGlow)"
                      />
                    )}

                    {/* Node Ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 7.5 : isHovered ? 6.5 : 5}
                      fill={isActive ? '#FFFFFF' : '#0E1117'}
                      stroke={node.sectorColor}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      className="compass-node-ring"
                    />
                  </g>
                );
              })}

              {/* Polarized Red / Blue Magnetic Compass Needle */}
              <g
                className={`compass-needle-group ${isDragging ? 'dragging' : ''}`}
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  pointerEvents: 'none',
                }}
              >
                {/* Drop Shadow under Needle */}
                <polygon
                  points={`${CX},${CY - 134} ${CX + 10},${CY} ${CX},${CY + 86} ${CX - 10},${CY}`}
                  fill="rgba(0, 0, 0, 0.6)"
                  transform="translate(0, 5)"
                />

                {/* North Red Pointer (Target Indicator) */}
                <polygon
                  points={`${CX},${CY - 136} ${CX + 9.5},${CY} ${CX},${CY - 12} ${CX - 9.5},${CY}`}
                  fill="url(#needleNorthGrad)"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="0.7"
                  filter="url(#needleGlow)"
                />

                {/* Glowing North Beacon Tip */}
                <circle cx={CX} cy={CY - 134} r="2.8" fill="#FCA5A5" />

                {/* South Blue Counterbalance Pointer */}
                <polygon
                  points={`${CX},${CY + 86} ${CX + 8.5},${CY} ${CX},${CY + 10} ${CX - 8.5},${CY}`}
                  fill="url(#needleSouthGrad)"
                  stroke="rgba(255, 255, 255, 0.28)"
                  strokeWidth="0.7"
                />
              </g>

              {/* Machined Center Gimbal Pivot Hub */}
              <g style={{ pointerEvents: 'none' }}>
                <circle
                  cx={CX}
                  cy={CY}
                  r="16"
                  fill="url(#gimbalCapGrad)"
                  stroke="rgba(255, 255, 255, 0.30)"
                  strokeWidth="1.4"
                />
                <circle cx={CX} cy={CY} r="6" fill="#0A0C10" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                <circle cx={CX} cy={CY} r="2.2" fill="#F8FAFC" />
              </g>
            </svg>

            <div className="compass-dial-hint">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: displayNode.sectorColor }}
              />
              <span style={{ color: displayNode.sectorColor }} className="font-semibold">
                {String(Math.round(displayNode.angle)).padStart(3, '0')}°
              </span>
              <span className="text-pastel-ink font-semibold">{displayNode.fileName}</span>
              <span className="hidden sm:inline opacity-60">· Drag dial or click nodes</span>
            </div>
          </div>

          {/* RIGHT: Unified Crystal Lens Readout Panel */}
          <div className="compass-readout-panel">
            {/* Top Bearing & Prev/Next Stepper */}
            <div className="compass-readout-topbar">
              <div className="compass-bearing-badge">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: activeNode.sectorColor,
                    boxShadow: `0 0 10px ${activeNode.sectorColor}`,
                  }}
                />
                <span>
                  {formattedBearing} // BEARING
                </span>
              </div>

              <div className="compass-step-controls">
                <button
                  type="button"
                  onClick={() => selectIndex(activeIndex - 1)}
                  className="compass-step-btn"
                  aria-label="Previous project on dial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => selectIndex(activeIndex + 1)}
                  className="compass-step-btn"
                  aria-label="Next project on dial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dynamic Node Content (animates softly on change) */}
            <div key={activeNode.id} className="compass-readout-animate flex flex-col gap-4">
              {/* Sector & Language Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold"
                  style={{
                    color: activeNode.sectorColor,
                    backgroundColor: `${activeNode.sectorColor}1A`,
                    border: `1px solid ${activeNode.sectorColor}45`,
                  }}
                >
                  {activeNode.sectorLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full glass-badge font-mono text-[11px] text-pastel-ink">
                  {activeNode.language}
                </span>
                {activeNode.liveUrl && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/35">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live</span>
                  </span>
                )}
              </div>

              {/* Title & GitHub Repo Path */}
              <div>
                <h3 className="font-display font-bold text-2xl text-pastel-ink tracking-tight mb-1">
                  {activeNode.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-pastel-slate">
                  <GitBranch className="w-3.5 h-3.5 text-accent-spring" />
                  <span>Vanshuj/{activeNode.repoName}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
                {activeNode.description}
              </p>

              {/* Complexity / Performance Metric Strip */}
              <div className="compass-metric-strip">
                <span className="flex items-center gap-1.5 text-pastel-slate">
                  <Cpu className="w-3.5 h-3.5" style={{ color: activeNode.sectorColor }} />
                  <span>SPEC:</span>
                </span>
                <span style={{ color: activeNode.sectorColor }} className="font-semibold">
                  {activeNode.complexity}
                </span>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-pastel-slate mb-2">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-2">
                  {activeNode.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-pastel-ink">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-spring shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Pills */}
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-pastel-slate mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Technologies &amp; Primitives</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg glass-badge text-pastel-ink text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTAs: Live Website (when deployed) + GitHub Repository */}
              <div className={`compass-cta-row ${activeNode.liveUrl ? 'has-live' : ''}`}>
                {activeNode.liveUrl && (
                  <a
                    href={activeNode.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="compass-github-cta"
                    data-magnetic="true"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{activeNode.id === 'chat-app-java' ? 'Live Server' : 'Live Website'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={activeNode.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={activeNode.liveUrl ? 'compass-secondary-cta' : 'compass-github-cta'}
                  data-magnetic="true"
                >
                  <Code2 className="w-4 h-4" />
                  <span>{activeNode.liveUrl ? 'GitHub Source' : 'Inspect Repository on GitHub'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

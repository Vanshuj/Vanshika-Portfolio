/**
 * ============================================================================
 * MAGNET THEME ENGINE (magnet.js)
 * 1. Magnetic Buttons (CSS translate + spring physics + resting cache)
 * 2. Magnet Cursor with Filing Trail (Horseshoe SVG + iron particle trail)
 * 3. Pole Flip on Section Change (Faint background filings + wave sweep + flip)
 * 4. Touch-and-Hold Seal Intro (First-visit dipole field paper seal + accessibility)
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Environment & Device Detection
  // --------------------------------------------------------------------------
  const isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (isTouchDevice) {
    document.body.classList.add('magnet-touch-device');
  }

  // --------------------------------------------------------------------------
  // Global State & Pointer Coordinates
  // --------------------------------------------------------------------------
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let prevMouseX = mouseX;
  let prevMouseY = mouseY;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let cursorAngle = 0;
  let cursorFlipAngle = 0;
  let targetCursorFlipAngle = 0;
  let hasPointerMoved = false;
  let isPointerOverInput = false;
  let isPageHidden = false;

  // Repulsion wave state (Feature 3)
  let repulsionIntensity = 0;

  // --------------------------------------------------------------------------
  // 1. MAGNETIC BUTTONS SYSTEM
  // --------------------------------------------------------------------------
  const BUTTON_SELECTORS = [
    'button',
    'a.liquid-pill-primary',
    'a.liquid-pill-secondary',
    'header nav a',
    'header nav button',
    '.glass-pill',
    'footer a',
    'footer button',
    'input[type="submit"]',
    'input[type="button"]',
    '[data-magnetic="true"]',
  ].join(', ');

  const magneticElements = [];
  const ATTRACTION_RADIUS = 90;
  const MAX_OFFSET = 14;

  function initMagneticButtons() {
    const rawElements = Array.from(document.querySelectorAll(BUTTON_SELECTORS));
    magneticElements.length = 0;

    rawElements.forEach((el) => {
      // Avoid nesting magnetic effects inside another magnetic container
      if (el.closest('[data-magnetic="child"]')) return;
      el.setAttribute('data-magnetic', 'true');

      magneticElements.push({
        el,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        targetX: 0,
        targetY: 0,
        restX: 0,
        restY: 0,
        width: 0,
        height: 0,
        isHovered: false,
      });
    });

    updateMagneticRestPositions();
  }

  function updateMagneticRestPositions() {
    magneticElements.forEach((item) => {
      // Get current rect and subtract current translate to find rest position
      const rect = item.el.getBoundingClientRect();
      item.width = rect.width;
      item.height = rect.height;
      item.restX = rect.left + rect.width / 2 - item.x;
      item.restY = rect.top + rect.height / 2 - item.y;
    });
  }

  function updateMagneticPhysics(dt) {
    for (let i = 0; i < magneticElements.length; i++) {
      const item = magneticElements[i];

      // Distance from pointer to cached resting center
      const dx = mouseX - item.restX;
      const dy = mouseY - item.restY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (!isTouchDevice && dist < ATTRACTION_RADIUS) {
        // Pointer is within magnetic pull radius
        const pullFactor = (1 - dist / ATTRACTION_RADIUS) * 0.35;
        let tx = dx * pullFactor;
        let ty = dy * pullFactor;

        // Apply pole-flip repulsion if active
        if (repulsionIntensity > 0.02) {
          tx = -tx * (1.0 + repulsionIntensity * 1.5);
          ty = -ty * (1.0 + repulsionIntensity * 1.5);
        }

        // Clamp to max offset
        const offsetMag = Math.sqrt(tx * tx + ty * ty);
        if (offsetMag > MAX_OFFSET) {
          tx = (tx / offsetMag) * MAX_OFFSET;
          ty = (ty / offsetMag) * MAX_OFFSET;
        }

        item.targetX = tx;
        item.targetY = ty;
        item.isHovered = true;
      } else {
        // Return to resting position (0, 0)
        item.targetX = 0;
        item.targetY = 0;
        item.isHovered = false;
      }

      // Spring physics (stiffness 0.16, damping 0.76) for elastic overshoot snap
      const ax = (item.targetX - item.x) * 0.16;
      const ay = (item.targetY - item.y) * 0.16;
      item.vx = (item.vx + ax) * 0.76;
      item.vy = (item.vy + ay) * 0.76;
      item.x += item.vx;
      item.y += item.vy;

      // Apply CSS translate property directly (composes with transform)
      if (Math.abs(item.x) > 0.05 || Math.abs(item.y) > 0.05 || item.isHovered) {
        item.el.style.translate = `${item.x.toFixed(2)}px ${item.y.toFixed(2)}px`;
      } else if (item.el.style.translate && item.el.style.translate !== '0px 0px') {
        item.el.style.translate = '0px 0px';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. MAGNET CURSOR WITH FILING TRAIL SYSTEM
  // --------------------------------------------------------------------------
  let cursorEl = null;
  let trailCanvas = null;
  let trailCtx = null;
  const trailParticles = [];
  const MAX_TRAIL_PARTICLES = 120;
  let distanceAccumulator = 0;

  function initMagnetCursor() {
    if (isTouchDevice) return;

    // Create Horseshoe Magnet Cursor Element
    cursorEl = document.createElement('div');
    cursorEl.className = 'magnet-cursor-el cursor-hidden';
    cursorEl.setAttribute('aria-hidden', 'true');

    // Inline SVG Horseshoe Magnet (Red N arm, Blue S arm, silver tips)
    cursorEl.innerHTML = `
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Contact Drop Shadow -->
        <filter id="magnetGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
        <g filter="url(#magnetGlow)">
          <!-- Left Arm: North (Red #E24B4A) -->
          <path d="M7 6v10c0 5 4 9 9 9s9-4 9-9V6h-5v10c0 2.2-1.8 4-4 4s-4-1.8-4-4V6H7z" fill="#E24B4A" />
          <!-- Right Arm: South (Blue #378ADD) -->
          <path d="M16 25c5 0 9-4 9-9V6h-5v10c0 2.2-1.8 4-4 4v5z" fill="#378ADD" />
          <!-- North Tip (Silver #E2E8F0) -->
          <rect x="7" y="6" width="5" height="4" rx="1" fill="#E2E8F0" />
          <!-- South Tip (Silver #E2E8F0) -->
          <rect x="20" y="6" width="5" height="4" rx="1" fill="#E2E8F0" />
          <!-- Center Divider & Magnet Contour Outline -->
          <path d="M7 6v10c0 5 4 9 9 9s9-4 9-9V6h-5v10c0 2.2-1.8 4-4 4s-4-1.8-4-4V6H7z" 
                stroke="#1A1A1E" stroke-width="1.5" stroke-linejoin="round" />
        </g>
      </svg>
    `;
    document.body.appendChild(cursorEl);

    // Create Fixed Overlay Canvas for Trail Particles
    trailCanvas = document.createElement('canvas');
    trailCanvas.id = 'magnet-trail-canvas';
    trailCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(trailCanvas);
    trailCtx = trailCanvas.getContext('2d');
    resizeTrailCanvas();
  }

  function resizeTrailCanvas() {
    if (!trailCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    trailCanvas.width = window.innerWidth * dpr;
    trailCanvas.height = window.innerHeight * dpr;
    trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnTrailParticle(x, y, speedX = 0, speedY = 0) {
    if (trailParticles.length >= MAX_TRAIL_PARTICLES) {
      trailParticles.shift(); // Reclaim oldest particle
    }
    const angle = Math.random() * Math.PI * 2;
    const len = 2.5 + Math.random() * 3.5;
    trailParticles.push({
      x,
      y,
      vx: speedX * 0.15 + (Math.random() - 0.5) * 0.8,
      vy: speedY * 0.15 + (Math.random() - 0.5) * 0.8,
      len,
      ang: angle,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      life: 1.0, // Lifespan in seconds
      maxLife: 0.9 + Math.random() * 0.3,
    });
  }

  function spawnClickBurst(x, y) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 4.0;
      trailParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 3.5 + Math.random() * 3.0,
        ang: angle,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        life: 0.8 + Math.random() * 0.4,
        maxLife: 1.0,
      });
    }
  }

  function updateCursorAndTrail(dt) {
    if (isTouchDevice || !cursorEl || !trailCanvas) return;

    // Smooth cursor follower lerp
    cursorX += (mouseX - cursorX) * 0.32;
    cursorY += (mouseY - cursorY) * 0.32;

    const velX = mouseX - prevMouseX;
    const velY = mouseY - prevMouseY;
    const distMoved = Math.sqrt(velX * velX + velY * velY);

    if (distMoved > 0.8) {
      const targetAngle = Math.atan2(velY, velX) + Math.PI / 2;
      let diff = targetAngle - cursorAngle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      cursorAngle += diff * 0.28;
    }

    // Smooth pole flip angle animation (from Feature 3)
    cursorFlipAngle += (targetCursorFlipAngle - cursorFlipAngle) * 0.15;

    // Position and rotate horseshoe magnet cursor
    const totalRotation = cursorAngle + cursorFlipAngle;
    cursorEl.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) rotate(${totalRotation}rad)`;

    const introCover = document.getElementById('intro-seal-cover');
    const isIntroActive = introCover && !introCover.classList.contains('opened');

    if (hasPointerMoved && !isPointerOverInput && !isIntroActive) {
      cursorEl.classList.remove('cursor-hidden');
    } else {
      cursorEl.classList.add('cursor-hidden');
    }

    // Spawn trail particles based on distance travelled
    distanceAccumulator += distMoved;
    if (distanceAccumulator > 9 && !isPointerOverInput) {
      distanceAccumulator = 0;
      spawnTrailParticle(cursorX, cursorY, velX, velY);
    }

    // Render trail particles
    const W = window.innerWidth;
    const H = window.innerHeight;
    trailCtx.clearRect(0, 0, W, H);

    trailCtx.lineWidth = 1.3;
    trailCtx.lineCap = 'round';

    for (let i = trailParticles.length - 1; i >= 0; i--) {
      const p = trailParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        trailParticles.splice(i, 1);
        continue;
      }

      // Gravitational pull toward nearby active magnetic buttons
      for (let j = 0; j < magneticElements.length; j++) {
        const btn = magneticElements[j];
        if (btn.isHovered) {
          const bdx = btn.restX - p.x;
          const bdy = btn.restY - p.y;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy);
          if (bdist < 100 && bdist > 2) {
            p.vx += (bdx / bdist) * 0.45;
            p.vy += (bdy / bdist) * 0.45;
          }
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.ang += p.rotSpeed;

      const alpha = Math.max(0, p.life / p.maxLife) * 0.85;
      trailCtx.strokeStyle = `rgba(28, 28, 34, ${alpha.toFixed(3)})`;

      const hx = (Math.cos(p.ang) * p.len) / 2;
      const hy = (Math.sin(p.ang) * p.len) / 2;

      trailCtx.beginPath();
      trailCtx.moveTo(p.x - hx, p.y - hy);
      trailCtx.lineTo(p.x + hx, p.y + hy);
      trailCtx.stroke();
    }
  }

  // --------------------------------------------------------------------------
  // 3. POLE FLIP ON SECTION CHANGE
  // --------------------------------------------------------------------------
  let bgCanvas = null;
  let bgCtx = null;
  let bgFilings = [];
  let currentPole = 0; // 0 = normal (red left / blue right), 1 = flipped
  let waveSweepY = -999;
  let waveSweeping = false;
  let activeSectionId = 'hero';

  const SECTION_IDS = [
    'hero',
    'about',
    'projects',
    'experience',
    'certificates',
    'contact',
  ];

  function initBackgroundFilings() {
    bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'magnet-bg-canvas';
    bgCanvas.setAttribute('aria-hidden', 'true');

    // Insert behind main content
    const rootEl = document.getElementById('root') || document.body;
    document.body.insertBefore(bgCanvas, rootEl);
    bgCtx = bgCanvas.getContext('2d');

    buildBackgroundGrid();
    setupSectionObserver();
  }

  function buildBackgroundGrid() {
    if (!bgCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    bgCanvas.width = W * dpr;
    bgCanvas.height = H * dpr;
    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const step = W < 768 ? 24 : 28;
    bgFilings = [];

    for (let y = step / 2; y < H; y += step) {
      for (let x = step / 2; x < W; x += step) {
        const jitterX = (Math.random() - 0.5) * 6;
        const jitterY = (Math.random() - 0.5) * 6;
        bgFilings.push({
          x: x + jitterX,
          y: y + jitterY,
          len: 5.5 + Math.random() * 2.5,
          angle: (Math.random() - 0.5) * 0.4, // subtle initial orientation
          targetAngle: 0,
          currentPole: 0, // 0 = red left / blue right, 1 = red right / blue left
          waveDelay: y / H, // wave propagates downwards
        });
      }
    }
  }

  function triggerPoleFlip(newSectionId) {
    if (newSectionId === activeSectionId) return;
    activeSectionId = newSectionId;

    // Toggle polarity
    currentPole = currentPole === 0 ? 1 : 0;
    targetCursorFlipAngle = currentPole === 1 ? Math.PI : 0;

    // Trigger button repulsion wave
    repulsionIntensity = 1.0;

    // Trigger visual background wave sweep
    waveSweepY = 0;
    waveSweeping = true;

    // Assign new section-specific target alignment angles
    const sectionAngles = {
      hero: 0,
      about: Math.PI / 6,
      projects: -Math.PI / 4,
      experience: Math.PI / 4,
      certificates: -Math.PI / 6,
      contact: Math.PI / 2,
    };
    const baseTargetAngle = (sectionAngles[newSectionId] || 0) + (currentPole * Math.PI);

    bgFilings.forEach((f) => {
      f.targetAngle = baseTargetAngle + (Math.random() - 0.5) * 0.35;
      f.currentPole = currentPole;
    });
  }

  function setupSectionObserver() {
    const handleScrollForSections = () => {
      const midY = window.innerHeight / 2;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const sec = document.getElementById(SECTION_IDS[i]);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= midY && rect.bottom >= midY) {
            triggerPoleFlip(SECTION_IDS[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollForSections, { passive: true });
  }

  function updateBackgroundFilings(dt) {
    if (!bgCanvas || !bgCtx) return;
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Progress wave sweep downwards
    if (waveSweeping) {
      waveSweepY += dt * H * 1.6;
      if (waveSweepY > H * 1.4) {
        waveSweeping = false;
      }
    }

    // Decay repulsion intensity back to 0
    if (repulsionIntensity > 0) {
      repulsionIntensity = Math.max(0, repulsionIntensity - dt * 1.6);
    }

    bgCtx.clearRect(0, 0, W, H);
    bgCtx.lineWidth = 1.2;
    bgCtx.lineCap = 'round';

    for (let i = 0; i < bgFilings.length; i++) {
      const f = bgFilings[i];

      // Smooth angular interpolation toward section target
      let diff = f.targetAngle - f.angle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      f.angle += diff * 0.08;

      // Check proximity to wave front
      const distFromWave = Math.abs(f.y - waveSweepY);
      const isWaveActive = waveSweeping && distFromWave < 80;
      const waveBoost = isWaveActive ? (1 - distFromWave / 80) * 0.15 : 0;

      // Two-tone filing (Red end & Blue end, kept faint for readability)
      const hx = (Math.cos(f.angle) * f.len) / 2;
      const hy = (Math.sin(f.angle) * f.len) / 2;

      const alpha = 0.14 + waveBoost;
      const colA = f.currentPole === 0 ? `rgba(226, 75, 74, ${alpha.toFixed(3)})` : `rgba(55, 138, 221, ${alpha.toFixed(3)})`;
      const colB = f.currentPole === 0 ? `rgba(55, 138, 221, ${alpha.toFixed(3)})` : `rgba(226, 75, 74, ${alpha.toFixed(3)})`;

      // Negative half
      bgCtx.strokeStyle = colA;
      bgCtx.beginPath();
      bgCtx.moveTo(f.x - hx, f.y - hy);
      bgCtx.lineTo(f.x, f.y);
      bgCtx.stroke();

      // Positive half
      bgCtx.strokeStyle = colB;
      bgCtx.beginPath();
      bgCtx.moveTo(f.x, f.y);
      bgCtx.lineTo(f.x + hx, f.y + hy);
      bgCtx.stroke();
    }
  }

  // --------------------------------------------------------------------------
  // 4. TOUCH-AND-HOLD SEAL INTRO SYSTEM
  // --------------------------------------------------------------------------
  let sealOverlay = null;
  let sealCanvas = null;
  let sealCtx = null;
  let sealActive = false;
  let sealOpened = false;
  let sealHolding = false;
  let sealCharge = 0;
  let sealMx = window.innerWidth / 2;
  let sealMy = window.innerHeight / 2;
  let sealTargetMx = sealMx;
  let sealTargetMy = sealMy;
  let sealFilings = [];
  let sealGrainPattern = null;
  let sealAutoTimer = null;

  function initTouchAndHoldSeal() {
    return; // Starting animation is handled by React IntroSeal component
  }

  function showReducedMotionFallback() {
    const container = sealOverlay.querySelector('.seal-hint-container');
    if (container && !document.getElementById('seal-reduced-enter')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seal-reduced-btn';
      btn.id = 'seal-reduced-enter';
      btn.setAttribute('aria-label', 'Enter portfolio directly without animation');
      btn.textContent = 'Enter Portfolio →';
      btn.style.pointerEvents = 'auto';
      btn.addEventListener('click', closeSeal);
      container.appendChild(btn);
    }
  }

  function showAutoOpenButton() {
    const container = sealOverlay.querySelector('.seal-hint-container');
    if (container && !document.getElementById('seal-auto-open')) {
      const btn = document.createElement('button');
      btn.id = 'seal-auto-open';
      btn.type = 'button';
      btn.className = 'seal-auto-open-btn';
      btn.textContent = 'Tap to open portfolio →';
      btn.addEventListener('click', closeSeal);
      container.appendChild(btn);
    }
  }

  function buildSealFilings() {
    if (!sealCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    sealCanvas.width = W * dpr;
    sealCanvas.height = H * dpr;
    sealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Create offscreen grain noise for textured grey paper
    const grainCv = document.createElement('canvas');
    grainCv.width = 128;
    grainCv.height = 128;
    const gCtx = grainCv.getContext('2d');
    const imgData = gCtx.createImageData(128, 128);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = (Math.random() * 45) | 0;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = (Math.random() * 22 + 4) | 0;
    }
    gCtx.putImageData(imgData, 0, 0);
    sealGrainPattern = sealCtx.createPattern(grainCv, 'repeat');

    // Fine powdered iron particles (~8,000 count)
    const step = W < 768 ? 10.5 : 9.0;
    sealFilings = [];

    for (let y = step / 2; y < H; y += step) {
      for (let x = step / 2; x < W; x += step) {
        const jitterX = (Math.random() - 0.5) * 5.5;
        const jitterY = (Math.random() - 0.5) * 5.5;
        const isDust = Math.random() < 0.28;
        sealFilings.push({
          ox: x + jitterX,
          oy: y + jitterY,
          x: x + jitterX,
          y: y + jitterY,
          vx: 0,
          vy: 0,
          baseLen: isDust ? 1.3 + Math.random() * 1.1 : 2.2 + Math.random() * 2.2,
          len: 2.5,
          baseAng: Math.random() * Math.PI,
          ang: Math.random() * Math.PI,
          a: 0.42 + Math.random() * 0.46,
          grit: Math.random() > 0.42,
        });
      }
    }

    sealMx = W / 2;
    sealMy = H / 2;
    sealTargetMx = sealMx;
    sealTargetMy = sealMy;
  }

  function bindSealEvents() {
    const skipBtn = document.getElementById('seal-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSeal();
      });
    }

    const updatePointer = (e) => {
      sealTargetMx = e.clientX;
      sealTargetMy = e.clientY;
    };

    const startHolding = (e) => {
      if (e.clientX !== undefined) {
        sealTargetMx = e.clientX;
        sealTargetMy = e.clientY;
        sealMx = sealTargetMx;
        sealMy = sealTargetMy;
      }
      sealHolding = true;
      const hintText = document.getElementById('seal-hint-text');
      const hintPill = document.getElementById('seal-hint-pill');
      if (hintText) hintText.textContent = 'Charging magnetic field...';
      if (hintPill) hintPill.classList.add('holding');

      if (navigator.vibrate) {
        try { navigator.vibrate(14); } catch (_) {}
      }
    };

    const stopHolding = () => {
      sealHolding = false;
      const hintText = document.getElementById('seal-hint-text');
      const hintPill = document.getElementById('seal-hint-pill');
      if (hintText) hintText.textContent = 'Press & hold to open portfolio';
      if (hintPill) hintPill.classList.remove('holding');
    };

    sealOverlay.addEventListener('pointermove', updatePointer);
    sealOverlay.addEventListener('pointerdown', startHolding);
    window.addEventListener('pointerup', stopHolding);
    window.addEventListener('pointercancel', stopHolding);

    sealOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startHolding(e);
      }
    });
    sealOverlay.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        stopHolding();
      }
    });
  }

  function triggerSealBurst() {
    if (sealOpened) return;
    sealOpened = true;
    sessionStorage.setItem('seal-opened', 'true');

    if (navigator.vibrate) {
      try { navigator.vibrate([25, 40, 50]); } catch (_) {}
    }

    // Explosion impulse outward
    for (let i = 0; i < sealFilings.length; i++) {
      const f = sealFilings[i];
      const dx = f.x - sealMx;
      const dy = f.y - sealMy;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
      const speed = 4 + Math.random() * 8;
      f.vx = (dx / dist) * speed + (Math.random() - 0.5) * 4;
      f.vy = (dy / dist) * speed + (Math.random() - 0.5) * 4;
    }

    setTimeout(() => {
      document.body.style.overflow = '';
      if (sealOverlay) sealOverlay.classList.add('seal-opened');
    }, 350);

    setTimeout(() => {
      sealActive = false;
      if (sealOverlay && sealOverlay.parentNode) {
        sealOverlay.parentNode.removeChild(sealOverlay);
      }
    }, 1050);
  }

  function closeSeal() {
    sessionStorage.setItem('seal-opened', 'true');
    document.body.style.overflow = '';
    sealOpened = true;
    if (sealOverlay) sealOverlay.classList.add('seal-opened');
    setTimeout(() => {
      sealActive = false;
      if (sealOverlay && sealOverlay.parentNode) {
        sealOverlay.parentNode.removeChild(sealOverlay);
      }
    }, 700);
  }

  function updateSealIntro(dt) {
    if (!sealActive || !sealCtx) return;
    const W = window.innerWidth;
    const H = window.innerHeight;

    sealMx += (sealTargetMx - sealMx) * 0.35;
    sealMy += (sealTargetMy - sealMy) * 0.35;

    // Charge dynamics: 1.6s to fill when holding, 1.8s decay when released
    if (!sealOpened) {
      sealCharge += sealHolding ? dt / 1.6 : -dt / 1.8;
      sealCharge = Math.max(0, Math.min(1, sealCharge));
      if (sealCharge >= 1.0) {
        triggerSealBurst();
      }
    }

    // 1. Draw light grey paper background with grain vignette
    const grad = sealCtx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, Math.max(W, H) * 0.7);
    grad.addColorStop(0, '#E3E3E6');
    grad.addColorStop(0.65, '#D5D5D9');
    grad.addColorStop(1, '#C7C7CC');
    sealCtx.fillStyle = grad;
    sealCtx.fillRect(0, 0, W, H);

    if (sealGrainPattern) {
      sealCtx.fillStyle = sealGrainPattern;
      sealCtx.fillRect(0, 0, W, H);
    }

    // Magnet dimensions
    const magnetW = Math.min(220, Math.max(140, W * 0.22));
    const magnetH = magnetW * 0.26;
    const poleDist = magnetW * 0.42;

    const nX = sealMx - poleDist;
    const nY = sealMy;
    const sX = sealMx + poleDist;
    const sY = sealMy;

    // 2. Physics & Draw Dipole Powder Filings (Batched single stroke)
    const darkPath = new Path2D();
    const lightPath = new Path2D();

    for (let i = 0; i < sealFilings.length; i++) {
      const f = sealFilings[i];

      if (!sealOpened) {
        // True dipole vector calculation: B = rN/|rN|^3 - rS/|rS|^3
        const rxN = f.ox - nX;
        const ryN = f.oy - nY;
        const d2N = rxN * rxN + ryN * ryN + 500;
        const d3N = Math.pow(d2N, 1.5);

        const rxS = f.ox - sX;
        const ryS = f.oy - sY;
        const d2S = rxS * rxS + ryS * ryS + 500;
        const d3S = Math.pow(d2S, 1.5);

        const Bx = rxN / d3N - rxS / d3S;
        const By = ryN / d3N - ryS / d3S;
        const bMag = Math.sqrt(Bx * Bx + By * By);

        const targetAngle = Math.atan2(By, Bx);
        const dx = sealMx - f.ox;
        const dy = sealMy - f.oy;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;

        const fieldStrength = Math.min(1.2, bMag * 16000);
        const reach = Math.exp(-dist / (W * 0.42));
        const inf = sealCharge * fieldStrength * reach;

        let da = targetAngle - f.ang;
        da = Math.atan2(Math.sin(da), Math.cos(da));
        f.ang += da * (0.04 + inf * 0.5);

        if (sealCharge < 0.08) {
          let db = f.baseAng - f.ang;
          db = Math.atan2(Math.sin(db), Math.cos(db));
          f.ang += db * 0.06;
        }

        const pull = inf * 18;
        f.x = f.ox + Math.cos(f.ang) * pull * 0.35;
        f.y = f.oy + Math.sin(f.ang) * pull * 0.35;

        f.len = f.baseLen + inf * 4.2;
        f.a = 0.38 + inf * 0.58;
      } else {
        // Exploding outward
        f.x += f.vx;
        f.y += f.vy;
        f.vx *= 0.96;
        f.vy *= 0.96;
        f.a = Math.max(0, f.a - dt * 1.3);
        f.len = f.baseLen * 1.2;
      }

      if (f.a <= 0.01) continue;

      const hx = (Math.cos(f.ang) * f.len) * 0.5;
      const hy = (Math.sin(f.ang) * f.len) * 0.5;

      darkPath.moveTo(f.x - hx, f.y - hy);
      darkPath.lineTo(f.x + hx, f.y + hy);

      if (f.grit && f.a > 0.22) {
        lightPath.moveTo(f.x - hx * 0.7 - 0.4, f.y - hy * 0.7 - 0.4);
        lightPath.lineTo(f.x + hx * 0.7 - 0.4, f.y + hy * 0.7 - 0.4);
      }
    }

    sealCtx.lineWidth = 1.05;
    sealCtx.lineCap = 'round';
    sealCtx.strokeStyle = 'rgba(20, 20, 24, 0.82)';
    sealCtx.stroke(darkPath);

    sealCtx.lineWidth = 0.55;
    sealCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    sealCtx.stroke(lightPath);

    // 3. Draw Bar Magnet & Charge Arc (Photograph Accuracy)
    if (!sealOpened) {
      sealCtx.save();
      sealCtx.translate(sealMx, sealMy);

      // Charging Arc Ring
      const ringRadius = magnetW * 0.56;
      sealCtx.beginPath();
      sealCtx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      sealCtx.lineWidth = 3;
      sealCtx.strokeStyle = 'rgba(55, 138, 221, 0.12)';
      sealCtx.stroke();

      if (sealCharge > 0) {
        sealCtx.save();
        if (sealCharge > 0.8) {
          sealCtx.shadowColor = 'rgba(55, 138, 221, 0.6)';
          sealCtx.shadowBlur = 12;
        }
        sealCtx.beginPath();
        sealCtx.arc(
          0,
          0,
          ringRadius,
          -Math.PI / 2,
          -Math.PI / 2 + Math.PI * 2 * sealCharge
        );
        sealCtx.lineWidth = 3.5;
        sealCtx.lineCap = 'round';
        sealCtx.strokeStyle = '#378ADD';
        sealCtx.stroke();
        sealCtx.restore();
      }

      // Magnet Drop Shadow
      sealCtx.save();
      sealCtx.shadowColor = 'rgba(18, 18, 22, 0.38)';
      sealCtx.shadowBlur = 18;
      sealCtx.shadowOffsetX = 0;
      sealCtx.shadowOffsetY = 8;

      const hw = magnetW / 2;
      const hh = magnetH / 2;
      const cornerR = 3;

      const drawMagnetShape = () => {
        sealCtx.beginPath();
        if (sealCtx.roundRect) {
          sealCtx.roundRect(-hw, -hh, magnetW, magnetH, cornerR);
        } else {
          sealCtx.rect(-hw, -hh, magnetW, magnetH);
        }
      };

      sealCtx.fillStyle = '#111';
      drawMagnetShape();
      sealCtx.fill();
      sealCtx.restore(); // remove shadow for magnet faces

      // Magnet Body with clipped rounded rect
      sealCtx.save();
      drawMagnetShape();
      sealCtx.clip();

      // Left Half: Red (North)
      const redGrad = sealCtx.createLinearGradient(0, -hh, 0, hh);
      redGrad.addColorStop(0, '#E14646');
      redGrad.addColorStop(0.3, '#D32F2F');
      redGrad.addColorStop(1, '#B71C1C');
      sealCtx.fillStyle = redGrad;
      sealCtx.fillRect(-hw, -hh, hw, magnetH);

      // Right Half: Blue (South)
      const blueGrad = sealCtx.createLinearGradient(0, -hh, 0, hh);
      blueGrad.addColorStop(0, '#3978E3');
      blueGrad.addColorStop(0.3, '#1E4FD8');
      blueGrad.addColorStop(1, '#153DAA');
      sealCtx.fillStyle = blueGrad;
      sealCtx.fillRect(0, -hh, hw, magnetH);

      // Top edge highlight bevel
      sealCtx.fillStyle = 'rgba(255, 255, 255, 0.38)';
      sealCtx.fillRect(-hw, -hh, magnetW, 1.5);

      // Bottom edge shadow bevel
      sealCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      sealCtx.fillRect(-hw, hh - 1.5, magnetW, 1.5);

      // Center seam line
      sealCtx.fillStyle = 'rgba(15, 15, 20, 0.45)';
      sealCtx.fillRect(-0.75, -hh, 1.5, magnetH);

      // Crisp White 'N' and 'S'
      const fontSize = Math.round(magnetH * 0.54);
      sealCtx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      sealCtx.textAlign = 'center';
      sealCtx.textBaseline = 'middle';
      sealCtx.fillStyle = '#FFFFFF';
      sealCtx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      sealCtx.shadowBlur = 3;
      sealCtx.shadowOffsetY = 1;

      sealCtx.fillText('N', -hw / 2, 1);
      sealCtx.fillText('S', hw / 2, 1);

      sealCtx.restore(); // end clip

      // Border outline
      sealCtx.lineWidth = 1;
      sealCtx.strokeStyle = 'rgba(25, 25, 30, 0.85)';
      drawMagnetShape();
      sealCtx.stroke();

      sealCtx.restore(); // end magnet translate
    }
  }

  // --------------------------------------------------------------------------
  // Global Event Listeners & Pointer Tracking
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasPointerMoved = true;

      // Check if hovering over input / textarea to restore native text cursor
      const target = document.elementFromPoint(e.clientX, e.clientY);
      isPointerOverInput = !!(
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      );
    });

    window.addEventListener('pointerdown', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTouchDevice && !sealActive) {
        spawnClickBurst(e.clientX, e.clientY);
      }
    });

    window.addEventListener('resize', () => {
      updateMagneticRestPositions();
      resizeTrailCanvas();
      buildBackgroundGrid();
      if (sealActive && !sealOpened) {
        buildSealFilings();
      }
    });

    // Throttled scroll position update
    window.addEventListener(
      'scroll',
      () => {
        updateMagneticRestPositions();
      },
      { passive: true }
    );

    // Pause animation when tab is inactive to preserve CPU / battery
    document.addEventListener('visibilitychange', () => {
      isPageHidden = document.hidden;
      if (!isPageHidden) {
        lastTimestamp = performance.now();
      }
    });

    // Public test & control APIs
    window.__magnet = {
      rebuild: () => {
        initMagneticButtons();
        updateMagneticRestPositions();
      },
      triggerPoleFlip: (secId) => triggerPoleFlip(secId),
      replaySeal: () => {
        sessionStorage.removeItem('seal-opened');
        initTouchAndHoldSeal();
      },
      setDeterministicSeal: (charge, holding = false, opened = false, cx, cy) => {
        if (!sealActive) initTouchAndHoldSeal();
        sealCharge = charge;
        sealHolding = holding;
        sealOpened = opened;
        if (cx !== undefined) {
          sealMx = cx;
          sealTargetMx = cx;
        }
        if (cy !== undefined) {
          sealMy = cy;
          sealTargetMy = cy;
        }
      },
    };
  }

  // --------------------------------------------------------------------------
  // Master Single requestAnimationFrame Loop
  // --------------------------------------------------------------------------
  let lastTimestamp = performance.now();

  function masterLoop(timestamp) {
    const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000 || 0.016);
    lastTimestamp = timestamp;

    if (!isPageHidden) {
      // 1. Magnetic Buttons Physics
      updateMagneticPhysics(dt);

      // 2. Cursor Follower & Filing Trail
      updateCursorAndTrail(dt);

      // 3. Background Pole-Flip Filings
      updateBackgroundFilings(dt);

      // 4. Touch-and-Hold Seal Intro (if active)
      updateSealIntro(dt);

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    }

    requestAnimationFrame(masterLoop);
  }

  // --------------------------------------------------------------------------
  // Bootstrap
  // --------------------------------------------------------------------------
  function init() {
    initMagneticButtons();
    initMagnetCursor();
    initBackgroundFilings();
    initTouchAndHoldSeal();
    setupEventListeners();

    // Re-check buttons after dynamic React components mount
    setTimeout(initMagneticButtons, 400);
    setTimeout(initMagneticButtons, 1200);

    requestAnimationFrame(masterLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

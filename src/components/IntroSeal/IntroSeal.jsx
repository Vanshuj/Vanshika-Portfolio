import React, { useEffect, useRef, useState } from 'react';
import './IntroSeal.css';

export default function IntroSeal() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isHoldingState, setIsHoldingState] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = window.innerWidth;
    let H = window.innerHeight;
    let filings = [];
    let mx = W / 2;
    let my = H / 2;
    let targetMx = mx;
    let targetMy = my;
    let holding = false;
    let charge = 0;
    let opened = false;
    let lastTs = performance.now();
    let hasMovedPointer = false;
    let animId = null;
    let freezeCharge = false;

    // Create offscreen grain pattern for paper texture
    const grainCv = document.createElement('canvas');
    grainCv.width = 128;
    grainCv.height = 128;
    const gCtx = grainCv.getContext('2d');
    const imgData = gCtx.createImageData(128, 128);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = (Math.random() * 12 + 2) | 0;
    }
    gCtx.putImageData(imgData, 0, 0);
    let grainPattern = ctx.createPattern(grainCv, 'repeat');

    // Build Filings Grid with fine powdered iron specks (~8,000 count)
    function buildFilings() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = W < 768 ? 10.5 : 9.0;
      filings = [];
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          const jitterX = (Math.random() - 0.5) * 5.5;
          const jitterY = (Math.random() - 0.5) * 5.5;
          const ox = x + jitterX;
          const oy = y + jitterY;
          const isDust = Math.random() < 0.28;
          filings.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            baseLen: isDust ? 1.4 + Math.random() * 1.2 : 2.4 + Math.random() * 2.2,
            len: 2.6,
            baseAng: Math.random() * Math.PI,
            ang: Math.random() * Math.PI,
            a: 0.42 + Math.random() * 0.46,
            grit: Math.random() > 0.40,
          });
        }
      }

      if (!hasMovedPointer) {
        mx = W / 2;
        my = H / 2;
        targetMx = mx;
        targetMy = my;
      }
    }

    buildFilings();

    const handleResize = () => {
      if (!opened) {
        buildFilings();
      }
    };
    window.addEventListener('resize', handleResize);

    const updatePointer = (e) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
      hasMovedPointer = true;
    };

    const handlePointerDown = (e) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
      mx = targetMx;
      my = targetMy;
      hasMovedPointer = true;
      holding = true;
      setIsHoldingState(true);
      if (navigator.vibrate) {
        try { navigator.vibrate(12); } catch (_) {}
      }
    };

    const handlePointerUp = () => {
      holding = false;
      setIsHoldingState(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        holding = true;
        setIsHoldingState(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        holding = false;
        setIsHoldingState(false);
      }
    };

    const triggerOpen = () => {
      if (opened) return;
      opened = true;
      setIsOpened(true);

      if (navigator.vibrate) {
        try { navigator.vibrate([25, 40, 50]); } catch (_) {}
      }

      // Explosion outward impulse
      for (let i = 0; i < filings.length; i++) {
        const f = filings[i];
        const dx = f.x - mx;
        const dy = f.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
        const speed = 4 + Math.random() * 8;
        f.vx = (dx / dist) * speed + (Math.random() - 0.5) * 4;
        f.vy = (dy / dist) * speed + (Math.random() - 0.5) * 4;
      }

      // Unlock page scroll and fade out
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 350);

      setTimeout(() => {
        setIsVisible(false);
      }, 900);
    };

    // Public test & control hooks
    window.__introSeal = {
      setState: (newCharge, newHolding = false, newOpened = false, cx, cy) => {
        freezeCharge = true;
        charge = newCharge;
        holding = newHolding;
        setIsHoldingState(newHolding);
        opened = newOpened;
        setIsOpened(newOpened);
        if (cx !== undefined) {
          mx = cx;
          targetMx = cx;
        }
        if (cy !== undefined) {
          my = cy;
          targetMy = cy;
        }
      },
      replay: () => {
        opened = false;
        freezeCharge = false;
        charge = 0;
        holding = false;
        setIsOpened(false);
        setIsHoldingState(false);
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
        buildFilings();
      },
    };

    window.__replayIntro = window.__introSeal.replay;

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointermove', updatePointer);
      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
      container.addEventListener('keydown', handleKeyDown);
      container.addEventListener('keyup', handleKeyUp);
    }

    // Main animation loop
    function loop(ts) {
      const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016);
      lastTs = ts;

      // Smooth pointer easing
      mx += (targetMx - mx) * 0.35;
      my += (targetMy - my) * 0.35;

      if (!opened) {
        if (!freezeCharge) {
          charge += holding ? dt / 1.3 : -dt / 2.0;
          charge = Math.max(0, Math.min(1, charge));
        }
        if (charge >= 1) {
          triggerOpen();
        }
      }

      // 1. Draw sleek dark atmospheric surface
      const grad = ctx.createRadialGradient(W / 2, H / 2, 60, W / 2, H / 2, Math.max(W, H) * 0.72);
      grad.addColorStop(0, '#171A21'); // subtle dark charcoal center
      grad.addColorStop(0.55, '#0E1015'); // deep dark obsidian
      grad.addColorStop(1, '#07080B'); // midnight black edges
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Apply subtle grain pattern
      if (grainPattern) {
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, W, H);
      }

      // Magnet Dimensions based on viewport
      const magnetW = Math.min(220, Math.max(140, W * 0.22));
      const magnetH = magnetW * 0.26;
      const poleDist = magnetW * 0.42;

      // North pole at (mx - poleDist, my), South pole at (mx + poleDist, my)
      const nX = mx - poleDist;
      const nY = my;
      const sX = mx + poleDist;
      const sY = my;

      // 2. Physics & Draw Filings (Batched for ultra-fast 60+ FPS)
      const darkFilingsPath = new Path2D();
      const highlightFilingsPath = new Path2D();

      for (let i = 0; i < filings.length; i++) {
        const f = filings[i];

        if (!opened) {
          // Vector from North pole (repelling / source)
          const rxN = f.ox - nX;
          const ryN = f.oy - nY;
          const d2N = rxN * rxN + ryN * ryN + 500;
          const d3N = Math.pow(d2N, 1.5);

          // Vector from South pole (attracting / sink)
          const rxS = f.ox - sX;
          const ryS = f.oy - sY;
          const d2S = rxS * rxS + ryS * ryS + 500;
          const d3S = Math.pow(d2S, 1.5);

          // True dipole magnetic field: B = rN / |rN|^3 - rS / |rS|^3
          const Bx = rxN / d3N - rxS / d3S;
          const By = ryN / d3N - ryS / d3S;
          const bMag = Math.sqrt(Bx * Bx + By * By);

          const targetAngle = Math.atan2(By, Bx);

          // Proximity to magnet center
          const dx = mx - f.ox;
          const dy = my - f.oy;
          const distToCenter = Math.sqrt(dx * dx + dy * dy) + 0.1;

          // Influence factor based on dipole strength and charge
          const fieldStrength = Math.min(1.2, bMag * 16000);
          const reach = Math.exp(-distToCenter / (W * 0.42));
          const inf = charge * fieldStrength * reach;

          // Angle alignment
          let da = targetAngle - f.ang;
          da = Math.atan2(Math.sin(da), Math.cos(da));
          f.ang += da * (0.04 + inf * 0.5);

          // When charge is low, relax slightly towards resting scatter angle
          if (charge < 0.08) {
            let db = f.baseAng - f.ang;
            db = Math.atan2(Math.sin(db), Math.cos(db));
            f.ang += db * 0.06;
          }

          // Magnetic filament bunching displacement
          const pull = inf * 20;
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

        // Dark iron filing body
        darkFilingsPath.moveTo(f.x - hx, f.y - hy);
        darkFilingsPath.lineTo(f.x + hx, f.y + hy);

        // Subtle specular highlight on edge of specks (matching photograph metallic grit)
        if (f.grit && f.a > 0.25) {
          highlightFilingsPath.moveTo(f.x - hx * 0.7 - 0.5, f.y - hy * 0.7 - 0.5);
          highlightFilingsPath.lineTo(f.x + hx * 0.7 - 0.5, f.y + hy * 0.7 - 0.5);
        }
      }

      // Stroke all filings in high-performance single passes (metallic silver/steel on dark surface)
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(215, 225, 240, 0.82)';
      ctx.stroke(darkFilingsPath);

      ctx.lineWidth = 0.85;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.stroke(highlightFilingsPath);

      // 3. Draw Bar Magnet & Charge Arc (Photograph Accuracy)
      if (!opened) {
        ctx.save();
        ctx.translate(mx, my);

        // Circular charging ring around magnet
        const ringRadius = magnetW * 0.56;
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.stroke();

        if (charge > 0) {
          ctx.save();
          ctx.shadowColor = 'rgba(56, 189, 248, 0.75)';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(
            0,
            0,
            ringRadius,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * charge
          );
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';
          ctx.strokeStyle = '#38BDF8';
          ctx.stroke();
          ctx.restore();
        }

        // Magnet Drop Shadow (Soft ambient contact shadow on dark background)
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur = 24;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;

        const hw = magnetW / 2;
        const hh = magnetH / 2;
        const cornerR = 3;

        // Helper for rounded rectangle path
        const drawMagnetBox = () => {
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-hw, -hh, magnetW, magnetH, cornerR);
          } else {
            ctx.rect(-hw, -hh, magnetW, magnetH);
          }
        };

        // Draw shadow base
        ctx.fillStyle = '#08090C';
        drawMagnetBox();
        ctx.fill();
        ctx.restore(); // remove shadow state for interior details

        // Clip to rounded rectangle
        ctx.save();
        drawMagnetBox();
        ctx.clip();

        // Left Half: Red (North)
        const redGrad = ctx.createLinearGradient(0, -hh, 0, hh);
        redGrad.addColorStop(0, '#F87171');
        redGrad.addColorStop(0.25, '#EF4444');
        redGrad.addColorStop(1, '#B91C1C');
        ctx.fillStyle = redGrad;
        ctx.fillRect(-hw, -hh, hw, magnetH);

        // Right Half: Blue (South)
        const blueGrad = ctx.createLinearGradient(0, -hh, 0, hh);
        blueGrad.addColorStop(0, '#60A5FA');
        blueGrad.addColorStop(0.25, '#2563EB');
        blueGrad.addColorStop(1, '#1D4ED8');
        ctx.fillStyle = blueGrad;
        ctx.fillRect(0, -hh, hw, magnetH);

        // Top edge bevel highlight (photo realism)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
        ctx.fillRect(-hw, -hh, magnetW, 1.5);

        // Bottom edge shadow bevel
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(-hw, hh - 1.5, magnetW, 1.5);

        // Center seam line dividing N and S
        ctx.fillStyle = 'rgba(15, 15, 20, 0.45)';
        ctx.fillRect(-0.75, -hh, 1.5, magnetH);

        // Bold white letters 'N' and 'S'
        const fontSize = Math.round(magnetH * 0.54);
        ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FFFFFF';

        // Soft letter drop shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetY = 1;

        ctx.fillText('N', -hw / 2, 1);
        ctx.fillText('S', hw / 2, 1);

        ctx.restore(); // end clip

        // Crisp border outline
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        drawMagnetBox();
        ctx.stroke();

        ctx.restore(); // end magnet translate
      }

      if (!opened || filings.some((f) => f.a > 0.02)) {
        animId = requestAnimationFrame(loop);
      }
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      if (container) {
        container.removeEventListener('pointermove', updatePointer);
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('keydown', handleKeyDown);
        container.removeEventListener('keyup', handleKeyUp);
      }
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  const handleSkip = (e) => {
    e.stopPropagation();
    document.body.style.overflow = '';
    setIsOpened(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  };

  return (
    <div
      ref={containerRef}
      id="intro-seal-cover"
      tabIndex={0}
      role="button"
      aria-label="Hold to open portfolio"
      className={`intro-seal-overlay ${isOpened ? 'opened' : ''}`}
    >
      <canvas ref={canvasRef} className="intro-seal-canvas" />

      {/* Top Bar with Skip Button */}
      <div className="intro-seal-topbar">
        <button
          type="button"
          onClick={handleSkip}
          className="intro-seal-skip-btn"
          aria-label="Skip intro and view portfolio immediately"
        >
          Skip intro ↗
        </button>
      </div>

      {/* Bottom Hint Banner */}
      <div className="intro-seal-hint-container">
        <div className={`intro-seal-hint-pill ${isHoldingState ? 'holding' : ''}`}>
          <div className="intro-seal-pulse-dot" />
          <span className="intro-seal-hint-text">
            {isHoldingState ? 'Charging magnetic field...' : 'Press & hold to open portfolio'}
          </span>
          <span className="intro-seal-hint-shortcut">[or hold Space]</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export default function GlassButterfly() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDisposed = false;
    let animationFrameId = null;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Renderer Setup with Full Transmission Resolution & ACESFilmic Tone Mapping
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false, // Canvas renders its own background so transmission has scene pixels to refract!
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true
      });
    } catch (e) {
      console.warn('WebGL init error:', e);
      return;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.transmissionResolutionScale = 1.0;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Dynamic Backdrop Canvas (Pastel Aurora Blobs Inside Scene for Physical Refraction)
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = 1024;
    bgCanvas.height = 1024;
    const bgCtx = bgCanvas.getContext('2d');
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.colorSpace = THREE.SRGBColorSpace;
    scene.background = bgTexture;

    const drawBackdrop = (time) => {
      // Base canvas color (#FAF7F0)
      bgCtx.fillStyle = '#FAF7F0';
      bgCtx.fillRect(0, 0, 1024, 1024);

      // Helper to draw large blurred radial aurora blobs
      const drawBlob = (x, y, radius, r, g, b, alpha) => {
        const grad = bgCtx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        grad.addColorStop(0.40, `rgba(${r}, ${g}, ${b}, ${alpha * 0.75})`);
        grad.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${alpha * 0.30})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        bgCtx.fillStyle = grad;
        bgCtx.beginPath();
        bgCtx.arc(x, y, radius, 0, Math.PI * 2);
        bgCtx.fill();
      };

      // Drifting pastel blobs with strong 65-80% presence
      // Blob 1: Lavender (#BDB8FF) - top right / hero
      const b1x = 640 + Math.sin(time * 0.35) * 80;
      const b1y = 340 + Math.cos(time * 0.28) * 60;
      drawBlob(b1x, b1y, 520, 189, 184, 255, 0.88);

      // Blob 2: Mint (#B8EBD6) - mid left / about & skills
      const b2x = 280 + Math.cos(time * 0.32) * 70;
      const b2y = 440 + Math.sin(time * 0.40) * 80;
      drawBlob(b2x, b2y, 480, 184, 235, 214, 0.82);

      // Blob 3: Peach (#FFCDAE) - lower right / projects
      const b3x = 760 + Math.sin(time * 0.28) * 70;
      const b3y = 680 + Math.cos(time * 0.35) * 60;
      drawBlob(b3x, b3y, 540, 255, 205, 174, 0.88);

      // Blob 4: Pink (#F5B8E2) - lower left / contact & footer
      const b4x = 340 + Math.cos(time * 0.35) * 80;
      const b4y = 820 + Math.sin(time * 0.30) * 60;
      drawBlob(b4x, b4y, 500, 245, 184, 226, 0.82);

      bgTexture.needsUpdate = true;
    };

    drawBackdrop(0);

    // 4. Custom Studio Environment (Softboxes + Specular Light Strips)
    const envScene = new THREE.Scene();
    const domeGeo = new THREE.SphereGeometry(20, 32, 16);
    const domeMat = new THREE.MeshBasicMaterial({ color: 0xF6F2FF, side: THREE.BackSide });
    envScene.add(new THREE.Mesh(domeGeo, domeMat));

    const softboxMatWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const softboxMatPink = new THREE.MeshBasicMaterial({ color: 0xFCE4F2 });
    const softboxMatBlue = new THREE.MeshBasicMaterial({ color: 0xE2EEFF });

    // Key Light Softbox (Top-Front)
    const sbKey = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), softboxMatWhite);
    sbKey.position.set(0, 8, 7);
    sbKey.lookAt(0, 0, 0);
    envScene.add(sbKey);

    // Rim Softbox (Right)
    const sbRight = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), softboxMatBlue);
    sbRight.position.set(9, 2, 2);
    sbRight.lookAt(0, 0, 0);
    envScene.add(sbRight);

    // Fill Softbox (Left)
    const sbLeft = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), softboxMatPink);
    sbLeft.position.set(-9, 2, 2);
    sbLeft.lookAt(0, 0, 0);
    envScene.add(sbLeft);

    // Long Specular Light Strips for Sharp Glass Rim Highlights (like reference photo)
    const strip1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 18), softboxMatWhite);
    strip1.position.set(4, 5, 5);
    strip1.rotation.z = Math.PI / 4;
    envScene.add(strip1);

    const strip2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 18), softboxMatWhite);
    strip2.position.set(-4, 5, 5);
    strip2.rotation.z = -Math.PI / 4;
    envScene.add(strip2);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;

    // 5. Direct Scene Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(4, 7, 6);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xF5B8E2, 4.0, 18);
    pinkLight.position.set(-5, 3, 4);
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0xBDB8FF, 4.0, 18);
    blueLight.position.set(5, -2, 4);
    scene.add(blueLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambLight);

    // 6. Fluted Glass Bump Map (Procedural Canvas)
    const fluteCanvas = document.createElement('canvas');
    fluteCanvas.width = 512;
    fluteCanvas.height = 512;
    const fluteCtx = fluteCanvas.getContext('2d');
    const fluteImgData = fluteCtx.createImageData(512, 512);
    const fData = fluteImgData.data;

    for (let y = 0; y < 512; y++) {
      for (let x = 0; x < 512; x++) {
        const idx = (y * 512 + x) * 4;
        const nx = x / 512;
        const ny = 1 - y / 512;
        const angle = Math.atan2(ny, nx);
        const dist = Math.hypot(nx, ny);
        // Fine radial ridges fanning from root
        const wave = Math.sin(angle * 28 + Math.sin(dist * 12) * 0.4) * 0.5 + 0.5;
        const val = Math.floor(wave * 255);
        fData[idx] = val;
        fData[idx + 1] = val;
        fData[idx + 2] = val;
        fData[idx + 3] = 255;
      }
    }
    fluteCtx.putImageData(fluteImgData, 0, 0);
    const fluteTexture = new THREE.CanvasTexture(fluteCanvas);
    fluteTexture.wrapS = THREE.RepeatWrapping;
    fluteTexture.wrapT = THREE.RepeatWrapping;

    // 7. Photoreal MeshPhysicalMaterial Configuration
    // Rim, Veins, Body: Thick polished glass cylinder with brilliant dispersion
    const rimGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xFFFFFF),
      transmission: 0.94,
      thickness: 2.6,
      roughness: 0.02,
      ior: 1.54,
      metalness: 0,
      iridescence: 1.0,
      iridescenceIOR: 1.38,
      iridescenceThicknessRange: [200, 750],
      dispersion: 0.7, // Chromatic prism splitting along thick glass edges!
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xFFFFFF),
      attenuationColor: new THREE.Color('#D8D0FF'),
      attenuationDistance: 2.2,
      envMapIntensity: 2.8,
      side: THREE.DoubleSide
    });

    // Membrane: Translucent crystal glass with fluted bump and satiny sheen (matching Sora reference)
    const membraneGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xF5F0FF),
      transmission: 0.86, // Visible, crystal-clear membrane catching bright softbox sheen
      thickness: 1.2,
      roughness: 0.08,
      ior: 1.54,
      metalness: 0,
      iridescence: 1.0,
      iridescenceIOR: 1.38,
      iridescenceThicknessRange: [200, 750],
      dispersion: 0.60,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xFFFFFF),
      attenuationColor: new THREE.Color('#D8CEFF'),
      attenuationDistance: 1.8,
      envMapIntensity: 2.8,
      bumpMap: fluteTexture,
      bumpScale: 0.030,
      side: THREE.DoubleSide
    });

    // 8. 3D Curved Wing Geometry Generation (Membrane + Thick Rim Tube + Fanned Veins)
    const tessellator = new TessellateModifier(0.08, 5);

    // Curved Domed Z-Displacement Function (Upward bend towards tips + gentle S-curve)
    function getWingZ(x, y, isUpper) {
      const dist = Math.hypot(x, y);
      if (isUpper) {
        return Math.sin(x * 1.5) * 0.16 + Math.pow(dist / 2.2, 1.8) * 0.28 - Math.cos(y * 2) * 0.04;
      } else {
        return Math.sin(x * 1.6) * 0.12 + Math.pow(dist / 1.6, 1.8) * 0.20 - Math.cos(y * 2) * 0.03;
      }
    }

    // Helper: Build Full Wing Assembly (Membrane, Thick Rim, 8-12 Fanned Veins)
    function buildWing(shape, isUpper, isLeft = false) {
      const group = new THREE.Group();

      // a) Membrane Mesh (Tessellated & Z-Displaced)
      let membraneGeo = new THREE.ShapeGeometry(shape, 28);
      membraneGeo = tessellator.modify(membraneGeo);

      const mPos = membraneGeo.attributes.position;
      for (let i = 0; i < mPos.count; i++) {
        const x = mPos.getX(i);
        const y = mPos.getY(i);
        mPos.setZ(i, getWingZ(x, y, isUpper));
      }
      membraneGeo.computeVertexNormals();
      const membraneMesh = new THREE.Mesh(membraneGeo, membraneGlassMat);
      group.add(membraneMesh);

      // b) Thick Polished Glass Rim (Closed Tube following perimeter, radius 0.038)
      const pts2d = shape.getPoints(200);
      const pts3d = pts2d.map(p => new THREE.Vector3(p.x, p.y, getWingZ(p.x, p.y, isUpper)));
      const rimCurve = new THREE.CatmullRomCurve3(pts3d, true);
      const rimGeo = new THREE.TubeGeometry(rimCurve, 420, 0.038, 20, true);
      const rimMesh = new THREE.Mesh(rimGeo, rimGlassMat);
      group.add(rimMesh);

      // c) Fanned Veins (8-12 smooth continuous glass ribs fanning to edges)
      const rootZ = getWingZ(0.05, isUpper ? 0.05 : -0.05, isUpper) + 0.015;
      const root = new THREE.Vector3(0.05, isUpper ? 0.05 : -0.05, rootZ);

      // Distinct target distribution along outer perimeter
      const targetCount = isUpper ? 11 : 8;
      const edgePoints = pts3d.filter((_, idx) => idx % Math.floor(pts3d.length / (targetCount + 2)) === 0).slice(1, targetCount + 1);

      edgePoints.forEach((target, i) => {
        const mid1 = new THREE.Vector3().lerpVectors(root, target, 0.35);
        mid1.x += Math.sin(i * 0.7) * 0.035;
        mid1.z = getWingZ(mid1.x, mid1.y, isUpper) + 0.018;

        const mid2 = new THREE.Vector3().lerpVectors(root, target, 0.70);
        mid2.z = getWingZ(mid2.x, mid2.y, isUpper) + 0.015;

        const endPt = target.clone();
        endPt.z = getWingZ(target.x, target.y, isUpper) + 0.012;

        const vCurve = new THREE.CatmullRomCurve3([root, mid1, mid2, endPt]);
        const vGeo = new THREE.TubeGeometry(vCurve, 48, 0.014, 12, false);
        const vMesh = new THREE.Mesh(vGeo, rimGlassMat);
        group.add(vMesh);
      });

      if (isLeft) {
        group.scale.x = -1; // Exact mirrored symmetry
      }

      return group;
    }

    // Upper Wing Shape (Scalloped crest matching Sora reference photo)
    const upperShape = new THREE.Shape();
    upperShape.moveTo(0.04, 0.05);
    upperShape.bezierCurveTo(0.25, 0.45, 0.7, 1.45, 1.65, 2.10);
    // 3 gentle undulating scallops along outer edge
    upperShape.bezierCurveTo(1.95, 2.00, 2.22, 1.55, 2.10, 1.15);
    upperShape.bezierCurveTo(2.00, 0.85, 1.85, 0.55, 1.45, 0.15);
    upperShape.bezierCurveTo(1.05, -0.15, 0.45, -0.25, 0.04, 0.05);

    // Lower Wing Shape (Rounded petal lobe with scalloped margin)
    const lowerShape = new THREE.Shape();
    lowerShape.moveTo(0.04, -0.05);
    lowerShape.bezierCurveTo(0.35, -0.30, 0.85, -0.65, 1.25, -0.95);
    lowerShape.bezierCurveTo(1.35, -1.35, 0.95, -1.65, 0.50, -1.55);
    lowerShape.bezierCurveTo(0.18, -1.40, -0.02, -0.75, 0.04, -0.05);

    // Build Right and Left Wing Groups
    const rightUpperWing = buildWing(upperShape, true, false);
    const rightLowerWing = buildWing(lowerShape, false, false);
    const leftUpperWing = buildWing(upperShape, true, true);
    const leftLowerWing = buildWing(lowerShape, false, true);

    const rightWingGroup = new THREE.Group();
    rightWingGroup.add(rightUpperWing);
    rightWingGroup.add(rightLowerWing);

    const leftWingGroup = new THREE.Group();
    leftWingGroup.add(leftUpperWing);
    leftWingGroup.add(leftLowerWing);

    // Initial V-shape wing opening (~36° upward)
    rightWingGroup.rotation.z = -0.28;
    rightWingGroup.rotation.y = -0.34;
    leftWingGroup.rotation.z = 0.28;
    leftWingGroup.rotation.y = 0.34;

    // 9. Butterfly Body, Segment Rings & Antennae
    const bodyGroup = new THREE.Group();

    // Torso Capsule
    const bodyGeo = new THREE.CapsuleGeometry(0.075, 0.80, 18, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, rimGlassMat);
    bodyMesh.position.set(0, -0.05, 0.02);
    bodyGroup.add(bodyMesh);

    // 3 Segment Rings
    const ringMat = rimGlassMat;
    [-0.16, 0.02, 0.20].forEach(yPos => {
      const ringGeo = new THREE.TorusGeometry(0.078, 0.010, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(0, yPos, 0.02);
      bodyGroup.add(ringMesh);
    });

    // Head Sphere
    const headGeo = new THREE.SphereGeometry(0.085, 24, 24);
    const headMesh = new THREE.Mesh(headGeo, rimGlassMat);
    headMesh.position.set(0, 0.44, 0.03);
    bodyGroup.add(headMesh);

    // Antennae (Curved tubes with glowing bead tips)
    const rAntennaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.02, 0.48, 0.04),
      new THREE.Vector3(0.14, 0.74, 0.10),
      new THREE.Vector3(0.32, 1.02, 0.14)
    ]);
    const lAntennaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.02, 0.48, 0.04),
      new THREE.Vector3(-0.14, 0.74, 0.10),
      new THREE.Vector3(-0.32, 1.02, 0.14)
    ]);
    bodyGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rAntennaCurve, 28, 0.010, 8, false), rimGlassMat));
    bodyGroup.add(new THREE.Mesh(new THREE.TubeGeometry(lAntennaCurve, 28, 0.010, 8, false), rimGlassMat));

    const beadGeo = new THREE.SphereGeometry(0.032, 18, 18);
    const rBead = new THREE.Mesh(beadGeo, rimGlassMat);
    rBead.position.set(0.32, 1.02, 0.14);
    const lBead = new THREE.Mesh(beadGeo, rimGlassMat);
    lBead.position.set(-0.32, 1.02, 0.14);
    bodyGroup.add(rBead);
    bodyGroup.add(lBead);

    // Master Butterfly Pivot
    const butterflyPivot = new THREE.Group();
    butterflyPivot.add(rightWingGroup);
    butterflyPivot.add(leftWingGroup);
    butterflyPivot.add(bodyGroup);
    butterflyPivot.rotation.x = 0.22; // ~12° forward tilt to catch overhead softbox light
    scene.add(butterflyPivot);

    // 10. Faint Glossy Floor Pool & Soft Reflection
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const floorCtx = floorCanvas.getContext('2d');
    const fGrad = floorCtx.createRadialGradient(256, 256, 0, 256, 256, 240);
    fGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    fGrad.addColorStop(0.25, 'rgba(215, 205, 255, 0.50)');
    fGrad.addColorStop(0.55, 'rgba(247, 198, 232, 0.25)');
    fGrad.addColorStop(1, 'rgba(250, 247, 240, 0)');
    floorCtx.fillStyle = fGrad;
    floorCtx.beginPath();
    floorCtx.arc(256, 256, 240, 0, Math.PI * 2);
    floorCtx.fill();

    const floorTex = new THREE.CanvasTexture(floorCanvas);
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.5, 4.2),
      new THREE.MeshBasicMaterial({ map: floorTex, transparent: true, opacity: 0.70, depthWrite: false })
    );
    floorMesh.rotation.x = -Math.PI / 2.2;
    floorMesh.position.set(0, -1.45, -0.3);
    scene.add(floorMesh);

    // 11. Postprocessing Setup (UnrealBloomPass for glowing highlights + OutputPass)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.40, // Subtle glowing specular bloom
      0.8,  // Bloom radius
      0.82  // Threshold so crystal highlights glow
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // 12. Position, Sizing & Parallax Handlers
    let targetTiltX = 0.22;
    let targetTiltZ = 0;
    let currentTiltX = 0.22;
    let currentTiltZ = 0;

    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;

      if (mobile) {
        butterflyPivot.position.set(0, 0.45, 0);
        butterflyPivot.scale.setScalar(0.90);
        floorMesh.position.set(0, -1.2, -0.3);
        floorMesh.scale.setScalar(0.90);
      } else if (tablet) {
        butterflyPivot.position.set(0.80, 0.35, 0);
        butterflyPivot.scale.setScalar(1.10);
        floorMesh.position.set(0.80, -1.3, -0.3);
        floorMesh.scale.setScalar(1.10);
      } else {
        // Desktop: sized ~45vw, placed gracefully between hero text and telemetry card
        butterflyPivot.position.set(0.92, 0.38, 0);
        butterflyPivot.scale.setScalar(1.22);
        floorMesh.position.set(0.92, -1.35, -0.3);
        floorMesh.scale.setScalar(1.22);
      }

      composer.render();
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    // Mouse movement parallax (max 6° tilt)
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetTiltX = 0.22 + normY * 0.10; // max ~6° around base tilt
      targetTiltZ = -normX * 0.10;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 13. Animation Loop
    const startTime = performance.now();

    const animate = (currentTime) => {
      if (isDisposed) return;

      if (typeof document !== 'undefined' && document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (currentTime - startTime) * 0.001; // seconds

      // Animate background aurora drift
      drawBackdrop(elapsed);

      // Rotation & Wing motion (honor prefers-reduced-motion with gentle static pose)
      if (prefersReducedMotion) {
        butterflyPivot.rotation.y = 0.25;
        rightWingGroup.rotation.y = -0.34;
        leftWingGroup.rotation.y = 0.34;
      } else {
        // Continuous 360° rotation around Y axis (~0.28 rad/sec), starting facing camera
        butterflyPivot.rotation.y = 0.25 + elapsed * 0.28;

        // Slow gentle wing flap (±8-10°, ~2.5s period)
        const flapAngle = Math.sin(elapsed * 2.5) * 0.16; // ~9.2 degrees
        rightWingGroup.rotation.y = -0.34 - flapAngle;
        leftWingGroup.rotation.y = 0.34 + flapAngle;
      }

      // Gentle floating up/down (±0.12 units)
      const floatOffset = Math.sin(elapsed * 1.5) * 0.12;

      // Mouse Parallax with smooth easing
      currentTiltX += (targetTiltX - currentTiltX) * 0.04;
      currentTiltZ += (targetTiltZ - currentTiltZ) * 0.04;
      butterflyPivot.rotation.x = currentTiltX;
      butterflyPivot.rotation.z = currentTiltZ;

      // Scroll Parallax and depth scale
      const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollFactor = window.scrollY / scrollMax;
      const scrollOffset = scrollFactor * 0.40;
      const dynamicScale = 1.0 - scrollFactor * 0.08;

      const mobile = window.innerWidth < 768;
      const baseY = mobile ? 0.45 : (window.innerWidth < 1024 ? 0.35 : 0.38);
      const baseScale = mobile ? 0.90 : (window.innerWidth < 1024 ? 1.10 : 1.32);

      butterflyPivot.position.y = baseY + floatOffset - scrollOffset;
      butterflyPivot.scale.setScalar(baseScale * dynamicScale);

      // Floor light pool breathing with flap
      floorMesh.material.opacity = 0.58 + Math.sin(elapsed * 2.5) * 0.12;

      composer.render();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 14. Cleanup & Disposal
    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('mousemove', handleMouseMove);

      membraneGlassMat.dispose();
      rimGlassMat.dispose();
      fluteTexture.dispose();
      bgTexture.dispose();
      floorTex.dispose();
      envMap.dispose();
      pmremGenerator.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas 
        id="glass-butterfly" 
        ref={canvasRef} 
        className="w-full h-full block pointer-events-none" 
      />
    </div>
  );
}

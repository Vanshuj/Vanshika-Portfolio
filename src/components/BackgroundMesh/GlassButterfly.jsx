import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default function GlassButterfly() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability
    let gl;
    try {
      gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        console.warn('WebGL not supported. Butterfly canvas disabled.');
        return;
      }
    } catch (e) {
      console.warn('WebGL check error:', e);
      return;
    }

    let isDisposed = false;
    let animationFrameId = null;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 3. Environment Map via PMREMGenerator & RoomEnvironment (No external HDRI needed)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv).texture;
    scene.environment = envTexture;

    // 4. Studio Lighting Setup (Pastel iridescent highlights + warm golden key)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    // Warm golden highlight (matching portfolio's #FFEB97 identity)
    const goldLight = new THREE.PointLight(0xFFEB97, 2.2, 12);
    goldLight.position.set(-2.5, 3.5, 2.5);
    scene.add(goldLight);

    // Pastel Pink / Peach Light (#F7C6E8)
    const pinkLight = new THREE.PointLight(0xF7C6E8, 2.0, 12);
    pinkLight.position.set(-3, 1, 3);
    scene.add(pinkLight);

    // Pastel Lavender Light (#C9C6FF)
    const lavenderLight = new THREE.PointLight(0xC9C6FF, 2.4, 12);
    lavenderLight.position.set(3.5, -1.5, 3);
    scene.add(lavenderLight);

    // Pastel Mint Light (#CFF1E3)
    const mintLight = new THREE.PointLight(0xCFF1E3, 1.8, 12);
    mintLight.position.set(0, -3, 2);
    scene.add(mintLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambLight);

    // 5. Crystal Liquid Glass Material (MeshPhysicalMaterial)
    // Matches the pristine, transparent iridescent glass in reference
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1.0,
      thickness: 0.85,
      roughness: 0.03,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.32,
      iridescenceThicknessRange: [120, 420],
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      attenuationColor: new THREE.Color('#F0EEFF'), // Ultra-light crystal lavender
      attenuationDistance: 3.5,
      envMapIntensity: 2.0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });

    // Vein Material for delicate internal light channels
    const veinMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 0.98,
      thickness: 0.4,
      roughness: 0.02,
      ior: 1.55,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [150, 400],
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: new THREE.Color('#FFFFFF'),
      attenuationDistance: 4.0,
      envMapIntensity: 2.2,
      transparent: true,
      opacity: 0.95
    });

    // 6. Procedural Wing Shapes & Geometries
    const extrudeSettings = {
      depth: 0.045,
      bevelEnabled: true,
      bevelSegments: 7,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      curveSegments: 42
    };

    // Right Upper Wing Shape
    const rUpperShape = new THREE.Shape();
    rUpperShape.moveTo(0.04, 0.05);
    rUpperShape.bezierCurveTo(0.2, 0.4, 0.6, 1.25, 1.45, 1.85);
    rUpperShape.bezierCurveTo(1.7, 1.8, 2.05, 1.4, 1.9, 0.85);
    rUpperShape.bezierCurveTo(1.75, 0.45, 1.4, 0.1, 0.95, -0.2);
    rUpperShape.bezierCurveTo(0.55, -0.35, 0.18, -0.15, 0.04, 0.05);

    // Left Upper Wing Shape (Mirrored)
    const lUpperShape = new THREE.Shape();
    lUpperShape.moveTo(-0.04, 0.05);
    lUpperShape.bezierCurveTo(-0.2, 0.4, -0.6, 1.25, -1.45, 1.85);
    lUpperShape.bezierCurveTo(-1.7, 1.8, -2.05, 1.4, -1.9, 0.85);
    lUpperShape.bezierCurveTo(-1.75, 0.45, -1.4, 0.1, -0.95, -0.2);
    lUpperShape.bezierCurveTo(-0.55, -0.35, -0.18, -0.15, -0.04, 0.05);

    // Right Lower Wing Shape
    const rLowerShape = new THREE.Shape();
    rLowerShape.moveTo(0.04, -0.05);
    rLowerShape.bezierCurveTo(0.25, -0.25, 0.65, -0.55, 1.1, -0.85);
    rLowerShape.bezierCurveTo(1.2, -1.2, 0.85, -1.5, 0.45, -1.45);
    rLowerShape.bezierCurveTo(0.15, -1.3, -0.02, -0.7, 0.04, -0.05);

    // Left Lower Wing Shape (Mirrored)
    const lLowerShape = new THREE.Shape();
    lLowerShape.moveTo(-0.04, -0.05);
    lLowerShape.bezierCurveTo(-0.25, -0.25, -0.65, -0.55, -1.1, -0.85);
    lLowerShape.bezierCurveTo(-1.2, -1.2, -0.85, -1.5, -0.45, -1.45);
    lLowerShape.bezierCurveTo(-0.15, -1.3, 0.02, -0.7, -0.04, -0.05);

    const rUpperGeo = new THREE.ExtrudeGeometry(rUpperShape, extrudeSettings);
    const lUpperGeo = new THREE.ExtrudeGeometry(lUpperShape, extrudeSettings);
    const rLowerGeo = new THREE.ExtrudeGeometry(rLowerShape, extrudeSettings);
    const lLowerGeo = new THREE.ExtrudeGeometry(lLowerShape, extrudeSettings);

    const rUpperMesh = new THREE.Mesh(rUpperGeo, glassMaterial);
    const lUpperMesh = new THREE.Mesh(lUpperGeo, glassMaterial);
    const rLowerMesh = new THREE.Mesh(rLowerGeo, glassMaterial);
    const lLowerMesh = new THREE.Mesh(lLowerGeo, glassMaterial);

    // 7. Internal Wing Vein Geometries
    const createVeinMesh = (points, radius = 0.012) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, 20, radius, 6, false);
      return new THREE.Mesh(geo, veinMaterial);
    };

    const rightWingGroup = new THREE.Group();
    rightWingGroup.add(rUpperMesh);
    rightWingGroup.add(rLowerMesh);

    // Right Upper Wing Veins
    rightWingGroup.add(createVeinMesh([
      new THREE.Vector3(0.05, 0.08, 0.025),
      new THREE.Vector3(0.65, 0.75, 0.035),
      new THREE.Vector3(1.35, 1.45, 0.025)
    ], 0.013));
    rightWingGroup.add(createVeinMesh([
      new THREE.Vector3(0.05, 0.08, 0.025),
      new THREE.Vector3(0.75, 0.55, 0.035),
      new THREE.Vector3(1.65, 0.85, 0.025)
    ], 0.011));
    rightWingGroup.add(createVeinMesh([
      new THREE.Vector3(0.05, 0.08, 0.025),
      new THREE.Vector3(0.55, 0.2, 0.035),
      new THREE.Vector3(1.15, 0.05, 0.025)
    ], 0.010));

    // Right Lower Wing Veins
    rightWingGroup.add(createVeinMesh([
      new THREE.Vector3(0.05, -0.05, 0.025),
      new THREE.Vector3(0.45, -0.45, 0.035),
      new THREE.Vector3(0.9, -0.75, 0.025)
    ], 0.011));
    rightWingGroup.add(createVeinMesh([
      new THREE.Vector3(0.05, -0.05, 0.025),
      new THREE.Vector3(0.35, -0.65, 0.035),
      new THREE.Vector3(0.55, -1.25, 0.025)
    ], 0.010));

    const leftWingGroup = new THREE.Group();
    leftWingGroup.add(lUpperMesh);
    leftWingGroup.add(lLowerMesh);

    // Left Upper Wing Veins (Mirrored X)
    leftWingGroup.add(createVeinMesh([
      new THREE.Vector3(-0.05, 0.08, 0.025),
      new THREE.Vector3(-0.65, 0.75, 0.035),
      new THREE.Vector3(-1.35, 1.45, 0.025)
    ], 0.013));
    leftWingGroup.add(createVeinMesh([
      new THREE.Vector3(-0.05, 0.08, 0.025),
      new THREE.Vector3(-0.75, 0.55, 0.035),
      new THREE.Vector3(-1.65, 0.85, 0.025)
    ], 0.011));
    leftWingGroup.add(createVeinMesh([
      new THREE.Vector3(-0.05, 0.08, 0.025),
      new THREE.Vector3(-0.55, 0.2, 0.035),
      new THREE.Vector3(-1.15, 0.05, 0.025)
    ], 0.010));

    // Left Lower Wing Veins (Mirrored X)
    leftWingGroup.add(createVeinMesh([
      new THREE.Vector3(-0.05, -0.05, 0.025),
      new THREE.Vector3(-0.45, -0.45, 0.035),
      new THREE.Vector3(-0.9, -0.75, 0.025)
    ], 0.011));
    leftWingGroup.add(createVeinMesh([
      new THREE.Vector3(-0.05, -0.05, 0.025),
      new THREE.Vector3(-0.35, -0.65, 0.035),
      new THREE.Vector3(-0.55, -1.25, 0.025)
    ], 0.010));

    // 8. Body & Antennae Construction
    const bodyGroup = new THREE.Group();

    // Abdomen / Torso Capsule
    const bodyGeo = new THREE.CapsuleGeometry(0.065, 0.72, 12, 24);
    const bodyMesh = new THREE.Mesh(bodyGeo, glassMaterial);
    bodyMesh.position.set(0, -0.05, 0.02);
    bodyGroup.add(bodyMesh);

    // Head Sphere
    const headGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, glassMaterial);
    headMesh.position.set(0, 0.38, 0.03);
    bodyGroup.add(headMesh);

    // Antennae (Tubes with tiny spheres at tips)
    const rAntennaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.02, 0.42, 0.04),
      new THREE.Vector3(0.12, 0.65, 0.07),
      new THREE.Vector3(0.28, 0.88, 0.09)
    ]);
    const lAntennaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.02, 0.42, 0.04),
      new THREE.Vector3(-0.12, 0.65, 0.07),
      new THREE.Vector3(-0.28, 0.88, 0.09)
    ]);

    const rAntennaGeo = new THREE.TubeGeometry(rAntennaCurve, 16, 0.009, 6, false);
    const lAntennaGeo = new THREE.TubeGeometry(lAntennaCurve, 16, 0.009, 6, false);
    bodyGroup.add(new THREE.Mesh(rAntennaGeo, glassMaterial));
    bodyGroup.add(new THREE.Mesh(lAntennaGeo, glassMaterial));

    const tipGeo = new THREE.SphereGeometry(0.025, 12, 12);
    const rTipMesh = new THREE.Mesh(tipGeo, glassMaterial);
    rTipMesh.position.set(0.28, 0.88, 0.09);
    const lTipMesh = new THREE.Mesh(tipGeo, glassMaterial);
    lTipMesh.position.set(-0.28, 0.88, 0.09);
    bodyGroup.add(rTipMesh);
    bodyGroup.add(lTipMesh);

    // Master Butterfly Pivot (Holds wings and body)
    const butterflyPivot = new THREE.Group();
    butterflyPivot.add(rightWingGroup);
    butterflyPivot.add(leftWingGroup);
    butterflyPivot.add(bodyGroup);
    
    // Initial slight forward tilt for perfect studio lighting angle
    butterflyPivot.rotation.x = 0.22;
    scene.add(butterflyPivot);

    // 9. Soft Caustic Reflection & Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    const radGrad = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
    radGrad.addColorStop(0, 'rgba(201, 198, 255, 0.38)');
    radGrad.addColorStop(0.35, 'rgba(247, 198, 232, 0.20)');
    radGrad.addColorStop(0.65, 'rgba(207, 241, 227, 0.08)');
    radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    shadowCtx.fillStyle = radGrad;
    shadowCtx.beginPath();
    shadowCtx.arc(128, 128, 120, 0, Math.PI * 2);
    shadowCtx.fill();

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 2.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2.2;
    shadowMesh.position.set(0, -1.4, -0.2);
    scene.add(shadowMesh);

    // 10. Position, Sizing & Parallax Handlers
    let targetTiltX = 0.22;
    let targetTiltZ = 0;
    let currentTiltX = 0.22;
    let currentTiltZ = 0;
    let isTabVisible = true;

    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      if (isMobile) {
        // Mobile layout: centered, slightly lower opacity, scaled
        butterflyPivot.position.x = 0;
        butterflyPivot.position.y = 0.3;
        butterflyPivot.scale.set(0.72, 0.72, 0.72);
        shadowMesh.scale.set(0.75, 0.75, 0.75);
        shadowMesh.position.x = 0;
        renderer.domElement.style.opacity = '0.72';
      } else if (isTablet) {
        butterflyPivot.position.x = 0.8;
        butterflyPivot.position.y = 0.2;
        butterflyPivot.scale.set(0.9, 0.9, 0.9);
        shadowMesh.scale.set(0.9, 0.9, 0.9);
        shadowMesh.position.x = 0.8;
        renderer.domElement.style.opacity = '0.9';
      } else {
        // Desktop: centered slightly right of the hero (~45-55vw)
        butterflyPivot.position.x = 1.45;
        butterflyPivot.position.y = 0.2;
        butterflyPivot.scale.set(1.12, 1.12, 1.12);
        shadowMesh.scale.set(1.1, 1.1, 1.1);
        shadowMesh.position.x = 1.45;
        renderer.domElement.style.opacity = '1';
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    // Mouse movement parallax
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetTiltX = 0.22 + normY * 0.14; // max ~8 degrees parallax around base angle
      targetTiltZ = -normX * 0.14;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Tab visibility handling (pause when hidden to save CPU/battery)
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 11. Animation Loop
    const startTime = performance.now();

    const animate = (currentTime) => {
      if (isDisposed) return;

      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (currentTime - startTime) * 0.001; // seconds

      if (prefersReducedMotion) {
        // Static elegant pose
        rightWingGroup.rotation.y = -0.3;
        leftWingGroup.rotation.y = 0.3;
        butterflyPivot.rotation.y = 0.5;
        renderer.render(scene, camera);
        return;
      }

      // 360° Continuous rotation around Y axis (approx 0.4 rad/sec)
      butterflyPivot.rotation.y = elapsed * 0.4;

      // Gentle wing flap (±12 degrees / ~0.21 rad on sine wave)
      const flapAngle = Math.sin(elapsed * 3.6) * 0.21;
      rightWingGroup.rotation.y = -flapAngle;
      leftWingGroup.rotation.y = flapAngle;

      // Slow floating up/down motion (±0.15 units)
      const floatOffset = Math.sin(elapsed * 1.6) * 0.15;

      // Parallax smooth interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltZ += (targetTiltZ - currentTiltZ) * 0.05;
      butterflyPivot.rotation.x = currentTiltX;
      butterflyPivot.rotation.z = currentTiltZ;

      // Scroll Parallax and depth scale (0.9 - 1.1)
      const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollFactor = window.scrollY / scrollMax;
      const scrollOffset = scrollFactor * 0.45;
      const dynamicScale = 1.0 - scrollFactor * 0.1;

      const isMobile = window.innerWidth < 768;
      const baseY = isMobile ? 0.3 : 0.2;
      const baseScale = isMobile ? 0.72 : (window.innerWidth < 1024 ? 0.9 : 1.12);

      butterflyPivot.position.y = baseY + floatOffset - scrollOffset;
      butterflyPivot.scale.setScalar(baseScale * dynamicScale);

      // Soft shadow breathing with flap
      shadowMat.opacity = 0.45 + Math.sin(elapsed * 3.6) * 0.12;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 12. Cleanup & Disposal
    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);

      // Dispose Geometries
      rUpperGeo.dispose();
      lUpperGeo.dispose();
      rLowerGeo.dispose();
      lLowerGeo.dispose();
      bodyGeo.dispose();
      headGeo.dispose();
      rAntennaGeo.dispose();
      lAntennaGeo.dispose();
      tipGeo.dispose();
      shadowGeo.dispose();

      // Dispose Materials & Textures
      glassMaterial.dispose();
      veinMaterial.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      envTexture.dispose();
      pmremGenerator.dispose();
      roomEnv.dispose();

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

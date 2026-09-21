import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type WorldSection =
  | 'hero'
  | 'problem'
  | 'capabilities'
  | 'architecture'
  | 'work'
  | 'transformation'
  | 'convergence';

export interface VantixioWorldProps {
  activeSection?: WorldSection;
  continuousProgress?: number; // 0.0 (Hero) to 6.0 (Convergence)
  sectionProgress?: number;
  globalScrollProgress?: number;
  activeCapability?: string | null;
  formSubmitted?: boolean;
  reducedMotion?: boolean;
}

// 7 Continuous World Color Signatures (RGB Hex)
// 0: Hero, 1: Problem, 2: Capabilities, 3: Architecture, 4: Work, 5: Transformation Morph, 6: Convergence
const COLOR_STOPS = [
  { primary: 0x19D3E6, secondary: 0xFF5722, fog: 0x070A12 }, // 0: Hero (Cyan + Flame Coral)
  { primary: 0xF43F5E, secondary: 0x06B6D4, fog: 0x080A14 }, // 1: Problem (Rose + Cyan)
  { primary: 0x06B6D4, secondary: 0x3B82F6, fog: 0x060913 }, // 2: Capabilities (Electric Cyan + Cobalt)
  { primary: 0x06B6D4, secondary: 0x8B5CF6, fog: 0x070A14 }, // 3: Architecture (Cyan + Indigo)
  { primary: 0xF59E0B, secondary: 0x10B981, fog: 0x080A12 }, // 4: Work (Amber Gold + Emerald)
  { primary: 0x19D3E6, secondary: 0xFF5722, fog: 0x070A14 }, // 5: Transformation Morph (Electric Cyan + Flame Coral)
  { primary: 0xFF5722, secondary: 0xF59E0B, fog: 0x080A14 }, // 6: Convergence (Coral + Gold)
];

export const VantixioWorld: React.FC<VantixioWorldProps> = ({
  activeSection = 'hero',
  continuousProgress = 0,
  sectionProgress = 0,
  globalScrollProgress = 0,
  activeCapability = null,
  formSubmitted = false,
  reducedMotion = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Mutable animation state references
  const stateRef = useRef({
    activeSection,
    continuousProgress,
    sectionProgress,
    globalScrollProgress,
    activeCapability,
    formSubmitted,
    reducedMotion,
    currentProgress: continuousProgress,
    targetProgress: continuousProgress,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isMobile: false,
    aspect: 1.0,
  });

  // Synchronize incoming props
  useEffect(() => {
    stateRef.current.activeSection = activeSection;
    stateRef.current.targetProgress = Math.max(0, Math.min(continuousProgress, 6));
    stateRef.current.sectionProgress = sectionProgress;
    stateRef.current.globalScrollProgress = globalScrollProgress;
    stateRef.current.activeCapability = activeCapability;
    stateRef.current.formSubmitted = formSubmitted;
    stateRef.current.reducedMotion = reducedMotion;
  }, [activeSection, continuousProgress, sectionProgress, globalScrollProgress, activeCapability, formSubmitted, reducedMotion]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const aspect = width / height;

    stateRef.current.isMobile = isMobile;
    stateRef.current.aspect = aspect;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isMobile ? 1.3 : 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLOR_STOPS[0].fog, isMobile ? 0.045 : 0.052);

    // Adaptive Camera: wider FOV on mobile so primary objects fill 60-80% of upper visual field
    const initialFov = isMobile ? (aspect < 0.55 ? 60 : 56) : 48;
    const camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 100);

    // Dynamic Camera Spline generator tailored for Desktop vs. Dedicated Mobile
    const getCameraStops = (mobile: boolean, curAspect: number) => {
      if (mobile) {
        // MOBILE-FIRST: Closer camera distance (Z closer) and Y elevated so 3D objects occupy
        // 65-80% of visible upper viewport, floating above headlines with razor-sharp presence.
        const yOffset = curAspect < 0.55 ? 0.5 : 0.38;
        const zScale = curAspect < 0.55 ? 0.88 : 0.95;
        return [
          { pos: new THREE.Vector3(0, yOffset, 6.4 * zScale), look: new THREE.Vector3(0, yOffset * 0.4, 0) },    // 0: Hero
          { pos: new THREE.Vector3(0, yOffset, 6.2 * zScale), look: new THREE.Vector3(0, yOffset * 0.3, 0) },    // 1: Problem
          { pos: new THREE.Vector3(0, yOffset, 5.8 * zScale), look: new THREE.Vector3(0, yOffset * 0.2, 0) },    // 2: Capabilities
          { pos: new THREE.Vector3(0, yOffset, 5.9 * zScale), look: new THREE.Vector3(0, yOffset * 0.2, 0) },    // 3: Architecture
          { pos: new THREE.Vector3(0, yOffset, 5.6 * zScale), look: new THREE.Vector3(0, yOffset * 0.1, 0) },    // 4: Work
          { pos: new THREE.Vector3(0, yOffset * 0.5, 3.8 * zScale), look: new THREE.Vector3(0, 0, 0) },          // 5: Morph (Passing Through)
          { pos: new THREE.Vector3(0, yOffset, 6.2 * zScale), look: new THREE.Vector3(0, yOffset * 0.3, 0) },    // 6: Convergence
        ];
      } else {
        // DESKTOP: Wide, expansive spatial perspective with 70-80% world presence
        return [
          { pos: new THREE.Vector3(0.5, 0, 8.4), look: new THREE.Vector3(0.15, 0, 0) },     // 0: Hero
          { pos: new THREE.Vector3(0.65, -0.08, 7.8), look: new THREE.Vector3(0.2, 0, 0) }, // 1: Problem
          { pos: new THREE.Vector3(0.7, -0.1, 7.3), look: new THREE.Vector3(0.25, 0, 0) },   // 2: Capabilities
          { pos: new THREE.Vector3(-0.4, 0.08, 7.4), look: new THREE.Vector3(-0.15, 0, 0) }, // 3: Architecture
          { pos: new THREE.Vector3(-0.55, 0.1, 6.8), look: new THREE.Vector3(-0.2, 0, 0) },  // 4: Work
          { pos: new THREE.Vector3(0, 0, 4.2), look: new THREE.Vector3(0, 0, 0) },           // 5: Morph (Passing Through Gap)
          { pos: new THREE.Vector3(0, 0, 7.6), look: new THREE.Vector3(0, 0, 0) },           // 6: Convergence
        ];
      }
    };

    let cameraStops = getCameraStops(isMobile, aspect);
    camera.position.copy(cameraStops[0].pos);
    camera.lookAt(cameraStops[0].look);

    // ==========================================
    // 1. LIGHTING SYSTEM (High-contrast, razor-sharp silhouettes)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0e172a, isMobile ? 2.0 : 1.7);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(COLOR_STOPS[0].primary, isMobile ? 4.2 : 3.5, 30);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(COLOR_STOPS[0].secondary, isMobile ? 3.4 : 2.8, 26);
    rimLight.position.set(-5, -4, 4);
    scene.add(rimLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 0.95);
    overheadLight.position.set(0, 8, 3);
    scene.add(overheadLight);

    // ==========================================
    // 2. WORLD 0: HERO MONUMENT (Large Monumental Craft Sculpture)
    // ==========================================
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);

    // Substantially larger scale for immediate visual impact (Igloo clarity principle)
    const monumentScale = isMobile ? 1.15 : 1.35;
    monumentGroup.scale.set(monumentScale, monumentScale, monumentScale);

    const outerGeo = new THREE.IcosahedronGeometry(2.4, isMobile ? 0 : 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x142036,
      roughness: 0.2,
      metalness: 0.92,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const monumentOuter = new THREE.Mesh(outerGeo, outerMat);
    monumentGroup.add(monumentOuter);

    const innerGeo = new THREE.OctahedronGeometry(1.5, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x091122,
      roughness: 0.1,
      metalness: 0.96,
      emissive: 0x082B42,
      emissiveIntensity: 0.45,
    });
    const monumentInner = new THREE.Mesh(innerGeo, innerMat);
    monumentGroup.add(monumentInner);

    const seedGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const seedMat = new THREE.MeshBasicMaterial({
      color: 0xFF5722,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const monumentSeed = new THREE.Mesh(seedGeo, seedMat);
    monumentGroup.add(monumentSeed);

    const ringGeo1 = new THREE.RingGeometry(3.5, 3.54, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x19D3E6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    monumentGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(4.2, 4.24, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xFF5722,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3.8;
    monumentGroup.add(ring2);

    // ==========================================
    // 3. WORLD 1: THE PROBLEM (Large Opposing Monoliths & Dynamic Tension)
    // ==========================================
    const problemGroup = new THREE.Group();
    scene.add(problemGroup);

    const problemScale = isMobile ? 1.05 : 1.25;
    problemGroup.scale.set(problemScale, problemScale, problemScale);

    const redGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xF43F5E,
      roughness: 0.35,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const redCube = new THREE.Mesh(redGeo, redMat);
    redCube.position.set(isMobile ? -1.6 : -2.6, 0.4, 0);
    problemGroup.add(redCube);

    const blueGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x06B6D4,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const blueCube = new THREE.Mesh(blueGeo, blueMat);
    blueCube.position.set(isMobile ? 1.6 : 2.6, -0.4, 0);
    problemGroup.add(blueCube);

    const tensionCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(isMobile ? -1.6 : -2.6, 0.4, 0),
      new THREE.Vector3(-0.7, 1.4, 0.6),
      new THREE.Vector3(0.7, -1.4, -0.6),
      new THREE.Vector3(isMobile ? 1.6 : 2.6, -0.4, 0),
    ]);
    const tensionGeo = new THREE.TubeGeometry(tensionCurve, 36, 0.045, 8, false);
    const tensionMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.5,
    });
    const tensionMesh = new THREE.Mesh(tensionGeo, tensionMat);
    problemGroup.add(tensionMesh);

    // ==========================================
    // 4. WORLD 2: CAPABILITIES (Large Spatial Constellation)
    // ==========================================
    const capabilityGroup = new THREE.Group();
    scene.add(capabilityGroup);

    const capNodes: THREE.Mesh[] = [];
    const hexRadius = isMobile ? 2.2 : 3.0;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * hexRadius;
      const y = Math.sin(angle) * hexRadius * 0.75;
      const nodeGeo = new THREE.OctahedronGeometry(0.5, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x06B6D4,
        roughness: 0.25,
        metalness: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, 0);
      capabilityGroup.add(nodeMesh);
      capNodes.push(nodeMesh);
    }

    const focusGeo = new THREE.DodecahedronGeometry(1.0, 0);
    const focusMat = new THREE.MeshStandardMaterial({
      color: 0x06B6D4,
      emissive: 0x06B6D4,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const focusMesh = new THREE.Mesh(focusGeo, focusMat);
    capabilityGroup.add(focusMesh);

    // ==========================================
    // 5. WORLD 3: ARCHITECTURE (Colonnade of Pillars)
    // ==========================================
    const architectureGroup = new THREE.Group();
    scene.add(architectureGroup);

    const pillarBeams: THREE.Mesh[] = [];
    const pillarCount = isMobile ? 3 : 5;
    for (let i = 0; i < pillarCount; i++) {
      const beamGeo = new THREE.CylinderGeometry(0.14, 0.14, 6.0, 16);
      const beamMat = new THREE.MeshStandardMaterial({
        color: 0x06B6D4,
        roughness: 0.2,
        metalness: 0.85,
        transparent: true,
        opacity: 0.8,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      const spacing = isMobile ? 1.6 : 1.35;
      const offset = (pillarCount - 1) * 0.5 * spacing;
      beam.position.set(i * spacing - offset, 0, 0);
      architectureGroup.add(beam);
      pillarBeams.push(beam);
    }

    const archRingGeo = new THREE.TorusGeometry(3.4, 0.045, 16, 64);
    const archMat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.65 });
    const archRing = new THREE.Mesh(archRingGeo, archMat);
    archRing.rotation.x = Math.PI / 2.6;
    architectureGroup.add(archRing);

    // ==========================================
    // 6. WORLD 4: PROVEN WORK (Ashtonava Silk & YesDhobi Logistics)
    // ==========================================
    const workGroup = new THREE.Group();
    scene.add(workGroup);

    // Ashtonava Luxury Silk Shimmer Planes (Large, tactile folds)
    const silkCount = isMobile ? 3 : 5;
    const silkPlanes: THREE.Mesh[] = [];
    for (let i = 0; i < silkCount; i++) {
      const planeGeo = new THREE.PlaneGeometry(isMobile ? 3.4 : 4.4, isMobile ? 5.0 : 6.2, 28, 28);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        metalness: 0.92,
        roughness: 0.16,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.position.set(-1.8 + i * 0.9, 0, -1.0 + i * 0.4);
      plane.rotation.y = 0.26 * (i - 2);
      workGroup.add(plane);
      silkPlanes.push(plane);
    }

    // YesDhobi logistics conveyor curve
    const stations = [
      { name: 'Customer', x: -2.2, y: 1.4 },
      { name: 'Booking', x: -0.6, y: -0.7 },
      { name: 'Pickup', x: 1.0, y: 1.2 },
      { name: 'Processing', x: 2.6, y: -0.5 },
      { name: 'Delivery', x: 4.2, y: 0.9 },
    ];
    const curvePoints = stations.map((s) => new THREE.Vector3(s.x, s.y, -0.6));
    const logisticsCurve = new THREE.CatmullRomCurve3(curvePoints);
    const curveGeo = new THREE.TubeGeometry(logisticsCurve, 54, 0.045, 8, false);
    const curveMat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.7 });
    const curveMesh = new THREE.Mesh(curveGeo, curveMat);
    workGroup.add(curveMesh);

    const packetGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);
    workGroup.add(packetMesh);

    // ==========================================
    // 7. NEW SIGNATURE TRANSITION: THE DIMENSIONAL WORLD MORPH (SHARED ARCHITECTURE)
    // ==========================================
    // Replaces the black hole with a majestic deconstructing and reassembling
    // architectural structure. Previous world physically becomes the next world.
    const morphGroup = new THREE.Group();
    scene.add(morphGroup);

    // Twin monumental portals / architectural wings that part as camera moves through
    const wingGeo = new THREE.BoxGeometry(0.3, 5.8, 0.3);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0x19D3E6,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    // Left Portal Wing (Columns + horizontal cantilever lintels)
    const leftWing = new THREE.Group();
    const leftCol1 = new THREE.Mesh(wingGeo, wingMat);
    leftCol1.position.set(-1.6, 0, 0);
    leftWing.add(leftCol1);
    const leftCol2 = new THREE.Mesh(wingGeo, wingMat);
    leftCol2.position.set(-2.4, 0, -0.5);
    leftWing.add(leftCol2);
    morphGroup.add(leftWing);

    // Right Portal Wing
    const rightWing = new THREE.Group();
    const rightCol1 = new THREE.Mesh(wingGeo, wingMat);
    rightCol1.position.set(1.6, 0, 0);
    rightWing.add(rightCol1);
    const rightCol2 = new THREE.Mesh(wingGeo, wingMat);
    rightCol2.position.set(2.4, 0, -0.5);
    rightWing.add(rightCol2);
    morphGroup.add(rightWing);

    // Cantilever Overhead Lintel (Parting upwards during pass-through)
    const lintelGeo = new THREE.BoxGeometry(4.8, 0.28, 0.28);
    const lintelMat = new THREE.MeshStandardMaterial({
      color: 0xFF5722,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const lintelBeam = new THREE.Mesh(lintelGeo, lintelMat);
    lintelBeam.position.set(0, 2.9, 0);
    morphGroup.add(lintelBeam);

    // 6 Flowing 3D Extruded Architectural Ribbons that sweep past the camera
    const ribbonCount = isMobile ? 4 : 6;
    const ribbonMeshes: THREE.Mesh[] = [];
    const ribbonMaterials: THREE.MeshBasicMaterial[] = [];

    for (let r = 0; r < ribbonCount; r++) {
      const angle = (r / ribbonCount) * Math.PI * 2;
      const radius = 2.4 + (r % 2) * 0.8;
      // Flowing path extending along Z through the camera viewport
      const ribbonPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * radius * 1.5, Math.sin(angle) * radius * 0.8, -4.0),
        new THREE.Vector3(Math.cos(angle + 0.6) * radius * 1.2, Math.sin(angle + 0.6) * radius * 0.7, -1.0),
        new THREE.Vector3(Math.cos(angle + 1.2) * (radius + 0.8), Math.sin(angle + 1.2) * (radius + 0.6), 2.5),
        new THREE.Vector3(Math.cos(angle + 1.8) * (radius + 1.6), Math.sin(angle + 1.8) * (radius + 1.2), 6.0),
      ]);

      const rGeo = new THREE.TubeGeometry(ribbonPath, 48, 0.04, 8, false);
      const rMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x19D3E6 : 0xFF5722,
        transparent: true,
        opacity: 0.7,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      morphGroup.add(rMesh);
      ribbonMeshes.push(rMesh);
      ribbonMaterials.push(rMat);
    }

    // Internal crystalline reassembly core (Revealed inside the structure during pass-through)
    const morphCoreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const morphCoreMat = new THREE.MeshStandardMaterial({
      color: 0x19D3E6,
      emissive: 0x06B6D4,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const morphCore = new THREE.Mesh(morphCoreGeo, morphCoreMat);
    morphGroup.add(morphCore);

    // ==========================================
    // 8. WORLD 6: CONVERGENCE (Luminous Ordered Harmonic Core)
    // ==========================================
    const convergenceGroup = new THREE.Group();
    scene.add(convergenceGroup);

    const convRingGeo = new THREE.TorusGeometry(3.0, 0.035, 16, 80);
    const convRingMat = new THREE.MeshBasicMaterial({ color: 0xFF5722, transparent: true, opacity: 0.5 });
    const convRing = new THREE.Mesh(convRingGeo, convRingMat);
    convergenceGroup.add(convRing);

    const convRingGeo2 = new THREE.TorusGeometry(4.0, 0.03, 16, 80);
    const convRingMat2 = new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.4 });
    const convRing2 = new THREE.Mesh(convRingGeo2, convRingMat2);
    convRing2.rotation.x = Math.PI / 3;
    convergenceGroup.add(convRing2);

    const convRingGeo3 = new THREE.TorusGeometry(5.0, 0.025, 16, 80);
    const convRingMat3 = new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.3 });
    const convRing3 = new THREE.Mesh(convRingGeo3, convRingMat3);
    convRing3.rotation.y = Math.PI / 3;
    convergenceGroup.add(convRing3);

    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xFF5722,
      emissive: 0xFF5722,
      emissiveIntensity: 0.45,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    convergenceGroup.add(coreMesh);

    // ==========================================
    // 9. AMBIENT BACKGROUND PARTICLES (Restrained, Text Safe Zone Enabled)
    // ==========================================
    const bgParticleCount = isMobile ? 35 : 85;
    const bgGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(bgParticleCount * 3);
    const bgBasePos = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount; i++) {
      const px = (Math.random() - 0.5) * 22;
      const py = (Math.random() - 0.5) * 16;
      const pz = (Math.random() - 0.5) * 14 - 2;
      bgPos[i * 3] = px;
      bgPos[i * 3 + 1] = py;
      bgPos[i * 3 + 2] = pz;
      bgBasePos[i * 3] = px;
      bgBasePos[i * 3 + 1] = py;
      bgBasePos[i * 3 + 2] = pz;
    }
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));

    const bgMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.035,
      color: 0x06B6D4,
      transparent: true,
      opacity: isMobile ? 0.35 : 0.25,
      blending: THREE.AdditiveBlending,
    });
    const bgParticles = new THREE.Points(bgGeo, bgMat);
    scene.add(bgParticles);

    // Mouse tracking with soft damping
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Viewport resize & adaptive composition handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const newAspect = width / height;
      const newMobile = width < 768;

      stateRef.current.isMobile = newMobile;
      stateRef.current.aspect = newAspect;

      camera.aspect = newAspect;
      camera.fov = newMobile ? (newAspect < 0.55 ? 60 : 56) : 48;
      camera.updateProjectionMatrix();

      cameraStops = getCameraStops(newMobile, newAspect);

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, newMobile ? 1.5 : 1.75));
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 10. MAIN ANIMATION & CONTINUOUS CAMERA LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const currentCamPos = camera.position.clone();
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();
    const currentPrimary = new THREE.Color(COLOR_STOPS[0].primary);
    const currentSecondary = new THREE.Color(COLOR_STOPS[0].secondary);
    const currentFog = new THREE.Color(COLOR_STOPS[0].fog);
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const mobile = stateRef.current.isMobile;

      // Mouse damping
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.05;
      const mx = stateRef.current.mouseX;
      const my = stateRef.current.mouseY;

      // Smooth continuous scroll progress interpolation across 7 worlds (0.0 to 6.0)
      stateRef.current.currentProgress +=
        (stateRef.current.targetProgress - stateRef.current.currentProgress) * 0.08;
      const u = Math.max(0, Math.min(stateRef.current.currentProgress, 6.0));
      const cap = stateRef.current.activeCapability;

      // 1. Spline Camera Calculation across 7 stops
      const k = Math.min(Math.floor(u), cameraStops.length - 2);
      const t = u - k;
      const smoothT = t * t * (3 - 2 * t);

      const stopA = cameraStops[k];
      const stopB = cameraStops[k + 1];

      targetCamPos.lerpVectors(stopA.pos, stopB.pos, smoothT);
      targetLookAt.lerpVectors(stopA.look, stopB.look, smoothT);

      // Parallax mouse damping
      targetCamPos.x += mx * (mobile ? 0.15 : 0.35);
      targetCamPos.y += my * (mobile ? 0.12 : 0.25);

      // PASSING THROUGH STRUCTURE MOMENT (At transition between World 4 and World 6, peaking at World 5)
      // When approaching the Transformation section (u = 4.6 to 5.4), camera glides directly
      // forward through the parting architectural gate!
      let morphIntensity = 0;
      if (u >= 4.5 && u <= 5.5) {
        const morphNorm = (u - 4.5) / 1.0;
        morphIntensity = Math.sin(morphNorm * Math.PI);
        // Camera glides through structure opening
        targetCamPos.z -= morphIntensity * (mobile ? 1.6 : 2.4);
      }

      currentCamPos.lerp(targetCamPos, 0.08);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      // 2. Continuous Color Transitions
      const colorA = COLOR_STOPS[k];
      const colorB = COLOR_STOPS[k + 1];
      currentPrimary.lerpColors(new THREE.Color(colorA.primary), new THREE.Color(colorB.primary), smoothT);
      currentSecondary.lerpColors(new THREE.Color(colorA.secondary), new THREE.Color(colorB.secondary), smoothT);
      currentFog.lerpColors(new THREE.Color(colorA.fog), new THREE.Color(colorB.fog), smoothT);

      // Endless Living Ambient Pulse at Convergence (u >= 5.6)
      if (u >= 5.6) {
        const cyclePhase = (elapsed * 0.06) % 1.0;
        const c1 = new THREE.Color(0xFF5722);
        const c2 = new THREE.Color(0xF59E0B);
        const c3 = new THREE.Color(0x06B6D4);
        let living = c1;
        if (cyclePhase < 0.33) living = c1.clone().lerp(c2, cyclePhase / 0.33);
        else if (cyclePhase < 0.66) living = c2.clone().lerp(c3, (cyclePhase - 0.33) / 0.33);
        else living = c3.clone().lerp(c1, (cyclePhase - 0.66) / 0.34);
        currentPrimary.lerp(living, 0.04);
      }

      keyLight.color.copy(currentPrimary);
      rimLight.color.copy(currentSecondary);
      if (scene.fog && 'color' in scene.fog) {
        scene.fog.color.copy(currentFog);
      }

      // 3. Overlapping World Weights
      const getWeight = (centerIdx: number, spread = 0.95) => {
        const dist = Math.abs(u - centerIdx);
        if (dist >= spread) return 0;
        return 0.5 * (1 + Math.cos((dist / spread) * Math.PI));
      };

      const w0 = getWeight(0); // Hero
      const w1 = getWeight(1); // Problem
      const w2 = getWeight(2); // Capabilities
      const w3 = getWeight(3); // Architecture
      const w4 = getWeight(4); // Work
      const w5 = getWeight(5); // Transformation Morph
      const w6 = getWeight(6); // Convergence

      // Group Visibilities
      monumentGroup.visible = w0 > 0.01;
      problemGroup.visible = w1 > 0.01;
      capabilityGroup.visible = w2 > 0.01;
      architectureGroup.visible = w3 > 0.01;
      workGroup.visible = w4 > 0.01;
      morphGroup.visible = (w4 > 0.01 || w5 > 0.01 || morphIntensity > 0.01);
      convergenceGroup.visible = w6 > 0.01;

      // 4. Autonomous Restrained Movement & Interactive Behaviors

      // World 0: Hero Monument
      if (monumentGroup.visible) {
        monumentOuter.rotation.x += 0.0025;
        monumentOuter.rotation.y += 0.004;
        monumentInner.rotation.x -= 0.005;
        monumentInner.rotation.y -= 0.007;
        monumentSeed.rotation.y += 0.01;
        ring1.rotation.z += 0.0035;
        ring2.rotation.z -= 0.0035;

        outerMat.opacity = 0.65 * w0;
        innerMat.opacity = 0.9 * w0;
        seedMat.opacity = 0.85 * w0;
        ringMat1.opacity = 0.4 * w0;
        ringMat2.opacity = 0.35 * w0;
      }

      // World 1: Problem
      if (problemGroup.visible) {
        redCube.rotation.x += 0.006;
        redCube.rotation.y += 0.005;
        blueCube.rotation.x -= 0.005;
        blueCube.rotation.y -= 0.006;
        tensionMesh.rotation.z = Math.sin(elapsed * 0.5) * 0.05;

        redMat.opacity = 0.7 * w1;
        blueMat.opacity = 0.7 * w1;
        tensionMat.opacity = 0.5 * w1;
      }

      // World 2: Capabilities
      if (capabilityGroup.visible) {
        capNodes.forEach((node) => {
          node.rotation.x += 0.008;
          node.rotation.y += 0.012;
          const nodeMat = node.material as THREE.MeshStandardMaterial;
          nodeMat.opacity = 0.85 * w2;
        });

        focusMesh.rotation.x -= 0.004;
        focusMesh.rotation.y -= 0.006;
        focusMat.opacity = 0.75 * w2;

        if (cap) {
          focusMesh.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
          if (cap === 'ai-products') focusMat.color.setHex(0x8B5CF6);
          else if (cap === 'mobile-products') focusMat.color.setHex(0xFF5722);
          else if (cap === 'business-systems') focusMat.color.setHex(0x2563EB);
          else focusMat.color.setHex(0x06B6D4);
        } else {
          focusMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
          focusMat.color.setHex(0x06B6D4);
        }
      }

      // World 3: Architecture
      if (architectureGroup.visible) {
        pillarBeams.forEach((b, idx) => {
          const bMat = b.material as THREE.MeshStandardMaterial;
          bMat.opacity = 0.8 * w3;
          b.rotation.z = (idx % 2 === 0 ? 0.06 : -0.06) + Math.sin(elapsed * 0.35 + idx) * 0.018;
        });
        archMat.opacity = 0.65 * w3;
      }

      // World 4: Work (Silk & Logistics)
      if (workGroup.visible) {
        silkPlanes.forEach((p, idx) => {
          p.position.y += Math.sin(elapsed * 0.7 + idx) * 0.003;
          p.rotation.y = 0.26 * (idx - 2) + Math.sin(elapsed * 0.35 + idx) * 0.04;
          const mat = p.material as THREE.MeshStandardMaterial;
          mat.opacity = 0.45 * w4;
        });

        curveMat.opacity = 0.7 * w4;
        const packetT = (elapsed * 0.3) % 1;
        const pt = logisticsCurve.getPoint(packetT);
        packetMesh.position.copy(pt);
      }

      // World 5: SIGNATURE DIMENSIONAL WORLD MORPH (Deconstruct, Part & Reassemble)
      if (morphGroup.visible) {
        const morphWeight = Math.max(w5, morphIntensity, w4 * 0.85);

        // A. Portals Part Outward (Creating the gap camera flies through)
        const partDistance = morphWeight * (mobile ? 1.8 : 2.8);
        leftWing.position.x = -partDistance;
        rightWing.position.x = partDistance;

        // B. Cantilever Lintel rises and pivots
        lintelBeam.position.y = 2.9 + morphWeight * 1.5;
        lintelBeam.rotation.z = Math.sin(elapsed * 0.4) * 0.06;

        wingMat.opacity = 0.75 * morphWeight;
        lintelMat.opacity = 0.75 * morphWeight;

        // C. Flowing 3D Ribbons sweep past the camera
        ribbonMeshes.forEach((rm, idx) => {
          rm.rotation.z = elapsed * 0.15 + (idx * Math.PI) / ribbonCount;
          const rMat = ribbonMaterials[idx];
          rMat.opacity = 0.65 * morphWeight;
        });

        // D. Internal Reassembly Core
        morphCore.rotation.x += 0.006;
        morphCore.rotation.y += 0.01;
        morphCore.scale.setScalar(0.8 + morphWeight * 0.6);
        morphCoreMat.opacity = 0.8 * morphWeight;
      }

      // World 6: Convergence Core
      if (convergenceGroup.visible) {
        convRing.rotation.z += 0.005;
        convRingMat.opacity = 0.5 * w6;

        convRing2.rotation.y += 0.007;
        convRing2.rotation.x += 0.0035;
        convRingMat2.opacity = 0.4 * w6;

        convRing3.rotation.z -= 0.0045;
        convRingMat3.opacity = 0.3 * w6;

        coreMesh.rotation.x += 0.007;
        coreMesh.rotation.y += 0.01;
        coreMat.opacity = 0.7 * w6;
      }

      // 5. RESTRAINED AMBIENT PARTICLES & DYNAMIC TEXT SAFE ZONE
      const bgPosAttr = bgGeo.attributes.position as THREE.BufferAttribute;
      const bgPosArr = bgPosAttr.array as Float32Array;

      for (let i = 0; i < bgParticleCount; i++) {
        bgBasePos[i * 3 + 1] += 0.0018;
        if (bgBasePos[i * 3 + 1] > 8) bgBasePos[i * 3 + 1] = -8;

        tempVec.set(bgBasePos[i * 3], bgBasePos[i * 3 + 1], bgBasePos[i * 3 + 2]);
        tempVec.project(camera);

        // Safe zone avoidance: steer away from typography region
        const inSafeZone = tempVec.x > -0.85 && tempVec.x < 0.25 && tempVec.y > -0.75 && tempVec.y < 0.75;
        if (inSafeZone) {
          bgPosArr[i * 3] += (bgBasePos[i * 3] + 2.8 - bgPosArr[i * 3]) * 0.05;
        } else {
          bgPosArr[i * 3] += (bgBasePos[i * 3] - bgPosArr[i * 3]) * 0.05;
        }
        bgPosArr[i * 3 + 1] = bgBasePos[i * 3 + 1];
        bgPosArr[i * 3 + 2] = bgBasePos[i * 3 + 2];
      }
      bgPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-0 bg-[#070A12] pointer-events-none" />
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 1 }}
    />
  );
};

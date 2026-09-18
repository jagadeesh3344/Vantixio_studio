import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type WorldSection =
  | 'hero'
  | 'services'
  | 'ashtonava'
  | 'yesdhobi'
  | 'process'
  | 'about'
  | 'contact';

export interface VantixioWorldProps {
  activeSection?: WorldSection;
  continuousProgress?: number; // 0.0 (Hero) to 6.0 (Contact)
  sectionProgress?: number;
  globalScrollProgress?: number;
  activeCapability?: string | null;
  formSubmitted?: boolean;
  reducedMotion?: boolean;
}

// 7 continuous world color signatures (RGB hex)
const COLOR_STOPS = [
  { primary: 0x19D3E6, secondary: 0xFF5722, fog: 0x070A12 }, // 0: Hero (Cyan + Flame Coral)
  { primary: 0x06B6D4, secondary: 0x3B82F6, fog: 0x060913 }, // 1: Services (Electric Cyan + Cobalt)
  { primary: 0xF59E0B, secondary: 0xD97706, fog: 0x09090E }, // 2: Ashtonava (Champagne Gold + Amber) [Work 1]
  { primary: 0x10B981, secondary: 0x06B6D4, fog: 0x050C16 }, // 3: YesDhobi (Emerald + Cyan) [Work 2]
  { primary: 0xFF5722, secondary: 0x2563EB, fog: 0x080C18 }, // 4: Process (Flame + Royal Blue)
  { primary: 0x94A3B8, secondary: 0x38BDF8, fog: 0x050811 }, // 5: About (Slate + Celestial Sky)
  { primary: 0xFF5722, secondary: 0xF59E0B, fog: 0x080A14 }, // 6: Contact (Coral + Gold Convergence)
];

// Continuous 3D camera spline positions across the 7-state journey
const CAMERA_STOPS = [
  { pos: new THREE.Vector3(0, 0, 9.2), look: new THREE.Vector3(0, 0, 0) },         // 0: Hero
  { pos: new THREE.Vector3(0.7, -0.25, 7.2), look: new THREE.Vector3(0.2, 0, 0) },  // 1: Services
  { pos: new THREE.Vector3(-1.0, 0.25, 6.4), look: new THREE.Vector3(-0.2, 0, 0) },// 2: Ashtonava
  { pos: new THREE.Vector3(0.6, -0.3, 6.8), look: new THREE.Vector3(0.2, 0, 0) },   // 3: YesDhobi
  { pos: new THREE.Vector3(0, -0.25, 7.2), look: new THREE.Vector3(0, 0, 0) },      // 4: Process
  { pos: new THREE.Vector3(0.25, 0.08, 8.0), look: new THREE.Vector3(0, 0, 0) },   // 5: About
  { pos: new THREE.Vector3(0, 0, 7.8), look: new THREE.Vector3(0, 0, 0) },          // 6: Contact
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
  });

  // Synchronize incoming props to animation state
  useEffect(() => {
    stateRef.current.activeSection = activeSection;
    stateRef.current.targetProgress = Math.max(0, Math.min(continuousProgress, 7));
    stateRef.current.sectionProgress = sectionProgress;
    stateRef.current.globalScrollProgress = globalScrollProgress;
    stateRef.current.activeCapability = activeCapability;
    stateRef.current.formSubmitted = formSubmitted;
    stateRef.current.reducedMotion = reducedMotion;
  }, [activeSection, continuousProgress, sectionProgress, globalScrollProgress, activeCapability, formSubmitted, reducedMotion]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    stateRef.current.isMobile = isMobile;

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

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLOR_STOPS[0].fog, 0.055);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.copy(CAMERA_STOPS[0].pos);

    // ==========================================
    // 1. LIGHTING SYSTEM (Continuously Evolving)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0e172a, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(COLOR_STOPS[0].primary, 3.2, 28);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(COLOR_STOPS[0].secondary, 2.6, 24);
    rimLight.position.set(-5, -4, 4);
    scene.add(rimLight);

    const accentLight = new THREE.DirectionalLight(0xffffff, 0.85);
    accentLight.position.set(0, 8, 2);
    scene.add(accentLight);

    // ==========================================
    // 2. HERO: TECH MONUMENT (World 0)
    // ==========================================
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);

    const outerGeo = new THREE.IcosahedronGeometry(2.0, isMobile ? 0 : 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x121A2A,
      roughness: 0.25,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const monumentOuter = new THREE.Mesh(outerGeo, outerMat);
    monumentGroup.add(monumentOuter);

    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x070B14,
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0x062235,
      emissiveIntensity: 0.35,
    });
    const monumentInner = new THREE.Mesh(innerGeo, innerMat);
    monumentGroup.add(monumentInner);

    const seedGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const seedMat = new THREE.MeshBasicMaterial({
      color: 0xFF5722,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const monumentSeed = new THREE.Mesh(seedGeo, seedMat);
    monumentGroup.add(monumentSeed);

    const ringGeo1 = new THREE.RingGeometry(3.0, 3.03, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x19D3E6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    monumentGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(3.6, 3.63, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xFF5722,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    monumentGroup.add(ring2);

    // ==========================================
    // 3. SERVICES: TECHNOLOGY NETWORK GRID (World 1)
    // ==========================================
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    networkGroup.position.set(0, 0, -1.5);

    const nodeCount = isMobile ? 22 : 36;
    const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
    const nodeInst = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);

    const nodePositions: THREE.Vector3[] = [];
    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6 - 1.5;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      nodeInst.setMatrixAt(i, dummy.matrix);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }
    nodeInst.instanceMatrix.needsUpdate = true;
    networkGroup.add(nodeInst);

    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 3.2) {
          lineIndices.push(i, j);
        }
      }
    }
    const linePositions = new Float32Array(lineIndices.length * 3);
    for (let i = 0; i < lineIndices.length; i++) {
      const pos = nodePositions[lineIndices[i]];
      linePositions[i * 3] = pos.x;
      linePositions[i * 3 + 1] = pos.y;
      linePositions[i * 3 + 2] = pos.z;
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1E293B,
      transparent: true,
      opacity: 0.45,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    networkGroup.add(networkLines);

    // Capability focal holographic preview shape
    const capabilityFocusGroup = new THREE.Group();
    networkGroup.add(capabilityFocusGroup);
    capabilityFocusGroup.position.set(2.8, 0, 1.5);
    const focusGeo = new THREE.TorusGeometry(0.7, 0.04, 16, 64);
    const focusMat = new THREE.MeshBasicMaterial({
      color: 0x19D3E6,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    const focusMesh = new THREE.Mesh(focusGeo, focusMat);
    capabilityFocusGroup.add(focusMesh);

    // ==========================================
    // 4. ASHTONAVA: LUXURY COMMERCE SHIMMER PLANES (World 2)
    // ==========================================
    const luxuryGroup = new THREE.Group();
    scene.add(luxuryGroup);

    const luxuryPlanes: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const planeGeo = new THREE.PlaneGeometry(3.5, 4.8);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0x17120D,
        metalness: 0.85,
        roughness: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.position.set((i - 2) * 2.2, (i % 2 === 0 ? 0.4 : -0.4), -i * 1.2);
      plane.rotation.y = 0.25 * (i - 2);
      luxuryGroup.add(plane);
      luxuryPlanes.push(plane);
    }

    // ==========================================
    // 5. SIGNATURE DIMENSIONAL PASSAGE: BLACK HOLE & GRAVITATIONAL ACCRETION VORTEX (Transition 1 -> 2: INTO WORK)
    // ==========================================
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);
    blackHoleGroup.position.set(0, 0, 1.0);

    // Dark Event Horizon Sphere (Gravitational Singularity)
    const horizonGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x010204,
    });
    const eventHorizon = new THREE.Mesh(horizonGeo, horizonMat);
    blackHoleGroup.add(eventHorizon);

    // Relativistic Lensed Photon Ring (Intense Glowing Rim)
    const photonRingGeo = new THREE.TorusGeometry(1.28, 0.05, 16, 64);
    const photonRingMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
    photonRing.rotation.x = Math.PI / 2.8;
    blackHoleGroup.add(photonRing);

    // Tilted Gravitational Accretion Disc Rings
    const accretionRings: THREE.Mesh[] = [];
    const ringColors = [0xF59E0B, 0xD97706, 0x06B6D4, 0x19D3E6];
    for (let i = 0; i < 4; i++) {
      const aRingGeo = new THREE.RingGeometry(1.5 + i * 0.55, 1.58 + i * 0.55, 64);
      const aRingMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
      });
      const aRing = new THREE.Mesh(aRingGeo, aRingMat);
      aRing.rotation.x = Math.PI / 2.6 + (i * 0.04);
      blackHoleGroup.add(aRing);
      accretionRings.push(aRing);
    }

    // High-speed relativistic warp jet streaks oriented along Z
    const streakCount = isMobile ? 32 : 72;
    const streakGeo = new THREE.BufferGeometry();
    const streakPos = new Float32Array(streakCount * 2 * 3);
    for (let i = 0; i < streakCount; i++) {
      const angle = (i / streakCount) * Math.PI * 2;
      const radius = 1.3 + (Math.random() - 0.5) * 1.6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const zStart = (Math.random() - 0.5) * 18;
      const zLength = 2.8 + Math.random() * 4.5;

      streakPos[i * 6] = x;
      streakPos[i * 6 + 1] = y;
      streakPos[i * 6 + 2] = zStart;

      streakPos[i * 6 + 3] = x * 1.2;
      streakPos[i * 6 + 4] = y * 1.2;
      streakPos[i * 6 + 5] = zStart - zLength;
    }
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3));
    const streakMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const streakLines = new THREE.LineSegments(streakGeo, streakMat);
    blackHoleGroup.add(streakLines);

    // Accretion particle vortex spiral (particles orbiting the black hole)
    const vortexParticleCount = isMobile ? 60 : 140;
    const vortexGeo = new THREE.BufferGeometry();
    const vortexPositions = new Float32Array(vortexParticleCount * 3);
    const vortexRadii = new Float32Array(vortexParticleCount);
    const vortexAngles = new Float32Array(vortexParticleCount);
    const vortexSpeeds = new Float32Array(vortexParticleCount);

    for (let i = 0; i < vortexParticleCount; i++) {
      const r = 1.4 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      vortexRadii[i] = r;
      vortexAngles[i] = angle;
      vortexSpeeds[i] = (0.02 + 0.04 / Math.sqrt(r)); // Keplerian differential rotation
      vortexPositions[i * 3] = Math.cos(angle) * r;
      vortexPositions[i * 3 + 1] = Math.sin(angle) * r * 0.45; // Flattened disc
      vortexPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
    const vortexMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.065,
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const vortexParticles = new THREE.Points(vortexGeo, vortexMat);
    blackHoleGroup.add(vortexParticles);

    // ==========================================
    // 6. YESDHOBI: BUSINESS OPERATIONS & LOGISTICS (World 3)
    // ==========================================
    const logisticsGroup = new THREE.Group();
    scene.add(logisticsGroup);

    const stations = [
      { name: 'Customer', x: -5, y: 1.2 },
      { name: 'Booking', x: -2.5, y: -0.8 },
      { name: 'Pickup', x: 0, y: 1.4 },
      { name: 'Processing', x: 2.5, y: -0.6 },
      { name: 'Delivery', x: 5, y: 1.0 },
    ];
    stations.forEach((st) => {
      const stGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.12, 24);
      const stMat = new THREE.MeshStandardMaterial({
        color: 0x052E2B,
        emissive: 0x10B981,
        emissiveIntensity: 0.5,
        wireframe: true,
      });
      const stMesh = new THREE.Mesh(stGeo, stMat);
      stMesh.position.set(st.x, st.y, -1);
      stMesh.rotation.x = Math.PI / 4;
      logisticsGroup.add(stMesh);
    });

    const curvePoints = stations.map((s) => new THREE.Vector3(s.x, s.y, -1));
    const logisticsCurve = new THREE.CatmullRomCurve3(curvePoints);
    const curveGeo = new THREE.TubeGeometry(logisticsCurve, 64, 0.03, 8, false);
    const curveMat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.7 });
    const curveMesh = new THREE.Mesh(curveGeo, curveMat);
    logisticsGroup.add(curveMesh);

    // Dynamic moving operational data packet along conveyor
    const packetGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);
    logisticsGroup.add(packetMesh);

    // ==========================================
    // 7. PROCESS: ENGINEERING CONSTRUCTION WORLD (World 4)
    // ==========================================
    const processGroup = new THREE.Group();
    scene.add(processGroup);

    const trussBeams: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const beamGeo = new THREE.BoxGeometry(0.12, 4.5, 0.12);
      const beamMat = new THREE.MeshStandardMaterial({
        color: 0x1E293B,
        metalness: 0.85,
        roughness: 0.3,
        wireframe: true,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set((i - 2.5) * 1.8, 0, -i * 0.8);
      beam.rotation.z = i % 2 === 0 ? 0.3 : -0.3;
      processGroup.add(beam);
      trussBeams.push(beam);
    }

    // ==========================================
    // 9. ABOUT: MINIMAL PURPOSE SCULPTURE (World 6)
    // ==========================================
    const aboutGroup = new THREE.Group();
    scene.add(aboutGroup);

    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.35, 128, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x0B1220,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    aboutGroup.add(knotMesh);

    // ==========================================
    // 10. CONTACT: CONVERGENCE FOCAL SYSTEM (World 7)
    // ==========================================
    const contactGroup = new THREE.Group();
    scene.add(contactGroup);

    const convRingGeo = new THREE.RingGeometry(2.4, 2.45, 64);
    const convRingMat = new THREE.MeshBasicMaterial({
      color: 0xFF5722,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const convRing = new THREE.Mesh(convRingGeo, convRingMat);
    convRing.rotation.x = Math.PI / 3;
    contactGroup.add(convRing);

    // ==========================================
    // 11. GLOBAL PERSISTENT PARTICLES (Drifting through universe)
    // ==========================================
    const particleCount = isMobile ? 120 : 300;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 22;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 1;

      particleVel[i * 3] = (Math.random() - 0.5) * 0.008;
      particleVel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      particleVel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.055,
      color: COLOR_STOPS[0].primary,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // EVENT LISTENERS: MOUSE & RESIZE
    // ==========================================
    const onMouseMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      stateRef.current.isMobile = width < 768;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    // ==========================================
    // 12. CONTINUOUS ANIMATION & CAMERA MOTION LOOP
    // ==========================================
    let animId: number;
    const clock = new THREE.Clock();

    const currentLookAt = new THREE.Vector3().copy(CAMERA_STOPS[0].look);
    const targetLookAt = new THREE.Vector3();
    const interpolatedCamPos = new THREE.Vector3();

    // Reusable color vectors for zero garbage collection
    const currentPrimary = new THREE.Color();
    const currentSecondary = new THREE.Color();
    const currentFog = new THREE.Color();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const {
        targetProgress,
        activeCapability: cap,
        formSubmitted: submitted,
        reducedMotion: noMotion,
        isMobile: mobileDevice,
      } = stateRef.current;

      // 1. Smooth Camera Inertia & Progress Damping
      // The camera moves with physical momentum, subtle lag, and spring damping
      const damping = noMotion ? 0.2 : 0.055;
      stateRef.current.currentProgress += (targetProgress - stateRef.current.currentProgress) * damping;
      const u = stateRef.current.currentProgress;

      // Mouse smoothing
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.05;
      const mx = stateRef.current.mouseX;
      const my = stateRef.current.mouseY;

      // 2. Interpolate Continuous Camera Position along 3D Spline
      const k = Math.min(Math.floor(u), CAMERA_STOPS.length - 2);
      const t = u - k;
      const stopA = CAMERA_STOPS[k];
      const stopB = CAMERA_STOPS[k + 1];

      interpolatedCamPos.lerpVectors(stopA.pos, stopB.pos, t);
      targetLookAt.lerpVectors(stopA.look, stopB.look, t);

      // Autonomous subtle breathing motion (even when user stops scrolling, the world lives)
      const breathingFactor = noMotion ? 0 : 1.0;
      const breathX = Math.sin(elapsed * 0.4) * 0.08 * breathingFactor;
      const breathY = Math.cos(elapsed * 0.5) * 0.06 * breathingFactor;
      const parallax = noMotion ? 0 : (mobileDevice ? 0.2 : 0.45);

      // THE SIGNATURE MOMENT: Gravitational plunge along Z during Black Hole Singularity passage (u in [1.2, 1.9])
      let warpSurgeZ = 0;
      if (u >= 1.2 && u <= 1.9) {
        const warpProg = (u - 1.2) / 0.7; // 0 to 1
        warpSurgeZ = Math.sin(warpProg * Math.PI) * -2.6; // Gravitational acceleration plunge into the event horizon
      }

      camera.position.x = interpolatedCamPos.x + mx * parallax + breathX;
      camera.position.y = interpolatedCamPos.y - my * parallax * 0.6 + breathY;
      camera.position.z = interpolatedCamPos.z + warpSurgeZ;

      currentLookAt.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      // 3. Continuous Color Transitions
      const colorA = COLOR_STOPS[k];
      const colorB = COLOR_STOPS[k + 1];
      currentPrimary.lerpColors(new THREE.Color(colorA.primary), new THREE.Color(colorB.primary), t);
      currentSecondary.lerpColors(new THREE.Color(colorA.secondary), new THREE.Color(colorB.secondary), t);
      currentFog.lerpColors(new THREE.Color(colorA.fog), new THREE.Color(colorB.fog), t);

      keyLight.color.copy(currentPrimary);
      rimLight.color.copy(currentSecondary);
      particleMat.color.copy(currentPrimary);
      if (scene.fog && 'color' in scene.fog) {
        scene.fog.color.copy(currentFog);
      }

      // Dynamic light movement
      keyLight.position.x = 4 + mx * 1.5 + Math.sin(elapsed * 0.5);
      keyLight.position.y = 5 - my * 1.5 + Math.cos(elapsed * 0.5);

      // 4. Overlapping Multi-World Blending
      // Each environment's weight is a smooth continuous Gaussian/bell function centered at its index.
      const getWeight = (centerIdx: number, spread = 0.95) => {
        const dist = Math.abs(u - centerIdx);
        if (dist >= spread) return 0;
        return 0.5 * (1 + Math.cos((dist / spread) * Math.PI));
      };

      const w0 = getWeight(0); // Hero Monument
      const w1 = getWeight(1); // Services Network
      const w2 = getWeight(2); // Ashtonava Luxury (Work 1)
      const w3 = getWeight(3); // YesDhobi Logistics (Work 2)
      const w4 = getWeight(4); // Process Engineering
      const w5 = getWeight(5); // About Minimal
      const w6 = getWeight(6); // Contact Convergence

      // Signature Black Hole Transition Weight (peaks at u = 1.55, right between Services and Ashtonava)
      const blackHoleWeight = Math.max(0, 1 - Math.abs(u - 1.55) / 0.55);

      // Visibility toggling based on smooth threshold
      monumentGroup.visible = w0 > 0.01;
      networkGroup.visible = w1 > 0.01 || blackHoleWeight > 0.05;
      blackHoleGroup.visible = blackHoleWeight > 0.01;
      luxuryGroup.visible = w2 > 0.01;
      logisticsGroup.visible = w3 > 0.01;
      processGroup.visible = w4 > 0.01;
      aboutGroup.visible = w5 > 0.01;
      contactGroup.visible = w6 > 0.01;

      // Update materials and positions with smooth weights
      // World 0: Hero Monument
      if (monumentGroup.visible) {
        monumentOuter.rotation.y += 0.003;
        monumentOuter.rotation.x += 0.0015;
        monumentInner.rotation.y -= 0.005;
        monumentSeed.rotation.z += 0.008;

        const pulse = 1 + Math.sin(elapsed * 2) * 0.04;
        monumentSeed.scale.set(pulse, pulse, pulse);
        ring1.rotation.z += 0.002;
        ring2.rotation.z -= 0.0025;

        // When scrolling toward Services, monument separates into network
        const sep = 1 + Math.max(0, u) * 0.8;
        monumentOuter.scale.set(sep, sep, sep);
        outerMat.opacity = 0.55 * w0;
        seedMat.opacity = 0.75 * w0;
        ringMat1.opacity = 0.35 * w0;
        ringMat2.opacity = 0.3 * w0;
      }

      // World 1: Technology Network
      if (networkGroup.visible) {
        networkGroup.rotation.y = Math.sin(elapsed * 0.1) * 0.08;
        lineMat.opacity = 0.45 * w1;

        // When Black Hole approaches, network lines stretch and bend toward the singularity
        if (blackHoleWeight > 0.02) {
          const stretch = 1 + blackHoleWeight * 0.6;
          networkGroup.scale.set(1 - blackHoleWeight * 0.3, 1 - blackHoleWeight * 0.3, stretch);
        } else {
          networkGroup.scale.set(1, 1, 1);
        }

        focusMesh.rotation.x += 0.01;
        focusMesh.rotation.y += 0.015;
        if (cap) {
          focusMesh.scale.lerp(new THREE.Vector3(1.7, 1.7, 1.7), 0.1);
          if (cap === 'ai-products') focusMat.color.setHex(0x8B5CF6);
          else if (cap === 'mobile-products') focusMat.color.setHex(0xFF5722);
          else if (cap === 'business-systems') focusMat.color.setHex(0x2563EB);
          else focusMat.color.setHex(0x06B6D4);
        } else {
          focusMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
          focusMat.color.setHex(0x06B6D4);
        }
      }

      // SIGNATURE BLACK HOLE & ACCRETION SINGULARITY TRANSITION (1 -> 2: Into Work)
      if (blackHoleGroup.visible) {
        // Horizon gravitational pulse
        const horizonPulse = 1 + Math.sin(elapsed * 3.5) * 0.04;
        eventHorizon.scale.set(horizonPulse, horizonPulse, horizonPulse);

        // Glowing photon ring
        photonRingMat.opacity = blackHoleWeight * 0.95;
        photonRing.rotation.z += 0.025;

        // Accretion rings rotate with differential Keplerian speeds
        accretionRings.forEach((r, idx) => {
          const rMat = r.material as THREE.MeshBasicMaterial;
          rMat.opacity = blackHoleWeight * (0.8 - idx * 0.12);
          r.rotation.z += 0.025 * (idx % 2 === 0 ? 1 : -1) * (2.0 - idx * 0.3);
          const rScale = 1 + Math.sin(elapsed * 2.5 + idx) * 0.08;
          r.scale.set(rScale, rScale, rScale);
        });

        // Relativistic warp streaks shooting forward
        streakMat.opacity = blackHoleWeight * 0.85;
        const sArr = streakGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < streakCount; i++) {
          sArr[i * 6 + 2] += 0.35;
          sArr[i * 6 + 5] += 0.35;
          if (sArr[i * 6 + 2] > 9) {
            sArr[i * 6 + 2] = -7;
            sArr[i * 6 + 5] = -11;
          }
        }
        streakGeo.attributes.position.needsUpdate = true;

        // Swirling accretion vortex particles
        vortexMat.opacity = blackHoleWeight * 0.92;
        const vPos = vortexGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < vortexParticleCount; i++) {
          vortexAngles[i] += vortexSpeeds[i] * (1 + blackHoleWeight * 2.0);
          const r = vortexRadii[i];
          vPos[i * 3] = Math.cos(vortexAngles[i]) * r;
          vPos[i * 3 + 1] = Math.sin(vortexAngles[i]) * r * 0.45;
        }
        vortexGeo.attributes.position.needsUpdate = true;
      }

      // World 2: Ashtonava Luxury Shimmer Silk
      if (luxuryGroup.visible) {
        const unfold = Math.min(1, Math.max(0.2, (u - 1.5) / 0.5));
        luxuryPlanes.forEach((p, idx) => {
          p.position.y += Math.sin(elapsed * 0.8 + idx) * 0.0025;
          p.rotation.y = 0.25 * (idx - 2) * unfold + Math.sin(elapsed * 0.4 + idx) * 0.06;
          p.scale.set(unfold, unfold, unfold);
          const mat = p.material as THREE.MeshStandardMaterial;
          mat.opacity = 0.35 * w2;
        });
      }

      // World 3: YesDhobi Operations & Logistics
      if (logisticsGroup.visible) {
        curveMesh.rotation.z = Math.sin(elapsed * 0.2) * 0.02;
        curveMat.opacity = 0.7 * w3;

        // Animate operational packet flowing along conveyor path
        const packetT = (elapsed * 0.35) % 1;
        const pt = logisticsCurve.getPoint(packetT);
        packetMesh.position.copy(pt);
      }

      // World 4: Process Construction Engineering
      if (processGroup.visible) {
        trussBeams.forEach((b, idx) => {
          const bMat = b.material as THREE.MeshStandardMaterial;
          bMat.opacity = 0.8 * w4;
          b.rotation.z = (idx % 2 === 0 ? 0.3 : -0.3) + Math.sin(elapsed * 0.5 + idx) * 0.03;
        });
      }

      // World 5: About Minimal Sculpture
      if (aboutGroup.visible) {
        knotMesh.rotation.x += 0.002;
        knotMesh.rotation.y += 0.003;
        knotMat.opacity = 0.45 * w5;
      }

      // World 6: Contact Convergence Vortex
      if (contactGroup.visible) {
        convRing.rotation.z += 0.006;
        convRingMat.opacity = 0.4 * w6;
      }

      // 5. Global Autonomous Particles Animation with Gravitational Distortion
      const pAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const pArr = pAttr.array as Float32Array;
      const speedMod = noMotion ? 0.2 : submitted ? 0.05 : (w6 > 0.5 ? 1.9 : 1.0);

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pArr[idx] += particleVel[idx] * speedMod;
        pArr[idx + 1] += particleVel[idx + 1] * speedMod;
        pArr[idx + 2] += particleVel[idx + 2] * speedMod;

        // Gravitational Attraction toward Black Hole Singularity when transitioning into Work (blackHoleWeight > 0.02)
        if (blackHoleWeight > 0.02) {
          const dx = pArr[idx];
          const dy = pArr[idx + 1];
          const dz = pArr[idx + 2] - 1.0;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.4;
          const pullForce = (blackHoleWeight * 0.06) / (dist * 0.7);
          // Radial pull + accretion vortex twist
          pArr[idx] -= (dx / dist) * pullForce - (dy / dist) * pullForce * 0.5;
          pArr[idx + 1] -= (dy / dist) * pullForce + (dx / dist) * pullForce * 0.5;
          pArr[idx + 2] -= (dz / dist) * pullForce;
        }

        // Convergence mode when approaching Contact (w6 > 0.3)
        if (w6 > 0.3) {
          const convStrength = 0.015 * w6;
          pArr[idx] += (0 - pArr[idx]) * convStrength;
          pArr[idx + 1] += (0 - pArr[idx + 1]) * convStrength;
          pArr[idx + 2] += (0 - pArr[idx + 2]) * convStrength;
        }

        // Boundary wrapping keeps the world alive in all directions
        if (pArr[idx] > 12) pArr[idx] = -12;
        if (pArr[idx] < -12) pArr[idx] = 12;
        if (pArr[idx + 1] > 9) pArr[idx + 1] = -9;
        if (pArr[idx + 1] < -9) pArr[idx + 1] = 9;
        if (pArr[idx + 2] > 8) pArr[idx + 2] = -8;
        if (pArr[idx + 2] < -8) pArr[idx + 2] = 8;
      }
      pAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${
        webglSupported ? 'bg-[#070A12]' : 'bg-gradient-to-b from-[#070A12] via-[#090F1E] to-[#070A12]'
      }`}
      aria-hidden="true"
    />
  );
};

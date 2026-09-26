import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type WorldSection = 'hero' | 'idea' | 'capabilities' | 'work' | 'cta';

export interface VantixioWorldProps {
  activeSection?: WorldSection;
  continuousProgress?: number; // 0.0 (Hero) to 4.0 (Final CTA)
  sectionProgress?: number;
  globalScrollProgress?: number;
  activeCapability?: string | null;
  activeWorkProject?: 'ashtonava' | 'yesdhobi';
  formSubmitted?: boolean;
  reducedMotion?: boolean;
}

// 5 Continuous Color Environments: lighting, materials, atmosphere, reflections
const COLOR_STOPS = [
  { primary: 0x19D3E6, secondary: 0xFF5722, fog: 0x070A12, accent: 0x06B6D4 }, // 0: Hero (Cyan + Flame Coral)
  { primary: 0xF43F5E, secondary: 0x06B6D4, fog: 0x080A14, accent: 0x06B6D4 }, // 1: The Idea (Rigid Rose -> Adaptive Cyan)
  { primary: 0x06B6D4, secondary: 0x6366F1, fog: 0x060913, accent: 0x3B82F6 }, // 2: Capabilities (Electric Cyan + Indigo)
  { primary: 0xF59E0B, secondary: 0x10B981, fog: 0x080A12, accent: 0xF59E0B }, // 3: Work (Amber Gold + Emerald)
  { primary: 0xFF5722, secondary: 0xF59E0B, fog: 0x080A14, accent: 0x19D3E6 }, // 4: Final CTA (Coral + Amber Living Monolith)
];

export const VantixioWorld: React.FC<VantixioWorldProps> = ({
  activeSection = 'hero',
  continuousProgress = 0,
  sectionProgress = 0,
  globalScrollProgress = 0,
  activeCapability = null,
  activeWorkProject = 'ashtonava',
  formSubmitted = false,
  reducedMotion = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const stateRef = useRef({
    activeSection,
    continuousProgress,
    sectionProgress,
    globalScrollProgress,
    activeCapability,
    activeWorkProject,
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
    loadProgress: 0, // 0 -> 1 entrance assembly
  });

  useEffect(() => {
    stateRef.current.activeSection = activeSection;
    stateRef.current.targetProgress = Math.max(0, Math.min(continuousProgress, 4));
    stateRef.current.sectionProgress = sectionProgress;
    stateRef.current.globalScrollProgress = globalScrollProgress;
    stateRef.current.activeCapability = activeCapability;
    stateRef.current.activeWorkProject = activeWorkProject;
    stateRef.current.formSubmitted = formSubmitted;
    stateRef.current.reducedMotion = reducedMotion;
  }, [activeSection, continuousProgress, sectionProgress, globalScrollProgress, activeCapability, activeWorkProject, formSubmitted, reducedMotion]);

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
    renderer.toneMappingExposure = isMobile ? 1.35 : 1.25;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLOR_STOPS[0].fog, isMobile ? 0.042 : 0.048);

    // Dedicated Camera configuration for Desktop vs Portrait Mobile
    const initialFov = isMobile ? (aspect < 0.55 ? 58 : 54) : 46;
    const camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 100);

    const getCameraStops = (mobile: boolean, curAspect: number) => {
      if (mobile) {
        // MOBILE-FIRST: Closer camera distance and elevated Y so architectural structures
        // command 65-80% of upper visual screen with bold silhouettes above open text
        const yOffset = curAspect < 0.55 ? 0.52 : 0.38;
        const zScale = curAspect < 0.55 ? 0.85 : 0.92;
        return [
          { pos: new THREE.Vector3(0, yOffset, 6.4 * zScale), look: new THREE.Vector3(0, yOffset * 0.3, 0) },    // 0: Hero
          { pos: new THREE.Vector3(0, yOffset, 6.2 * zScale), look: new THREE.Vector3(0, yOffset * 0.3, 0) },    // 1: The Idea
          { pos: new THREE.Vector3(0, yOffset, 5.8 * zScale), look: new THREE.Vector3(0, yOffset * 0.2, 0) },    // 2: Capabilities
          { pos: new THREE.Vector3(0, yOffset, 5.6 * zScale), look: new THREE.Vector3(0, yOffset * 0.2, 0) },    // 3: Work
          { pos: new THREE.Vector3(0, yOffset, 6.0 * zScale), look: new THREE.Vector3(0, yOffset * 0.3, 0) },    // 4: Final CTA
        ];
      } else {
        // DESKTOP: Wide, cinematic architectural perspective with deep spatial volume
        return [
          { pos: new THREE.Vector3(0.65, 0.05, 8.2), look: new THREE.Vector3(0.15, 0, 0) }, // 0: Hero
          { pos: new THREE.Vector3(0, 0, 7.4), look: new THREE.Vector3(0, 0, 0) },           // 1: The Idea (Centered to inspect morph)
          { pos: new THREE.Vector3(0.55, 0.05, 7.3), look: new THREE.Vector3(0.18, 0, 0) },  // 2: Capabilities
          { pos: new THREE.Vector3(-0.5, 0.05, 7.0), look: new THREE.Vector3(-0.15, 0, 0) }, // 3: Work
          { pos: new THREE.Vector3(0, 0, 7.6), look: new THREE.Vector3(0, 0, 0) },           // 4: Final CTA
        ];
      }
    };

    let cameraStops = getCameraStops(isMobile, aspect);
    camera.position.copy(cameraStops[0].pos);
    camera.lookAt(cameraStops[0].look);

    // ==========================================
    // 1. LIGHTING (High-definition architectural illumination)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0a101f, isMobile ? 2.4 : 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(COLOR_STOPS[0].primary, isMobile ? 4.8 : 3.9, 34);
    keyLight.position.set(4.5, 5.5, 6.0);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(COLOR_STOPS[0].secondary, isMobile ? 3.8 : 3.1, 28);
    rimLight.position.set(-5.0, -4.0, 4.0);
    scene.add(rimLight);

    const topBeamLight = new THREE.DirectionalLight(0xffffff, 1.1);
    topBeamLight.position.set(0, 8.5, 3.5);
    scene.add(topBeamLight);

    // ==========================================
    // 2. PROCEDURAL ADAPTIVE ARCHITECTURAL SYSTEM
    // ONE living machine consisting of articulated modules, structural frames,
    // mechanical joints, layered surfaces, and dynamic conduits that assemble,
    // break apart, reorganize, and become something new across every scroll stop.
    // ==========================================
    const architecturalRoot = new THREE.Group();
    scene.add(architecturalRoot);

    const rootScale = isMobile ? 1.25 : 1.5;
    architecturalRoot.scale.set(rootScale, rootScale, rootScale);

    // Shared Architectural Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0D1628,
      metalness: 0.95,
      roughness: 0.16,
    });

    const frameCyanMat = new THREE.MeshStandardMaterial({
      color: 0x19D3E6,
      metalness: 0.88,
      roughness: 0.22,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    const frameCoralMat = new THREE.MeshStandardMaterial({
      color: 0xFF5722,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    const solidPanelMat = new THREE.MeshStandardMaterial({
      color: 0x142036,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    });

    const glassPanelMat = new THREE.MeshPhysicalMaterial({
      color: 0x06B6D4,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.65,
    });

    // ----------------------------------------------------
    // SYSTEM A: 24 ARTICULATED STRUCTURAL MODULES
    // These physically move, unlatch, slide, rotate, and reconfigure
    // ----------------------------------------------------
    interface ArchModule {
      group: THREE.Group;
      frame: THREE.Mesh;
      panel: THREE.Mesh;
      joint: THREE.Mesh;
      // Positional coordinates across 5 stages
      p0: THREE.Vector3; // Hero (Monument)
      r0: THREE.Euler;
      p1Rigid: THREE.Vector3; // The Idea (Standardized rigid orthogonal grid)
      p1Adapt: THREE.Vector3; // The Idea (Conformed adaptive hugging shape)
      r1Adapt: THREE.Euler;
      p2: THREE.Vector3; // Capabilities (6 Ecosystem branches)
      r2: THREE.Euler;
      p3Ashtonava: THREE.Vector3; // Work 1 (Sculptural luxury drape atelier)
      r3Ashtonava: THREE.Euler;
      p3YesDhobi: THREE.Vector3; // Work 2 (Industrial logistics coordinate matrix)
      r3YesDhobi: THREE.Euler;
      p4: THREE.Vector3; // Final CTA (Unified Monolithic Core)
      r4: THREE.Euler;
      branchIdx: number; // for capabilities hover
    }

    const archModules: ArchModule[] = [];
    const moduleCount = 24;

    const boxGeo = new THREE.BoxGeometry(0.85, 0.45, 0.12);
    const frameGeo = new THREE.BoxGeometry(0.9, 0.5, 0.14);
    const jointGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.55, 12);

    for (let i = 0; i < moduleCount; i++) {
      const modGrp = new THREE.Group();

      const panel = new THREE.Mesh(boxGeo, i % 2 === 0 ? solidPanelMat : glassPanelMat);
      const frame = new THREE.Mesh(frameGeo, i % 3 === 0 ? frameCoralMat : frameCyanMat);
      const joint = new THREE.Mesh(jointGeo, darkMetalMat);
      joint.rotation.z = Math.PI / 2;

      modGrp.add(panel);
      modGrp.add(frame);
      modGrp.add(joint);
      architecturalRoot.add(modGrp);

      // 1. Stage 0: Hero Monument (Geometric layered polyhedral architecture)
      const uAngle = (i / moduleCount) * Math.PI * 2;
      const radius0 = 1.9 + (i % 3) * 0.45;
      const p0 = new THREE.Vector3(
        Math.cos(uAngle) * radius0,
        Math.sin(uAngle) * radius0 * 0.85,
        ((i % 4) - 1.5) * 0.55
      );
      const r0 = new THREE.Euler(
        (i % 3) * 0.2,
        uAngle,
        uAngle + Math.PI / 4
      );

      // 2. Stage 1: The Idea (Starts as rigid locked orthogonal matrix)
      const col = i % 4;
      const row = Math.floor(i / 4) % 6;
      const p1Rigid = new THREE.Vector3(
        (col - 1.5) * 1.35,
        (row - 2.5) * 0.75,
        ((i % 2) - 0.5) * 0.6
      );

      // Adaptively reshaped (hugging the dynamic flowing workflow spline)
      const flowT = i / (moduleCount - 1);
      const waveX = (flowT - 0.5) * 5.2;
      const waveY = Math.sin(flowT * Math.PI * 2.5) * 1.6;
      const p1Adapt = new THREE.Vector3(
        waveX,
        waveY,
        Math.cos(flowT * Math.PI * 3) * 0.6
      );
      const r1Adapt = new THREE.Euler(
        0,
        0,
        Math.cos(flowT * Math.PI * 2.5) * 0.8
      );

      // 3. Stage 2: Capabilities (Distributed across 6 functional zones)
      const bIdx = i % 6; // 0: Web, 1: Mobile, 2: Business, 3: AI, 4: Integrations, 5: Automation
      let p2 = new THREE.Vector3();
      let r2 = new THREE.Euler();
      const subIdx = Math.floor(i / 6); // 0..3
      if (bIdx === 0) {
        // Web: Wide connected interface-like architectural surface
        p2.set(-2.2 + subIdx * 0.6, 1.4, (subIdx - 1.5) * 0.2);
        r2.set(0, 0.2, 0);
      } else if (bIdx === 1) {
        // Mobile: Compact responsive folding structure
        p2.set(2.2, 1.3 + (subIdx - 1.5) * 0.5, (subIdx - 1.5) * 0.3);
        r2.set(0.3, 0, 0);
      } else if (bIdx === 2) {
        // Business: Interlocking operational structural blocks
        p2.set(-2.2 + (subIdx % 2) * 0.8, -1.3 + Math.floor(subIdx / 2) * 0.8, 0);
        r2.set(0, 0, Math.PI / 2);
      } else if (bIdx === 3) {
        // AI: Dynamic predictive branching conduit
        p2.set(2.2 + (subIdx - 1.5) * 0.4, -1.3, (subIdx - 1.5) * 0.5);
        r2.set(0.4, 0.4, 0);
      } else if (bIdx === 4) {
        // Integrations: Bridge connection towers
        p2.set(0, 2.0 + (subIdx - 1.5) * 0.4, (subIdx - 1.5) * 0.4);
        r2.set(0, Math.PI / 4, 0);
      } else {
        // Automation: Precision assembly line
        p2.set((subIdx - 1.5) * 1.1, -2.1, 0);
        r2.set(Math.PI / 4, 0, 0);
      }

      // 4. Stage 3: Work
      // Ashtonava (Sculptural luxury couture atelier - smooth organic draping flow)
      const ashAngle = (i / moduleCount) * Math.PI * 2;
      const p3Ashtonava = new THREE.Vector3(
        Math.cos(ashAngle) * 2.2 + (i % 2) * 0.4,
        (i - moduleCount / 2) * 0.16 + Math.sin(ashAngle * 2) * 0.6,
        Math.sin(ashAngle) * 1.5
      );
      const r3Ashtonava = new THREE.Euler(
        0.3 * Math.sin(ashAngle),
        ashAngle,
        0.4 * Math.cos(ashAngle)
      );

      // YesDhobi (Industrial logistics matrix - coordinated multi-node routing lines)
      const p3YesDhobi = new THREE.Vector3(
        ((i % 6) - 2.5) * 0.95,
        (Math.floor(i / 6) - 1.5) * 1.1,
        ((i % 3) - 1) * 0.65
      );
      const r3YesDhobi = new THREE.Euler(
        0,
        (i % 2 === 0 ? 0 : Math.PI / 2),
        0
      );

      // 5. Stage 4: Final CTA (Converged monolithic unified system)
      const ctaRadius = 1.35 + (i % 3) * 0.35;
      const ctaPhi = (i / moduleCount) * Math.PI * 2;
      const p4 = new THREE.Vector3(
        Math.cos(ctaPhi) * ctaRadius,
        ((i % 6) - 2.5) * 0.45,
        Math.sin(ctaPhi) * ctaRadius
      );
      const r4 = new THREE.Euler(
        0,
        ctaPhi + Math.PI / 2,
        (i % 2 === 0 ? 0.2 : -0.2)
      );

      archModules.push({
        group: modGrp,
        panel,
        frame,
        joint,
        p0,
        r0,
        p1Rigid,
        p1Adapt,
        r1Adapt,
        p2,
        r2,
        p3Ashtonava,
        r3Ashtonava,
        p3YesDhobi,
        r3YesDhobi,
        p4,
        r4,
        branchIdx: bIdx,
      });
    }

    // ----------------------------------------------------
    // SYSTEM B: DYNAMIC FLOWING BUSINESS WORKFLOW SPLINE (For Section 2)
    // The organic business workflow that the rigid architecture adapts around
    // ----------------------------------------------------
    const flowPoints: THREE.Vector3[] = [];
    for (let f = 0; f < 30; f++) {
      const ft = f / 29;
      flowPoints.push(
        new THREE.Vector3(
          (ft - 0.5) * 5.6,
          Math.sin(ft * Math.PI * 2.5) * 1.6,
          Math.cos(ft * Math.PI * 3.0) * 0.7
        )
      );
    }
    const flowSpline = new THREE.CatmullRomCurve3(flowPoints);
    const flowGeo = new THREE.TubeGeometry(flowSpline, 64, 0.05, 8, false);
    const flowMat = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.85,
    });
    const flowMesh = new THREE.Mesh(flowGeo, flowMat);
    architecturalRoot.add(flowMesh);

    // ----------------------------------------------------
    // SYSTEM C: 8 CANTILEVER STRUCTURAL BEAMS (Connective Architecture)
    // ----------------------------------------------------
    const beams: THREE.Mesh[] = [];
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.4, 8);
    const archBeamMat = new THREE.MeshStandardMaterial({
      color: 0x19D3E6,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
    });

    for (let b = 0; b < 8; b++) {
      const beam = new THREE.Mesh(beamGeo, archBeamMat);
      architecturalRoot.add(beam);
      beams.push(beam);
    }

    // ----------------------------------------------------
    // SYSTEM D: YESDHOBI OPERATIONAL TRANSIT NODES & CONDUITS
    // ----------------------------------------------------
    const transitHubs: THREE.Mesh[] = [];
    const hubStations = [
      { x: -2.4, y: 0.9, z: -0.3 },
      { x: -0.8, y: -0.8, z: 0.2 },
      { x: 0.8, y: 0.8, z: -0.2 },
      { x: 2.2, y: -0.7, z: 0.3 },
    ];
    const hubGeo = new THREE.OctahedronGeometry(0.22, 0);
    const hubMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
    hubStations.forEach((hs) => {
      const hm = new THREE.Mesh(hubGeo, hubMat);
      hm.position.set(hs.x, hs.y, hs.z);
      architecturalRoot.add(hm);
      transitHubs.push(hm);
    });

    // Coordinated transit packet
    const transitPacketGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const transitPacketMat = new THREE.MeshBasicMaterial({ color: 0xFF5722 });
    const transitPacket = new THREE.Mesh(transitPacketGeo, transitPacketMat);
    architecturalRoot.add(transitPacket);

    // ----------------------------------------------------
    // SYSTEM E: ASHTONAVA LUXURY ARCHITECTURAL SCULPTURAL SILK MESH
    // ----------------------------------------------------
    const ashSculptGeo = new THREE.TorusKnotGeometry(1.6, 0.32, 70, 16, 2, 3);
    const ashSculptMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      metalness: 0.96,
      roughness: 0.14,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const ashSculpt = new THREE.Mesh(ashSculptGeo, ashSculptMat);
    architecturalRoot.add(ashSculpt);

    // ----------------------------------------------------
    // SYSTEM F: MONOLITHIC CONVERGED CORE (For Final CTA)
    // ----------------------------------------------------
    const monolithGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0xFF5722,
      emissive: 0x9A3412,
      emissiveIntensity: 0.45,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const monolithCore = new THREE.Mesh(monolithGeo, monolithMat);
    architecturalRoot.add(monolithCore);

    // Harmonic alignment ring around monolith
    const alignRingGeo = new THREE.TorusGeometry(2.6, 0.035, 16, 64);
    const alignRingMat = new THREE.MeshBasicMaterial({
      color: 0x19D3E6,
      transparent: true,
      opacity: 0.5,
    });
    const alignRing = new THREE.Mesh(alignRingGeo, alignRingMat);
    alignRing.rotation.x = Math.PI / 3;
    architecturalRoot.add(alignRing);

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const newAspect = width / height;
      const newMobile = width < 768;

      stateRef.current.isMobile = newMobile;
      stateRef.current.aspect = newAspect;

      camera.aspect = newAspect;
      camera.fov = newMobile ? (newAspect < 0.55 ? 58 : 54) : 46;
      camera.updateProjectionMatrix();

      cameraStops = getCameraStops(newMobile, newAspect);

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, newMobile ? 1.5 : 1.75));
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 3. MAIN ANIMATION & REBUILDING ARCHITECTURE ENGINE
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const currentCamPos = camera.position.clone();
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    const currentPrimary = new THREE.Color(COLOR_STOPS[0].primary);
    const currentSecondary = new THREE.Color(COLOR_STOPS[0].secondary);
    const currentFog = new THREE.Color(COLOR_STOPS[0].fog);

    const tempPosA = new THREE.Vector3();
    const tempPosB = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const mobile = stateRef.current.isMobile;

      // Smooth entrance load progression (0 -> 1)
      if (stateRef.current.loadProgress < 1.0) {
        stateRef.current.loadProgress = Math.min(1.0, stateRef.current.loadProgress + 0.015);
      }
      const loadProg = stateRef.current.loadProgress;

      // Mouse damping
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.05;
      const mx = stateRef.current.mouseX;
      const my = stateRef.current.mouseY;

      // Scroll progress momentum across 5 stops (0.0 to 4.0)
      stateRef.current.currentProgress +=
        (stateRef.current.targetProgress - stateRef.current.currentProgress) * 0.075;
      const u = Math.max(0, Math.min(stateRef.current.currentProgress, 4.0));
      const cap = stateRef.current.activeCapability;
      const activeWork = stateRef.current.activeWorkProject;

      // 1. Camera Spline across 5 stops with architectural inspection feel
      const k = Math.min(Math.floor(u), cameraStops.length - 2);
      const t = u - k;
      const smoothT = t * t * (3 - 2 * t);

      const stopA = cameraStops[k];
      const stopB = cameraStops[k + 1];

      targetCamPos.lerpVectors(stopA.pos, stopB.pos, smoothT);
      targetLookAt.lerpVectors(stopA.look, stopB.look, smoothT);

      // Subtle parallax response
      targetCamPos.x += mx * (mobile ? 0.12 : 0.28);
      targetCamPos.y += my * (mobile ? 0.08 : 0.2);

      currentCamPos.lerp(targetCamPos, 0.08);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      // 2. Color transitions across materials, lighting, and environmental tone
      const colorA = COLOR_STOPS[k];
      const colorB = COLOR_STOPS[k + 1];
      currentPrimary.lerpColors(new THREE.Color(colorA.primary), new THREE.Color(colorB.primary), smoothT);
      currentSecondary.lerpColors(new THREE.Color(colorA.secondary), new THREE.Color(colorB.secondary), smoothT);
      currentFog.lerpColors(new THREE.Color(colorA.fog), new THREE.Color(colorB.fog), smoothT);

      keyLight.color.copy(currentPrimary);
      rimLight.color.copy(currentSecondary);
      if (scene.fog && 'color' in scene.fog) {
        scene.fog.color.copy(currentFog);
      }

      // Root architectural living kinetic rhythm
      architecturalRoot.rotation.y = elapsed * 0.03 + mx * 0.08;

      // 3. PROCEDURAL PHYSICAL REASSEMBLY OF ALL 24 MODULES
      // Depending on u, components compute their target location and orientation
      archModules.forEach((m, idx) => {
        let targetPos = new THREE.Vector3();
        let targetRot = new THREE.Euler();

        if (u < 1.0) {
          // --- HERO (0.0) -> THE IDEA (1.0) ---
          // Hero assembly effect: initial spread based on loadProg
          const spreadFactor = (1 - loadProg) * 2.5;
          const heroDispersed = m.p0.clone().add(
            new THREE.Vector3(
              Math.sin(idx + 1) * spreadFactor,
              Math.cos(idx + 2) * spreadFactor,
              Math.sin(idx * 3) * spreadFactor
            )
          );

          // Moving from Hero monument to The Idea (rigid modular grid)
          targetPos.lerpVectors(heroDispersed, m.p1Rigid, smoothT);
          targetRot.x = THREE.MathUtils.lerp(m.r0.x, 0, smoothT);
          targetRot.y = THREE.MathUtils.lerp(m.r0.y, 0, smoothT);
          targetRot.z = THREE.MathUtils.lerp(m.r0.z, 0, smoothT);
        } else if (u < 2.0) {
          // --- THE IDEA (1.0 -> 2.0): RESHAPING DEMONSTRATION ---
          // u: 1.0 to 1.5 -> Rigid structure resists, then unlatches and wraps snugly around business workflow!
          // u: 1.5 to 2.0 -> Transitioning into Capabilities ecosystem
          const ideaMorphProgress = Math.min(Math.max((u - 1.0) / 0.6, 0), 1);
          const ideaSmooth = ideaMorphProgress * ideaMorphProgress * (3 - 2 * ideaMorphProgress);

          // Morph from rigid orthogonal grid into conforming adaptive hull
          const currentIdeaPos = tempPosA.lerpVectors(m.p1Rigid, m.p1Adapt, ideaSmooth);
          const currentIdeaRot = new THREE.Euler(
            0,
            0,
            THREE.MathUtils.lerp(0, m.r1Adapt.z, ideaSmooth)
          );

          if (u <= 1.5) {
            targetPos.copy(currentIdeaPos);
            targetRot.copy(currentIdeaRot);
          } else {
            // Morph from adapted idea into Capabilities ecosystem
            const capTransition = (u - 1.5) / 0.5;
            const capSmooth = capTransition * capTransition * (3 - 2 * capTransition);
            targetPos.lerpVectors(m.p1Adapt, m.p2, capSmooth);
            targetRot.x = THREE.MathUtils.lerp(m.r1Adapt.x, m.r2.x, capSmooth);
            targetRot.y = THREE.MathUtils.lerp(m.r1Adapt.y, m.r2.y, capSmooth);
            targetRot.z = THREE.MathUtils.lerp(m.r1Adapt.z, m.r2.z, capSmooth);
          }
        } else if (u < 3.0) {
          // --- CAPABILITIES (2.0) -> WORK (3.0) ---
          // Physical disassembly and reassembly into Ashtonava or YesDhobi
          const isAshtonava = activeWork === 'ashtonava';
          const workTargetPos = isAshtonava ? m.p3Ashtonava : m.p3YesDhobi;
          const workTargetRot = isAshtonava ? m.r3Ashtonava : m.r3YesDhobi;

          // Transition: precise components unlock and travel controlled trajectories
          // Mid-transit flight elevation
          const midArc = Math.sin(smoothT * Math.PI) * 0.8;
          targetPos.lerpVectors(m.p2, workTargetPos, smoothT);
          targetPos.y += (idx % 2 === 0 ? midArc : -midArc * 0.5);

          targetRot.x = THREE.MathUtils.lerp(m.r2.x, workTargetRot.x, smoothT);
          targetRot.y = THREE.MathUtils.lerp(m.r2.y, workTargetRot.y, smoothT);
          targetRot.z = THREE.MathUtils.lerp(m.r2.z, workTargetRot.z, smoothT);
        } else {
          // --- WORK (3.0) -> FINAL CTA (4.0) ---
          // All components converge into ONE unified, stable, running monolithic digital architecture
          const isAshtonava = activeWork === 'ashtonava';
          const currentWorkPos = isAshtonava ? m.p3Ashtonava : m.p3YesDhobi;
          const currentWorkRot = isAshtonava ? m.r3Ashtonava : m.r3YesDhobi;

          targetPos.lerpVectors(currentWorkPos, m.p4, smoothT);
          targetRot.x = THREE.MathUtils.lerp(currentWorkRot.x, m.r4.x, smoothT);
          targetRot.y = THREE.MathUtils.lerp(currentWorkRot.y, m.r4.y, smoothT);
          targetRot.z = THREE.MathUtils.lerp(currentWorkRot.z, m.r4.z, smoothT);
        }

        // Apply smooth module translation & rotation
        m.group.position.lerp(targetPos, 0.08);
        m.group.rotation.x = THREE.MathUtils.lerp(m.group.rotation.x, targetRot.x, 0.08);
        m.group.rotation.y = THREE.MathUtils.lerp(m.group.rotation.y, targetRot.y, 0.08);
        m.group.rotation.z = THREE.MathUtils.lerp(m.group.rotation.z, targetRot.z, 0.08);

        // Independent micro-articulation (joints rotating, panels breathing)
        m.joint.rotation.x = elapsed * 0.4 + idx;
        m.panel.position.z = Math.sin(elapsed * 1.2 + idx) * 0.02;

        // Capabilities hover interaction: highlight the hovered functional branch
        if (u >= 1.5 && u <= 2.5 && cap) {
          const capMap: Record<string, number> = {
            'web-apps': 0, 'Custom Web Applications': 0,
            'mobile-products': 1, 'Mobile Products': 1,
            'business-systems': 2, 'Internal Business Systems': 2,
            'ai-products': 3, 'Custom AI Workflows & Systems': 3,
            'integrations': 4,
            'automation': 5,
          };
          const targetBranch = capMap[cap];
          if (m.branchIdx === targetBranch) {
            m.group.scale.lerp(new THREE.Vector3(1.28, 1.28, 1.28), 0.1);
          } else {
            m.group.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), 0.08);
          }
        } else {
          m.group.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.06);
        }
      });

      // 4. BUSINESS WORKFLOW SPLINE BEHAVIOR (Section 2)
      // Visible primarily during Section 2 (u from 0.7 to 2.0)
      const flowWeight = Math.max(0, 1 - Math.abs(u - 1.35) / 0.85);
      flowMesh.visible = flowWeight > 0.01;
      if (flowMesh.visible) {
        flowMat.opacity = 0.85 * flowWeight;
        flowMesh.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      // 5. CANTILEVER BEAMS (Dynamic connections between modular nodes)
      beams.forEach((b, bIdx) => {
        // Connect pairs of modules
        const modA = archModules[bIdx * 2];
        const modB = archModules[(bIdx * 2 + 3) % moduleCount];
        if (modA && modB) {
          const pA = modA.group.position;
          const pB = modB.group.position;
          b.position.copy(pA).add(pB).multiplyScalar(0.5);
          b.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            pB.clone().sub(pA).normalize()
          );
          const dist = pA.distanceTo(pB);
          b.scale.set(1, dist / 4.4, 1);
        }
      });

      // 6. ASHTONAVA & YESDHOBI DEDICATED ARCHITECTURAL BEHAVIORS (Section 4)
      const workWeight = Math.max(0, 1 - Math.abs(u - 3.0) / 0.85);
      const isAshtonava = activeWork === 'ashtonava';

      ashSculpt.visible = workWeight > 0.01 && isAshtonava;
      if (ashSculpt.visible) {
        ashSculpt.rotation.x = elapsed * 0.15;
        ashSculpt.rotation.y = elapsed * 0.2;
        ashSculptMat.opacity = 0.55 * workWeight;
      }

      const showLogistics = workWeight > 0.01 && !isAshtonava;
      transitHubs.forEach((th) => {
        th.visible = showLogistics;
        if (showLogistics) {
          th.rotation.y += 0.02;
          th.rotation.x += 0.01;
        }
      });

      transitPacket.visible = showLogistics;
      if (showLogistics) {
        const pCycle = (elapsed * 0.6) % hubStations.length;
        const currentIdx = Math.floor(pCycle);
        const nextIdx = (currentIdx + 1) % hubStations.length;
        const subT = pCycle - currentIdx;
        const sA = hubStations[currentIdx];
        const sB = hubStations[nextIdx];
        transitPacket.position.set(
          THREE.MathUtils.lerp(sA.x, sB.x, subT),
          THREE.MathUtils.lerp(sA.y, sB.y, subT),
          THREE.MathUtils.lerp(sA.z, sB.z, subT)
        );
      }

      // 7. FINAL MONOLITH CORE (Section 5)
      const ctaWeight = Math.max(0, 1 - Math.abs(u - 4.0) / 0.9);
      monolithCore.visible = ctaWeight > 0.01;
      alignRing.visible = ctaWeight > 0.01;
      if (monolithCore.visible) {
        monolithCore.rotation.y = elapsed * 0.12;
        monolithCore.rotation.x = Math.sin(elapsed * 0.08) * 0.2;
        alignRing.rotation.z += 0.006;
        alignRing.rotation.y += 0.003;
        monolithMat.opacity = 0.8 * ctaWeight;
        alignRingMat.opacity = 0.5 * ctaWeight;

        // Subtle living pulse
        const ctaPulse = 1.0 + Math.sin(elapsed * 1.8) * 0.04;
        monolithCore.scale.set(ctaPulse, ctaPulse, ctaPulse);
      }

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
    return <div className="fixed inset-0 z-0 bg-[#070A12] pointer-events-none" />;
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 1 }}
    />
  );
};

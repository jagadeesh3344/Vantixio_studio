import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantixioCore3DProps {
  activeCapability?: string | null;
  onSelectNode?: (nodeId: string) => void;
}

const CONNECTED_NODES = [
  { id: 'web-apps', name: 'Web', color: 0x19D3E6, angle: 0, dist: 3.2 },
  { id: 'mobile-products', name: 'Mobile', color: 0xFF5722, angle: (Math.PI * 2) / 7 * 1, dist: 3.3 },
  { id: 'ai-products', name: 'AI', color: 0x8B5CF6, angle: (Math.PI * 2) / 7 * 2, dist: 3.4 },
  { id: 'data', name: 'Data', color: 0x2563EB, angle: (Math.PI * 2) / 7 * 3, dist: 3.1 },
  { id: 'cloud', name: 'Cloud', color: 0x06B6D4, angle: (Math.PI * 2) / 7 * 4, dist: 3.5 },
  { id: 'integrations', name: 'Integrations', color: 0x10B981, angle: (Math.PI * 2) / 7 * 5, dist: 3.2 },
  { id: 'automation', name: 'Automation', color: 0xF59E0B, angle: (Math.PI * 2) / 7 * 6, dist: 3.4 },
];

export const VantixioCore3D: React.FC<VantixioCore3DProps> = ({ activeCapability, onSelectNode }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Core Geometry (Icosahedron wireframe + inner glowing sphere)
    const coreInnerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreInnerMat = new THREE.MeshBasicMaterial({
      color: 0x070A12,
      wireframe: false,
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    mainGroup.add(coreInner);

    // Outer crystalline wireframe
    const coreWireGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x19D3E6,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    mainGroup.add(coreWire);

    // Second glowing inner layer
    const coreGlowGeo = new THREE.OctahedronGeometry(0.8, 0);
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0xFF5722,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    mainGroup.add(coreGlow);

    // Orbital Rings
    const ringGeo1 = new THREE.RingGeometry(2.2, 2.22, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x2563EB,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(3.3, 3.32, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x19D3E6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.y = Math.PI / 8;
    mainGroup.add(ring2);

    // Surrounding Satellite Nodes
    const nodeMeshes: { mesh: THREE.Mesh; line: THREE.Line; info: (typeof CONNECTED_NODES)[0] }[] = [];

    CONNECTED_NODES.forEach((node) => {
      const x = Math.cos(node.angle) * node.dist;
      const y = Math.sin(node.angle) * (node.dist * 0.45);
      const z = Math.sin(node.angle * 2) * 0.8;

      // Satellite Sphere
      const satGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(x, y, z);
      mainGroup.add(satMesh);

      // Connection Line to Core
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      mainGroup.add(line);

      nodeMeshes.push({ mesh: satMesh, line, info: node });
    });

    // Particle Cloud around core
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.cos(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.sin(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x19D3E6,
      size: 0.045,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    container.addEventListener('mousemove', onPointerMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth core rotation
      coreWire.rotation.y += 0.006;
      coreWire.rotation.x += 0.003;
      coreGlow.rotation.y -= 0.009;
      coreGlow.rotation.z += 0.005;

      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.003;

      particles.rotation.y += 0.0015;

      // Mouse damping
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(elapsed * 2) * 0.03;
      coreWire.scale.set(pulse, pulse, pulse);

      // Rotate nodes subtly in orbit
      nodeMeshes.forEach(({ mesh, line, info }, idx) => {
        const currentAngle = info.angle + elapsed * 0.15;
        const x = Math.cos(currentAngle) * info.dist;
        const y = Math.sin(currentAngle) * (info.dist * 0.45);
        const z = Math.sin(currentAngle * 1.5) * 0.9;

        mesh.position.set(x, y, z);

        // Update connecting line geometry
        const linePositions = line.geometry.attributes.position as THREE.BufferAttribute;
        linePositions.setXYZ(1, x, y, z);
        linePositions.needsUpdate = true;

        // Highlight active capability
        if (activeCapability && activeCapability.includes(info.id)) {
          mesh.scale.set(1.6, 1.6, 1.6);
        } else {
          mesh.scale.set(1, 1, 1);
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeCapability]);

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[480px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Fallback Graphic if WebGL is unavailable */}
      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-64 h-64 border border-cyan-500/30 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-40 h-40 border border-coral-500/40 rounded-full animate-ping" />
            <div className="w-24 h-24 bg-gradient-to-tr from-cyan-900 to-indigo-950 rounded-2xl flex items-center justify-center border border-cyan-400">
              <span className="font-mono text-cyan-300 font-bold">VANTIXIO</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive System Overlay Badges */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between pointer-events-none text-[11px] font-mono">
        <div className="flex items-center space-x-2 bg-[#070A12]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>VANTIXIO CORE // ARCHITECTURE ONLINE</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-[#070A12]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-cyan-400/80">
          <span>7 CONNECTED SUBSYSTEMS</span>
        </div>
      </div>
    </div>
  );
};

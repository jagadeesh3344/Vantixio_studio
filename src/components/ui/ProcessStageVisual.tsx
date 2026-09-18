import React from 'react';
import { motion } from 'motion/react';
import { ProcessStage } from '../../types';

interface ProcessStageVisualProps {
  stage: ProcessStage;
}

export const ProcessStageVisual: React.FC<ProcessStageVisualProps> = ({ stage }) => {
  switch (stage.id) {
    case 'discover':
      // 01: DISCOVER — Operational Bottleneck Audit & Friction Topology Radar
      return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <svg className="w-full h-full max-h-[260px]" viewBox="0 0 400 260" fill="none">
            {/* Background radar concentric rings */}
            <circle cx="200" cy="130" r="110" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="200" cy="130" r="75" stroke="#1E293B" strokeWidth="1" opacity="0.8" />
            <circle cx="200" cy="130" r="40" stroke="#06B6D4" strokeWidth="1.2" opacity="0.4" />
            
            {/* Radar crosshairs */}
            <line x1="90" y1="130" x2="310" y2="130" stroke="#1E293B" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="240" stroke="#1E293B" strokeWidth="1" />

            {/* Rotating radar sweep beam */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ originX: "200px", originY: "130px" }}
            >
              <line x1="200" y1="130" x2="200" y2="20" stroke="#19D3E6" strokeWidth="2" strokeOpacity="0.8" />
              <path d="M200 130 L200 20 A110 110 0 0 1 290 80 Z" fill="url(#discoverSweep)" opacity="0.25" />
            </motion.g>

            <defs>
              <radialGradient id="discoverSweep" cx="200" cy="130" r="110" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#19D3E6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#19D3E6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Discovered Friction & Bottleneck Nodes */}
            <g>
              {/* Node 1: Manual Data Friction */}
              <circle cx="140" cy="70" r="6" fill="#FF5722" />
              <circle cx="140" cy="70" r="12" stroke="#FF5722" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.1;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="140" y="52" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">BOTTLENECK: SPREADSHEET FORKS</text>

              {/* Node 2: Sub-optimal API Latency */}
              <circle cx="260" cy="90" r="5" fill="#F59E0B" />
              <circle cx="260" cy="90" r="10" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
              <text x="260" y="74" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">LEGACY ERP FRICTION</text>

              {/* Node 3: Core Business Engine */}
              <circle cx="200" cy="130" r="8" fill="#19D3E6" />
              <circle cx="200" cy="130" r="18" stroke="#19D3E6" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="8;24;8" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x="200" y="160" fill="#E2E8F0" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">REVENUE CRITICAL PATH</text>

              {/* Node 4: Unused SaaS Overhead */}
              <circle cx="240" cy="190" r="4" fill="#EF4444" />
              <text x="240" y="206" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">SAAS REDUNDANCY</text>
            </g>
          </svg>
        </div>
      );

    case 'architect':
      // 02: ARCHITECT — Distributed Relational Entity Schema & Security Mesh
      return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <svg className="w-full h-full max-h-[260px]" viewBox="0 0 400 260" fill="none">
            {/* Entity Block 1: Multi-tenant Auth & RBAC */}
            <g transform="translate(30, 40)">
              <rect width="100" height="65" rx="6" fill="#0B132B" stroke="#2563EB" strokeWidth="1.2" />
              <rect width="100" height="18" rx="6" fill="#1E3A8A" />
              <text x="50" y="13" fill="#93C5FD" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">AUTH_RBAC</text>
              <text x="8" y="32" fill="#64748B" fontSize="7" fontFamily="monospace">id : UUID [PK]</text>
              <text x="8" y="44" fill="#64748B" fontSize="7" fontFamily="monospace">tenant_id : UUID</text>
              <text x="8" y="56" fill="#64748B" fontSize="7" fontFamily="monospace">role : PERMISSION</text>
            </g>

            {/* Entity Block 2: Business Core Ledger */}
            <g transform="translate(150, 95)">
              <rect width="110" height="75" rx="6" fill="#0B132B" stroke="#3B82F6" strokeWidth="1.5" />
              <rect width="110" height="20" rx="6" fill="#1D4ED8" />
              <text x="55" y="14" fill="#BFDBFE" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CORE_EVENT_LOG</text>
              <text x="8" y="35" fill="#94A3B8" fontSize="7" fontFamily="monospace">seq_num : BIGINT [PK]</text>
              <text x="8" y="47" fill="#94A3B8" fontSize="7" fontFamily="monospace">payload : JSONB</text>
              <text x="8" y="59" fill="#94A3B8" fontSize="7" fontFamily="monospace">idempotency_key</text>
              <text x="8" y="70" fill="#94A3B8" fontSize="7" fontFamily="monospace">timestamp : TIMESTAMPTZ</text>
            </g>

            {/* Entity Block 3: Real-time Ingress Gateway */}
            <g transform="translate(270, 40)">
              <rect width="100" height="65" rx="6" fill="#0B132B" stroke="#06B6D4" strokeWidth="1.2" />
              <rect width="100" height="18" rx="6" fill="#0E7490" />
              <text x="50" y="13" fill="#A5F3FC" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">API_GATEWAY</text>
              <text x="8" y="32" fill="#64748B" fontSize="7" fontFamily="monospace">rate_limit : 5k/sec</text>
              <text x="8" y="44" fill="#64748B" fontSize="7" fontFamily="monospace">latency : &lt;12ms</text>
              <text x="8" y="56" fill="#64748B" fontSize="7" fontFamily="monospace">tls : v1.3 STRICT</text>
            </g>

            {/* Connecting Bus Lines with Traveling Packets */}
            <path d="M130 72 L150 120" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2" />
            <path d="M270 72 L260 120" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="80" y1="105" x2="80" y2="210" stroke="#1E293B" strokeWidth="1.5" />
            <line x1="80" y1="210" x2="320" y2="210" stroke="#1E293B" strokeWidth="1.5" />
            <line x1="320" y1="210" x2="320" y2="105" stroke="#1E293B" strokeWidth="1.5" />

            {/* Bottom Service: Distributed Cache & Queue */}
            <g transform="translate(130, 195)">
              <rect width="140" height="30" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
              <text x="70" y="19" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">REDIS PUBSUB // FAST VECTOR STORE</text>
            </g>
          </svg>
        </div>
      );

    case 'design':
      // 03: DESIGN — Ergonomic Interface Wireframe & Spatial Hierarchy Canvas
      return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <svg className="w-full h-full max-h-[260px]" viewBox="0 0 400 260" fill="none">
            {/* Desktop Viewport Chrome */}
            <rect x="30" y="25" width="340" height="210" rx="8" fill="#0A0F1D" stroke="#8B5CF6" strokeWidth="1.2" />
            
            {/* Header bar with controls */}
            <rect x="30" y="25" width="340" height="24" rx="8" fill="#1E1B4B" />
            <circle cx="45" cy="37" r="3.5" fill="#EF4444" />
            <circle cx="56" cy="37" r="3.5" fill="#F59E0B" />
            <circle cx="67" cy="37" r="3.5" fill="#10B981" />
            <text x="200" y="40" fill="#C4B5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">DESIGN_SYSTEM_TOKENS // 8PX SPATIAL GRID</text>

            {/* Left Nav Bar */}
            <rect x="30" y="49" width="55" height="186" fill="#0D1127" stroke="#1E1B4B" strokeWidth="1" />
            <rect x="40" y="60" width="35" height="6" rx="2" fill="#8B5CF6" opacity="0.8" />
            <rect x="40" y="74" width="35" height="4" rx="2" fill="#334155" />
            <rect x="40" y="86" width="35" height="4" rx="2" fill="#334155" />
            <rect x="40" y="98" width="35" height="4" rx="2" fill="#334155" />

            {/* Main Content Area */}
            <g transform="translate(95, 60)">
              {/* Executive Metrics Strip */}
              <rect x="0" y="0" width="80" height="45" rx="5" fill="#13152C" stroke="#2E2856" strokeWidth="1" />
              <text x="8" y="15" fill="#94A3B8" fontSize="7" fontFamily="monospace">REALTIME TPS</text>
              <text x="8" y="32" fill="#C4B5FD" fontSize="14" fontFamily="monospace" fontWeight="bold">4,820</text>

              <rect x="90" y="0" width="80" height="45" rx="5" fill="#13152C" stroke="#2E2856" strokeWidth="1" />
              <text x="98" y="15" fill="#94A3B8" fontSize="7" fontFamily="monospace">API LATENCY</text>
              <text x="98" y="32" fill="#10B981" fontSize="14" fontFamily="monospace" fontWeight="bold">18ms</text>

              <rect x="180" y="0" width="85" height="45" rx="5" fill="#13152C" stroke="#2E2856" strokeWidth="1" />
              <text x="188" y="15" fill="#94A3B8" fontSize="7" fontFamily="monospace">SYSTEM HEALTH</text>
              <text x="188" y="32" fill="#19D3E6" fontSize="14" fontFamily="monospace" fontWeight="bold">99.99%</text>

              {/* Data Table / Interactive Data Workspace */}
              <rect x="0" y="55" width="265" height="105" rx="5" fill="#111528" stroke="#2E2856" strokeWidth="1" />
              <line x1="0" y1="78" x2="265" y2="78" stroke="#1E293B" strokeWidth="1" />
              <line x1="0" y1="105" x2="265" y2="105" stroke="#1E293B" strokeWidth="1" />
              <line x1="0" y1="132" x2="265" y2="132" stroke="#1E293B" strokeWidth="1" />

              {/* Rows */}
              <rect x="12" y="65" width="50" height="5" rx="2" fill="#8B5CF6" opacity="0.6" />
              <rect x="80" y="65" width="70" height="5" rx="2" fill="#334155" />
              <rect x="175" y="65" width="40" height="5" rx="2" fill="#10B981" opacity="0.6" />

              <rect x="12" y="90" width="60" height="5" rx="2" fill="#8B5CF6" opacity="0.4" />
              <rect x="80" y="90" width="55" height="5" rx="2" fill="#334155" />
              <rect x="175" y="90" width="55" height="5" rx="2" fill="#10B981" opacity="0.6" />

              <rect x="12" y="117" width="45" height="5" rx="2" fill="#8B5CF6" opacity="0.4" />
              <rect x="80" y="117" width="80" height="5" rx="2" fill="#334155" />
              <rect x="175" y="117" width="30" height="5" rx="2" fill="#10B981" opacity="0.6" />
            </g>
          </svg>
        </div>
      );

    case 'engineer':
      // 04: ENGINEER — CI/CD Pipeline, Automated Test Suite & Micro-Commit Stream
      return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <svg className="w-full h-full max-h-[260px]" viewBox="0 0 400 260" fill="none">
            {/* Git Branching Trunk and Stages */}
            <g transform="translate(40, 50)">
              {/* Main Trunk Line */}
              <line x1="20" y1="40" x2="310" y2="40" stroke="#FF5722" strokeWidth="2.5" />

              {/* Feature Branch */}
              <path d="M60 40 C90 40 90 90 120 90 L200 90 C230 90 230 40 260 40" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />

              {/* Commits along Trunk */}
              <circle cx="60" cy="40" r="6" fill="#0B1120" stroke="#FF5722" strokeWidth="2.5" />
              <circle cx="160" cy="40" r="6" fill="#0B1120" stroke="#FF5722" strokeWidth="2.5" />
              <circle cx="260" cy="40" r="6" fill="#FF5722" />
              <circle cx="310" cy="40" r="7" fill="#10B981" />

              {/* Feature Commits */}
              <circle cx="140" cy="90" r="5" fill="#0B1120" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="180" cy="90" r="5" fill="#F59E0B" />

              {/* Commit Hash Tags */}
              <text x="60" y="24" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle">init#d4a2</text>
              <text x="160" y="24" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle">feat#88b1</text>
              <text x="260" y="24" fill="#FF8A65" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">merge#c09e</text>
              <text x="310" y="24" fill="#10B981" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PROD v2.4</text>
            </g>

            {/* Test Runner Suite Status Box */}
            <g transform="translate(45, 150)">
              <rect width="310" height="75" rx="6" fill="#080E1C" stroke="#1E293B" strokeWidth="1.2" />
              <rect width="310" height="20" rx="6" fill="#0F172A" />
              <text x="15" y="14" fill="#94A3B8" fontSize="8" fontFamily="monospace">AUTOMATED_TEST_RUNNER // 2-WEEK CONTINUOUS SPRINT</text>

              {/* Test 1 */}
              <circle cx="20" cy="36" r="3.5" fill="#10B981" />
              <text x="30" y="39" fill="#E2E8F0" fontSize="8" fontFamily="monospace">PASS: unit/contracts (142 tests passed in 0.8s)</text>

              {/* Test 2 */}
              <circle cx="20" cy="51" r="3.5" fill="#10B981" />
              <text x="30" y="54" fill="#E2E8F0" fontSize="8" fontFamily="monospace">PASS: e2e/transaction_isolation (sub-second sync verified)</text>

              {/* Test 3 */}
              <circle cx="20" cy="66" r="3.5" fill="#10B981" />
              <text x="30" y="69" fill="#19D3E6" fontSize="8" fontFamily="monospace">PASS: security/zero_leakage_audit (100% compliant)</text>
            </g>
          </svg>
        </div>
      );

    case 'launch':
      // 05: LAUNCH — Zero-Downtime Multi-Region Cloud Deployment & Realtime Telemetry
      return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <svg className="w-full h-full max-h-[260px]" viewBox="0 0 400 260" fill="none">
            {/* World Globe Projection Lines */}
            <ellipse cx="200" cy="120" rx="140" ry="75" stroke="#1E293B" strokeWidth="1" opacity="0.6" />
            <ellipse cx="200" cy="120" rx="140" ry="35" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <line x1="60" y1="120" x2="340" y2="120" stroke="#1E293B" strokeWidth="1" opacity="0.5" />
            <line x1="200" y1="45" x2="200" y2="195" stroke="#1E293B" strokeWidth="1" opacity="0.5" />

            {/* Regional Edge Nodes */}
            {/* Node 1: US-East */}
            <g transform="translate(130, 95)">
              <circle cx="0" cy="0" r="5" fill="#10B981" />
              <circle cx="0" cy="0" r="12" stroke="#10B981" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="5;15;5" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="0" y="-10" fill="#A7F3D0" fontSize="7" fontFamily="monospace" textAnchor="middle">IAD-01 // 12ms</text>
            </g>

            {/* Node 2: EU-Central */}
            <g transform="translate(210, 85)">
              <circle cx="0" cy="0" r="5" fill="#10B981" />
              <circle cx="0" cy="0" r="12" stroke="#10B981" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="5;15;5" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <text x="0" y="-10" fill="#A7F3D0" fontSize="7" fontFamily="monospace" textAnchor="middle">FRA-01 // 19ms</text>
            </g>

            {/* Node 3: APAC-South */}
            <g transform="translate(280, 125)">
              <circle cx="0" cy="0" r="5" fill="#10B981" />
              <circle cx="0" cy="0" r="12" stroke="#10B981" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="5;15;5" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <text x="0" y="-10" fill="#A7F3D0" fontSize="7" fontFamily="monospace" textAnchor="middle">SIN-01 // 28ms</text>
            </g>

            {/* Connecting Ingress Arcs */}
            <path d="M130 95 Q 170 65 210 85" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />
            <path d="M210 85 Q 245 90 280 125" stroke="#10B981" strokeWidth="1.2" opacity="0.6" />

            {/* Bottom Status Banner */}
            <g transform="translate(70, 205)">
              <rect width="260" height="26" rx="4" fill="#061F17" stroke="#10B981" strokeWidth="1" />
              <circle cx="20" cy="13" r="3.5" fill="#10B981" />
              <text x="32" y="16" fill="#D1FAE5" fontSize="8" fontFamily="monospace" fontWeight="bold">
                PROD CUTOVER: 100% COMPLETE // ZERO DOWNTIME
              </text>
            </g>
          </svg>
        </div>
      );

    case 'evolve':
    default:
      // 06: EVOLVE — Continuous Optimization Loop & Autonomous Scaling Elasticity
      return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <svg className="w-full h-full max-h-[260px]" viewBox="0 0 400 260" fill="none">
            {/* Infinite Loop of Continuous Growth */}
            <g transform="translate(200, 115)">
              {/* Central infinity / toroidal feedback flow */}
              <motion.path
                d="M -70 0 C -70 -40 -20 -40 0 0 C 20 40 70 40 70 0 C 70 -40 20 -40 0 0 C -20 40 -70 40 -70 0 Z"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />

              {/* Loop Focus Stations */}
              <circle cx="-70" cy="0" r="7" fill="#080E1A" stroke="#06B6D4" strokeWidth="2" />
              <text x="-70" y="-16" fill="#A5F3FC" fontSize="8" fontFamily="monospace" textAnchor="middle">ANALYZE</text>

              <circle cx="0" cy="0" r="9" fill="#06B6D4" />
              <text x="0" y="24" fill="#E2E8F0" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SCALE ENGINE</text>

              <circle cx="70" cy="0" r="7" fill="#080E1A" stroke="#38BDF8" strokeWidth="2" />
              <text x="70" y="-16" fill="#BAE6FD" fontSize="8" fontFamily="monospace" textAnchor="middle">REFINE</text>
            </g>

            {/* Elasticity Scale Curve */}
            <g transform="translate(50, 195)">
              <rect width="300" height="36" rx="6" fill="#0B132B" stroke="#1E293B" strokeWidth="1" />
              <text x="16" y="16" fill="#94A3B8" fontSize="8" fontFamily="monospace">AUTO-SCALE TELEMETRY</text>
              <text x="16" y="28" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">10x TRAFFIC ELASTICITY // ZERO RE-ARCHITECTURE</text>
              <text x="240" y="22" fill="#10B981" fontSize="8" fontFamily="monospace" textAnchor="middle">SLA: 99.999%</text>
            </g>
          </svg>
        </div>
      );
  }
};

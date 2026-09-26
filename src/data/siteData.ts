import { CapabilityItem, PillarItem, ProcessStage, TechZone, ClientProfile, PrincipleItem } from '../types';

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'The Idea', href: '#idea' },
  { label: 'What We Build', href: '#capabilities' },
  { label: 'Selected Work', href: '#work' },
  { label: 'Build', href: '#contact' },
];

export const HERO_POSITIONING = [
  {
    title: 'TAILORED ARCHITECTURE',
    description: 'No forced SaaS templates or rigid workflows. Software engineered around your business logic.',
  },
  {
    title: 'ZERO COMPROMISE',
    description: 'From complex internal platforms to AI copilots—built with precision to solve your exact friction.',
  },
  {
    title: 'ONE ENGINEERING PARTNER',
    description: 'Discovery, system architecture, UI/UX design, full-stack engineering, and evolution under one roof.',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'web-apps',
    number: '01',
    title: 'Custom Web Applications',
    summary: 'High-performance web apps, responsive portals, and operational interfaces tailored to your team.',
    description: 'Bespoke web applications engineered for complex workflows, responsive performance, and clean design tailored to your team’s exact operations.',
    features: ['Real-time executive dashboards', 'High-security client & partner portals', 'Scalable multi-sided marketplaces', 'Internal operating systems', 'Custom operational workspaces'],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    iconType: 'web',
    badge: 'WEB APPS',
    architectureDetails: 'Real-time state synchronization with multi-tenant row-level access security.'
  },
  {
    id: 'mobile-products',
    number: '02',
    title: 'Mobile Products',
    summary: 'iOS, Android, and cross-platform apps built for field operations and mobile ergonomics.',
    description: 'Mobile software crafted for offline support, location-aware field operations, hardware telemetry, and fluid touch ergonomics.',
    features: ['Native iOS & Android development', 'Offline database synchronization', 'Field operations & worker tooling', 'Biometric authentication', 'Push notification orchestration'],
    techStack: ['React Native', 'Swift', 'Kotlin', 'SQLite', 'GraphQL'],
    iconType: 'mobile',
    badge: 'MOBILE',
    architectureDetails: 'Optimized local state caches with bidirectional background synchronization.'
  },
  {
    id: 'business-systems',
    number: '03',
    title: 'Internal Business Systems',
    summary: 'Custom operational engines, inventory control, and automated logic replacing fragmented SaaS.',
    description: 'Replace fragmented spreadsheets and rigid off-the-shelf software with a custom operating engine built around your company’s true commercial cadence.',
    features: ['Custom POS & multi-location register', 'Live inventory & supply chain tracking', 'Tailored relationship pipelines (CRM)', 'Automated approvals & governance', 'Financial ledger reconciliation'],
    techStack: ['Distributed SQL', 'Event Streaming', 'Domain Logic Engines', 'Audit Ledgers'],
    iconType: 'business',
    badge: 'CORE SYSTEMS',
    architectureDetails: 'Event-driven architecture ensuring complete transactional integrity and auditable logs.'
  },
  {
    id: 'ai-products',
    number: '04',
    title: 'Custom AI Workflows & Systems',
    summary: 'Autonomous copilots, document intelligence, and automated decision engines embedded in your tools.',
    description: 'Context-aware intelligence embedded directly into your operational software. Autonomous copilots, document parsing pipelines, and decision engines.',
    features: ['Autonomous task-solving agents', 'Domain-trained copilot assistants', 'Automated document extraction', 'Semantic search & retrieval', 'Decision support engines'],
    techStack: ['LLMs / GenAI', 'Vector Databases', 'Custom RAG Pipelines', 'Python', 'FastAPI'],
    iconType: 'ai',
    badge: 'AI SYSTEMS',
    architectureDetails: 'Secure private inference with enterprise guardrails and strict data isolation.'
  }
];

export const VANTIXIO_PILLARS: PillarItem[] = [
  {
    id: 'workflow',
    number: '01',
    code: 'WORKFLOW',
    title: 'WORKFLOW',
    subtitle: 'Your process, not our template.',
    description: 'Engineered around your exact daily steps—never an awkward off-the-shelf template. Every action reflects the way your people naturally work.',
    techHighlight: 'Custom state machines modeling your exact organization hierarchy',
    metrics: 'Custom Business Logic'
  },
  {
    id: 'interface',
    number: '02',
    code: 'INTERFACE',
    title: 'INTERFACE',
    subtitle: 'Your people, your context, your way of working.',
    description: 'Designed for your operators, field teams, and leadership. High density where speed matters, simplified clarity where focus counts.',
    techHighlight: 'Ergonomic viewport layouts tailored to your exact operational environments',
    metrics: 'Ergonomic Workflows'
  },
  {
    id: 'logic',
    number: '03',
    code: 'LOGIC',
    title: 'LOGIC',
    subtitle: 'Rules and automation designed around your business.',
    description: 'Automated decisions and business logic custom-coded to match your operating model. Edge cases handled with precision, not workarounds.',
    techHighlight: 'Deterministic rule engines executing multi-stage operational validations',
    metrics: 'Automated Governance'
  },
  {
    id: 'brand',
    number: '04',
    code: 'BRAND',
    title: 'BRAND',
    subtitle: 'A product that feels native to your identity.',
    description: 'A native visual experience that feels unmistakably part of your company. Build digital equity in software that carries your brand identity.',
    techHighlight: 'Design system architecture expressing tailored typography, color, and hierarchy',
    metrics: 'Native Digital Identity'
  },
  {
    id: 'scale',
    number: '05',
    code: 'SCALE',
    title: 'SCALE',
    subtitle: "Architecture designed for where you're going—not just where you are.",
    description: 'Robust architecture built for where your business is going next. Modular, containerized codebases that accommodate continuous commercial expansion.',
    techHighlight: 'Cloud-native scalable clusters with decoupled modular services',
    metrics: 'Future-Proof Architecture'
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discover',
    number: '01',
    name: 'DISCOVER',
    tagline: 'Map the business, workflow friction, and success metrics.',
    description: 'We don’t start with assumptions; we map the business, discover operational bottlenecks, and establish clear success metrics for your custom system.',
    deliverables: ['Operational bottleneck audit', 'Technical requirements matrix', 'Workflow mapping', 'Success metric baseline'],
    duration: 'Phase 1',
    nodeColor: '#19D3E6'
  },
  {
    id: 'architect',
    number: '02',
    name: 'ARCHITECT',
    tagline: 'Define flows, data, technology, permissions, APIs/integrations, and edge cases.',
    description: 'We blueprint the system architecture: data models, technology selection, permission boundaries, API contracts, and edge cases.',
    deliverables: ['System architecture blueprint', 'Database schema specification', 'Security & RBAC specification', 'API & integration contracts'],
    duration: 'Phase 2',
    nodeColor: '#2563EB'
  },
  {
    id: 'design',
    number: '03',
    name: 'DESIGN',
    tagline: 'Create the interface and experience before obsessing over implementation.',
    description: 'We craft the interface and user experience before obsessing over implementation, validating ergonomic interactions and aesthetic hierarchy with your team.',
    deliverables: ['Interactive design prototype', 'Tailored design system & components', 'Responsive mobile & desktop views', 'Usability validation tests'],
    duration: 'Phase 3',
    nodeColor: '#8B5CF6'
  },
  {
    id: 'build',
    number: '04',
    name: 'BUILD',
    tagline: 'Engineer the product in focused iterations with continuous validation.',
    description: 'Clean, typed, tested production code. We engineer the product in focused iterations with continuous validation, providing working preview environments.',
    deliverables: ['Production-grade codebase', 'Automated test coverage', 'CI/CD deployment pipeline', 'Continuous staging preview environments'],
    duration: 'Phase 4',
    nodeColor: '#FF5722'
  },
  {
    id: 'launch',
    number: '05',
    name: 'LAUNCH',
    tagline: 'Deploy, monitor, measure, and support the product in the real world.',
    description: 'Production deployment with real-world validation. Data migration from legacy systems, team onboarding, and operational telemetry monitoring.',
    deliverables: ['Production cloud deployment', 'Data migration & validation', 'Team onboarding & runbooks', 'Live telemetry & monitoring'],
    duration: 'Phase 5',
    nodeColor: '#10B981'
  },
  {
    id: 'evolve',
    number: '06',
    name: 'EVOLVE',
    tagline: 'Keep improving as the business changes.',
    description: 'Software that evolves as your business grows. Ongoing feature enhancements, architectural adjustments, and dedicated technical support.',
    deliverables: ['Continuous feature development', 'Performance optimizations', 'Security & dependency maintenance', 'Ongoing engineering partnership'],
    duration: 'Continuous',
    nodeColor: '#06B6D4'
  }
];

export const TECH_ZONES: TechZone[] = [
  {
    id: 'ai',
    category: 'ARTIFICIAL INTELLIGENCE',
    title: 'Artificial Intelligence',
    tagline: 'Practical machine intelligence embedded into daily business operations',
    description: 'AI agents, copilots, intelligent features, smart data extraction, and decision automation.',
    points: ['AI agents and autonomous copilots', 'Intelligent data extraction and processing', 'Domain-specific search and retrieval', 'Automated decision engines'],
    specs: ['Context-aware intelligence', 'Private VPC deployment', 'Strict data privacy controls', 'Deterministic validation guardrails']
  },
  {
    id: 'cloud',
    category: 'CLOUD INFRASTRUCTURE',
    title: 'Cloud Infrastructure',
    tagline: 'Secure and scalable cloud architecture and deployment',
    description: 'Secure and scalable cloud architecture and deployment engineered for high availability and business resilience.',
    points: ['Containerized modular services', 'Serverless and edge compute capabilities', 'Robust security and encryption standards', 'Automated backup and disaster recovery'],
    specs: ['Scalable cloud topology', 'Resilient system failover', 'Encrypted data in transit & at rest', 'Automated deployment pipelines']
  },
  {
    id: 'data',
    category: 'DATA SYSTEMS',
    title: 'Data Systems',
    tagline: 'Structured databases, analytics, and operational visibility',
    description: 'Structured databases, analytics, and operational visibility that transform raw operations into actionable clarity.',
    points: ['Relational and document databases', 'Real-time event processing pipelines', 'Operational reconciliation routines', 'Interactive executive reporting dashboards'],
    specs: ['Structured data models', 'Optimized query indexing', 'Auditable transaction ledgers', 'Reliable database backups']
  },
  {
    id: 'integrations',
    category: 'API INTEGRATIONS',
    title: 'API Integrations',
    tagline: 'Make existing tools communicate smoothly instead of starting over',
    description: 'Make existing tools communicate smoothly instead of starting over. Connect payment gateways, CRMs, ERPs, and internal services.',
    points: ['Payment processing and financial gateways', 'CRM and customer data bridges', 'Logistics and delivery carrier APIs', 'Operational notification and messaging triggers'],
    specs: ['Reliable message delivery', 'Automated error retry handlers', 'Bi-directional webhooks', 'Strict rate-limiting protection']
  }
];

export const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: 'startups',
    category: 'STARTUPS',
    headline: 'Startups',
    subheadline: 'Launch visionary products.',
    description: 'We partner with ambitious founders to engineer production-ready digital products with scalable architecture from day one.',
    challenges: ['Generic no-code tools hit scaling barriers', 'Slow progress with disconnected freelancers', 'Technical debt that risks institutional due diligence'],
    solutions: ['Full-stack software architecture engineered for real scale', 'Clean, documented code ready for team expansion', 'Thoughtful UI/UX crafted around real users'],
    typicalStack: 'Next.js, TypeScript, PostgreSQL, Tailwind, Cloud Services'
  },
  {
    id: 'smes',
    category: 'GROWING SMEs',
    headline: 'Growing SMEs',
    subheadline: 'Eliminate operational bottlenecks.',
    description: 'Growing businesses run on unique processes. We replace chaotic spreadsheets and disconnected SaaS tools with one unified custom platform.',
    challenges: ['Critical information trapped across disconnected spreadsheets', 'Manual data copying causing clerical mistakes and delays', 'Paying for multiple subscriptions with unused features'],
    solutions: ['Single operational platform unifying all team workflows', 'Automated background workflows ending manual data entry', 'Consolidated software tailored to your real team'],
    typicalStack: 'Custom Operating Platform, TypeScript, PostgreSQL, Redis, Modern UI'
  },
  {
    id: 'enterprises',
    category: 'ENTERPRISES',
    headline: 'Enterprises',
    subheadline: 'Custom internal platforms and operational automation.',
    description: 'Organizations requiring granular permissions, compliance, and deep integrations. We build internal platforms and automation engines that work with existing systems.',
    challenges: ['Legacy systems that cannot easily be replaced', 'Rigid off-the-shelf software failing specialized compliance rules', 'Teams waiting on internal IT backlogs'],
    solutions: ['Custom internal portals wrapping existing data layers', 'Role-based access control (RBAC) with audit logging', 'Modern platforms delivered with minimal disruption'],
    typicalStack: 'Modern Cloud Architecture, TypeScript / Go, Microservices, Isolated VPCs, SSO'
  },
  {
    id: 'brands',
    category: 'CREATORS & BRANDS',
    headline: 'Creators & Brands',
    subheadline: 'Unmistakable digital identity and customer-facing digital products.',
    description: 'Standout brands need digital touchpoints that reflect their identity. We engineer custom client portals and digital products that feel native to your brand.',
    challenges: ['Generic templates dilute brand prestige', 'Inability to build distinctive digital customer interactions', 'Lack of direct control over customer experience and data'],
    solutions: ['Bespoke digital product architecture with tailored design', 'Direct customer relationship and data control', 'Distinctive digital products that reinforce brand equity'],
    typicalStack: 'Next.js, Interactive Graphics, Custom Web Platform, Tailored APIs'
  }
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'zero-template',
    number: '01',
    title: 'ZERO TEMPLATE THINKING',
    tagline: 'We start with your operational reality—not a recycled SaaS template.',
    description: 'We never pick a pre-made template and ask your company to conform. Every database schema, user interface, and workflow pipeline starts from how you operate.',
    technicalImplication: '100% custom codebase, zero vendor lock-in, zero pre-canned layout bloat.'
  },
  {
    id: 'detail-obsession',
    number: '02',
    title: 'DETAIL OBSESSION',
    tagline: 'Every interaction, data model, and API endpoint has a reason.',
    description: 'From ergonomic keyboard shortcuts and clear visual states to optimized database indexes, software craft lives in the details.',
    technicalImplication: 'Optimized rendering cycles, structured query execution, and high usability.'
  },
  {
    id: 'business-first',
    number: '03',
    title: 'BUSINESS FIRST',
    tagline: 'Technology follows commercial outcomes.',
    description: 'We don’t add technology for the sake of buzzwords. Every architectural decision is evaluated on whether it delivers clarity, speed, reliability, or business advantage.',
    technicalImplication: 'Pragmatic, battle-tested modern stacks chosen specifically for reliability.'
  },
  {
    id: 'built-to-evolve',
    number: '04',
    title: 'BUILT TO EVOLVE',
    tagline: 'Architecture is designed to scale with the business.',
    description: 'A business is never static. We write modular, well-documented code designed to welcome new features without breaking existing operations.',
    technicalImplication: 'Strict typing, automated testing, and decoupled component architecture.'
  },
  {
    id: 'one-partner',
    number: '05',
    title: 'ONE PARTNER',
    tagline: 'Strategy, UI/UX, engineering and evolution under one roof.',
    description: 'No handoffs between disconnected design agencies and offshore dev shops. One cohesive senior team that takes complete ownership from start to finish.',
    technicalImplication: 'Unified accountability from initial discovery to production monitoring.'
  }
];

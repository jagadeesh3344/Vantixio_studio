import { CapabilityItem, PillarItem, ProcessStage, TechZone, ClientProfile, PrincipleItem } from '../types';

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#transformation' },
  { label: 'About', href: '#standard' },
  { label: 'Contact', href: '#contact' },
];

export const TRUSTED_COMPANIES = [
  { name: 'Stripe', logoText: 'stripe' },
  { name: 'Shopify', logoText: 'shopify' },
  { name: 'Notion', logoText: 'Notion' },
  { name: 'Slack', logoText: 'Slack' },
  { name: 'AWS', logoText: 'aws' },
  { name: 'Google Cloud', logoText: 'Google Cloud' },
  { name: 'Figma', logoText: 'Figma' },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'web-apps',
    number: '01',
    title: 'Custom Web Apps',
    summary: 'Portals, real-time dashboards, marketplaces, internal operating systems and client portals.',
    description: 'Bespoke web applications engineered for heavy concurrent usage, sub-second latency, and pixel-perfect design tailored to your team’s exact workflows.',
    features: ['Real-time executive dashboards', 'High-security client & partner portals', 'Scalable multi-sided marketplaces', 'Internal operating systems (ERP/OS)', 'Dynamic data exploration workspaces'],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    iconType: 'web',
    badge: 'ENTERPRISE WEB',
    architectureDetails: 'Zero-latency WebSocket sync with multi-tenant row-level access security.'
  },
  {
    id: 'mobile-products',
    number: '02',
    title: 'Mobile Products',
    summary: 'iOS, Android and cross-platform apps built around real-world field and mobile usage.',
    description: 'High-performance mobile client software crafted for seamless offline support, location-aware field operations, hardware telemetry, and fluid touch mechanics.',
    features: ['Native iOS & Android compilation', 'Offline-first database synchronization', 'Field operations & worker tooling', 'Biometric auth & secure sandboxing', 'Push notification orchestration'],
    techStack: ['React Native', 'Swift', 'Kotlin', 'SQLite / WatermelonDB', 'GraphQL'],
    iconType: 'mobile',
    badge: 'MOBILE & FIELD',
    architectureDetails: 'Optimized local state caches with bidirectional background synchronization.'
  },
  {
    id: 'business-systems',
    number: '03',
    title: 'Business Systems',
    summary: 'POS systems, ERP-style workflows, inventory control, CRM, and automated logic.',
    description: 'Replace fragmented spreadsheets and rigid off-the-shelf software with a custom operating engine built around your company’s true commercial cadence.',
    features: ['Custom POS & multi-location register', 'Live inventory & supply chain tracking', 'Tailored relationship pipelines (CRM)', 'Automated approvals & governance', 'Financial ledger reconciliation'],
    techStack: ['Distributed SQL', 'Kafka Streams', 'Event Sourcing', 'Audit Ledger'],
    iconType: 'business',
    badge: 'CORE OPS',
    architectureDetails: 'Immutable event sourcing ensuring 100% auditable transactional integrity.'
  },
  {
    id: 'ai-products',
    number: '04',
    title: 'AI Products',
    summary: 'AI copilots, intelligent agents, smart search, document workflows and decision tools.',
    description: 'Context-aware intelligence embedded directly into your operational software. We build autonomous copilots and parsing pipelines that understand your private domain data.',
    features: ['Autonomous task-solving agents', 'Domain-trained copilot assistants', 'Multimodal document extraction', 'Semantic vector search & retrieval', 'Predictive business decision engines'],
    techStack: ['Gemini 2.5 / LLMs', 'Vector Databases', 'LangChain / Custom RAG', 'Python', 'FastAPI'],
    iconType: 'ai',
    badge: 'INTELLIGENCE',
    architectureDetails: 'Private VPC inference with enterprise guardrails and zero data leakage.'
  },
  {
    id: 'integrations',
    number: '05',
    title: 'Integrations',
    summary: 'Payments, APIs, databases, messaging, analytics and third-party systems.',
    description: 'Unify legacy databases, third-party payment gateways, logistics carriers, and internal communications into one cohesive, automated digital nervous system.',
    features: ['Bi-directional webhook synchronization', 'Legacy mainframe & database bridges', 'Stripe, Adyen & banking gateways', 'Slack, Teams & SMS notifications', 'Fault-tolerant message queues'],
    techStack: ['REST', 'GraphQL', 'gRPC', 'RabbitMQ', 'Stripe API', 'OAuth2 / SSO'],
    iconType: 'integrations',
    badge: 'CONNECTIVITY',
    architectureDetails: 'Dead-letter queues with exponential backoff and 99.999% message delivery SLA.'
  },
  {
    id: 'workflow-automation',
    number: '06',
    title: 'Workflow Automation',
    summary: 'Replace repetitive manual work with reliable software workflows that run in the background.',
    description: 'Eliminate human copy-pasting, recurring data reconciliation, and manual email follow-ups. Build self-healing background automation pipelines that work 24/7.',
    features: ['Scheduled batch data reconciliations', 'Automated customer invoice generation', 'Incident alerting & auto-triage', 'Cross-departmental status triggers', 'Executive weekly PDF digest generator'],
    techStack: ['Temporal.io', 'Cron Workers', 'Serverless Functions', 'Redis Queues'],
    iconType: 'automation',
    badge: 'ZERO REPETITION',
    architectureDetails: 'Distributed fault-tolerant workflow orchestrators with state checkpointing.'
  }
];

export const VANTIXIO_PILLARS: PillarItem[] = [
  {
    id: 'workflow',
    number: '01',
    code: 'WORKFLOW',
    title: 'Your Process',
    subtitle: 'Not our template',
    description: 'Engineered around your exact daily steps—never an awkward off-the-shelf template. Every click and approval reflects the way your people naturally work.',
    techHighlight: 'Custom state machine transitions modeling your company hierarchy',
    metrics: '0% workflow friction'
  },
  {
    id: 'interface',
    number: '02',
    code: 'INTERFACE',
    title: 'Your Context',
    subtitle: 'Your people, your environment',
    description: 'Designed for your operators, field teams, and leadership. High density where speed matters, simplified clarity where focus counts.',
    techHighlight: 'Adaptive viewport layouts optimized for high-volume desktop & mobile operations',
    metrics: '3.4x faster execution speed'
  },
  {
    id: 'logic',
    number: '03',
    code: 'LOGIC',
    title: 'Your Rules',
    subtitle: 'Automated business logic',
    description: 'Automated decisions and business logic custom-coded to match your operating model. Edge cases handled with precision, not awkward workarounds.',
    techHighlight: 'Deterministic rule engines executing multi-stage validations in milliseconds',
    metrics: '100% custom calculation logic'
  },
  {
    id: 'brand',
    number: '04',
    code: 'BRAND',
    title: 'Your Identity',
    subtitle: 'A product that feels native to your identity',
    description: 'A sleek, native visual experience that feels unmistakably part of your company. Build digital equity in software that carries your exact brand prestige.',
    techHighlight: 'Design token architecture expressing bespoke typography, color and spatial physics',
    metrics: 'Unmistakable enterprise presence'
  },
  {
    id: 'scale',
    number: '05',
    code: 'SCALE',
    title: 'Your Future',
    subtitle: 'High-performance architecture',
    description: 'High-performance architecture built for where your business is going next. Modular, containerized codebases that accommodate rapid commercial expansion.',
    techHighlight: 'Cloud-native auto-scaling clusters with decoupled microservices',
    metrics: '10x traffic elasticity'
  }
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discover',
    number: '01',
    name: 'DISCOVER',
    tagline: 'Map the business, workflow friction, and success metrics',
    description: 'We don’t start with wireframes; we start with your balance sheet, your team’s day-to-day bottlenecks, and the structural friction in your current software setup.',
    deliverables: ['Operational bottleneck audit', 'Technical requirements matrix', 'User workflow mapping', 'Success metric baseline'],
    duration: 'Week 1 - 2',
    nodeColor: '#19D3E6'
  },
  {
    id: 'architect',
    number: '02',
    name: 'ARCHITECT',
    tagline: 'Define schema, technology stack, permissions, APIs, and edge cases',
    description: 'We blueprint the digital nervous system. Data models, database schema, security boundaries, third-party integrations, and performance benchmarks.',
    deliverables: ['System architecture blueprint', 'Database entity schema (ERD)', 'Security & RBAC specification', 'API contract definitions'],
    duration: 'Week 2 - 3',
    nodeColor: '#2563EB'
  },
  {
    id: 'design',
    number: '03',
    name: 'DESIGN',
    tagline: 'Create the interface and user experience before implementation',
    description: 'We craft high-fidelity, interactive prototypes. Your team tests the real interface, validating ergonomic keyboard shortcuts, data density, and aesthetic hierarchy.',
    deliverables: ['Interactive design prototype', 'Custom design system & components', 'Mobile & tablet responsive views', 'Usability validation test'],
    duration: 'Week 3 - 4',
    nodeColor: '#8B5CF6'
  },
  {
    id: 'engineer',
    number: '04',
    name: 'ENGINEER',
    tagline: 'Build full-stack software in focused iterations with continuous validation',
    description: 'Clean, typed, tested production code. We deliver working software in continuous two-week sprints, keeping you in full visibility with preview environments.',
    deliverables: ['Production TypeScript codebase', 'Automated test coverage (unit & e2e)', 'CI/CD deployment pipeline', 'Staging preview environments'],
    duration: 'Week 4 - 8',
    nodeColor: '#FF5722'
  },
  {
    id: 'launch',
    number: '05',
    name: 'LAUNCH',
    tagline: 'Deploy, monitor, measure, and support the product in the real environment',
    description: 'Zero-downtime production deployment. Data migration from legacy spreadsheets, team onboarding, and live real-time telemetry tracking.',
    deliverables: ['Cloud production provisioning', 'Legacy data migration & validation', 'Team training & operational runbook', 'Live telemetry & error tracking'],
    duration: 'Week 8 - 9',
    nodeColor: '#10B981'
  },
  {
    id: 'evolve',
    number: '06',
    name: 'EVOLVE',
    tagline: 'Continuously refine and scale the software as the business changes',
    description: 'Software that grows with your business. Ongoing feature enhancements, automated scaling, quarterly security audits, and dedicated engineering support.',
    deliverables: ['Quarterly performance tune-ups', 'Ongoing feature development', 'Security & dependency patches', 'Dedicated engineering SLA'],
    duration: 'Ongoing',
    nodeColor: '#06B6D4'
  }
];

export const TECH_ZONES: TechZone[] = [
  {
    id: 'ai',
    category: 'ARTIFICIAL INTELLIGENCE',
    title: 'AI Agents & Copilots',
    tagline: 'Intelligent features, autonomous agents, and decision automation',
    description: 'Embed advanced machine intelligence directly into your daily workflow. Smart extraction, custom copilots, and deterministic decision engines.',
    points: ['Autonomous background workers', 'Domain-specific retrieval augmented generation (RAG)', 'Real-time document parsing & validation', 'Smart predictive forecasting'],
    specs: ['Sub-200ms latency', 'Zero data retention', 'Private VPC deployment', 'Deterministic guardrails']
  },
  {
    id: 'cloud',
    category: 'CLOUD INFRASTRUCTURE',
    title: 'Secure & Scalable',
    tagline: 'Modern cloud architecture engineered for zero downtime',
    description: 'Enterprise-grade hosting designed for high availability, automatic traffic burst mitigation, disaster recovery, and instant worldwide CDN distribution.',
    points: ['Containerized microservices (Docker/K8s)', 'Serverless edge compute capabilities', 'SOC2 / HIPAA compliant security postures', 'Multi-region automated failover'],
    specs: ['99.99% uptime guarantee', 'Sub-second auto-scaling', 'Encrypted at rest & in transit', 'Continuous automated backup']
  },
  {
    id: 'data',
    category: 'DATA SYSTEMS',
    title: 'Structured & Actionable',
    tagline: 'Real-time analytics pipelines and executive dashboards',
    description: 'Transform dark, trapped business data into high-velocity operational intelligence. Automated reconciliation and interactive executive visibility.',
    points: ['Time-series & relational data stores', 'Real-time event streaming architectures', 'Automated financial & inventory reconciliation', 'Custom drill-down metric visualizers'],
    specs: ['Petabyte scale readiness', 'Sub-millisecond query execution', 'Immutable audit logs', 'Live bi-directional sync']
  },
  {
    id: 'integrations',
    category: 'API INTEGRATIONS',
    title: 'Seamless Tool Connectivity',
    tagline: 'Unifying existing legacy tools so everything communicates smoothly',
    description: 'Bridge the gap between your established software stack and new custom modules without discarding working historical investments.',
    points: ['Stripe, QuickBooks, Xero payment flows', 'Salesforce, HubSpot, custom CRM bridges', 'Logistics, FedEx, DHL carrier APIs', 'Slack, WhatsApp & SMS operational triggers'],
    specs: ['99.999% message delivery', 'Automated error retries', 'Bi-directional webhooks', 'Strict rate-limiting protection']
  }
];

export const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: 'startups',
    category: 'STARTUPS',
    headline: 'Launch Visionary Products',
    subheadline: 'Turn ideas into production-ready software that attracts users and investment',
    description: 'We partner with ambitious founders to build high-grade MVPs and category-defining applications with venture-scale architecture from day one.',
    challenges: ['Generic no-code tools hit walls fast', 'Slow time-to-market with fragmented freelancers', 'Technical debt that scares institutional investors'],
    solutions: ['Full-stack enterprise architecture delivered in weeks', 'Clean, documented code that passes institutional due diligence', 'Intuitive, award-winning UI/UX that delights initial users'],
    typicalStack: 'Next.js, TypeScript, Supabase/PostgreSQL, Tailwind, AWS'
  },
  {
    id: 'smes',
    category: 'GROWING SMEs',
    headline: 'Eliminate Operational Bottlenecks',
    subheadline: 'Replace fragmented tools with custom systems built explicitly around your business',
    description: 'Mid-sized businesses run on custom processes. We replace chaotic spreadsheets and 12 separate SaaS subscriptions with one unified operating system.',
    challenges: ['Critical numbers trapped in 50 disconnected spreadsheets', 'Manual data copying causing expensive clerical mistakes', 'Subscription bloat costing $5,000+/month for unused SaaS features'],
    solutions: ['Single pane of glass unifying all team workflows', 'Automated data pipes ending manual copy-pasting', 'Drastic operating cost reduction and zero license fee penalties'],
    typicalStack: 'Custom ERP/CRM, Node.js microservices, PostgreSQL, Redis, Retool/Tailored UI'
  },
  {
    id: 'enterprises',
    category: 'ENTERPRISES',
    headline: 'Custom Internal Platforms',
    subheadline: 'Build specialized high-security internal platforms and specialized tools',
    description: 'Large organizations require strict compliance, granular permissions, and deep legacy integrations. We build internal tooling that enterprise IT approves.',
    challenges: ['Legacy core systems that cannot be easily updated or replaced', 'Rigid off-the-shelf software failing specialized compliance rules', 'Internal teams waiting months for internal IT resource allocation'],
    solutions: ['High-security bespoke portals wrapping legacy data layers', 'Role-based access control (RBAC) with complete audit logging', 'Accelerated delivery with zero disruption to active business'],
    typicalStack: 'Enterprise K8s, Go / TypeScript, Kafka, Isolated VPCs, SSO / SAML'
  },
  {
    id: 'brands',
    category: 'CREATORS & BRANDS',
    headline: 'Unmistakable Digital Identity',
    subheadline: 'Craft digital products and customer portals that feel unmistakably yours',
    description: 'Standout brands cannot use generic Shopify templates or stock SaaS customer dashboards. We engineer custom digital touchpoints that reinforce brand prestige.',
    challenges: ['Customers feel a jarring disconnect between brand and generic portal software', 'Inability to build unique bespoke customer interactions', 'Loss of customer data ownership to intermediary platforms'],
    solutions: ['Bespoke digital product architecture with bespoke design tokens', '100% proprietary customer relationship and data ownership', 'Immersive, high-performance web experiences that build customer loyalty'],
    typicalStack: 'Next.js, Three.js / WebGL, Custom Headless Commerce, Stripe'
  }
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'zero-template',
    number: '01',
    title: 'ZERO TEMPLATE THINKING',
    tagline: 'We start with your operational reality',
    description: 'We never pick a pre-made template and ask your company to conform. Every schema, button, and data pipeline starts from how you operate.',
    technicalImplication: '100% custom codebase, zero vendor lock-in, zero pre-canned layout bloat.'
  },
  {
    id: 'detail-obsession',
    number: '02',
    title: 'DETAIL OBSESSION',
    tagline: 'Every interaction has a reason',
    description: 'From micro-animations that give cognitive feedback to database indexes that guarantee 40ms queries, craft lives in the details.',
    technicalImplication: 'Optimized rendering cycles, sub-second query performance, WCAG AA compliance.'
  },
  {
    id: 'business-first',
    number: '03',
    title: 'BUSINESS FIRST',
    tagline: 'Technology follows the outcome',
    description: 'We don’t add trendy technology for the sake of buzzwords. Every architectural choice must deliver measurable speed, accuracy, or profitability.',
    technicalImplication: 'Pragmatic, battle-tested modern stacks chosen specifically for reliability.'
  },
  {
    id: 'built-to-evolve',
    number: '04',
    title: 'BUILT TO EVOLVE',
    tagline: 'Your software grows with you',
    description: 'A business is never static. We write modular, well-documented code designed to welcome new features without breaking existing operations.',
    technicalImplication: 'Strict typing, automated test suites, decoupled component architecture.'
  },
  {
    id: 'one-partner',
    number: '05',
    title: 'ONE PARTNER',
    tagline: 'Strategy, design, engineering and iteration under one roof',
    description: 'No handoffs between disconnected design agencies and offshore dev shops. One cohesive senior team that takes complete ownership.',
    technicalImplication: 'Unified accountability from initial discovery to production monitoring.'
  }
];

export const TESTIMONIALS = [
  {
    quote: "They understood our workflow from day one. Instead of telling us how their product works, they sat with our team and built a platform that felt like our brain.",
    author: "Elena Rostova",
    role: "CEO & Founder",
    company: "Aetheria Retail Brand",
    metrics: "42% reduction in order processing time"
  },
  {
    quote: "The platform feels like it was built for us—because it was. We decommissioned 7 different SaaS tools and saved thousands in monthly licensing.",
    author: "Marcus Vance",
    role: "Founder & Managing Director",
    company: "Vance Logistics Global",
    metrics: "$68,000 annual SaaS license savings"
  },
  {
    quote: "Vantixio transformed our operations completely. Manual reconciliation between clinic coordinators and billing that took 4 hours a day now happens instantly in the background.",
    author: "Dr. Sarah Chen",
    role: "Operations Lead",
    company: "Nexus Health Systems",
    metrics: "4 hours daily administrative labor reclaimed"
  }
];

export interface NavItem {
  label: string;
  href: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  techStack: string[];
  iconType: 'web' | 'mobile' | 'business' | 'ai' | 'integrations' | 'automation';
  badge: string;
  architectureDetails: string;
}

export interface PillarItem {
  id: string;
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  techHighlight: string;
  metrics: string;
}

export interface ProcessStage {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  duration: string;
  nodeColor: string;
}

export interface TechZone {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  specs: string[];
}

export interface ClientProfile {
  id: string;
  category: string;
  headline: string;
  subheadline: string;
  description: string;
  challenges: string[];
  solutions: string[];
  typicalStack: string;
}

export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technicalImplication: string;
}

export interface ProjectBriefState {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  problemDescription: string;
  userScale: string;
  budgetRange: string;
  timeline: string;
  selectedIntegrations: string[];
}

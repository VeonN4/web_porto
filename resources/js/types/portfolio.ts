export interface HeroSettings {
  headline: string;
  subheadline: string;
  tagline: string;
  description: string;
  status: string[];
  core_stack: string[];
}

export interface AboutSettings {
  header: string;
  competencies_header: string;
  concrete_image: string;
  paragraphs: string[];
  competencies: string[];
  sys_config_location: string;
  sys_config_timezone: string;
  sys_config_status: string;
  sys_config_languages: string[];
  sys_config_frameworks: string[];
}

export interface ExperienceItem {
  id: number;
  slug: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
  technologies: string[];
  position: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  github_url: string | null;
  demo_url: string | null;
  details: string | null;
  tags: string[];
  position: number;
}

export interface TechStackItem {
  id: number;
  type: 'core' | 'featured' | 'backend' | 'infrastructure' | 'tooling';
  name: string;
  icon: string | null;
  description: string | null;
  version: string | null;
  index_label: string | null;
  role: string | null;
  bullets: string[] | null;
  position: number;
}

export interface LogMessage {
  text: string;
  type: 'info' | 'error' | 'success' | 'input';
  timestamp: string;
}

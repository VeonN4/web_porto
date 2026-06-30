export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: string;
  details?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
  technologies: string[];
}

export interface TechStackItem {
  name: string;
  icon: string;
  description: string;
  version?: string;
  indexLabel?: string;
}

export interface LogMessage {
  text: string;
  type: 'info' | 'error' | 'success' | 'input';
  timestamp: string;
}

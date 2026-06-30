import { Project, ExperienceItem, TechStackItem } from './types';

export const HERO_DATA = {
  headline: 'ENGINEERING',
  subheadline: 'THE INVISIBLE',
  tagline: 'SYSTEM ONLINE',
  description: 'I am Alex. A software engineer and systems architect specializing in high-performance infrastructure and minimalist brutalist interfaces. Code as structural art.',
  status: [
    'Deploying scalable microservices.',
    'Optimizing rust binaries.',
    'Seeking complex problems.'
  ],
  coreStack: ['Rust', 'TypeScript', 'Go', 'React', 'k8s']
};

export const ABOUT_DATA = {
  header: 'SYSTEM.INFO',
  paragraphs: [
    'I engineer scalable architectures and build uncompromising digital interfaces. My focus is on creating systems that are performant, resilient, and structurally sound. I believe in minimalism not as an aesthetic choice, but as an operational necessity—removing complexity to reveal clarity.',
    'With over a decade of experience bridging the gap between back-end infrastructure and front-end execution, I specialize in distributed systems, modern web frameworks, and creating developer tools that accelerate velocity.',
    'When I\'m not writing code, I\'m analyzing system logs, optimizing compile times, or studying brutalist architecture.'
  ],
  competenciesHeader: 'Core_Competencies',
  competencies: [
    'System Architecture & Design',
    'High-Performance Web Applications',
    'API Development (REST, GraphQL, gRPC)',
    'Database Optimization & Scaling',
    'UI/UX Engineering (Component Driven)'
  ],
  sysConfig: {
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    status: 'Available for contract',
    languages: ['TypeScript', 'Rust', 'Go', 'Python'],
    frameworks: ['React', 'Next.js', 'Node.js', 'TailwindCSS']
  },
  concreteImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRmWA4JFr8WRvWeIqdRgLyTZUL78ImP926YBllFIGcKhjo7Zx_iQ0A3kOxVK8Asvjyg3mhMl3uu59ahTiwy9ne4znrCBdsmcyMjdYVEnPUxNGjQvvBr-OGudC74L_L92LaRdt7bSk1wSE5wdsPVrvaL1VoSkamUJlLPt9a3FCwBEYcaorxT2FwbZTg9PJDJi2Kv5Q4RUZSCCk7q1QfOYWEXi0NLNALqwtU4dPnmjuPRjQR6ydtZDM4FEPSpm0U2NXet1j-LPhGPhXN'
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'stellar-dynamics',
    role: 'Senior Systems Engineer',
    company: 'Stellar Dynamics Inc.',
    period: '2021 — PRESENT',
    bullets: [
      'Architected microservices infrastructure scaling to 5M+ daily requests, reducing latency by 40%.',
      'Led a team of 5 engineers in migrating legacy monolith to Kubernetes-orchestrated containers.',
      'Implemented zero-downtime deployment pipelines using GitHub Actions and ArgoCD.'
    ],
    technologies: ['Go', 'Kubernetes', 'AWS']
  },
  {
    id: 'quantum-analytics',
    role: 'Full Stack Developer',
    company: 'Quantum Analytics',
    period: '2018 — 2021',
    bullets: [
      'Developed real-time data visualization dashboards for enterprise clients using React and D3.js.',
      'Designed and optimized RESTful APIs in Node.js, improving data retrieval speeds by 60%.'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'nexus-tech',
    role: 'Backend Engineer',
    company: 'Nexus Technologies',
    period: '2016 — 2018',
    bullets: [
      'Maintained and refactored core backend services written in Python.',
      'Collaborated with data science team to integrate machine learning models into production environments.'
    ],
    technologies: ['Python', 'Django', 'Redis']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'neural-net-api',
    title: 'NEURAL_NET_API',
    description: 'High-throughput inference API for distributed machine learning models. Built to handle 10k+ concurrent requests with sub-50ms latency.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo8nt8q_hEeoX7WSeiFwRP7f1ktgJzFtQh6skqH5WgZXPoZhtxPaZhkWxvum8Nll9XEQ4D83HsrELU_w7dMJIiZlGxtOEhYQ-5m3GMMefmpn-332mt-X0xTHHnyEpwUcAlTbrtwY3h5K13bSUkP2BCwJie71g4c2hjkRG7mFw75nqjUcXO1HCriUaCozCzTJY0Zu7gzs7AIYwJvwlzedk61gjyN2Eke7x7tNvMnRefHtsXq7oTotvotWO8bQ91_fVm9KTj6d_w7tEK',
    tags: ['Rust', 'gRPC', 'Redis'],
    status: 'production',
    githubUrl: 'https://github.com/alex-dev/neural-net-api',
    demoUrl: '#',
    details: 'This system compiles down to highly optimized binaries. It leverages cross-beam channels for lock-free concurrency and stores transient weight indices in a memory-mapped cache.'
  },
  {
    id: 'synapse-db',
    title: 'SYNAPSE_DB',
    description: 'Custom distributed key-value store optimized for read-heavy workloads. Implements a bespoke Raft consensus algorithm for fault tolerance.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3U-4I-YMfWwCEwkcoMwC3bP3BvmQLO-dE4vL0TOYsOYxUuKZkcaLEfGq0oLJRLGLcSW7X26eUbZs9CD_Lo_3EXAPop1bK8ieuMwguV-Dt46bIVGq6Va_RMfqleW9jI9qtDTwFZ4tjvqUH1khHN6aSxErYR6oGrbPajzje9E50so3t5tij6WWcyaA2iXBp-XEhf2YLjjevwlj6xoQNMwOfwj5AyMfHAFikmO6PpQ_GdD9NzicYyXjGFDxdKpKi3T9gCoTD3PWzbFRU',
    tags: ['Go', 'Raft', 'LevelDB'],
    status: 'production',
    githubUrl: 'https://github.com/alex-dev/synapse-db',
    demoUrl: '#',
    details: 'A clean implementation of Raft consensus with leader election, log replication, and safe state machines. Features dynamic cluster membership changes and auto-snapshotting of key spaces.'
  },
  {
    id: 'quantum-router',
    title: 'QUANTUM_ROUTER',
    description: 'Layer 7 load balancer with predictive routing capabilities. Uses ML to dynamically adjust traffic paths based on historical anomaly data.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB0nsdb2wBloqC7V4Z-Zn-9c-b05q1aZ3xrPypUZ-C332WiMmz7w80NslZV2ng1OcJTESLMk0UHdCSyw0wyaxjURt8kPk_CCWDBUIa3q6BnYOxj7Izf8lFkxC3JM76bDa1m_visoUY0Qqa86yNa1EVk_BRwRVZo5GQtMODh6lrfkSH2_nOWwDPurQNMlVhpnptHIj2gH8gdgpavQLgz2ajTKIiTPtTZ-IHT7rl9QuTlDqL0FH6cfSZA8qwTEoOmNEMXL0RrQVXu1Fr',
    tags: ['C++', 'eBPF', 'Envoy'],
    status: 'production',
    githubUrl: 'https://github.com/alex-dev/quantum-router',
    demoUrl: '#',
    details: 'Utilizes Linux eBPF filters for ultra-fast kernel-level packet inspection, feeding metrics into an inline neural network proxy modeled on raw TCP flow signatures.'
  },
  {
    id: 'void-ui-library',
    title: 'VOID_UI_LIBRARY',
    description: 'Headless UI component library built for extreme performance and zero runtime overhead. Strictly unstyled, providing structural primitives.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpFIeg9KDx1FjD0pF1w3kLHohOIc3ZePsyZ_QQyJhkaa6lJBIWeJkGFPaajxgpQYC9UM3Ssh_NQ_RIC_kYKKwT6N3g6vOv-b29P7W-W1uG7IeCfBu0V6-sKWDVDNDF3AvoYQKks7T60KyXDIRNM8NegVV223YJ-LK_r1dl0MLZu8818Q3CcrD6YNqZDSn61HoC2MTsqthK_f2o9-zeXOzql5_ouEH8NtG3dZTiCTaOSejcmQenPVqrT5K984PUP7RA0SMU6uCqwn',
    tags: ['TypeScript', 'React', 'Tailwind'],
    status: 'production',
    githubUrl: 'https://github.com/alex-dev/void-ui-library',
    demoUrl: '#',
    details: 'Focuses entirely on standard accessibility tree hooks and focus state managers. It includes no pre-packaged theme styles, which yields a bundle weight of just 1.2kB gzipped.'
  }
];

export const STACK_CORES: TechStackItem[] = [
  {
    name: 'React',
    icon: 'Code',
    description: 'v18.x / Concurrent Mode',
    indexLabel: '01'
  },
  {
    name: 'TypeScript',
    icon: 'Braces',
    description: 'Strict Mode Enabled',
    indexLabel: '02'
  },
  {
    name: 'Next.js',
    icon: 'Globe',
    description: 'App Router / SSR',
    indexLabel: '03'
  }
];

export const STACK_FEATURED = {
  name: 'Tailwind CSS',
  icon: 'Palette',
  description: 'Utility-first styling for rapid, consistent UI development. Custom design system integration.',
  bullets: [
    'JIT Compiler',
    'Custom Tokens',
    'CSS Variables'
  ],
  indexLabel: 'UI'
};

export const STACK_BACKENDS: TechStackItem[] = [
  {
    name: 'Node.js',
    icon: 'Cpu',
    description: 'Runtime Environment'
  },
  {
    name: 'Python',
    icon: 'Terminal',
    description: 'Data & Scripting'
  },
  {
    name: 'PostgreSQL',
    icon: 'Database',
    description: 'Relational Data'
  },
  {
    name: 'Redis',
    icon: 'HardDrive',
    description: 'Caching Layer'
  }
];

export const STACK_INFRASTRUCTURE = [
  { name: 'Docker', role: 'Containerization' },
  { name: 'AWS', role: 'Cloud Provider' },
  { name: 'Vercel', role: 'Edge Deployment' }
];

export const STACK_TOOLING = [
  { name: 'Git', role: 'Version Control' },
  { name: 'Vite', role: 'Build Tool' },
  { name: 'Figma', role: 'UI Design' }
];

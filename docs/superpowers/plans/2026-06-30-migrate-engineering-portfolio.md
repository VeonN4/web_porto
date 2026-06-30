# Migrate engineering-portfolio into Laravel Inertia — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the standalone `engineering-portfolio/` React app into the Laravel Inertia project as a single Inertia page.

**Architecture:** One Inertia page (`portfolio.tsx`) with the full scroll-based portfolio. Four unchanged components moved into `resources/js/components/`. CSS merged into existing `resources/css/app.css`. Route stays `GET /`.

**Tech Stack:** Laravel 13, Inertia.js v3, React 19, Tailwind CSS v4, TypeScript 5.7, lucide-react

## Global Constraints

- Function name stays `App()` (user preference)
- Components port as-is, zero changes
- Contact form stays visual-only (no backend)
- Tailwind v4 `@theme` directive for tokens
- Path alias `@/*` maps to `resources/js/*`

---

### Task 1: Install lucide-react

**Files:**
- Modify: `package.json` (via pnpm)

**Steps:**

- [ ] **Step 1: Add lucide-react dependency**

Run: `pnpm add lucide-react`

Expected: lucide-react added to `package.json` dependencies

- [ ] **Step 2: Verify install**

Run: `pnpm ls lucide-react`

Expected: shows lucide-react version

---

### Task 2: Create portfolio types

**Files:**
- Create: `resources/js/types/portfolio.ts`
- Modify: `resources/js/types/index.ts`

**Interfaces produced:** `Project`, `ExperienceItem`, `TechStackItem`, `LogMessage`

- [ ] **Step 1: Create portfolio types file**

Create `resources/js/types/portfolio.ts`:

```ts
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
```

- [ ] **Step 2: Update types barrel export**

Replace content of `resources/js/types/index.ts`:

```ts
export type * from './auth';
export type * from './portfolio';
```

---

### Task 3: Create portfolio data file

**Files:**
- Create: `resources/js/data.ts`

**Produces:** All portfolio content constants consumed by page and Terminal component.

- [ ] **Step 1: Create data.ts**

Create `resources/js/data.ts` — copy from `engineering-portfolio/src/data.ts` with one import path fix:

```ts
import type { Project, ExperienceItem, TechStackItem } from '@/types/portfolio';

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
```

---

### Task 4: Merge CSS

**Files:**
- Modify: `resources/css/app.css`

**Produces:** Complete Tailwind v4 theme with JetBrains Mono font, color tokens, and brutalist utilities.

- [ ] **Step 1: Replace app.css content**

Replace content of `resources/css/app.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
@import 'tailwindcss';

@source '../views';
@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';

@theme {
  --font-sans: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --color-background: #09090B;
  --color-surface-container-lowest: #0e0e10;
  --color-surface-container-low: #1c1b1d;
  --color-surface-container-high: #2a2a2c;
  --color-surface-container-highest: #353437;
  --color-outline-variant: #3F3F46;
  --color-on-surface-variant: #c4c7c8;
}

@layer base {
  body {
    background-color: #09090B;
    color: #e5e1e4;
    font-family: var(--font-sans);
  }

  ::selection {
    background-color: #ffffff;
    color: #000000;
  }
}

.brutalist-btn {
  border: 1px solid #ffffff;
  background-color: transparent;
  color: #ffffff;
  transition: all 0.2s ease;
}
.brutalist-btn:hover {
  background-color: #ffffff;
  color: #09090B;
}

.brutalist-border {
  border: 1px solid #3F3F46;
}
.brutalist-border:hover {
  border-color: #ffffff;
}

.bg-grid {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(63, 63, 70, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(63, 63, 70, 0.15) 1px, transparent 1px);
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #09090B;
}
::-webkit-scrollbar-thumb {
  background: #3F3F46;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}

.timeline-line {
  width: 1px;
  background-color: #3F3F46;
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
}

@media (min-width: 768px) {
  .timeline-line {
    left: 50%;
    transform: translateX(-50%);
  }
}

.mono-bracket::before { content: "[ "; color: #8e9192; }
.mono-bracket::after { content: " ]"; color: #8e9192; }
```

---

### Task 5: Create components

**Files:**
- Create: `resources/js/components/Navbar.tsx`
- Create: `resources/js/components/Terminal.tsx`
- Create: `resources/js/components/ContactModal.tsx`
- Create: `resources/js/components/ProjectModal.tsx`

**Produces:** Four components with import paths updated for `@/types/portfolio` and `@/data`.

- [ ] **Step 1: Create Navbar.tsx**

Create `resources/js/components/Navbar.tsx` — copy from `engineering-portfolio/src/components/Navbar.tsx` verbatim (no import changes needed, only uses `lucide-react`):

```tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onContactClick: () => void;
  onTerminalClick: () => void;
}

export default function Navbar({ activeSection, setActiveSection, onContactClick, onTerminalClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HERO', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'EXP', id: 'exp' },
    { label: 'STACK', id: 'stack' },
    { label: 'PROJECTS', id: 'projects' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-background border-b border-outline-variant sticky top-0 z-50 transition-colors duration-200">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => handleNavClick('hero')}
          className="font-headline-md text-xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
          id="nav-logo"
        >
          ALEX_DEV
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-xs tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-${item.id}`}
                className={`transition-all duration-200 uppercase pb-1 border-b ${
                  isActive
                    ? 'text-white border-white font-bold'
                    : 'text-on-surface-variant border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={onTerminalClick}
            className="border border-outline-variant px-4 py-2 text-on-surface-variant hover:text-white hover:border-white text-xs uppercase tracking-wider transition-colors duration-200"
            id="nav-terminal-btn"
          >
            TERMINAL
          </button>
          <button
            onClick={onContactClick}
            className="brutalist-btn text-xs px-4 py-2 uppercase tracking-wider font-semibold"
            id="nav-contact-btn"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-3 items-center">
          <button
            onClick={onTerminalClick}
            className="border border-outline-variant px-3 py-1.5 text-on-surface-variant hover:text-white text-xs uppercase tracking-wider"
            id="mobile-nav-terminal"
          >
            [ &gt;_ ]
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1 hover:text-on-surface-variant focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-outline-variant bg-background px-4 py-6 flex flex-col gap-4 animate-fadeIn" id="mobile-menu-drawer">
          <div className="flex flex-col gap-4 font-semibold text-sm tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-${item.id}`}
                  className={`text-left uppercase py-2 border-l-2 pl-4 ${
                    isActive
                      ? 'text-white border-white font-bold bg-white/5'
                      : 'text-on-surface-variant border-transparent hover:text-white hover:border-white/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-outline-variant">
            <button
              onClick={() => {
                setIsOpen(false);
                onTerminalClick();
              }}
              className="border border-outline-variant px-4 py-2.5 text-center text-xs uppercase tracking-wider text-white"
            >
              Terminal
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onContactClick();
              }}
              className="brutalist-btn text-center text-xs py-2.5 uppercase tracking-wider font-semibold"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Create Terminal.tsx**

Create `resources/js/components/Terminal.tsx` — copy from `engineering-portfolio/src/components/Terminal.tsx` with import path fixes:

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, ShieldAlert } from 'lucide-react';
import type { LogMessage } from '@/types/portfolio';
import { HERO_DATA, ABOUT_DATA, EXPERIENCE_DATA, PROJECTS_DATA } from '@/data';

interface TerminalProps {
  onClose: () => void;
  onContactTrigger: () => void;
}

export default function Terminal({ onClose, onContactTrigger }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogMessage[]>([
    {
      text: 'SYSTEM BOOT: Successful. Welcome to Alex\'s Systems Core.',
      type: 'info',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      text: 'Type "help" to view a list of available terminal instructions.',
      type: 'success',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: LogMessage[] = [
      ...history,
      {
        text: `> ${cmd}`,
        type: 'input',
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case 'help':
        newLogs.push({
          text: `Available Core Instructions:
  - help      : Show this diagnostic map
  - about     : Fetch Alex's systems biography & core info
  - exp       : Dump professional engineering trajectory
  - stack     : Enumerate technical frameworks and compiler targets
  - projects  : List high-performance custom services
  - sysconfig : Output raw content of sys_config.yml
  - contact   : Open secure transmission port for contacting Alex
  - hack      : Toggle high-density systems visualizer
  - clear     : Flush active terminal output stream`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'about':
        newLogs.push({
          text: `ALEX_DEV STATUS: ACTIVE
----------------------------------------
${ABOUT_DATA.paragraphs.join('\n\n')}

Core Competencies:
${ABOUT_DATA.competencies.map(c => ` * ${c}`).join('\n')}`,
          type: 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'exp':
        const expText = EXPERIENCE_DATA.map(item => (
          `[ ${item.role} ]
  Company : ${item.company}
  Period  : ${item.period}
  Bullets :
${item.bullets.map(b => `    * ${b}`).join('\n')}
  Stack   : [ ${item.technologies.join(' ][ ')} ]`
        )).join('\n\n----------------------------------------\n\n');

        newLogs.push({
          text: `ENGINEERING HISTORIC TRAJECTORY:
----------------------------------------
${expText}`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'stack':
        newLogs.push({
          text: `COMPILER TARGETS & CORE TECHNOLOGY STACK:
----------------------------------------
Core Stack:
  - React (v18 Concurrent Mode)
  - TypeScript (Strict Mode)
  - Next.js (SSR / Server Actions)
  - Tailwind CSS (JIT Engine)

Backend Ecosystem:
  - Node.js (Runtime)
  - Python (Scipy / Django)
  - PostgreSQL (Relational Indexing)
  - Redis (Memory Caching Layer)

Infrastructure & Tools:
  - Docker, AWS, Vercel, Kubernetes, Git, Vite`,
          type: 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'projects':
        const projText = PROJECTS_DATA.map(p => (
          `[ ${p.title} ]
  Status : ${p.status.toUpperCase()}
  About  : ${p.description}
  Stack  : ${p.tags.join(' | ')}
  Detail : ${p.details || 'N/A'}`
        )).join('\n\n----------------------------------------\n\n');

        newLogs.push({
          text: `DUMPING ACTIVE REPOSITORIES:
----------------------------------------
${projText}`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'sysconfig':
        newLogs.push({
          text: `--- sys_config.yml ---
location: "${ABOUT_DATA.sysConfig.location}"
timezone: "${ABOUT_DATA.sysConfig.timezone}"
status: "${ABOUT_DATA.sysConfig.status}"
languages:
  - "[ ${ABOUT_DATA.sysConfig.languages.join(' ]"\n  - "[ ')} ]"
frameworks:
  - "[ ${ABOUT_DATA.sysConfig.frameworks.join(' ]"\n  - "[ ')} ]"`,
          type: 'info',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'contact':
        newLogs.push({
          text: 'INITIALIZING SECURE PORT TRANSMISSION OVERLAY...',
          type: 'success',
          timestamp: new Date().toLocaleTimeString()
        });
        setTimeout(() => {
          onContactTrigger();
        }, 800);
        break;

      case 'hack':
        setIsMatrixMode(!isMatrixMode);
        newLogs.push({
          text: isMatrixMode ? 'DE-ACTIVATING DENSITY VISUALIZER.' : 'DENSITY VISUALIZER ENGAGED. SECURE CORRIDORS ESTABLISHED.',
          type: isMatrixMode ? 'info' : 'error',
          timestamp: new Date().toLocaleTimeString()
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newLogs.push({
          text: `Command not recognized: "${trimmed}". Type "help" to see available commands.`,
          type: 'error',
          timestamp: new Date().toLocaleTimeString()
        });
    }

    setHistory(newLogs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className={`fixed z-50 bg-[#09090B] border-2 border-white/30 flex flex-col font-mono text-sm leading-relaxed transition-all duration-300 ${
        isFullscreen
          ? 'inset-0 m-0'
          : 'bottom-4 right-4 left-4 md:left-auto md:w-[680px] h-[450px]'
      }`}
      id="terminal-console"
    >
      {/* Header bar */}
      <div className="bg-[#18181B] border-b border-white/20 px-4 py-2.5 flex justify-between items-center select-none shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-white animate-pulse" />
          <span className="text-white font-bold text-xs tracking-wider uppercase">core_systems_terminal.sh</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-gray-400 hover:text-white transition-colors"
            title={isFullscreen ? 'Minimize' : 'Maximize'}
            id="terminal-maximize-btn"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            title="Close Terminal"
            id="terminal-close-btn"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal log output */}
      <div
        className={`flex-grow p-4 overflow-y-auto font-mono select-text selection:bg-white selection:text-black ${
          isMatrixMode ? 'bg-[#051105] text-[#33ff33]' : 'bg-[#09090B] text-gray-300'
        }`}
        id="terminal-output-container"
      >
        <div className="space-y-3">
          {history.map((log, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                log.type === 'error'
                  ? 'text-red-400'
                  : log.type === 'success'
                  ? 'text-green-400 font-semibold'
                  : log.type === 'input'
                  ? 'text-white font-bold'
                  : 'text-gray-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          {isMatrixMode && (
            <div className="text-[#33ff33] opacity-65 text-xs animate-pulse font-mono py-2 bg-black/40 border border-green-900/40 px-3">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldAlert className="h-4 w-4 animate-bounce text-red-500" />
                <span>DYNAMIC FEED VISUALIZER [ONLINE]</span>
              </div>
              <p>&gt; MEMORY POOL ADDR: 0x7FFF56D89</p>
              <p>&gt; TCP SOCKET: LISTEN 3000 -&gt; 0.0.0.0</p>
              <p>&gt; SYSTEM METRICS: CPU 12% | RAM 4.2GB/16.0GB</p>
              <p>&gt; MONITORS: STACK TRACE COMPLETE [EXIT 0]</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-[#121214] border-t border-white/10 px-4 py-3 flex items-center gap-2 shrink-0">
        <span className="text-white font-bold selection:bg-transparent select-none">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type instruction (e.g. 'help', 'about', 'projects')..."
          className="flex-grow bg-transparent text-white outline-none font-mono text-sm border-none p-0 focus:ring-0 focus:outline-none placeholder-gray-600"
          id="terminal-input-field"
        />
        <span className="text-xs text-gray-600 font-mono tracking-widest hidden sm:inline select-none">[ENTER TO RUN]</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create ContactModal.tsx**

Create `resources/js/components/ContactModal.tsx` — copy from `engineering-portfolio/src/components/ContactModal.tsx` verbatim (no import changes needed, only uses `lucide-react`):

```tsx
import React, { useState, useEffect } from 'react';
import { X, Send, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const executeTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please provide name, email, and transmission payload.');
      return;
    }

    setIsSending(true);
    setTransmissionLogs([]);

    const logSteps = [
      'Establishing secure handshake protocols...',
      `Resolving gateway endpoint node for ${formData.email}...`,
      'Payload metadata verification: OK',
      'Encrypting message using 256-bit AES cipher...',
      'Opening routing tunnel through systems core...',
      'Transmitting data packet [1/1] (Payload: ' + (formData.message.length + formData.name.length) + ' bytes)...',
      'Awaiting gateway acknowledgment packet...',
      'Transmission ACK received! Status: 202 ACCEPTED',
      'Closing transmission channel safely.'
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 350));
      setTransmissionLogs(prev => [...prev, `[LOG ${new Date().toLocaleTimeString()}] ${logSteps[i]}`]);
    }

    setIsSending(false);
    setIsSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      id="contact-overlay"
    >
      <div
        className="bg-[#09090B] border-2 border-white w-full max-w-lg flex flex-col relative animate-scaleUp"
        id="contact-modal-body"
      >
        {/* Header */}
        <div className="bg-[#18181B] border-b-2 border-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-white animate-pulse" />
            <h2 className="text-white text-xs font-bold tracking-widest uppercase">&gt; ESTABLISH_SECURE_COMMS</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            id="contact-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] flex flex-col gap-6">
          {!isSuccess ? (
            <form onSubmit={executeTransmission} className="flex flex-col gap-4">
              <p className="text-xs text-on-surface-variant font-mono">
                Initiate a high-priority transmission straight to Alex's central node. Fill out the operational parameters below.
              </p>

              {error && (
                <div className="border border-red-500/50 bg-red-950/20 px-3 py-2 text-xs text-red-400 font-mono flex items-center gap-2">
                  <span>[ERROR] : {error}</span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ IDENTIFIER_NAME ]
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Architect Jane"
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ RETURN_ADDRESS_EMAIL ]
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. jane@company.io"
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ TRANSACTION_SUBJECT ]
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Distributed Core Systems Consultation"
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ TRANSMISSION_PAYLOAD ]
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type message data..."
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none resize-none focus:border-white transition-colors"
                />
              </div>

              {isSending && (
                <div className="border border-white/20 bg-white/5 p-4 rounded-none">
                  <p className="text-xs text-white font-bold mb-2 font-mono uppercase tracking-widest animate-pulse flex items-center gap-2">
                    <Send className="h-3 w-3 animate-bounce" /> Sending transmission...
                  </p>
                  <div className="flex flex-col gap-1 max-h-36 overflow-y-auto">
                    {transmissionLogs.map((log, index) => (
                      <p key={index} className="text-[10px] font-mono text-green-400">
                        {log}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {!isSending && (
                <button
                  type="submit"
                  className="brutalist-btn text-xs py-3 font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Transmit Payload
                </button>
              )}
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4 font-mono animate-fadeIn">
              <CheckCircle2 className="h-16 w-16 text-green-400 animate-bounce" />
              <div>
                <h3 className="text-white text-md font-bold uppercase tracking-wider">TRANSMISSION EN ROUTE</h3>
                <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
                  Your packet has successfully passed through our firewall gateways and has been logged on Alex's core systems server. Response priority code: HIGH.
                </p>
              </div>

              <div className="border border-green-500/30 bg-green-950/20 w-full p-4 text-left flex items-start gap-3 mt-4">
                <ShieldCheck className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5 text-[11px] text-green-400">
                  <span className="font-bold uppercase tracking-wide">CIPHER INTEGRITY VERIFIED</span>
                  <span>TRANSMISSION_HASH: 7a82bcf2e8aa192d11</span>
                  <span>ENVELOPE_STATUS: DELIVERED</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                  onClose();
                }}
                className="brutalist-btn text-xs px-6 py-2.5 mt-4 font-semibold uppercase tracking-wider"
              >
                Close Secure Overlay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create ProjectModal.tsx**

Create `resources/js/components/ProjectModal.tsx` — copy from `engineering-portfolio/src/components/ProjectModal.tsx` with import path fix:

```tsx
import React from 'react';
import { X, ExternalLink, Github, Terminal, CheckCircle } from 'lucide-react';
import type { Project } from '@/types/portfolio';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      id={`project-overlay-${project.id}`}
    >
      <div
        className="bg-[#09090B] border-2 border-white w-full max-w-2xl flex flex-col relative animate-scaleUp"
        id={`project-modal-${project.id}`}
      >
        {/* Header */}
        <div className="bg-[#18181B] border-b-2 border-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-white animate-pulse" />
            <h2 className="text-white text-xs font-bold tracking-widest uppercase font-mono">
              &gt; VIEW_SPEC // {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            id={`close-project-${project.id}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] flex flex-col gap-6">
          {/* Image */}
          <div className="w-full h-56 brutalist-border relative overflow-hidden group">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-black/80 border border-green-500/50 px-2 py-1 text-[10px] font-mono text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              <span>{project.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className="text-white text-xl font-bold tracking-tight font-mono">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-on-surface-variant border border-outline-variant px-2 py-0.5 bg-white/5">
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-outline-variant hover:border-white p-2.5 text-on-surface-variant hover:text-white transition-colors flex items-center justify-center"
                    title="Source Code"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={project.demoUrl}
                  className="brutalist-btn px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="border-t border-outline-variant my-2"></div>

            {/* Core Description */}
            <div className="flex flex-col gap-2 font-mono">
              <span className="text-white text-xs font-bold uppercase tracking-wider">[ ARCHITECTURE_SUMMARY ]</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* technical details */}
            {project.details && (
              <div className="flex flex-col gap-2 font-mono mt-2 bg-white/5 border border-outline-variant p-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  SYSTEM SPECIFICATIONS
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {project.details}
                </p>
              </div>
            )}

            {/* Virtual deployment log */}
            <div className="flex flex-col gap-2 font-mono mt-2">
              <span className="text-white text-xs font-bold uppercase tracking-wider">[ PRODUCTION_CONTAINER_METRICS ]</span>
              <div className="bg-black border border-outline-variant p-3 text-[10px] text-green-400 leading-relaxed font-mono space-y-1">
                <p>&gt; docker service inspect {project.title.toLowerCase()}_prod</p>
                <p>&gt; replicas: 5/5 healthy</p>
                <p>&gt; ingress: port 3000 mapping successful</p>
                <p>&gt; telemetry: 99.99% uptime benchmark achieved</p>
                <p>&gt; response time avg: 14.2ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Task 6: Create portfolio page

**Files:**
- Create: `resources/js/pages/portfolio.tsx`

**Produces:** Inertia page component rendering the full portfolio.

- [ ] **Step 1: Create portfolio.tsx**

Create `resources/js/pages/portfolio.tsx` — adapted from `engineering-portfolio/src/App.tsx` with Inertia `Head` added and import paths updated:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { ArrowRight, Code, Terminal as TerminalIcon, Github, Linkedin, ExternalLink, Cpu, Database, Braces, Palette, Globe, HardDrive, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Terminal from '@/components/Terminal';
import ContactModal from '@/components/ContactModal';
import ProjectModal from '@/components/ProjectModal';
import type { Project } from '@/types/portfolio';
import {
  HERO_DATA,
  ABOUT_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  STACK_CORES,
  STACK_FEATURED,
  STACK_BACKENDS,
  STACK_INFRASTRUCTURE,
  STACK_TOOLING
} from '@/data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto detect active section while scrolling
  useEffect(() => {
    const sections = ['hero', 'about', 'exp', 'stack', 'projects'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-30% 0px -50% 0px',
          threshold: 0
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <>
      <Head title="Portfolio" />

      <div className="min-h-screen flex flex-col bg-[#09090B] text-white selection:bg-white selection:text-black bg-grid antialiased relative">

        {/* Top Navbar */}
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onContactClick={() => setIsContactOpen(true)}
          onTerminalClick={() => setIsTerminalOpen(true)}
        />

        {/* Main Content Canvas */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20 flex flex-col gap-24 md:gap-32">

          {/* HERO SECTION */}
          <section id="hero" className="w-full min-h-[70vh] flex flex-col justify-center py-8 scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Headline and Bio */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
                  <span className="text-xs font-bold font-mono text-on-surface-variant uppercase tracking-widest">
                    {HERO_DATA.tagline}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight m-0 uppercase font-sans select-none">
                  {HERO_DATA.headline}
                  <br />
                  <span className="text-[#8e9192]">{HERO_DATA.subheadline}</span>
                </h1>

                <p className="text-base sm:text-lg text-on-surface-variant max-w-xl font-mono leading-relaxed">
                  {HERO_DATA.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById('projects');
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="brutalist-btn text-xs px-6 py-3 uppercase font-bold flex items-center gap-2 cursor-pointer"
                    id="hero-view-projects-btn"
                  >
                    <span>VIEW PROJECTS</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-outline-variant hover:border-white text-white text-xs px-6 py-3 uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
                    id="hero-github-btn"
                  >
                    <Code className="h-4 w-4" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>

              {/* Current Status and Core Stack Card */}
              <div className="md:col-span-4 flex flex-col gap-6 justify-end mt-8 md:mt-0">
                {/* Status card */}
                <div className="brutalist-border p-6 bg-[#18181B] flex flex-col gap-4">
                  <div className="text-xs font-bold text-on-surface-variant uppercase border-b border-outline-variant pb-2 tracking-wider font-mono">
                    CURRENT STATUS
                  </div>
                  <div className="text-xs font-mono text-white space-y-2 leading-relaxed">
                    {HERO_DATA.status.map((item, index) => (
                      <p key={index}>&gt; {item}</p>
                    ))}
                  </div>
                </div>

                {/* Core Stack box */}
                <div className="brutalist-border p-6 bg-[#18181B] flex flex-col gap-4">
                  <div className="text-xs font-bold text-on-surface-variant uppercase border-b border-outline-variant pb-2 tracking-wider font-mono">
                    CORE STACK
                  </div>
                  <div className="flex flex-wrap gap-2.5 font-mono text-xs text-secondary text-gray-300">
                    {HERO_DATA.coreStack.map((item) => (
                      <span key={item} className="mono-bracket">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT SECTION (SYSTEM.INFO) */}
          <section id="about" className="w-full scroll-mt-24 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Header */}
              <div className="md:col-span-12 border-b border-outline-variant pb-6 mb-4">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-mono text-white">
                  &gt; {ABOUT_DATA.header}
                </h2>
              </div>

              {/* About Narrative */}
              <div className="md:col-span-8 flex flex-col gap-6 md:pr-8">
                <div className="text-sm sm:text-base text-on-surface-variant space-y-6 font-mono leading-relaxed">
                  {ABOUT_DATA.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>

                {/* Core Competencies */}
                <div className="mt-8">
                  <h3 className="text-xs font-bold text-white mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest font-mono">
                    &gt; {ABOUT_DATA.competenciesHeader}
                  </h3>
                  <ul className="font-mono text-xs text-on-surface-variant space-y-3">
                    {ABOUT_DATA.competencies.map((comp) => (
                      <li key={comp} className="flex items-center gap-2">
                        <span className="text-white font-bold">*</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Configuration Sidebar */}
              <aside className="md:col-span-4 flex flex-col gap-6">
                <div className="brutalist-border p-6 bg-[#18181B] flex flex-col gap-6 h-full">
                  <div className="flex items-center gap-1.5 border-b border-outline-variant pb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <span className="text-xs font-mono text-on-surface-variant ml-2 font-bold select-none">
                      sys_config.yml
                    </span>
                  </div>

                  <div className="font-mono text-xs text-on-surface-variant leading-relaxed select-text">
                    <p className="mb-1"><span className="font-bold text-white">location:</span> &quot;{ABOUT_DATA.sysConfig.location}&quot;</p>
                    <p className="mb-1"><span className="font-bold text-white">timezone:</span> &quot;{ABOUT_DATA.sysConfig.timezone}&quot;</p>
                    <p className="mb-1"><span className="font-bold text-white">status:</span> &quot;{ABOUT_DATA.sysConfig.status}&quot;</p>
                    <p className="mb-1 font-bold text-white mt-3">languages:</p>
                    {ABOUT_DATA.sysConfig.languages.map((lang) => (
                      <p key={lang} className="pl-4">&nbsp;&nbsp;- &quot;[ {lang} ]&quot;</p>
                    ))}
                    <p className="mb-1 font-bold text-white mt-3">frameworks:</p>
                    {ABOUT_DATA.sysConfig.frameworks.map((fw) => (
                      <p key={fw} className="pl-4">&nbsp;&nbsp;- &quot;[ {fw} ]&quot;</p>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-outline-variant">
                    <img
                      src={ABOUT_DATA.concreteImage}
                      alt="Brutalist concrete architecture"
                      className="w-full aspect-square object-cover grayscale opacity-75 hover:opacity-100 transition-opacity duration-300 brutalist-border"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="exp" className="w-full scroll-mt-24 py-8 relative">
            <header className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-mono text-white mb-4">
                [ _EXPERIENCE ]
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl border-l border-outline-variant pl-4 font-mono">
                Professional trajectory mapped through systems architecture, infrastructure scaling, and code optimization.
              </p>
            </header>

            {/* Timeline Container */}
            <div className="relative w-full">
              {/* Central Line */}
              <div className="timeline-line"></div>

              {/* Experience Items */}
              <div className="space-y-16 md:space-y-24 relative z-10">
                {EXPERIENCE_DATA.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={item.id}
                      className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                        isEven ? '' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Node Dot */}
                      <div className="absolute left-[16px] md:left-1/2 w-3.5 h-3.5 bg-white transform -translate-x-1.5 md:-translate-x-1.5 rounded-none border border-background z-10"></div>

                      {/* Left/Right Text Column */}
                      <div className={`w-full md:w-5/12 pl-12 md:pl-0 mb-4 md:mb-0 ${
                        isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                      }`}>
                        <h3 className="text-lg font-bold text-white font-mono">{item.role}</h3>
                        <div className="text-xs text-on-surface-variant font-mono mt-1">{item.company}</div>
                        <div className="text-xs text-gray-500 font-mono mt-2 uppercase tracking-widest">{item.period}</div>
                      </div>

                      {/* Bullet Box Column */}
                      <div className={`w-full md:w-5/12 pl-12 md:pl-8 ${
                        isEven ? '' : 'md:pl-0 md:pr-8'
                      }`}>
                        <div className="brutalist-border p-6 bg-[#0e0e10] transition-colors duration-300 hover:bg-[#18181B] group">
                          <ul className="text-xs text-on-surface-variant space-y-3 font-mono leading-relaxed">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="relative pl-4 before:content-['*'] before:absolute before:left-0 before:text-gray-500 group-hover:text-white transition-colors duration-300">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          <div className={`mt-6 flex flex-wrap gap-2 ${
                            isEven ? 'justify-start' : 'md:justify-start'
                          }`}>
                            {item.technologies.map((tech) => (
                              <span key={tech} className="text-[10px] font-mono text-gray-500 border border-outline-variant px-2 py-1 bg-white/5 uppercase">
                                [ {tech} ]
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* TECHNOLOGY_STACK SECTION */}
          <section id="stack" className="w-full scroll-mt-24 py-8">
            <header className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-mono text-white mb-4">
                TECHNOLOGY_STACK
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl font-mono leading-relaxed">
                A curated selection of tools and frameworks employed to construct robust, scalable, and high-performance digital architectures. Emphasis on type safety, build efficiency, and bare-metal performance.
              </p>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

              {/* Frontend Core items */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STACK_CORES.map((core) => (
                  <div key={core.name} className="brutalist-border p-6 flex flex-col justify-between h-48 hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                    <div className="flex justify-between items-start">
                      {core.name === 'React' && <Code className="h-6 w-6 text-gray-500" />}
                      {core.name === 'TypeScript' && <Braces className="h-6 w-6 text-gray-500" />}
                      {core.name === 'Next.js' && <Globe className="h-6 w-6 text-gray-500" />}
                      <span className="text-xs font-mono mono-bracket text-on-surface-variant font-bold">{core.indexLabel}</span>
                    </div>
                    <div>
                      <h3 className="text-md font-bold font-mono text-white mb-1">{core.name}</h3>
                      <p className="text-xs font-mono text-gray-500">{core.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Tailwind CSS Card */}
              <div className="md:col-span-4 brutalist-border p-6 flex flex-col justify-between h-full min-h-[300px] hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                <div className="flex justify-between items-start mb-6">
                  <Palette className="h-8 w-8 text-gray-500" />
                  <span className="text-xs font-mono mono-bracket text-on-surface-variant font-bold">{STACK_FEATURED.indexLabel}</span>
                </div>
                <div className="space-y-4 font-mono">
                  <h3 className="text-xl font-bold text-white">{STACK_FEATURED.name}</h3>
                  <p className="text-xs text-on-surface-variant">{STACK_FEATURED.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
                    {STACK_FEATURED.bullets.map((bullet) => (
                      <li key={bullet}>* {bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Backend & Data section */}
              <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {STACK_BACKENDS.map((item) => (
                  <div key={item.name} className="brutalist-border p-6 flex flex-col justify-between h-40 hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-md font-bold font-mono text-white">{item.name}</h3>
                      {item.name === 'Node.js' && <Cpu className="h-5 w-5 text-gray-500" />}
                      {item.name === 'Python' && <TerminalIcon className="h-5 w-5 text-gray-500" />}
                      {item.name === 'PostgreSQL' && <Database className="h-5 w-5 text-gray-500" />}
                      {item.name === 'Redis' && <HardDrive className="h-5 w-5 text-gray-500" />}
                    </div>
                    <p className="text-xs font-mono text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Infrastructure List Block */}
              <div className="md:col-span-6 brutalist-border p-6 mt-2 hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                <h3 className="text-md font-bold font-mono text-white border-b border-outline-variant pb-4 mb-4 flex justify-between items-center">
                  <span>Infrastructure</span>
                  <Globe className="h-5 w-5 text-gray-500" />
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  {STACK_INFRASTRUCTURE.map((infra) => (
                    <div key={infra.name} className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-white transition-colors">{infra.name}</span>
                      <span className="text-gray-500">{infra.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooling List Block */}
              <div className="md:col-span-6 brutalist-border p-6 mt-2 hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                <h3 className="text-md font-bold font-mono text-white border-b border-outline-variant pb-4 mb-4 flex justify-between items-center">
                  <span>Tooling</span>
                  <TerminalIcon className="h-5 w-5 text-gray-500" />
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  {STACK_TOOLING.map((tool) => (
                    <div key={tool.name} className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-white transition-colors">{tool.name}</span>
                      <span className="text-gray-500">{tool.role}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* PROJECTS_LOG SECTION */}
          <section id="projects" className="w-full scroll-mt-24 py-8">
            <header className="flex flex-col gap-2 items-start mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-mono text-white">
                PROJECTS_LOG
              </h2>
              <div className="text-xs sm:text-sm font-mono text-on-surface-variant border-l border-outline-variant pl-4 space-y-1 py-1 leading-relaxed">
                <p>&gt; SELECT * FROM system.projects WHERE status = &apos;production&apos;;</p>
                <p className="text-gray-500">Executing query...</p>
                <p className="text-gray-500">Showing {PROJECTS_DATA.length} results.</p>
              </div>
            </header>

            {/* Grid list of project articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS_DATA.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="brutalist-border p-6 flex flex-col gap-6 group hover:bg-[#18181B] bg-[#0e0e10]/40 transition-colors duration-300 cursor-pointer"
                  id={`project-card-${project.id}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-md sm:text-lg font-bold font-mono text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white transform group-hover:translate-x-1.5 transition-all duration-300" />
                  </div>

                  {/* Cover Image Wrapper */}
                  <div className="w-full h-48 brutalist-border relative overflow-hidden group-hover:border-white transition-colors duration-300">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#09090B]/40 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-mono text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tag list */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-white/70">
                        [ {tag} ]
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* TERMINAL FOOTER LOGO */}
          <section className="mt-8 border-t border-outline-variant pt-8 text-on-surface-variant font-mono text-xs opacity-60 flex justify-between items-center select-none">
            <span>&gt; ./fetch_history.sh --verbose</span>
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="text-white hover:underline cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <TerminalIcon className="h-3.5 w-3.5 animate-pulse" />
              <span>Open Command Console</span>
            </button>
          </section>

        </main>

        {/* Footer bar */}
        <footer className="border-t border-outline-variant bg-[#09090B] mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-12 py-8 max-w-7xl mx-auto gap-4 font-mono text-xs text-on-surface-variant">
            <div>
              © {new Date().getFullYear()} TERMINAL_PORTFOLIO
            </div>
            <div className="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all active:scale-95">
                GITHUB
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all active:scale-95">
                LINKEDIN
              </a>
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="hover:text-white hover:underline transition-all text-left"
              >
                SOURCE_CONSOLE
              </button>
            </div>
          </div>
        </footer>

        {/* Floating System Console Terminal */}
        {isTerminalOpen && (
          <Terminal
            onClose={() => setIsTerminalOpen(false)}
            onContactTrigger={() => {
              setIsTerminalOpen(false);
              setIsContactOpen(true);
            }}
          />
        )}

        {/* Contact transmission overlay */}
        {isContactOpen && (
          <ContactModal onClose={() => setIsContactOpen(false)} />
        )}

        {/* Project details specification overlays */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </>
  );
}
```

---

### Task 7: Update route and cleanup

**Files:**
- Modify: `routes/web.php`
- Delete: `resources/js/pages/welcome.tsx`
- Delete: `engineering-portfolio/` directory

- [ ] **Step 1: Update route**

Replace content of `routes/web.php`:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'portfolio')->name('home');
```

- [ ] **Step 2: Delete welcome.tsx**

Run: `rm resources/js/pages/welcome.tsx`

- [ ] **Step 3: Delete engineering-portfolio directory**

Run: `rm -rf engineering-portfolio`

- [ ] **Step 4: Install dependencies and verify**

Run: `pnpm install`

Expected: clean install, no errors

---

### Task 8: Verify

- [ ] **Step 1: Run TypeScript check**

Run: `pnpm types:check`

Expected: no errors

- [ ] **Step 2: Run ESLint**

Run: `pnpm lint`

Expected: no errors (or only warnings from generated wayfinder files)

- [ ] **Step 3: Run dev server**

Run: `pnpm dev`

Expected: app starts, portfolio renders at `/`

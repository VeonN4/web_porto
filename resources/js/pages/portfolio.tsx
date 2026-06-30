import { Head } from '@inertiajs/react';
import { ArrowRight, Code, Terminal as TerminalIcon, Link, Cpu, Database, Braces, Palette, Globe, HardDrive } from 'lucide-react';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/ContactModal';
import Navbar from '@/components/Navbar';
import ProjectModal from '@/components/ProjectModal';
import Terminal from '@/components/Terminal';
import type { HeroSettings, AboutSettings, ExperienceItem, Project, TechStackItem } from '@/types/portfolio';

interface PortfolioProps {
  hero: HeroSettings;
  about: AboutSettings;
  experiences: ExperienceItem[];
  projects: Project[];
  techStacks: TechStackItem[];
}

export default function App({ hero, about, experiences, projects, techStacks }: PortfolioProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto detect active section while scrolling
  useEffect(() => {
    const sections = ['hero', 'about', 'exp', 'stack', 'projects'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);

      if (!el) {
return null;
}

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-30% 0px -50% 0px', // Trigger when section is in middle of screen
          threshold: 0
        }
      );

      observer.observe(el);

      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
obs.observer.unobserve(obs.el);
}
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
                    {hero.tagline}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight m-0 uppercase font-sans select-none">
                  {hero.headline}
                  <br />
                  <span className="text-[#8e9192]">{hero.subheadline}</span>
                </h1>

                <p className="text-base sm:text-lg text-on-surface-variant max-w-xl font-mono leading-relaxed">
                  {hero.description}
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
                    <svg className="h-4 w-4 fill-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
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
                    {hero.status.map((item, index) => (
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
                    {hero.core_stack.map((item) => (
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
                  &gt; {about.header}
                </h2>
              </div>

              {/* About Narrative */}
              <div className="md:col-span-8 flex flex-col gap-6 md:pr-8">
                <div className="text-sm sm:text-base text-on-surface-variant space-y-6 font-mono leading-relaxed">
                  {about.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>

                {/* Core Competencies */}
                <div className="mt-8">
                  <h3 className="text-xs font-bold text-white mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest font-mono">
                    &gt; {about.competencies_header}
                  </h3>
                  <ul className="font-mono text-xs text-on-surface-variant space-y-3">
                    {about.competencies.map((comp) => (
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
                <div className="brutalist-border p-6 bg-[#18181B] flex flex-col gap-6 h-fit">
                  <div className="flex items-center gap-1.5 border-b border-outline-variant pb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-outline-variant"></div>
                    <span className="text-xs font-mono text-on-surface-variant ml-2 font-bold select-none">
                      config.yml
                    </span>
                  </div>

                  <div className="font-mono text-xs text-on-surface-variant leading-relaxed select-text">
                    <p className="mb-1"><span className="font-bold text-white">location:</span> &quot;{about.sys_config_location}&quot;</p>
                    <p className="mb-1"><span className="font-bold text-white">timezone:</span> &quot;{about.sys_config_timezone}&quot;</p>
                    <p className="mb-1"><span className="font-bold text-white">status:</span> &quot;{about.sys_config_status}&quot;</p>
                    <p className="mb-1 font-bold text-white mt-3">languages:</p>
                    {about.sys_config_languages.map((lang) => (
                      <p key={lang} className="pl-4">&nbsp;&nbsp;- &quot;[ {lang} ]&quot;</p>
                    ))}
                    <p className="mb-1 font-bold text-white mt-3">frameworks:</p>
                    {about.sys_config_frameworks.map((fw) => (
                      <p key={fw} className="pl-4">&nbsp;&nbsp;- &quot;[ {fw} ]&quot;</p>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="exp" className="w-full scroll-mt-24 py-8 relative">
            <header className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-mono text-white mb-4">
                [ EXPERIENCE ]
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
                {experiences.map((item, index) => {
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
                TECHNOLOGY STACK
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl font-mono leading-relaxed">
                A curated selection of tools and frameworks employed to construct robust, scalable, and high-performance digital architectures. Emphasis on type safety, build efficiency, and bare-metal performance.
              </p>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

              {/* Frontend Core items */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {techStacks.filter(t => t.type === 'core').map((core) => (
                  <div key={core.name} className="brutalist-border p-6 flex flex-col justify-between h-48 hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                    <div className="flex justify-between items-start">
                      {core.name === 'React' && <Code className="h-6 w-6 text-gray-500" />}
                      {core.name === 'TypeScript' && <Braces className="h-6 w-6 text-gray-500" />}
                      {core.name === 'Next.js' && <Globe className="h-6 w-6 text-gray-500" />}
                      <span className="text-xs font-mono mono-bracket text-on-surface-variant font-bold">{core.index_label}</span>
                    </div>
                    <div>
                      <h3 className="text-md font-bold font-mono text-white mb-1">{core.name}</h3>
                      <p className="text-xs font-mono text-gray-500">{core.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Tailwind CSS Card */}
              {(() => {
                const featured = techStacks.find(t => t.type === 'featured')!;

                return (
                  <div className="md:col-span-4 brutalist-border p-6 flex flex-col justify-between h-full min-h-[300px] hover:bg-[#18181B] bg-[#0e0e10] transition-all duration-200">
                    <div className="flex justify-between items-start mb-6">
                      <Palette className="h-8 w-8 text-gray-500" />
                      <span className="text-xs font-mono mono-bracket text-on-surface-variant font-bold">{featured.index_label}</span>
                    </div>
                    <div className="space-y-4 font-mono">
                      <h3 className="text-xl font-bold text-white">{featured.name}</h3>
                      <p className="text-xs text-on-surface-variant">{featured.description}</p>
                      <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
                        {featured.bullets?.map((bullet) => (
                          <li key={bullet}>* {bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}

              {/* Backend & Data section */}
              <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {techStacks.filter(t => t.type === 'backend').map((item) => (
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
                  {techStacks.filter(t => t.type === 'infrastructure').map((infra) => (
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
                  {techStacks.filter(t => t.type === 'tooling').map((tool) => (
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
                PROJECTS LOG
              </h2>
              <div className="text-xs sm:text-sm font-mono text-on-surface-variant border-l border-outline-variant pl-4 space-y-1 py-1 leading-relaxed">
                <p>&gt; SELECT * FROM projects</p>
                <p className="text-gray-500">Executing query...</p>
                <p className="text-gray-500">Showing {projects.length} results.</p>
              </div>
            </header>

            {/* Grid list of project articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
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
                      src={project.image_url}
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
        </main>

        {/* Footer bar */}
        <footer className="border-t border-outline-variant bg-[#09090B] mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-12 py-8 max-w-7xl mx-auto gap-4 font-mono text-xs text-on-surface-variant">
            <div>
              © {new Date().getFullYear()} Veonise
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/VeonN4" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all active:scale-95 flex items-center gap-1.5">
                <svg className="h-4 w-4 fill-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GITHUB
              </a>
              {false && <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all active:scale-95 flex items-center gap-1.5">
                <Link className="h-3.5 w-3.5" />
                LINKEDIN
              </a>}
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="hover:text-white hover:underline transition-all text-left"
              >
                CONSOLE
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
            about={about}
            experiences={experiences}
            projects={projects}
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

import { X, ExternalLink, Code, Terminal, CheckCircle } from 'lucide-react';
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
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {project.status.toLowerCase() === "production" ?
            <div className="absolute top-3 left-3 bg-black/80 border border-green-500/50 px-2 py-1 text-[10px] font-mono text-green-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              <span>{project.status.toUpperCase()}</span>
            </div>
                :
            <div className="absolute top-3 left-3 bg-black/80 border border-red-500/50 px-2 py-1 text-[10px] font-mono text-red-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              <span>{project.status.toUpperCase()}</span>
            </div>
            }
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
                {project.github_url !== "#" && (
                  <a
                    href={project.github_url!}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-outline-variant hover:border-white p-2.5 text-on-surface-variant hover:text-white transition-colors flex items-center justify-center"
                    title="Source Code"
                  >
                    <Code className="h-4 w-4" />
                  </a>
                )}
                {project.demo_url !== "#" && (
                <a
                  href={project.demo_url!}
                  className="brutalist-btn px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>)}
              </div>
            </div>

            <div className="border-t border-outline-variant my-2"></div>

            {/* Core Description */}
            <div className="flex flex-col gap-2 font-mono">
              <span className="text-white text-xs font-bold uppercase tracking-wider">[ ARCHITECTURE SUMMARY ]</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

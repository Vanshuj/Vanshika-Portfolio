import React, { useEffect } from 'react';
import { X, ExternalLink, Layers, CheckCircle2, Terminal, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GithubIcon } from '../Icons/BrandIcons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pastel-ink/40 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-auto glass-panel p-6 sm:p-10 rounded-3xl sm:rounded-[32px] border border-white/90 shadow-glass-lg max-h-[92vh] overflow-y-auto relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel hover:bg-white text-pastel-ink transition-transform hover:scale-110 active:scale-95 z-20"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8 pr-12 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full glass-badge text-pastel-ink">
              Project {project.number}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-full glass-badge text-pastel-slate">
              {project.category}
            </span>
            <span className="font-mono text-xs text-pastel-slate">
              {project.year} • {project.type}
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-pastel-ink tracking-tight mb-2">
            {project.title}
          </h2>
          <p className="font-body text-base text-pastel-slate">
            {project.tagline}
          </p>
        </div>

        {/* Project Links & Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl glass-panel-subtle relative z-10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-pill-primary inline-flex items-center gap-2 px-5 py-2 text-xs font-mono tracking-wide shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-pill-secondary inline-flex items-center gap-2 px-5 py-2 text-xs font-mono tracking-wide shadow-sm"
            >
              <ExternalLink className="w-4 h-4 text-gold" />
              <span>Launch Live Deployment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-badge border border-dashed border-pastel-slate/30 text-xs font-mono text-pastel-slate">
              <span className="w-2 h-2 rounded-full bg-accent-java" />
              <span>Live Demo Deployment Link (Reserved)</span>
            </div>
          )}

          <div className="ml-auto text-xs font-mono text-pastel-slate hidden md:block">
            Role: <span className="text-pastel-ink font-medium">{project.role}</span>
          </div>
        </div>

        {/* Technical Stack Chips */}
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-pastel-slate block mb-2.5">
            Architectural Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full glass-pill text-pastel-ink font-mono text-xs shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="space-y-8 text-pastel-ink">
          
          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl glass-panel-subtle space-y-2">
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-pastel-ink flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-java" />
                Problem Statement
              </h3>
              <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel-subtle space-y-2">
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-pastel-ink flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-spring" />
                Engineering Solution
              </h3>
              <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-pastel-ink mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-java" />
              <span>System Architecture & Implementation Pipeline</span>
            </h3>
            <div className="space-y-2">
              {project.caseStudy.architecture.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl glass-pill">
                  <span className="font-mono text-xs text-pastel-slate mt-0.5">0{i + 1}</span>
                  <span className="font-body text-xs sm:text-sm text-pastel-ink/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Contributions */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-pastel-ink mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-spring" />
              <span>Individual Contributions & Technical Milestones</span>
            </h3>
            <ul className="space-y-2">
              {project.caseStudy.contributions.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-pastel-slate">
                  <span className="text-pastel-ink font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 pt-5 border-t border-pastel-ink/10 flex items-center justify-between text-xs font-mono text-pastel-slate">
          <span>Centralized Project Record • {project.id}</span>
          <button 
            onClick={onClose}
            className="text-pastel-ink hover:underline font-semibold"
          >
            Close Window [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}

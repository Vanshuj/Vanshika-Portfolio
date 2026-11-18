import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, Sliders, ChevronRight, Play } from 'lucide-react';
import { GithubIcon } from '../Icons/BrandIcons';
import { projectsData } from '../../data/projects';
import ProjectVisualPlaceholder from './ProjectVisualPlaceholder';
import ProjectModal from '../ProjectModal/ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          Featured Case Studies
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
        <div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-3">
            Architected Platforms & Creative Systems.
          </h2>
          <p className="font-body text-sm sm:text-base text-pastel-slate max-w-xl">
            Selected full-stack software spanning algorithmic middleware, progressive web narratives, and AI-driven knowledge platforms.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-pastel-slate">
          <span className="w-2 h-2 rounded-full bg-accent-spring animate-pulse" />
          <span>Real Codebases & Architectures</span>
        </div>
      </div>

      {/* Distinct Editorial Compositions for Each Project */}
      <div className="space-y-16 sm:space-y-24">
        
        {/* ========================================================
            PROJECT 01: Pixel-Arena (Wide Asymmetrical Split)
           ======================================================== */}
        {projectsData[0] && (
          <div className="glass-card-interactive p-6 sm:p-10 rounded-[32px] border border-white/90 shadow-glass-md relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Visual Showcase (7 cols) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <ProjectVisualPlaceholder project={projectsData[0]} />
              </div>

              {/* Information Panel (5 cols) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-pastel-ink tracking-tight">
                      {projectsData[0].title}
                    </h3>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-badge text-pastel-ink shrink-0">
                      {projectsData[0].year}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-accent-java font-medium mb-4">
                    {projectsData[0].tagline}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed mb-6">
                    {projectsData[0].summary}
                  </p>

                  {/* Highlights Bulleted */}
                  <div className="space-y-2 mb-6">
                    {projectsData[0].highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-pastel-ink/80">
                        <span className="text-accent-java font-mono font-bold">›</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {projectsData[0].technologies.slice(0, 5).map((t, idx) => (
                      <span key={idx} className="font-mono text-[11px] px-3 py-1 rounded-full glass-pill text-pastel-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-pastel-ink/10">
                  <button
                    onClick={() => setSelectedProject(projectsData[0])}
                    className="liquid-pill-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide shadow-sm"
                  >
                    <span>View Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={projectsData[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-pill-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  {projectsData[0].demoUrl && (
                    <a
                      href={projectsData[0].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-pill-primary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Website</span>
                    </a>
                  )}

                  {projectsData[0].videoUrl && (
                    <a
                      href={projectsData[0].videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-pill-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 text-accent-spring" />
                      <span>Watch Demo</span>
                    </a>
                  )}

                  {!projectsData[0].demoUrl && !projectsData[0].videoUrl && (
                    <span className="text-[11px] font-mono text-pastel-slate/70 italic">
                      [Live links reserved]
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            PROJECT 02: KathaVani (Asymmetric Split Editorial)
           ======================================================== */}
        {projectsData[1] && (
          <div className="glass-card-interactive p-6 sm:p-10 rounded-[32px] border border-white/90 shadow-glass-md relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Information Panel (5 cols) - Left on desktop */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-pastel-ink tracking-tight">
                      {projectsData[1].title}
                    </h3>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-badge text-pastel-ink shrink-0">
                      {projectsData[1].year}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-accent-spring font-medium mb-4">
                    {projectsData[1].tagline}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed mb-6">
                    {projectsData[1].summary}
                  </p>

                  {/* Highlights Bulleted */}
                  <div className="space-y-2 mb-6">
                    {projectsData[1].highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-pastel-ink/80">
                        <span className="text-accent-spring font-mono font-bold">›</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {projectsData[1].technologies.slice(0, 5).map((t, idx) => (
                      <span key={idx} className="font-mono text-[11px] px-3 py-1 rounded-full glass-pill text-pastel-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-pastel-ink/10">
                  <button
                    onClick={() => setSelectedProject(projectsData[1])}
                    className="liquid-pill-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide shadow-sm"
                  >
                    <span>View Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={projectsData[1].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-pill-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  {projectsData[1].demoUrl && (
                    <a
                      href={projectsData[1].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-pill-primary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Website</span>
                    </a>
                  )}

                  {projectsData[1].videoUrl && (
                    <a
                      href={projectsData[1].videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-pill-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 text-accent-spring" />
                      <span>Watch Demo</span>
                    </a>
                  )}

                  {!projectsData[1].demoUrl && !projectsData[1].videoUrl && (
                    <span className="text-[11px] font-mono text-pastel-slate/70 italic">
                      [Live links reserved]
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Showcase (7 cols) - Right on desktop */}
              <div className="lg:col-span-7">
                <ProjectVisualPlaceholder project={projectsData[1]} />
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            PROJECT 03: GYAN.AI (Layered Editorial Magazine)
           ======================================================== */}
        {projectsData[2] && (
          <div className="glass-card-interactive p-6 sm:p-10 rounded-[32px] border border-white/90 shadow-glass-md relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Visual Showcase (7 cols) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <ProjectVisualPlaceholder project={projectsData[2]} />
              </div>

              {/* Information Panel (5 cols) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-pastel-ink tracking-tight">
                      {projectsData[2].title}
                    </h3>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-badge text-pastel-ink shrink-0">
                      {projectsData[2].year}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-accent-java font-medium mb-4">
                    {projectsData[2].tagline}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed mb-6">
                    {projectsData[2].summary}
                  </p>

                  {/* Highlights Bulleted */}
                  <div className="space-y-2 mb-6">
                    {projectsData[2].highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-pastel-ink/80">
                        <span className="text-accent-java font-mono font-bold">›</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {projectsData[2].technologies.slice(0, 5).map((t, idx) => (
                      <span key={idx} className="font-mono text-[11px] px-3 py-1 rounded-full glass-pill text-pastel-ink">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-pastel-ink/10">
                  <button
                    onClick={() => setSelectedProject(projectsData[2])}
                    className="liquid-pill-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide shadow-sm"
                  >
                    <span>View Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={projectsData[2].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-pill-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  {projectsData[2].demoUrl && (
                    <a
                      href={projectsData[2].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-pill-primary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Website</span>
                    </a>
                  )}

                  {projectsData[2].videoUrl && (
                    <a
                      href={projectsData[2].videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-pill-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono tracking-wide shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 text-accent-spring" />
                      <span>Watch Demo</span>
                    </a>
                  )}

                  {!projectsData[2].demoUrl && !projectsData[2].videoUrl && (
                    <span className="text-[11px] font-mono text-pastel-slate/70 italic">
                      [Live links reserved]
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Detail Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

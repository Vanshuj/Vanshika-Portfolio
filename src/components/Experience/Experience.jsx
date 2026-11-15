import React from 'react';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';
import { experienceData } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 04 // Trajectory ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">Experience</span>
      </div>

      <div className="max-w-2xl mb-16">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-3">
          Chronology & Professional Trajectory.
        </h2>
        <p className="font-body text-sm sm:text-base text-pastel-slate">
          A disciplined timeline of industry internships, intensive technical training, and applied software engineering.
        </p>
      </div>

      {/* Grid: Professional Experience & Industry Training */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {experienceData.workAndTraining.map((item) => (
          <div 
            key={item.id} 
            className="glass-card-interactive p-6 sm:p-8 rounded-3xl border border-white/90 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs text-pastel-slate flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
                
                <div className="flex items-center gap-2">
                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-pill hover:bg-white text-pastel-ink flex items-center gap-1 transition-all group/cert border border-white/80"
                      title="Verify Certificate Credential"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink className="w-2.5 h-2.5 group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 transition-transform text-accent-spring" />
                    </a>
                  )}
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-badge text-pastel-ink border border-white/90 font-medium">
                    {item.type}
                  </span>
                </div>
              </div>

              <h3 className="font-display font-bold text-xl text-pastel-ink mb-1">
                {item.role}
              </h3>

              <div className="font-body text-xs sm:text-sm font-medium text-pastel-slate mb-4">
                {item.organization} <span className="opacity-60">•</span> <span className="text-pastel-ink/80">{item.program}</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-pastel-slate leading-relaxed">
                    <span className="text-pastel-ink font-bold mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-pastel-ink/5">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-3 py-0.5 rounded-full glass-pill text-pastel-ink">
                    {tag}
                  </span>
                ))}
              </div>

              {item.certificateUrl && (
                <a
                  href={item.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-pastel-slate hover:text-pastel-ink flex items-center gap-1 transition-colors group/link ml-auto"
                >
                  <span>Credential</span>
                  <ExternalLink className="w-3 h-3 text-pastel-slate group-hover/link:text-pastel-ink group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Award } from 'lucide-react';
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
        <span className="font-mono text-xs text-pastel-slate">Experience & Education</span>
      </div>

      <div className="max-w-2xl mb-16">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-3">
          Chronology & Academic Foundations.
        </h2>
        <p className="font-body text-sm sm:text-base text-pastel-slate">
          A disciplined timeline of industry internships, intensive technical training, and computer engineering curriculum.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Professional & Virtual Internships (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-2 pb-3 border-b border-pastel-ink/10">
            <Briefcase className="w-4 h-4 text-accent-java" />
            <h3 className="font-display font-semibold text-base uppercase tracking-wider text-pastel-ink">
              Experience & Professional Training
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-pastel-ink/10">
            {experienceData.workAndTraining.map((item) => (
              <div key={item.id} className="relative pl-8 group">
                {/* Timeline Node */}
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-pastel-white border-2 border-pastel-ink transition-transform group-hover:scale-125 shadow-xs" />

                <div className="glass-panel p-6 rounded-2xl border border-white/80 transition-all hover:bg-white/90">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-pastel-slate flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-pastel-blue/60 text-pastel-ink border border-white">
                      {item.type}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-pastel-ink">
                    {item.role}
                  </h4>
                  
                  <div className="font-body text-xs sm:text-sm font-medium text-pastel-slate mb-3">
                    {item.organization} <span className="opacity-60">•</span> <span className="text-pastel-ink/80">{item.program}</span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-pastel-slate leading-relaxed">
                        <span className="text-pastel-ink font-bold mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-pastel-ink/5">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/70 text-pastel-ink border border-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Formal Education & Academic Records (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-2 pb-3 border-b border-pastel-ink/10">
            <GraduationCap className="w-4 h-4 text-accent-spring" />
            <h3 className="font-display font-semibold text-base uppercase tracking-wider text-pastel-ink">
              Academic Background & Scores
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-pastel-ink/10">
            {experienceData.education.map((edu) => (
              <div key={edu.id} className="relative pl-8 group">
                {/* Timeline Node */}
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-pastel-white border-2 border-accent-spring transition-transform group-hover:scale-125 shadow-xs" />

                <div className="glass-panel p-6 rounded-2xl border border-white/80 transition-all hover:bg-white/90">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-pastel-slate flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pastel-mint/80 text-pastel-ink border border-white">
                      {edu.score}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-pastel-ink">
                    {edu.degree}
                  </h4>

                  <div className="font-body text-xs sm:text-sm font-medium text-pastel-slate mb-3">
                    {edu.institution} <span className="opacity-60">•</span> <span className="text-pastel-ink/80">{edu.field}</span>
                  </div>

                  <div className="text-[11px] font-mono text-pastel-slate mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-pastel-slate/70" />
                    <span>{edu.location}</span>
                    <span className="mx-1">•</span>
                    <span className="text-pastel-ink">{edu.status}</span>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-pastel-ink/5">
                    {edu.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-pastel-slate">
                        <span className="text-accent-spring font-bold">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Compass, Sparkles, GitBranch, ArrowUpRight, Flame, Milestone } from 'lucide-react';
import { developmentJournalData } from '../../data/developmentJournal';

export default function DevelopmentJournal() {
  return (
    <section id="journal" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 06 // Work in Progress ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">Development Journal</span>
      </div>

      <div className="max-w-2xl mb-16">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-3">
          Explorations & Active Prototyping.
        </h2>
        <p className="font-body text-sm sm:text-base text-pastel-slate">
          Documenting current research, performance experiments, and iterative milestones under active development.
        </p>
      </div>

      {/* Journal Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {developmentJournalData.map((entry, index) => {
          const tintClasses = [
            'tint-mint',
            'tint-blue',
            'tint-peach',
          ];
          const chosenTint = tintClasses[index % tintClasses.length];

          return (
            <div 
              key={entry.id}
              className={`glass-card-interactive ${chosenTint} p-6 sm:p-7 rounded-3xl border border-white/90 flex flex-col justify-between`}
            >
              <div>
                {/* Entry Date & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-pastel-slate">
                    {entry.date}
                  </span>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/80 text-pastel-ink border border-white shadow-xs">
                    {entry.status}
                  </span>
                </div>

                {/* Entry Title */}
                <h3 className="font-display font-bold text-lg text-pastel-ink mb-3 leading-snug">
                  {entry.title}
                </h3>

                {/* Description */}
                <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed mb-6">
                  {entry.description}
                </p>

                {/* Recent Milestone */}
                <div className="p-3.5 rounded-xl bg-white/70 border border-white space-y-1 mb-6">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-pastel-ink">
                    <Milestone className="w-3.5 h-3.5 text-accent-java" />
                    <span>Recent Milestone</span>
                  </div>
                  <p className="font-body text-xs text-pastel-slate">
                    {entry.recentMilestone}
                  </p>
                </div>
              </div>

              {/* Technologies & Links */}
              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {entry.technologies.map((tech, i) => (
                    <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/60 text-pastel-ink border border-white/60">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-pastel-ink/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-pastel-slate">
                    Track updates
                  </span>
                  <a
                    href={entry.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-pastel-ink hover:underline font-medium"
                  >
                    <span>View repo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

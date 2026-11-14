import React from 'react';
import { BookOpen, GitBranch, Code, ArrowUpRight, CheckSquare, Terminal } from 'lucide-react';
import { GithubIcon, LeetCodeIcon } from '../Icons/BrandIcons';
import { codingPracticeData } from '../../data/codingPractice';

export default function CodingPractice() {
  return (
    <section id="notebook" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 05 // Algorithmic Ledger ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">Developer Notebook</span>
      </div>

      <div className="max-w-2xl mb-16">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-3">
          {codingPracticeData.notebookTitle}
        </h2>
        <p className="font-body text-sm sm:text-base text-pastel-slate">
          {codingPracticeData.lead}
        </p>
      </div>

      {/* Grid: DSA Categories + Core Architectural Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* Left: Algorithmic Categories (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-pastel-ink/10">
            <span className="font-mono text-xs uppercase tracking-wider text-pastel-slate">
              Active Algorithmic Focus Patterns
            </span>
            <span className="font-mono text-[11px] text-pastel-slate">
              Continuous Practice
            </span>
          </div>

          <div className="space-y-3">
            {codingPracticeData.categories.map((cat) => (
              <div 
                key={cat.code}
                className="glass-card-interactive p-5 rounded-2xl border border-white/90 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg glass-badge text-pastel-ink font-semibold">
                      {cat.code}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-pastel-slate px-2.5 py-0.5 rounded-full glass-badge">
                      {cat.repoTag}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-pastel-ink mb-1">
                    {cat.name}
                  </h3>
                  
                  <p className="font-mono text-xs text-pastel-slate mb-2">
                    Focus: <span className="text-pastel-ink font-medium">{cat.focus}</span>
                  </p>

                  <p className="font-body text-xs text-pastel-slate italic pt-2 border-t border-pastel-ink/5">
                    "{cat.notes}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Core Engineering Principles (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-pastel-ink/10">
            <span className="font-mono text-xs uppercase tracking-wider text-pastel-slate">
              Engineering Principles
            </span>
            <span className="font-mono text-[11px] text-pastel-slate">
              Clean Code Ethos
            </span>
          </div>

          <div className="space-y-3">
            {codingPracticeData.principles.map((pr) => (
              <div 
                key={pr.index}
                className="glass-card-interactive p-5 rounded-2xl border border-white/90 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-pastel-ink">
                      § {pr.index}
                    </span>
                    <h3 className="font-display font-semibold text-sm text-pastel-ink">
                      {pr.title}
                    </h3>
                  </div>
                  <p className="font-body text-xs text-pastel-slate leading-relaxed">
                    {pr.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* GitHub Open Source & Codebase Verification Hub */}
      <div className="pt-8 border-t border-pastel-ink/10">
        <div className="glass-card-interactive p-6 sm:p-8 rounded-3xl border border-white/90 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-pastel-ink">
              <GithubIcon className="w-5 h-5 text-pastel-ink" />
              <span className="font-display font-bold text-lg text-pastel-ink">
                Open Source & Engineering Repositories
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
              Explore complete codebase architectures, algorithmic problem sets, full commit histories, and active software prototyping across public repositories.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-badge text-pastel-slate">
                #CleanArchitecture
              </span>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-badge text-pastel-slate">
                #Microservices
              </span>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-badge text-pastel-slate">
                #DSA-Solutions
              </span>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full glass-badge text-pastel-slate">
                #FullStack
              </span>
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <a
              href="https://github.com/Vanshuj"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-pill-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono font-medium tracking-wide shadow-md w-full sm:w-auto group"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore github.com/Vanshuj</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://leetcode.com/u/Vanshika_Jain_05/"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-pill-secondary inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono font-medium tracking-wide shadow-md w-full sm:w-auto group"
            >
              <LeetCodeIcon className="w-4 h-4 text-amber-600" />
              <span>LeetCode @Vanshika_Jain_05</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

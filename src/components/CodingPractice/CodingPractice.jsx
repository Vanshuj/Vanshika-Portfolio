import React from 'react';
import { BookOpen, GitBranch, Code, ArrowUpRight, CheckSquare, Terminal } from 'lucide-react';
import { GithubIcon } from '../Icons/BrandIcons';
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

      {/* GitHub Repository Catalog */}
      <div className="pt-8 border-t border-pastel-ink/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GithubIcon className="w-4 h-4 text-pastel-ink" />
            <span className="font-display font-bold text-base text-pastel-ink">
              Verified Public Repositories
            </span>
          </div>
          <a
            href="https://github.com/Vanshuj"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-pastel-slate hover:text-pastel-ink flex items-center gap-1 group"
          >
            <span>github.com/Vanshuj</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {codingPracticeData.repositories.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-interactive p-5 rounded-2xl border border-white/90 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-pastel-ink group-hover:underline">
                    {repo.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-pastel-slate group-hover:text-pastel-ink" />
                </div>
                
                <p className="font-body text-xs text-pastel-slate mb-4 line-clamp-2">
                  {repo.description}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-1 mb-2">
                  {repo.topics.map((t, idx) => (
                    <span key={idx} className="font-mono text-[9px] px-2 py-0.5 rounded-full glass-badge text-pastel-slate">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-pastel-slate pt-2 border-t border-pastel-ink/5 flex items-center justify-between">
                  <span>{repo.language}</span>
                  <span className="text-accent-spring">● Verified</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

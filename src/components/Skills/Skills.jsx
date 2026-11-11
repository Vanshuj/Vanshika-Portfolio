import React from 'react';
import { Cpu, Server, Layout, Database, Wrench, Binary, Layers } from 'lucide-react';
import { skillsData } from '../../data/skills';

const categoryIcons = {
  languages: Binary,
  backend: Server,
  mern: Layout,
  databases: Database,
  tools: Wrench,
  'core-cs': Cpu,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 02 // Engineering Stack ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">Verified Competencies</span>
      </div>

      <div className="max-w-2xl mb-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-pastel-ink tracking-tight mb-3">
          Technical Inventory & System Architectures.
        </h2>
        <p className="font-body text-sm sm:text-base text-pastel-slate">
          A disciplined, production-tested toolkit spanning enterprise Java ecosystems, reactive modern JavaScript runtimes, and resilient data storage engines.
        </p>
      </div>

      {/* Editorial Groupings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {skillsData.categories.map((category) => {
          const Icon = categoryIcons[category.id] || Layers;
          
          return (
            <div 
              key={category.id} 
              className="glass-card-interactive p-6 rounded-3xl flex flex-col justify-between border border-white/80 group relative overflow-hidden"
            >
              <div className="chromatic-flare-br opacity-50 !w-24 !h-24" />

              {/* Category Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/80 shadow-inner transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${category.accent}80` }}
                  >
                    <Icon className="w-5 h-5 text-pastel-ink" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-pastel-slate px-2 py-0.5 rounded-full bg-white/60 border border-white/80">
                    {category.id}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-pastel-ink mb-1">
                  {category.title}
                </h3>
                <p className="font-mono text-xs text-pastel-slate mb-5">
                  {category.subtitle}
                </p>

                {/* Skill Items List */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 hover:bg-white/90 border border-white/60 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${skill.isHighlight ? 'bg-pastel-ink' : 'bg-pastel-slate/40'}`} />
                        <span className="font-body text-xs sm:text-sm font-medium text-pastel-ink">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-pastel-slate bg-pastel-white/80 px-2 py-0.5 rounded border border-pastel-ink/5">
                        {skill.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div 
                className="mt-6 pt-3 border-t border-pastel-ink/5 flex items-center justify-between text-[11px] font-mono text-pastel-slate"
              >
                <span>{category.skills.length} core modules</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-pastel-ink">
                  verified
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

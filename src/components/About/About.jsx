import React from 'react';
import { Sparkles, Compass, Lightbulb, Code2, Server, Layout, Cpu, Database, Wrench, Binary, Layers } from 'lucide-react';
import { profileData } from '../../data/profile';
import { skillsData } from '../../data/skills';

const categoryIcons = {
  languages: Binary,
  backend: Server,
  mern: Layout,
  databases: Database,
  tools: Wrench,
  'core-cs': Cpu,
};

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 01 // Narrative & Core Stack ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">About & Technical Inventory</span>
      </div>

      {/* Part 1: Narrative Biography & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        
        {/* Left Column: Big Editorial Statement & Micro-Panels */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-pastel-ink tracking-tight leading-tight mb-4">
              Designing scalable backends with an eye for tactile interfaces.
            </h2>
            <p className="font-body text-base text-pastel-slate leading-relaxed">
              Engineering web systems that solve real-world problems with architectural clarity, data integrity, and thoughtful user-centered aesthetics.
            </p>
          </div>

          {/* Architectural Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="glass-card-interactive p-4 rounded-2xl border border-white/90 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1.5 text-accent-java">
                  <Server className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-pastel-slate">Backend</span>
                </div>
                <div className="font-display font-bold text-sm text-pastel-ink mb-1">Distributed Services</div>
                <p className="font-body text-[11px] text-pastel-slate leading-relaxed">
                  Enterprise Spring Boot microservices, clean DTO contracts, and transactional integrity.
                </p>
              </div>
            </div>

            <div className="glass-card-interactive p-4 rounded-2xl border border-white/90 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1.5 text-accent-spring">
                  <Layout className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-pastel-slate">Frontend</span>
                </div>
                <div className="font-display font-bold text-sm text-pastel-ink mb-1">Tactile & Reactive UI</div>
                <p className="font-body text-[11px] text-pastel-slate leading-relaxed">
                  Responsive React applications with fluid state choreography and accessible design.
                </p>
              </div>
            </div>
          </div>

          {/* Working Philosophy Pill Panel */}
          <div className="glass-card-interactive p-5 rounded-2xl border border-white/90 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-pastel-ink font-display font-semibold text-sm mb-2">
                <Compass className="w-4 h-4 text-accent-java" />
                <span>Development Creed</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-pastel-ink/90 leading-relaxed italic">
                "Every layer—from database schemas and REST endpoints to client-side component state—deserves rigorous structural care and intentional design."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Biography & Focus Areas */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Paragraphs */}
          <div className="space-y-4 font-body text-sm sm:text-base text-pastel-ink/80 leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-pastel-ink">
              {profileData.bio.lead}
            </p>
            {profileData.bio.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Current Focus & Exploration Topics */}
          <div className="pt-4 border-t border-pastel-ink/10">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-pastel-ink mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent-java" />
              <span>Current Research & Architecture Focus</span>
            </h3>

            <div className="space-y-2.5">
              {profileData.bio.currentFocus.map((focus, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl glass-pill hover:bg-white/25 transition-all">
                  <span className="font-mono text-xs text-pastel-slate font-medium mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="font-body text-xs sm:text-sm text-pastel-ink">
                    {focus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Working Approach Statement */}
          <div className="p-4 rounded-2xl glass-panel border border-white/90 flex items-center gap-3">
            <Code2 className="w-5 h-5 text-accent-spring flex-shrink-0" />
            <div className="text-xs font-mono text-pastel-slate">
              <span className="text-pastel-ink font-semibold">Approach: </span>
              {profileData.bio.workApproach}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Anchor & Technical Stack Subheader */}
      <div id="skills" className="scroll-mt-24 pt-12 border-t border-pastel-ink/10 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2 text-pastel-slate font-mono text-xs uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-accent-java" />
            <span>Technical Inventory & System Architectures</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-pastel-ink tracking-tight mb-2">
            Verified Engineering Competencies.
          </h3>
          <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
            A disciplined, production-tested toolkit spanning enterprise Java ecosystems, reactive modern JavaScript runtimes, and resilient data storage engines.
          </p>
        </div>
      </div>

      {/* Editorial Groupings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {skillsData.categories.map((category) => {
          const Icon = categoryIcons[category.id] || Layers;
          
          return (
            <div 
              key={category.id} 
              className="glass-card-interactive p-6 sm:p-7 rounded-3xl flex flex-col justify-between border border-white/90 group relative overflow-hidden"
            >
              {/* Category Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center border border-white/90 shadow-inner transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${category.accent}70` }}
                  >
                    <Icon className="w-5 h-5 text-pastel-ink" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-pastel-slate px-2.5 py-0.5 rounded-full glass-badge border border-white/90">
                    {category.id}
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-pastel-ink mb-1">
                  {category.title}
                </h4>
                <p className="font-mono text-xs text-pastel-slate mb-5">
                  {category.subtitle}
                </p>

                {/* Skill Items List */}
                <div className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-full glass-pill hover:bg-white/25 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 pl-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${skill.isHighlight ? 'bg-pastel-ink' : 'bg-pastel-slate/40'}`} />
                        <span className="font-body text-xs sm:text-sm font-medium text-pastel-ink">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-pastel-slate glass-badge px-2.5 py-0.5 rounded-full">
                        {skill.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div 
                className="mt-6 pt-3 border-t border-pastel-ink/5 flex items-center justify-between text-[11px] font-mono text-pastel-slate relative z-10"
              >
                <span>{category.skills.length} core modules</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-pastel-ink font-medium">
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

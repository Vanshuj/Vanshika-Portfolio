import React from 'react';
import { Sparkles, Compass, Lightbulb, Code2, Award, BookOpen, GraduationCap } from 'lucide-react';
import { profileData } from '../../data/profile';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 01 // Narrative ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">About Me</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
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

          {/* Quick Stats / Highlights Micro-Panels (Transparent Liquid Glass) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="glass-panel p-4 rounded-2xl border border-white/80 shadow-sm relative overflow-hidden">
              <div className="chromatic-flare-br opacity-50 !w-20 !h-20" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1 text-accent-java">
                  <GraduationCap className="w-4 h-4" />
                  <span className="font-mono text-xs text-pastel-slate">Academics</span>
                </div>
                <div className="font-display font-bold text-xl text-pastel-ink">7.54 GPA</div>
                <p className="font-mono text-[11px] text-pastel-slate">B.Tech Computer Engg (SRIT)</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/80 shadow-sm relative overflow-hidden">
              <div className="chromatic-flare-br opacity-50 !w-20 !h-20" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1 text-accent-spring">
                  <Award className="w-4 h-4" />
                  <span className="font-mono text-xs text-pastel-slate">National Honor</span>
                </div>
                <div className="font-display font-bold text-xl text-pastel-ink">Top 40</div>
                <p className="font-mono text-[11px] text-pastel-slate">Smart India Hackathon '25</p>
              </div>
            </div>
          </div>

          {/* Working Philosophy Pill Panel */}
          <div className="glass-panel tint-lavender p-5 rounded-2xl border border-white/90 shadow-glass-sm relative overflow-hidden">
            <div className="chromatic-flare-br opacity-60" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-pastel-ink font-display font-semibold text-sm mb-2">
                <Compass className="w-4 h-4 text-purple-700" />
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
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl glass-panel-subtle hover:bg-white/70 transition-colors">
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
          <div className="p-4 rounded-xl border border-dashed border-pastel-ink/20 bg-white/30 flex items-center gap-3">
            <Code2 className="w-5 h-5 text-accent-spring flex-shrink-0" />
            <div className="text-xs font-mono text-pastel-slate">
              <span className="text-pastel-ink font-semibold">Approach: </span>
              {profileData.bio.workApproach}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

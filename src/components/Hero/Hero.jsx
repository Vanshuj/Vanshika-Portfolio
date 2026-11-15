import React from 'react';
import { ArrowDown, Mail, FileText, Sparkles, Terminal, Code2, Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../Icons/BrandIcons';
import { profileData } from '../../data/profile';

export default function Hero({ onOpenResume, onOpenContactModal }) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Area: Editorial Typography & Identity */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-pastel-ink mb-6 border border-white/90 shadow-glass-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-spring opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-spring"></span>
            </span>
            <span>{profileData.status}</span>
          </div>

          {/* Name & Title */}
          <div className="space-y-2 mb-6">
            <h1 className="font-display font-bold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-pastel-ink leading-[1.08]">
              {profileData.name}
            </h1>
            <p className="font-mono text-sm sm:text-base text-pastel-slate tracking-wide">
              {profileData.title}
            </p>
          </div>

          {/* Editorial Philosophy Quote */}
          <div className="relative pl-4 border-l-2 border-pastel-ink/20 mb-6 max-w-xl">
            <p className="font-display italic text-base sm:text-lg text-pastel-ink/80 leading-relaxed">
              "{profileData.bio.philosophy}"
            </p>
          </div>

          {/* Brief Introduction */}
          <p className="font-body text-sm sm:text-base text-pastel-slate max-w-xl leading-relaxed mb-8">
            {profileData.tagline} Focused on modern full-stack systems with <span className="text-pastel-ink font-medium">Java, Spring Boot, React, and Node.js</span>, bridging robust enterprise engineering with intelligent AI capabilities.
          </p>

          {/* Action CTAs (Transparent Liquid Glass Buttons) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onOpenResume}
              className="liquid-pill-primary flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide shadow-lg"
            >
              <FileText className="w-4 h-4 text-white/90" />
              <span>Digital Resume</span>
            </button>

            <a
              href="#projects"
              className="liquid-pill-secondary flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide shadow-lg"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-pastel-ink" />
            </a>
          </div>

          {/* Social Proof & Direct Channels */}
          <div className="flex items-center gap-3 pt-4 border-t border-pastel-ink/10 w-full">
            <span className="font-mono text-xs text-pastel-slate uppercase tracking-wider mr-2">
              Connect
            </span>

            {/* GitHub */}
            <a
              href={profileData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full glass-pill text-pastel-ink hover:text-accent-java hover:bg-white transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href={profileData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full glass-pill text-pastel-ink hover:text-accent-java hover:bg-white transition-all duration-200"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* LeetCode */}
            {profileData.socials.leetcode && (
              <a
                href={profileData.socials.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="p-2.5 rounded-full glass-pill text-pastel-ink hover:text-amber-500 hover:bg-white transition-all duration-200"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
            )}

            {/* Email Contact Action */}
            <button
              onClick={onOpenContactModal}
              aria-label="Send direct message"
              className="p-2.5 rounded-full glass-pill text-pastel-ink hover:text-pastel-ink hover:bg-white transition-all duration-200 flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span className="font-mono text-xs hidden sm:inline text-pastel-slate">Get in touch</span>
            </button>

            {/* Quick Specs Pill */}
            <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-mono text-pastel-slate/80">
              <Terminal className="w-3.5 h-3.5 text-accent-spring" />
              <span>B.Tech CSE '27</span>
            </div>
          </div>

          {/* Developer Identity & Telemetry Console (Positioned just below Connect micro-bar) */}
          <div className="w-full max-w-[460px] mt-8 p-6 sm:p-7 rounded-[36px] glass-panel border border-white/90 shadow-glass-lg relative overflow-hidden flex flex-col space-y-5">
            {/* Top Bar: Developer Identity Capsule */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-pastel-ink/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center font-display font-bold text-sm text-pastel-ink shadow-inner border border-white/90">
                  VJ
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-pastel-ink flex items-center gap-1.5">
                    <span>{profileData.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-spring animate-pulse" />
                  </div>
                  <span className="font-mono text-[11px] text-pastel-slate">
                    Full-Stack & Systems Engineer
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="px-3 py-1 rounded-full glass-badge text-[10px] font-mono text-pastel-ink/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-spring" />
                <span>Active '26</span>
              </div>
            </div>

            {/* Inner Floating Glass Widget 1: Verified Academic & Hackathon Metrics */}
            <div className="relative z-10 grid grid-cols-2 gap-3">
              <div className="glass-panel-subtle p-3.5 rounded-2xl border border-white/80 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-accent-java mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase text-pastel-slate font-medium">Academics</span>
                </div>
                <div className="font-display font-bold text-lg text-pastel-ink">7.54 CGPA</div>
                <div className="font-mono text-[10px] text-pastel-slate">SRIT Jabalpur (CSE)</div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-2xl border border-white/80 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-accent-spring mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase text-pastel-slate font-medium">National Honor</span>
                </div>
                <div className="font-display font-bold text-lg text-pastel-ink">Top 40</div>
                <div className="font-mono text-[10px] text-pastel-slate">Smart India Hackathon</div>
              </div>
            </div>

            {/* Inner Floating Glass Widget 2: Core Engineering Stack */}
            <div className="relative z-10 glass-panel-subtle p-4 rounded-2xl border border-white/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-pastel-slate flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-pastel-ink" />
                  <span>Production Stack</span>
                </span>
                <span className="font-mono text-[10px] text-pastel-slate/70">Verified</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Java', 'Spring Boot', 'React', 'Node.js', 'MongoDB', 'MySQL'].map((tech) => (
                  <span 
                    key={tech} 
                    className="font-mono text-[11px] px-3 py-1 rounded-full glass-pill text-pastel-ink shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Glass Control Pill */}
            <div className="relative z-10 pt-2 flex items-center justify-between text-xs font-mono text-pastel-slate">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-spring" />
                <span>Cisco AICTE Virtual Intern</span>
              </span>
              <a 
                href="#contact" 
                className="text-pastel-ink hover:text-accent-java font-medium transition-colors"
              >
                Open Comms ›
              </a>
            </div>
          </div>
        </div>

        {/* Right Area: Showcase area for 3D Photoreal Glass Butterfly */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative w-full min-h-[420px] pointer-events-none" />
      </div>
    </section>
  );
}

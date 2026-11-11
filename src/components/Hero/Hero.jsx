import React from 'react';
import { ArrowDown, Mail, FileText, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/BrandIcons';
import { profileData } from '../../data/profile';
import LiquidGlassSculpture from './LiquidGlassSculpture';

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-pastel-ink mb-6 border border-white/80 shadow-glass-sm animate-fade-in">
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
          <div className="relative pl-4 border-l-2 border-pastel-lavender mb-6 max-w-xl">
            <p className="font-display italic text-base sm:text-lg text-pastel-ink/80 leading-relaxed">
              "{profileData.bio.philosophy}"
            </p>
          </div>

          {/* Brief Introduction */}
          <p className="font-body text-sm sm:text-base text-pastel-slate max-w-xl leading-relaxed mb-8">
            {profileData.tagline} Focused on modern full-stack systems with <span className="text-pastel-ink font-medium">Java, Spring Boot, React, and Node.js</span>, bridging robust enterprise engineering with intelligent AI capabilities.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#projects"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-pastel-ink text-pastel-white text-sm font-medium hover:bg-pastel-ink/90 transition-all duration-300 shadow-glass-md hover:shadow-glass-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <button
              onClick={onOpenResume}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass-panel hover:bg-white text-pastel-ink text-sm font-medium transition-all duration-300 hover:shadow-glass-md hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-pastel-slate" />
              <span>Digital Resume</span>
            </button>
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
              className="p-2.5 rounded-full glass-panel text-pastel-ink hover:text-accent-java hover:bg-white transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href={profileData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full glass-panel text-pastel-ink hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Email Contact Action */}
            <button
              onClick={onOpenContactModal}
              aria-label="Send direct message"
              className="p-2.5 rounded-full glass-panel text-pastel-ink hover:text-pastel-ink hover:bg-white transition-all duration-200 flex items-center gap-1.5"
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
        </div>

        {/* Right Area: Liquid Glass Refractive Sculpture Visual Anchor */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <LiquidGlassSculpture />
          
          {/* Subtle caption */}
          <div className="mt-4 px-3 py-1 rounded-full glass-badge text-[11px] font-mono text-pastel-slate tracking-wider uppercase">
            Interactive Refractive Glass Material
          </div>
        </div>
      </div>
    </section>
  );
}

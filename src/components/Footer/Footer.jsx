import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { GithubIcon } from '../Icons/BrandIcons';
import { profileData } from '../../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-pastel-ink/10 py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pastel-lavender/80 border border-white flex items-center justify-center font-display font-bold text-xs text-pastel-ink">
            {profileData.monogram}
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-wide text-pastel-ink">
              {profileData.name}
            </div>
            <div className="font-mono text-[10px] text-pastel-slate">
              Pastel Liquid Glass × Creative Engineering
            </div>
          </div>
        </div>

        {/* Center Editorial Quote */}
        <div className="text-center font-mono text-xs text-pastel-slate">
          Built with React, Vite, Tailwind CSS & Three.js • Deployed on GitHub
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-3">
          <a
            href={profileData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass-panel hover:bg-white text-pastel-ink transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel hover:bg-white text-xs font-mono text-pastel-ink transition-all"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

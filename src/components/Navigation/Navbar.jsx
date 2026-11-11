import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { profileData } from '../../data/profile';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Notebook', href: '#notebook' },
  { label: 'Journal', href: '#journal' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResume }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = ['hero', ...navLinks.map(l => l.href.substring(1))];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <nav 
          className={`pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-500 ease-out ${
            scrolled 
              ? 'glass-panel shadow-glass-lg scale-[0.98]' 
              : 'glass-panel-subtle shadow-glass-sm'
          } max-w-6xl w-full border border-white/70`}
          aria-label="Main Navigation"
        >
          {/* Monogram / Brand */}
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-ink rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-pastel-lavender/80 border border-white/90 flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110">
              <span className="font-display font-bold text-xs tracking-wider text-pastel-ink">
                {profileData.monogram}
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-semibold text-xs tracking-wider text-pastel-ink uppercase">
                {profileData.name}
              </span>
              <span className="font-mono text-[9px] text-pastel-slate">
                SDE Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-pastel-ink bg-white/70 shadow-sm font-semibold'
                      : 'text-pastel-slate hover:text-pastel-ink hover:bg-white/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pastel-ink" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-pastel-peach/60 hover:bg-pastel-peach text-pastel-ink border border-white/80 shadow-sm transition-all duration-300 hover:shadow hover:scale-105 active:scale-95"
              aria-label="View interactive resume"
            >
              <FileText className="w-3.5 h-3.5 text-pastel-ink/80" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-pastel-ink text-pastel-white hover:bg-pastel-ink/90 transition-all duration-300 shadow hover:shadow-md"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full glass-panel text-pastel-ink hover:bg-white/90 transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center px-6 bg-pastel-ink/20 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-3xl max-w-sm mx-auto w-full shadow-glass-lg border border-white/80 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 border-b border-pastel-ink/10 mb-2">
              <span className="font-display font-bold text-sm tracking-wide text-pastel-ink">
                {profileData.name}
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-pastel-slate hover:text-pastel-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-pastel-ink hover:bg-pastel-lavender/50 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-pastel-ink/10 flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pastel-peach/80 text-pastel-ink text-sm font-medium border border-white"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

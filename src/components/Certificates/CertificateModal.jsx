import React, { useEffect } from 'react';
import { X, Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pastel-ink/35 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-white shadow-glass-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel hover:bg-white text-pastel-ink transition-transform hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Credential Header */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white shadow-inner"
            style={{ backgroundColor: certificate.accent }}
          >
            <Award className="w-6 h-6 text-pastel-ink" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-pastel-slate">
                {certificate.issuer}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-pastel-mint/80 text-pastel-ink border border-white">
                Verified Credential
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-pastel-ink">
              {certificate.title}
            </h3>
          </div>
        </div>

        {/* Document-Inspired Certificate Box */}
        <div className="p-6 rounded-2xl bg-white/70 border border-white/90 space-y-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-pastel-slate border-b border-pastel-ink/10 pb-3">
            <span>Date Conferred: {certificate.date}</span>
            <span>Category: {certificate.category}</span>
          </div>

          <p className="font-body text-xs sm:text-sm text-pastel-slate leading-relaxed">
            {certificate.description}
          </p>

          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-pastel-slate block mb-2">
              Competencies & Verified Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skills.map((skill, idx) => (
                <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-pastel-white text-pastel-ink border border-pastel-ink/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-accent-spring">
            <ShieldCheck className="w-4 h-4" />
            <span>Document verified against official transcript</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-pastel-ink text-pastel-white text-xs font-medium hover:bg-pastel-ink/90 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

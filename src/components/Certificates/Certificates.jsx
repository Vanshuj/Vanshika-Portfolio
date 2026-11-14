import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { certificatesData } from '../../data/certificates';
import CertificateModal from './CertificateModal';

export default function Certificates() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="certificates" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 07 // Credentials ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">Achievements & Certifications</span>
      </div>

      <div className="max-w-2xl mb-16">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-3">
          Recognitions & Validated Credentials.
        </h2>
        <p className="font-body text-sm sm:text-base text-pastel-slate">
          Authentic national hackathon honors, AWS Academy graduate credentials, and international simulation certifications.
        </p>
      </div>

      {/* Certificate Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setActiveCert(cert)}
            className={`glass-card-interactive p-6 rounded-3xl border border-white/80 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
              cert.isNationalHonor ? 'ring-2 ring-accent-java/40' : ''
            }`}
          >
            <div className="relative z-10">
              {/* Badge & Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-full glass-badge text-pastel-ink font-semibold">
                  {cert.badge}
                </span>
                <span className="font-mono text-xs text-pastel-slate flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {cert.date}
                </span>
              </div>

              {/* Title & Issuer */}
              <h3 className="font-display font-bold text-lg text-pastel-ink mb-2 group-hover:text-pastel-ink/90 transition-colors">
                {cert.title}
              </h3>
              
              <p className="font-mono text-xs text-pastel-slate mb-4">
                {cert.issuer}
              </p>

              <p className="font-body text-xs text-pastel-slate line-clamp-3 mb-6 leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Bottom Competencies */}
            <div>
              <div className="flex flex-wrap gap-1 mb-4">
                {cert.skills.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="font-mono text-[9px] px-2.5 py-0.5 rounded-full glass-pill text-pastel-ink">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-pastel-ink/10 flex items-center justify-between text-xs font-mono text-pastel-ink">
                <span className="text-pastel-slate group-hover:text-pastel-ink">
                  {cert.verificationUrl ? 'View & Verify Credential' : 'View credential record'}
                </span>
                <div className="flex items-center gap-1.5">
                  {cert.verificationUrl && <ExternalLink className="w-3 h-3 text-accent-spring" />}
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  );
}

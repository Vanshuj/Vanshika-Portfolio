import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/BrandIcons';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { experienceData } from '../../data/experience';
import { certificatesData } from '../../data/certificates';

export default function ResumeModal({ onClose }) {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-pastel-ink/40 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-auto bg-white p-6 sm:p-12 rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto border border-pastel-ink/10 text-pastel-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-pastel-ink/10 no-print">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-pastel-mint text-pastel-ink font-semibold">
              ATS-Standard Curriculum Vitae
            </span>
            <span className="font-mono text-xs text-pastel-slate hidden sm:inline">
              Verified Academic & Technical Record
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="liquid-pill-purple inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-white/90" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-pastel-slate hover:text-pastel-ink transition-colors"
              aria-label="Close resume view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            PRINTABLE ATS RESUME BODY
           ======================================================== */}
        <div className="space-y-6 text-left">
          
          {/* Header */}
          <div className="text-center pb-4 border-b border-gray-200">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight mb-2">
              {profileData.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs text-gray-600">
              <a 
                href={profileData.socials.github.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>github.com/{profileData.socials.github.username}</span>
              </a>
              <span>•</span>
              <a 
                href={profileData.socials.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 text-blue-700"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
              <a 
                href={`mailto:${profileData.socials.email.address}`}
                className="hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profileData.socials.email.address}</span>
              </a>
              <span>•</span>
              {/* Privacy Protection: Phone is not exposed publicly per explicit instructions */}
              <span className="text-gray-500 italic">
                Phone: Available on verified request
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
              Summary
            </h2>
            <p className="font-body text-xs sm:text-[13px] text-gray-700 leading-relaxed">
              Computer Engineering undergraduate and Full-Stack Developer specializing in the MERN stack and Java-based backend development. Experienced in building web applications, RESTful APIs, authentication systems, and AI-powered platforms using React, Node.js, Spring Boot, and MongoDB. Strong foundation in object-oriented programming, database management, and problem-solving, with hands-on experience in full-stack development and AI integration.
            </p>
          </div>

          {/* Experience & Training */}
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
              Experience & Training
            </h2>
            <div className="space-y-3">
              {experienceData.workAndTraining.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold text-gray-900">
                    <span>{exp.organization} — {exp.role}</span>
                    <span className="font-mono font-normal text-xs text-gray-600">{exp.period}</span>
                  </div>
                  <div className="font-body italic text-xs text-gray-600 mb-1">
                    {exp.program}
                  </div>
                  <ul className="list-disc list-inside space-y-1 font-body text-xs sm:text-[13px] text-gray-700">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
              {projectsData.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold text-gray-900">
                    <span className="flex items-center gap-2">
                      <span>{proj.title} – {proj.tagline}</span>
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-gray-500 hover:text-black font-mono font-normal"
                      >
                        [GitHub]
                      </a>
                    </span>
                    <span className="font-mono font-normal text-xs text-gray-600">{proj.year}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 font-body text-xs sm:text-[13px] text-gray-700 mt-1">
                    {proj.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {experienceData.education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">{edu.institution}</span>
                    <span className="text-gray-600 text-xs ml-2">({edu.location})</span>
                    <div className="text-xs text-gray-700">{edu.degree} — {edu.field}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-medium text-xs text-gray-800">{edu.score}</span>
                    <div className="font-mono text-xs text-gray-500">{edu.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1 font-body text-xs sm:text-[13px] text-gray-700">
              <div><strong className="text-gray-900 font-semibold">Languages:</strong> Java, JavaScript, Python, C, C++</div>
              <div><strong className="text-gray-900 font-semibold">MERN Stack:</strong> MongoDB, Express.js, React.js, Node.js</div>
              <div><strong className="text-gray-900 font-semibold">Java Backend:</strong> Spring Boot, Spring AI, REST APIs</div>
              <div><strong className="text-gray-900 font-semibold">Authentication:</strong> JWT, GitHub OAuth</div>
              <div><strong className="text-gray-900 font-semibold">Databases & Tools:</strong> MySQL, MongoDB, Git, GitHub, Render, Power BI</div>
              <div><strong className="text-gray-900 font-semibold">Core CS:</strong> Data Structures & Algorithms, Object-Oriented Programming (OOP)</div>
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
              Achievements & Certifications
            </h2>
            <ul className="list-disc list-inside space-y-1 font-body text-xs sm:text-[13px] text-gray-700">
              {certificatesData.map((c) => (
                <li key={c.id}>
                  <strong className="text-gray-900 font-semibold">{c.title}</strong> — {c.issuer} <span className="font-mono text-xs text-gray-500">({c.date})</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between text-xs font-mono text-gray-500 no-print">
          <div className="flex items-center gap-1.5 text-accent-spring">
            <ShieldCheck className="w-4 h-4" />
            <span>Personal phone number protected from public crawlers</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-800 hover:underline font-semibold"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}

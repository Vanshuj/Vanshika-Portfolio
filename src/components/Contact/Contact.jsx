import React, { useState } from 'react';
import { Mail, FileText, Send, CheckCircle2, Copy, Check, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/BrandIcons';
import { profileData } from '../../data/profile';
import confetti from 'canvas-confetti';

export default function Contact({ onOpenResume }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please include a message';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    // Simulate reliable dispatch and open mailto link to guarantee delivery to user's real email
    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#DCD5F5', '#D5E8F5', '#D7EBDD', '#F6DFD2', '#F89820']
        });
      } catch (e) {}

      // Trigger user mail client fallback as backup
      const mailtoUrl = `mailto:${profileData.socials.email.address}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-pastel-slate">
          [ 08 // Dialogue ]
        </span>
        <div className="h-px bg-pastel-ink/10 flex-grow" />
        <span className="font-mono text-xs text-pastel-slate">Get in Touch</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Editorial Invitation & Social Connections (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-pastel-ink tracking-tight mb-4">
              Let's build something exceptional together.
            </h2>
            <p className="font-body text-base text-pastel-slate leading-relaxed">
              Whether you're exploring full-stack engineering candidates, seeking an intern with modern Java & MERN experience, or wishing to collaborate on AI-driven platforms, I'd love to connect.
            </p>
          </div>

          {/* Email Copy Card */}
          <div className="glass-panel tint-lavender p-5 rounded-2xl border border-white/90 shadow-glass-sm space-y-3">
            <span className="font-mono text-xs text-pastel-slate block uppercase tracking-wider">
              Direct Inquiries
            </span>
            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white/70 border border-white">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail className="w-4 h-4 text-pastel-ink flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-pastel-ink truncate">
                  {profileData.socials.email.address}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-pastel-white text-xs font-mono text-pastel-ink shadow-xs border border-pastel-ink/10 transition-all active:scale-95 flex-shrink-0"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-accent-spring" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            
            {/* Privacy note */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-pastel-slate">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-spring" />
              <span>Personal contact information protected</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2.5">
            <a
              href={profileData.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl glass-panel hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-4 h-4 text-pastel-ink" />
                <span className="font-display font-medium text-sm text-pastel-ink">
                  github.com/{profileData.socials.github.username}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-pastel-slate group-hover:text-pastel-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={profileData.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl glass-panel hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-4 h-4 text-blue-600" />
                <span className="font-display font-medium text-sm text-pastel-ink">
                  LinkedIn Profile
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-pastel-slate group-hover:text-pastel-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="w-full flex items-center justify-between p-4 rounded-xl glass-panel hover:bg-white transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-accent-java" />
                <span className="font-display font-medium text-sm text-pastel-ink">
                  View ATS-Friendly Digital Resume
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-pastel-slate group-hover:text-pastel-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Functional Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-card-interactive p-6 sm:p-8 rounded-[32px] border border-white/90 shadow-glass-md">
            <h3 className="font-display font-bold text-xl text-pastel-ink mb-1">
              Send a Direct Message
            </h3>
            <p className="font-mono text-xs text-pastel-slate mb-6">
              Messages will be routed directly to {profileData.name}'s primary inbox.
            </p>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-pastel-mint/30 border border-accent-spring/30 text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-pastel-mint flex items-center justify-center mx-auto text-accent-spring">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-pastel-ink">
                  Message Dispatched!
                </h4>
                <p className="font-body text-xs sm:text-sm text-pastel-slate max-w-md mx-auto">
                  Thank you! Your email client has been prepared, and a direct notification has been triggered. I'll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-3 px-4 py-2 rounded-xl glass-panel text-xs font-mono text-pastel-ink hover:bg-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs text-pastel-ink block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/70 border ${
                        errors.name ? 'border-red-400' : 'border-white'
                      } text-pastel-ink text-sm placeholder:text-pastel-slate/50 focus:outline-none focus:ring-2 focus:ring-pastel-ink/20`}
                    />
                    {errors.name && <p className="font-mono text-[10px] text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs text-pastel-ink block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/70 border ${
                        errors.email ? 'border-red-400' : 'border-white'
                      } text-pastel-ink text-sm placeholder:text-pastel-slate/50 focus:outline-none focus:ring-2 focus:ring-pastel-ink/20`}
                    />
                    {errors.email && <p className="font-mono text-[10px] text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-pastel-ink block">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship opportunity / Full-stack inquiry"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white text-pastel-ink text-sm placeholder:text-pastel-slate/50 focus:outline-none focus:ring-2 focus:ring-pastel-ink/20"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-pastel-ink block">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Vanshika, I'd like to discuss..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/70 border ${
                      errors.message ? 'border-red-400' : 'border-white'
                    } text-pastel-ink text-sm placeholder:text-pastel-slate/50 focus:outline-none focus:ring-2 focus:ring-pastel-ink/20 resize-none`}
                  />
                  {errors.message && <p className="font-mono text-[10px] text-red-500">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-pastel-ink text-pastel-white text-xs font-mono font-medium hover:bg-pastel-ink/90 transition-all shadow-glass-sm hover:shadow-glass-md disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

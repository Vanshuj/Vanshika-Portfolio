import React, { useState } from 'react';
import { Image, Upload, ExternalLink, Sparkles, Sliders, Cpu, GitBranch, Play, Volume2, Video } from 'lucide-react';
import MacBookFrame from './MacBookFrame';

function getVideoEmbed(url) {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0` };
  }
  // Loom
  const loomMatch = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (loomMatch) {
    return { type: 'iframe', src: `https://www.loom.com/embed/${loomMatch[1]}` };
  }
  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return { type: 'iframe', src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
  }
  // Direct MP4 / WebM video file
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return { type: 'video', src: url };
  }
  // Generic URL (iframe fallback)
  return { type: 'iframe', src: url };
}

export default function ProjectVisualPlaceholder({ project }) {
  const [localImage, setLocalImage] = useState(null);
  const [similarity, setSimilarity] = useState(88);
  const [storyNode, setStoryNode] = useState('intro');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState(project.videoUrl ? 'video' : 'sandbox');

  // File upload handler for when user wants to preview their own screenshot immediately
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalImage(url);
    }
  };

  const videoEmbed = getVideoEmbed(project.videoUrl);
  const imageSrc = localImage || project.screenshot;

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-[28px] glass-panel border border-white/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-glass-md">
      
      {/* Decorative Ambient Backdrop */}
      <div 
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{ backgroundColor: project.accentColor || '#BDB8FF' }}
      />

      {/* Top Header of the Showcase: Title & Mode Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-pastel-ink/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-spring animate-pulse" />
          <span className="font-mono text-[11px] text-pastel-slate">
            sys://{project.id}.internal/{activeTab}
          </span>
        </div>

        {/* Tab Switcher if video or screenshot exists */}
        <div className="flex items-center gap-1.5">
          {project.videoUrl && (
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
                activeTab === 'video'
                  ? 'glass-badge bg-white/90 text-pastel-ink font-semibold shadow-sm'
                  : 'text-pastel-slate hover:text-pastel-ink'
              }`}
            >
              <Video className="w-3 h-3 text-accent-java" />
              <span>Demo Video</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
              activeTab === 'sandbox'
                ? 'glass-badge bg-white/90 text-pastel-ink font-semibold shadow-sm'
                : 'text-pastel-slate hover:text-pastel-ink'
            }`}
          >
            <Sparkles className="w-3 h-3 text-accent-spring" />
            <span>Sandbox</span>
          </button>

          {/* Upload screenshot quick-slot for user */}
          <label className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono text-pastel-slate hover:text-pastel-ink cursor-pointer hover:bg-white/60 transition-all">
            <Upload className="w-3 h-3 text-pastel-slate" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </div>
      </div>

      {/* Main Showcase Body */}
      <div className="my-auto py-3 relative z-10">
        {/* VIEW 1: DEMO VIDEO */}
        {activeTab === 'video' && videoEmbed && (
          <MacBookFrame>
            {videoEmbed.type === 'video' ? (
              <video 
                src={videoEmbed.src} 
                controls 
                className="w-full h-full object-cover"
                poster={imageSrc || undefined}
              />
            ) : (
              <iframe
                src={videoEmbed.src}
                title={`${project.title} Demo Video`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </MacBookFrame>
        )}

        {/* VIEW 2: STATIC SCREENSHOT (if image loaded and not video mode) */}
        {activeTab !== 'video' && imageSrc && (
          <MacBookFrame>
            <img 
              src={imageSrc} 
              alt={project.title} 
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
            />
          </MacBookFrame>
        )}

        {/* VIEW 3: DOMAIN-SPECIFIC INTERACTIVE ARCHITECTURAL SANDBOX (Fallback / Default) */}
        {activeTab === 'sandbox' && !imageSrc && (
          <div>
            {project.id === 'pixel-arena' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-pastel-slate">
                  <span>imageCompare.js [Middleware Stream]</span>
                  <span className="text-pastel-ink font-semibold">Similarity: {similarity}%</span>
                </div>

                {/* Visual pixel comparison grid mockup */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl glass-pill flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-[10px] text-pastel-slate mb-1">Reference Frame</span>
                    <div className="w-16 h-16 rounded-xl glass-badge flex items-center justify-center text-pastel-ink font-mono text-xs font-bold shadow-sm">
                      REF #402
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl glass-pill flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-[10px] text-pastel-slate mb-1">User Submission</span>
                    <div className="w-16 h-16 rounded-xl glass-badge flex items-center justify-center text-pastel-ink font-mono text-xs font-bold shadow-sm">
                      USER #89
                    </div>
                  </div>
                </div>

                {/* Slider to interactively test calculation */}
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-pastel-slate" />
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={similarity} 
                      onChange={(e) => setSimilarity(Number(e.target.value))}
                      className="w-full accent-pastel-ink cursor-pointer h-1.5 bg-pastel-ink/20 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-pastel-slate mt-1">
                    <span>Tolerance: 0.05</span>
                    <span>Render Cloud Uptime: 99.98%</span>
                  </div>
                </div>
              </div>
            )}

            {project.id === 'kathavani' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-pastel-slate">
                  <span>Interactive Story Engine Tree</span>
                  <button 
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full glass-badge hover:bg-gold/15 transition-all"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{isPlayingAudio ? 'Speech Synthesizing...' : 'Test Web Speech'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl glass-panel-subtle space-y-2">
                  <div className="font-display font-semibold text-xs text-pastel-ink">
                    {storyNode === 'intro' ? 'Chapter 1: The Mountain Sanctuary' : 'Chapter 2: The Whispering Valley'}
                  </div>
                  <p className="font-body text-xs text-pastel-slate leading-relaxed">
                    {storyNode === 'intro' 
                      ? '"Two diverging pathways emerge beneath the cedar canopy—one winds up the ancient ridge, the other descends toward the river."'
                      : '"The river currents echo with age-old folklore. The path ahead requires resolving the elder\'s riddle."'}
                  </p>

                  {/* Branching choices */}
                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => setStoryNode(storyNode === 'intro' ? 'branch' : 'intro')}
                      className="text-[11px] font-mono px-3 py-1 rounded-full glass-pill text-pastel-ink"
                    >
                      Branch: {storyNode === 'intro' ? 'Follow Valley' : 'Return to Ridge'}
                    </button>
                    <span className="text-[10px] font-mono text-pastel-slate self-center">
                      IndexedDB: Synced Offline
                    </span>
                  </div>
                </div>
              </div>
            )}

            {project.id === 'gyan-ai' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-pastel-slate">
                  <span>Knowledge Graph Visualization [ELK.js]</span>
                  <span className="text-[10px] glass-badge px-2 py-0.5 rounded text-pastel-ink">
                    Multi-LLM Active
                  </span>
                </div>

                {/* Concept graph visualization mockup */}
                <div className="p-3.5 rounded-2xl glass-panel-subtle flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-pastel-ink font-semibold">Topic: Distributed Concurrency</span>
                    <span className="text-pastel-slate">Format: PDF / MD</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 py-2">
                    <span className="px-2.5 py-1 rounded-lg glass-badge text-pastel-ink text-xs font-mono shadow-sm">
                      Deadlocks
                    </span>
                    <span className="text-pastel-slate font-mono text-xs">→</span>
                    <span className="px-2.5 py-1 rounded-lg glass-badge text-pastel-ink text-xs font-mono shadow-sm">
                      Mutex Locks
                    </span>
                    <span className="text-pastel-slate font-mono text-xs">→</span>
                    <span className="px-2.5 py-1 rounded-lg glass-badge text-pastel-ink text-xs font-mono shadow-sm">
                      Semaphores
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-pastel-slate pt-1 border-t border-pastel-ink/5">
                    <span>Models: Gemini 1.5 + Groq LPU</span>
                    <span>JWT Secure Session</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Info Note */}
      <div className="flex items-center justify-between pt-3 border-t border-pastel-ink/10 relative z-10 text-[11px] font-mono text-pastel-slate">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent-spring" />
          <span>Architectural Sandbox & Proof of Concept</span>
        </span>
        {project.videoUrl ? (
          <span className="text-accent-java font-mono">Demo Video Available</span>
        ) : (
          <span>Space reserved for live demo</span>
        )}
      </div>
    </div>
  );
}

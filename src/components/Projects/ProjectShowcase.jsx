import React from 'react';
import MacBookBrowserFrame from './MacBookBrowserFrame';

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

export default function ProjectShowcase({ project }) {
  const videoEmbed = getVideoEmbed(project.videoUrl);
  const imageSrc = project.screenshot;

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-[28px] glass-panel border border-white/90 p-4 sm:p-6 flex flex-col justify-center items-center overflow-hidden shadow-glass-md">
      {/* Decorative Ambient Backdrop */}
      <div 
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{ backgroundColor: project.accentColor || '#BDB8FF' }}
      />

      <div className="relative z-10 w-full flex items-center justify-center">
        {videoEmbed ? (
          <MacBookBrowserFrame title={project.title} url={project.demoUrl}>
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
                title={`${project.title} Showcase`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </MacBookBrowserFrame>
        ) : imageSrc ? (
          <MacBookBrowserFrame title={project.title} url={project.demoUrl}>
            <img 
              src={imageSrc} 
              alt={project.title} 
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
            />
          </MacBookBrowserFrame>
        ) : null}
      </div>
    </div>
  );
}

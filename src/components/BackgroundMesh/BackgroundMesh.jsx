import React from 'react';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* Soft Pastel Ambient Spheres */}
      <div 
        aria-hidden="true"
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[110px] opacity-45 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #DCD5F5 0%, rgba(220, 213, 245, 0.2) 70%, transparent 100%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[25%] -right-[12%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[120px] opacity-40 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #D5E8F5 0%, rgba(213, 232, 245, 0.2) 70%, transparent 100%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[60%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-35 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #F6DFD2 0%, rgba(246, 223, 210, 0.2) 70%, transparent 100%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[130px] opacity-40 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #D7EBDD 0%, rgba(215, 235, 221, 0.2) 70%, transparent 100%)' }}
      />

      {/* Subtle Technical Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(to right, #252831 1px, transparent 1px), linear-gradient(to bottom, #252831 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
}

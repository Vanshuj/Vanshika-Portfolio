import React from 'react';

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-noise">
      {/* Soft Pastel Ambient Spheres that shine through transparent liquid glass */}
      <div 
        aria-hidden="true"
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[130px] opacity-60 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #DCD5F5 0%, rgba(196, 181, 253, 0.45) 50%, transparent 80%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[20%] -right-[12%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] opacity-55 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #D5E8F5 0%, rgba(147, 197, 253, 0.45) 50%, transparent 80%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[50%] left-[8%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] opacity-50 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #F6DFD2 0%, rgba(251, 207, 232, 0.4) 50%, transparent 80%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute top-[75%] -right-[8%] w-[52vw] h-[52vw] max-w-[720px] max-h-[720px] rounded-full blur-[140px] opacity-50 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #D7EBDD 0%, rgba(167, 243, 208, 0.4) 50%, transparent 80%)' }}
      />
      <div 
        aria-hidden="true"
        className="absolute bottom-[-10%] left-[15%] w-[48vw] h-[48vw] max-w-[650px] max-h-[650px] rounded-full blur-[130px] opacity-45 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, #F5EDCE 0%, rgba(253, 230, 138, 0.35) 50%, transparent 80%)' }}
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

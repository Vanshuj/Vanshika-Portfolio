import React, { useState, useEffect } from 'react';
import Navbar from './components/Navigation/Navbar';
import BackgroundMesh from './components/BackgroundMesh/BackgroundMesh';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Certificates from './components/Certificates/Certificates';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ResumeModal from './components/ResumeModal/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-pastel-white selection:bg-pastel-ink selection:text-pastel-white">
      {/* Background Atmospheric Mesh */}
      <BackgroundMesh />

      {/* Floating Liquid Glass Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col space-y-4">
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)} 
          onOpenContactModal={handleOpenContact}
        />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* ATS Digital Resume Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}

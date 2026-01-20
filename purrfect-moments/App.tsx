import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import VisualStory from './components/VisualStory';
import Team from './components/Team';
import Footer from './components/Footer';
import FloatingMenu from './components/FloatingMenu';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-background-dark">
      {/* Hero Background Wrapper */}
      <div className="absolute top-0 left-0 right-0 h-[1100px] z-0 overflow-hidden pointer-events-none">
        {/* Base Gradient - Sage to White */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#cedada] via-[#e8eaeb] to-[#f4f4f5]"></div>
        
        {/* Warm accent top right */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-white/60 blur-3xl"></div>
        
        {/* Paper Texture only on this section */}
        <div className="absolute inset-0 paper-texture opacity-40 mix-blend-multiply"></div>
        
        {/* Bottom fade to white to blend with content */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-background-dark"></div>
      </div>
      
      {/* Content Wrapper */}
      <div className="relative z-10">
        <Header />
        
        <main className="w-full max-w-[1400px] mx-auto flex flex-col gap-24 pb-20">
          <Hero />
          <Services />
          <VisualStory />
          <Team />
          <Footer />
        </main>

        <FloatingMenu />
      </div>
    </div>
  );
};

export default App;
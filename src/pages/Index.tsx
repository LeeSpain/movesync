
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.hostname === window.location.hostname) {
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth',
          });
          
          // Update URL hash
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Australian background patterns */}
      <div className="fixed inset-0 -z-50 opacity-5 pointer-events-none">
        <img 
          src="https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07"
          alt=""
          className="absolute top-0 right-0 w-1/5 h-1/5 object-cover opacity-20"
        />
        <img 
          src="https://source.unsplash.com/photo-1500375592092-40eb2168fd21"
          alt=""
          className="absolute bottom-0 left-0 w-1/5 h-1/5 object-cover opacity-20"
        />
      </div>
      
      <main>
        <Hero />
        <Features />
        <AIAssistant />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

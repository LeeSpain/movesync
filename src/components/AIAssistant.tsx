
import { useState, useRef, useEffect } from 'react';
import { countries, Country } from './ai-assistant/types';
import ChatInterface from './ai-assistant/ChatInterface';
import CapabilitiesSection from './ai-assistant/CapabilitiesSection';
import PremiumDashboardPreview from './features/PremiumDashboardPreview';

const AIAssistant = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Handle intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="ai-assistant" 
      className="section-spacing bg-movesync-gray-light"
      ref={sectionRef}
    >
      <div className="container-content">
        <CapabilitiesSection isIntersecting={isIntersecting} />
        
        {/* AI Assistant Demo */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ChatInterface 
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
        
        {/* Premium Dashboard Preview */}
        <PremiumDashboardPreview isIntersecting={isIntersecting} />
      </div>
    </section>
  );
};

export default AIAssistant;

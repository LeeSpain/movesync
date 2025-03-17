
import { useState, useRef, useEffect } from 'react';
import { countries, Country } from './ai-assistant/types';
import ChatInterface from './ai-assistant/ChatInterface';
import CapabilitiesSection from './ai-assistant/CapabilitiesSection';
import PremiumDashboardPreview from './features/PremiumDashboardPreview';

const AIAssistant = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  // Handle intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const dashboardObserver = new IntersectionObserver(
      ([entry]) => {
        setIsDashboardVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (dashboardRef.current) {
      dashboardObserver.observe(dashboardRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (dashboardRef.current) {
        dashboardObserver.unobserve(dashboardRef.current);
      }
    };
  }, []);

  return (
    <>
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
        </div>
      </section>
      
      {/* Premium Dashboard Preview as a separate section */}
      <section 
        id="premium-dashboard" 
        className="section-spacing bg-white"
        ref={dashboardRef}
      >
        <div className="container-content">
          <PremiumDashboardPreview isIntersecting={isDashboardVisible} />
        </div>
      </section>
    </>
  );
};

export default AIAssistant;


import { useState, useRef, useEffect } from 'react';
import { featureCategories } from '@/data/featureCategories';
import FeatureHeader from './features/FeatureHeader';
import FeatureTabs from './features/FeatureTabs';
import FeatureDetail from './features/FeatureDetail';
import FeatureHighlights from './features/FeatureHighlights';
import Testimonial from './features/Testimonial';

const Features = () => {
  const [activeCategory, setActiveCategory] = useState<string>(featureCategories[0].id);
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
  
  // Find active feature category
  const activeFeature = featureCategories.find(cat => cat.id === activeCategory) || featureCategories[0];

  return (
    <section 
      id="features" 
      className="section-spacing bg-movesync-gray-light py-24 sm:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Australian-themed background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-40 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-content">
        {/* Section header */}
        <FeatureHeader isIntersecting={isIntersecting} />
        
        {/* Feature tabs and content */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <FeatureTabs 
            featureCategories={featureCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <FeatureDetail activeFeature={activeFeature} />
        </div>
        
        {/* Additional feature highlights with Australian context */}
        <FeatureHighlights isIntersecting={isIntersecting} />
        
        {/* Australian testimonial */}
        <Testimonial isIntersecting={isIntersecting} />
      </div>
    </section>
  );
};

export default Features;

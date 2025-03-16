
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
      
      {/* Australian lifestyle images as background pattern */}
      <div className="absolute inset-0 -z-20 opacity-5 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/4 h-1/4">
          <img 
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4">
          <img 
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="container-content">
        {/* Section header */}
        <FeatureHeader isIntersecting={isIntersecting} />
        
        {/* Australian iconic city imagery */}
        <div className={`grid grid-cols-4 gap-3 mb-12 transition-all duration-700 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <img 
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
            alt="Bondi Beach - Sydney's famous beach culture"
            className="aspect-video object-cover rounded-lg shadow-md"
          />
          <img 
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff"
            alt="Great Ocean Road - Melbourne's scenic coastal drive"
            className="aspect-video object-cover rounded-lg shadow-md"
          />
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
            alt="Gold Coast - Queensland's iconic skyline and beaches"
            className="aspect-video object-cover rounded-lg shadow-md"
          />
          <img 
            src="https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
            alt="Blue Mountains - Natural wonder near Sydney"
            className="aspect-video object-cover rounded-lg shadow-md"
          />
        </div>
        
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

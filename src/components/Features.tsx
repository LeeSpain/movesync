import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { featureCategories } from '@/data/featureCategories';

// Lazy load sub-components
const FeatureHeader = lazy(() => import('./features/FeatureHeader'));
const FeatureTabs = lazy(() => import('./features/FeatureTabs'));
const FeatureDetail = lazy(() => import('./features/FeatureDetail'));
const FeatureHighlights = lazy(() => import('./features/FeatureHighlights'));
const Testimonial = lazy(() => import('./features/Testimonial'));

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
      className="section-spacing bg-movesync-gray-light relative overflow-hidden"
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
            src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4">
          <img 
            src="https://images.unsplash.com/photo-1548096070-b9e9cbdf5739" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="container-content">
        <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <FeatureHeader isIntersecting={isIntersecting} />
        </Suspense>
        
        {/* Australian iconic city imagery */}
        <div className={`grid grid-cols-4 gap-3 mb-12 transition-all duration-700 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {[
            "photo-1506973035872-a4ec16b8e8d9",
            "photo-1529108190281-9a4f620bc2d8",
            "photo-1566734904496-9309bb1798ae",
            "photo-1465146344425-f00d5f5c8f07"
          ].map((photoId, index) => (
            <div key={index} className="aspect-video bg-gray-100 rounded-lg shadow-md">
              <img 
                src={`https://images.unsplash.com/${photoId}?w=400&auto=format&fit=crop&q=75`}
                alt=""
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-700 delay-300 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <FeatureTabs 
              featureCategories={featureCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            
            <FeatureDetail activeFeature={activeFeature} />
          </Suspense>
        </div>
        
        <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <FeatureHighlights isIntersecting={isIntersecting} />
          <Testimonial isIntersecting={isIntersecting} />
        </Suspense>
      </div>
    </section>
  );
};

export default Features;

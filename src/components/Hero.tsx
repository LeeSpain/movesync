
import { useEffect, useState, lazy, Suspense } from 'react';
import { ArrowRight, Globe, Home, Briefcase } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay for the entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-20 flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-64 h-64 bg-movesync-blue/5 rounded-full filter blur-3xl animate-pulse-light"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/5 rounded-full filter blur-3xl animate-pulse-light animation-delay-1000"></div>
      </div>
      
      <div className="container-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content */}
          <div 
            className={`lg:col-span-6 space-y-6 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-1000 ease-out`}
          >
            {/* Eyebrow text */}
            <div className="inline-flex items-center rounded-full bg-movesync-blue/10 px-3 py-1 text-sm font-medium text-movesync-blue">
              <span className="animate-pulse-light mr-1">•</span> AI-Powered Australian Relocation
            </div>
            
            {/* Main headline */}
            <h1 className="heading-xl">
              Seamless <span className="text-gradient">Australian</span> Relocation with AI Assistance
            </h1>
            
            {/* Subheading - Updated to mention both domestic and international relocations */}
            <p className="text-lg md:text-xl text-movesync-gray-dark leading-relaxed">
              Move-Sync leverages advanced AI to handle every aspect of your relocation within or to Australia, from finding homes in Sydney to adapting to life in Melbourne, making your transition effortless whether you're moving interstate or from overseas.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#" 
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Get Started 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#features" 
                className="btn-secondary"
              >
                Explore Features
              </a>
            </div>
          </div>
          
          {/* Hero Visual with optimized image loading */}
          <div 
            className={`lg:col-span-6 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } transition-all duration-1000 ease-out delay-300`}
          >
            <div className="relative">
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
                <div className="aspect-[4/3] relative overflow-hidden rounded-xl mb-4 bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?w=800&auto=format&fit=crop&q=75" 
                    alt="Sydney Opera House" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* AI Message interface - Updated to show both domestic and international relocation */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-movesync-blue flex items-center justify-center text-white">
                      AI
                    </div>
                    <div className="bg-movesync-gray-light rounded-2xl rounded-tl-none p-4 flex-1">
                      <p className="text-movesync-black">Welcome to Move-Sync! I see you're interested in relocating to Sydney. Whether you're moving from Melbourne or overseas, I can help find housing options within your budget of A$2,500/month.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-movesync-blue text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                      <p>Yes, that would be great. I'm looking for a 2-bedroom apartment close to public transportation and the beach.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements - Updated to highlight both domestic and international relocations */}
              <div className="absolute -top-6 -left-6 z-20 glass p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-movesync-blue">
                    <Home size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-movesync-black">Australian Home Search</p>
                    <p className="text-sm text-movesync-gray">Local & Interstate Moves</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 z-20 glass p-4 rounded-xl shadow-lg animate-float animation-delay-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-movesync-black">Australian Visa Support</p>
                    <p className="text-sm text-movesync-gray">For International Arrivals</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 glass p-4 rounded-xl shadow-lg animate-float animation-delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-movesync-black">Australian Job Search</p>
                    <p className="text-sm text-movesync-gray">Local & International</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

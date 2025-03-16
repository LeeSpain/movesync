
import { useEffect, useState } from 'react';
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
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-movesync-gray-dark leading-relaxed">
              MoveSync leverages advanced AI to handle every aspect of your relocation to Australia, from home search in Sydney to cultural integration in Melbourne, making your transition down under effortless.
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
          
          {/* Hero Visual */}
          <div 
            className={`lg:col-span-6 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } transition-all duration-1000 ease-out delay-300`}
          >
            <div className="relative">
              {/* Main image or illustration */}
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
                <div className="aspect-[4/3] relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                    alt="Australian landscape with Sydney Opera House" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* AI Message interface */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-movesync-blue flex items-center justify-center text-white">
                      AI
                    </div>
                    <div className="bg-movesync-gray-light rounded-2xl rounded-tl-none p-4 flex-1">
                      <p className="text-movesync-black">Welcome to MoveSync! I see you're interested in relocating to Sydney. Would you like me to help you find housing options within your budget of A$2,500/month?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-movesync-blue text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                      <p>Yes, that would be great. I'm looking for a 2-bedroom apartment close to public transportation and the beach.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 z-20 glass p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-movesync-blue">
                    <Home size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-movesync-black">Australian Home Search</p>
                    <p className="text-sm text-movesync-gray">AI-matched properties</p>
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
                    <p className="text-sm text-movesync-gray">100% AI-processed</p>
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
                    <p className="text-sm text-movesync-gray">AI job matching</p>
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

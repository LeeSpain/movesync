
import { Globe } from 'lucide-react';

const CapabilitiesSection = ({ isIntersecting }: { isIntersecting: boolean }) => {
  return (
    <>
      {/* Section header */}
      <div 
        className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="heading-lg mb-4">
          Meet Your <span className="text-gradient">AI Assistant</span>
        </h2>
        <p className="text-movesync-gray-dark text-lg mb-8">
          Experience conversational AI that guides you through every step of your relocation journey, 
          providing personalized assistance 24/7 in multiple countries and languages.
        </p>
        <div className="flex justify-center items-center gap-2">
          <Globe className="text-movesync-blue" size={24} />
          <p className="text-movesync-gray-dark font-medium">Available in 4 countries, with more coming soon!</p>
        </div>
      </div>
      
      {/* Key capabilities */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-500 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-3">Natural Conversation</h3>
          <p className="text-movesync-gray-dark">
            Speak naturally with your AI assistant, which understands context and provides human-like responses in multiple languages.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-3">Personalized Guidance</h3>
          <p className="text-movesync-gray-dark">
            Receive tailored advice based on your desired destination country, unique relocation needs, preferences, and constraints.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-3">24/7 Global Availability</h3>
          <p className="text-movesync-gray-dark">
            Get instant support for any destination country, any time of day, with consistent quality and no waiting times.
          </p>
        </div>
      </div>
    </>
  );
};

export default CapabilitiesSection;

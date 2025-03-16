
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
        <div className="inline-flex items-center rounded-full bg-movesync-blue/10 px-3 py-1 text-sm font-medium text-movesync-blue mb-4">
          <span className="animate-pulse-light mr-1">•</span> Australia Specialist
        </div>
        <h2 className="heading-lg mb-4">
          Meet Your Australian <span className="text-gradient">AI Assistant</span>
        </h2>
        <p className="text-movesync-gray-dark text-lg mb-8">
          Experience conversational AI that guides you through every step of your relocation journey to Australia, 
          providing personalized assistance 24/7 with deep knowledge of Australian cities, regulations, and culture.
        </p>
        <div className="flex justify-center items-center gap-2">
          <Globe className="text-movesync-blue" size={24} />
          <p className="text-movesync-gray-dark font-medium">Specialized in Sydney, Melbourne, Brisbane, and Perth!</p>
        </div>
      </div>
      
      {/* Key capabilities */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-500 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">Australian Expertise</h3>
          <p className="text-movesync-gray-dark">
            Our AI assistant is trained on comprehensive Australian data, providing accurate insights about neighborhoods, visa requirements, and local customs throughout Australia.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">Personalized Australian Guidance</h3>
          <p className="text-movesync-gray-dark">
            Receive tailored advice based on your desired Australian destination, from the bustling streets of Sydney to the cultural hubs of Melbourne or the beaches of Gold Coast.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-3">24/7 Australian Support</h3>
          <p className="text-movesync-gray-dark">
            Get instant support for any Australian relocation question, any time of day, with consistent quality and local expertise that understands Australian time zones.
          </p>
        </div>
      </div>
    </>
  );
};

export default CapabilitiesSection;



import React from 'react';

type FeatureHeaderProps = {
  isIntersecting: boolean;
};

const FeatureHeader: React.FC<FeatureHeaderProps> = ({ isIntersecting }) => {
  return (
    <div 
      className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="inline-flex items-center rounded-full bg-movesync-blue/10 px-3 py-1 text-sm font-medium text-movesync-blue mb-4">
        <span className="animate-pulse-light mr-1">•</span> Australian Relocation Solution
      </div>
      <h2 className="heading-lg mb-4">
        AI-Powered <span className="text-gradient-aussie">Australian Adventure</span>
      </h2>
      <p className="text-movesync-gray-dark text-lg">
        MoveSync combines advanced artificial intelligence with Australian relocation expertise to provide a 
        seamless, sun-soaked journey to your new life down under.
      </p>
    </div>
  );
};

export default FeatureHeader;


import React from 'react';
import { BarChart, Calendar, FileText } from 'lucide-react';

type FeatureHighlightsProps = {
  isIntersecting: boolean;
};

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ isIntersecting }) => {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transition-all duration-700 delay-500 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-movesync-blue mb-4">
          <BarChart size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Australian Market Analytics</h3>
        <p className="text-movesync-gray-dark">
          Get insights into Australian property markets, cost of living trends, and job opportunities with AI-powered analytics focused on Sydney, Melbourne, and beyond.
        </p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
          <Calendar size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Australian Relocation Timeline</h3>
        <p className="text-movesync-gray-dark">
          Your AI assistant creates custom Australian relocation timelines with automated reminders for visa deadlines, shipping arrivals, and property inspections.
        </p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
          <FileText size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Australian Documentation</h3>
        <p className="text-movesync-gray-dark">
          Securely store and manage all your Australian relocation documents, from visa applications to property contracts, with blockchain verification technology.
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlights;


import React from 'react';
import { FeatureCategory } from '@/types/features';

type FeatureDetailProps = {
  activeFeature: FeatureCategory;
};

const FeatureDetail: React.FC<FeatureDetailProps> = ({ activeFeature }) => {
  return (
    <div className="lg:col-span-8 order-1 lg:order-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-movesync-blue/10 flex items-center justify-center text-movesync-blue">
              <activeFeature.icon size={24} />
            </div>
            <h3 className="heading-sm text-movesync-black">{activeFeature.title}</h3>
          </div>
          
          <p className="text-movesync-gray-dark mb-4">
            {activeFeature.description}
          </p>
          
          {/* Australian context */}
          {activeFeature.australianContext && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
              <p className="text-movesync-gray-dark italic">
                {activeFeature.australianContext}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            {activeFeature.items.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-movesync-gray-light/50 hover:bg-movesync-gray-light/80 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-movesync-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-movesync-gray-dark">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;

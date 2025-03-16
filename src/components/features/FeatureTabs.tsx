
import React from 'react';
import { FeatureCategory } from '@/types/features';

type FeatureTabsProps = {
  featureCategories: FeatureCategory[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
};

const FeatureTabs: React.FC<FeatureTabsProps> = ({ 
  featureCategories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="lg:col-span-4 order-2 lg:order-1">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto lg:overflow-visible p-1 lg:p-0">
          <div className="flex flex-row lg:flex-col min-w-max lg:min-w-0">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 p-4 w-full text-left transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-movesync-blue text-white'
                    : 'hover:bg-movesync-blue/5'
                }`}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeCategory === category.id
                      ? 'bg-white/20'
                      : 'bg-movesync-blue/10'
                  }`}
                >
                  <category.icon 
                    size={20} 
                    className={activeCategory === category.id ? 'text-white' : 'text-movesync-blue'} 
                  />
                </div>
                <div>
                  <p className={`font-medium ${
                    activeCategory === category.id ? 'text-white' : 'text-movesync-black'
                  }`}>
                    {category.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTabs;

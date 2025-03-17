
import React from 'react';
import { Milestone } from 'lucide-react';

const ExitTimeline: React.FC = () => {
  return (
    <div className="bg-amber-100/50 p-4 rounded-lg">
      <h4 className="font-semibold mb-3 flex items-center">
        <span className="text-xl mr-2">⭐</span>
        Investor Exit Timeline
      </h4>
      
      <div className="space-y-3">
        {[
          { 
            years: "Years 1-3", 
            description: "Reinvest profits for growth, build market dominance" 
          },
          { 
            years: "Year 4", 
            description: "Initiate conversations with potential acquirers/strategic partners" 
          },
          { 
            years: "Year 5", 
            description: "Execute exit strategy, distribute returns to shareholders" 
          },
          { 
            years: "Secondary Option", 
            description: "If market conditions prevent exit, continue profitable operations with potential dividend distributions" 
          }
        ].map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="bg-amber-200 rounded-full p-1.5 mr-3 mt-0.5">
              <Milestone className="h-4 w-4 text-amber-700" />
            </div>
            <div>
              <span className="font-medium block text-sm">{item.years}:</span>
              <span className="text-sm">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExitTimeline;

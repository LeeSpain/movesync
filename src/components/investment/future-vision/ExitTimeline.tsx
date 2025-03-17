
import React from 'react';

const ExitTimeline: React.FC = () => {
  return (
    <div className="bg-amber-100/50 p-4 rounded-lg">
      <h4 className="font-semibold mb-2 flex items-center">
        <span className="text-xl mr-2">⭐</span>
        Investor Exit Timeline
      </h4>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li><span className="font-medium">Years 1-3:</span> Reinvest profits for growth, build market dominance</li>
        <li><span className="font-medium">Year 4:</span> Initiate conversations with potential acquirers/strategic partners</li>
        <li><span className="font-medium">Year 5:</span> Execute exit strategy, distribute returns to shareholders</li>
        <li><span className="font-medium">Secondary Option:</span> If market conditions prevent exit, continue profitable operations with potential dividend distributions</li>
      </ul>
    </div>
  );
};

export default ExitTimeline;

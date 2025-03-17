
import React from 'react';

interface GrowthRoadmapProps {
  investmentAmount: number;
  finalReturn: number;
  returnPercentage: number;
  years: number;
  globalGrowthRate: number;
  premoneyValuation: number;
  fiveYearProjection: number;
}

const GrowthRoadmap: React.FC<GrowthRoadmapProps> = ({
  investmentAmount,
  finalReturn,
  returnPercentage,
  years,
  globalGrowthRate,
  premoneyValuation,
  fiveYearProjection
}) => {
  return (
    <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
      <h3 className="font-bold text-xl mb-4 text-center">Our Growth Roadmap</h3>
      <p className="mb-4">
        MoveSync is positioned to achieve consistent {(globalGrowthRate * 100).toFixed(0)}% annual growth through our multi-faceted expansion strategy. 
        Here's how we'll turn your ${investmentAmount.toLocaleString()} investment into ${finalReturn.toLocaleString()} (a {returnPercentage}% return) over the next {years} years:
      </p>
      <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100 mb-4">
        <span className="font-semibold">Current Valuation:</span>
        <span className="font-bold text-movesync-blue">${premoneyValuation.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100">
        <span className="font-semibold">Projected Valuation in 5 Years:</span>
        <span className="font-bold text-green-600">
          ${fiveYearProjection.toLocaleString(undefined, {maximumFractionDigits: 0})}
        </span>
      </div>
    </div>
  );
};

export default GrowthRoadmap;

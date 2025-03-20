
import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';

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
  const { convertCurrency, formatCurrency } = useCurrency();
  
  return (
    <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
      <h3 className="font-bold text-xl mb-4 text-center">Our Growth Roadmap</h3>
      <p className="mb-4">
        MoveSync is positioned to achieve consistent {(globalGrowthRate * 100).toFixed(0)}% annual growth through our multi-faceted expansion strategy. 
        Here's how we'll turn your {formatCurrency(convertCurrency(investmentAmount))} investment into {formatCurrency(convertCurrency(finalReturn))} (a {returnPercentage}% return) over the next {years} years:
      </p>
      <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100 mb-4">
        <span className="font-semibold">Current Valuation:</span>
        <span className="font-bold text-movesync-blue">{formatCurrency(convertCurrency(premoneyValuation))}</span>
      </div>
      <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100">
        <span className="font-semibold">Projected Valuation in 5 Years:</span>
        <span className="font-bold text-green-600">
          {formatCurrency(convertCurrency(fiveYearProjection))}
        </span>
      </div>
    </div>
  );
};

export default GrowthRoadmap;


import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ReturnsTableProps {
  potentialReturns: number[];
  equityValue: number;
  years: number;
  growthRate: number;
  viewMode: 'global' | 'country';
  selectedCountry: string;
}

const ReturnsTable: React.FC<ReturnsTableProps> = ({
  potentialReturns,
  equityValue,
  years,
  growthRate,
  viewMode,
  selectedCountry
}) => {
  const { convertCurrency, formatCurrency } = useCurrency();
  
  // Calculate total cumulative returns
  const cumulativeReturn = potentialReturns.reduce((sum, value) => sum + value, 0);
  const totalReturnPercentage = Math.round((cumulativeReturn / equityValue - 1) * 100);
  
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="font-semibold mb-4">
        {viewMode === 'global' 
          ? `Potential Returns (${(growthRate * 100).toFixed(0)}% Annual Growth)`
          : `Potential Returns (${(growthRate * 100).toFixed(0)}% Annual Growth)`
        }
      </h3>
      <div className="space-y-3">
        {potentialReturns.map((value, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>Year {index + 1}</span>
            <span className="font-semibold">{formatCurrency(convertCurrency(value))}</span>
            <span className="text-green-600 text-sm">
              +{Math.round((value / equityValue - 1) * 100)}%
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between items-center font-bold">
            <span>Total Over {years} {years === 1 ? 'Year' : 'Years'}</span>
            <span className="text-emerald-600">{formatCurrency(convertCurrency(cumulativeReturn))}</span>
            <span className="text-emerald-600 text-sm">
              +{totalReturnPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsTable;


import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface EquitySummaryProps {
  equityPercentage: number;
  equityValue: number;
}

const EquitySummary: React.FC<EquitySummaryProps> = ({
  equityPercentage,
  equityValue
}) => {
  const { convertCurrency, formatCurrency } = useCurrency();
  
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-movesync-gray">Equity Percentage</p>
          <p className="text-2xl font-bold">{equityPercentage.toFixed(2)}%</p>
          <p className="text-xs text-movesync-gray">of entire global company</p>
        </div>
        <div>
          <p className="text-sm text-movesync-gray">Equity Value</p>
          <p className="text-2xl font-bold">{formatCurrency(convertCurrency(equityValue))}</p>
          <p className="text-xs text-movesync-gray">initial investment</p>
        </div>
      </div>
    </div>
  );
};

export default EquitySummary;

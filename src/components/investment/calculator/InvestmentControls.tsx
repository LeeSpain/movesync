
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { useCurrency } from '@/contexts/CurrencyContext';

interface InvestmentControlsProps {
  investmentAmount: number;
  setInvestmentAmount: (amount: number) => void;
  years: number;
  setYears: (years: number) => void;
}

const InvestmentControls: React.FC<InvestmentControlsProps> = ({
  investmentAmount,
  setInvestmentAmount,
  years,
  setYears
}) => {
  const { currencySymbol, convertCurrency, formatCurrency } = useCurrency();

  const handleInvestmentChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Investment Amount ({currencySymbol})
        </label>
        <Slider
          defaultValue={[investmentAmount]}
          min={10000}
          max={2000000}
          step={10000}
          onValueChange={handleInvestmentChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm">{formatCurrency(convertCurrency(10000))}</span>
          <span className="font-semibold">{formatCurrency(convertCurrency(investmentAmount))}</span>
          <span className="text-sm">{formatCurrency(convertCurrency(2000000))}</span>
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Projection Years
        </label>
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map((year) => (
            <button
              key={year}
              onClick={() => setYears(year)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                years === year
                  ? 'bg-movesync-blue text-white'
                  : 'bg-movesync-gray-light text-movesync-black'
              }`}
            >
              {year} Year{year > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default InvestmentControls;

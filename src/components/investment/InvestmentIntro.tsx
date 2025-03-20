
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { useCurrency } from '@/contexts/CurrencyContext';

const InvestmentIntro = () => {
  const { 
    viewMode,
    setViewMode, 
    selectedCountry,
    setSelectedCountry,
    countryGrowthRates,
    financialParams, 
    globalGrowthRate
  } = useInvestment();
  
  const { 
    currency, 
    currencySymbol, 
    convertCurrency, 
    formatCurrency 
  } = useCurrency();
  
  const { premoneyValuation, targetRaise, postmoneyValuation, totalEquityOffered } = financialParams;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-md">
          Become Part of Our Global Growth
        </h2>
      </div>

      <p className="mb-4">
        We're offering an exclusive opportunity to invest in Move-Sync - the leading AI-powered relocation platform expanding across multiple countries.
      </p>
      <p className="mb-4 font-medium text-movesync-blue">
        Your investment gives you equity in our entire global business across all countries, not just in a single market.
      </p>
      <p className="mb-4">
        Based on a company valuation of {formatCurrency(convertCurrency(premoneyValuation))} pre-money, we're raising {formatCurrency(convertCurrency(targetRaise))} for a post-money valuation of {formatCurrency(convertCurrency(postmoneyValuation))}, with investors receiving {totalEquityOffered.toFixed(0)}% equity.
      </p>
      <p className="mb-6">
        Use our calculator to see how your investment could grow over time as we expand our connections across different countries.
      </p>
      
      <div className="bg-movesync-gray-light p-6 rounded-xl mb-8">
        <h3 className="font-semibold mb-3">Why Invest in Move-Sync?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Growing market for relocation services globally</li>
          <li>Proprietary AI technology creates a competitive advantage</li>
          <li>Scalable business model with recurring revenue</li>
          <li>Expanding to new countries in the next 3 years</li>
          <li>Strong team with industry expertise</li>
        </ul>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setViewMode('global')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            viewMode === 'global'
              ? 'bg-movesync-blue text-white'
              : 'bg-movesync-gray-light text-movesync-black'
          }`}
        >
          Global Investment
        </button>
        <button
          onClick={() => setViewMode('country')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            viewMode === 'country'
              ? 'bg-movesync-blue text-white'
              : 'bg-movesync-gray-light text-movesync-black'
          }`}
        >
          View By Country
        </button>
      </div>
      
      {viewMode === 'country' && (
        <div className="mb-4">
          <p className="mb-2">Select a country to see individual growth rates:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(countryGrowthRates).map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedCountry === country
                    ? 'bg-movesync-blue text-white'
                    : 'bg-movesync-gray-light text-movesync-black'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-movesync-gray">
        <div>Selected Growth Rate:</div>
        <div className="font-semibold text-movesync-blue">
          {viewMode === 'global' 
            ? `${(globalGrowthRate * 100).toFixed(0)}% (Average across all countries)`
            : `${(countryGrowthRates[selectedCountry] * 100).toFixed(0)}%`
          }
        </div>
      </div>
    </div>
  );
};

export default InvestmentIntro;

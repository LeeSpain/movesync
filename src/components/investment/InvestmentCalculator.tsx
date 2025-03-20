
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateEquity, calculateROI, calculateGlobalROI } from './InvestmentUtils';
import { useCurrency } from '@/contexts/CurrencyContext';

// Import refactored components
import InvestmentControls from './calculator/InvestmentControls';
import EquitySummary from './calculator/EquitySummary';
import GrowthChart from './calculator/GrowthChart';
import ReturnsTable from './calculator/ReturnsTable';

const InvestmentCalculator = () => {
  const { 
    investmentAmount, 
    setInvestmentAmount, 
    years, 
    setYears, 
    viewMode,
    selectedCountry,
    countryGrowthRates,
    globalGrowthRate,
    financialParams
  } = useInvestment();
  
  const { 
    convertCurrency 
  } = useCurrency();

  const { equityPercentage, equityValue } = calculateEquity(investmentAmount, financialParams);

  const currentGrowthRate = viewMode === 'global' 
    ? globalGrowthRate 
    : countryGrowthRates[selectedCountry];
    
  const potentialReturns = viewMode === 'global'
    ? calculateGlobalROI(equityValue, years, globalGrowthRate)
    : calculateROI(equityValue, years, currentGrowthRate);
  
  // Prepare data for charts
  const lineChartData = potentialReturns.map((value, index) => ({
    year: `Year ${index + 1}`,
    value: convertCurrency(value),
  }));

  return (
    <div className="rounded-xl">
      <h2 className="text-xl font-bold mb-6 text-center">
        Global Investment ROI Calculator
      </h2>
      
      <InvestmentControls 
        investmentAmount={investmentAmount}
        setInvestmentAmount={setInvestmentAmount}
        years={years}
        setYears={setYears}
      />
      
      <EquitySummary 
        equityPercentage={equityPercentage}
        equityValue={equityValue}
      />
      
      <GrowthChart 
        data={lineChartData}
        equityValue={convertCurrency(equityValue)}
        viewMode={viewMode}
        selectedCountry={selectedCountry}
        growthRate={currentGrowthRate}
      />
      
      <ReturnsTable 
        potentialReturns={potentialReturns}
        equityValue={equityValue}
        years={years}
        growthRate={currentGrowthRate}
        viewMode={viewMode}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default InvestmentCalculator;

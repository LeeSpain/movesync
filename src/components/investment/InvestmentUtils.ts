
import { CountryGrowthRates, InvestmentParams } from './InvestmentTypes';

// Calculate equity percentage and value
export const calculateEquity = (
  investmentAmount: number, 
  financialParams: InvestmentParams
) => {
  const { targetRaise, totalEquityOffered, postmoneyValuation } = financialParams;
  
  const equityPercentage = (investmentAmount / targetRaise) * totalEquityOffered;
  const equityValue = (equityPercentage / 100) * postmoneyValuation;
  
  return { equityPercentage, equityValue };
};

// Calculate ROI for a specific country
export const calculateROI = (
  initialInvestment: number, 
  years: number, 
  growthRate: number
): number[] => {
  let returns = [];
  let currentValue = initialInvestment;
  
  for (let i = 1; i <= years; i++) {
    currentValue = currentValue * (1 + growthRate);
    returns.push(Math.round(currentValue));
  }
  
  return returns;
};

// Calculate global ROI that combines all countries
export const calculateGlobalROI = (
  initialInvestment: number, 
  years: number,
  globalGrowthRate: number
): number[] => {
  let returns = [];
  let currentValue = initialInvestment;
  
  for (let i = 1; i <= years; i++) {
    // Apply growth from all countries for global investment
    currentValue = currentValue * (1 + globalGrowthRate);
    returns.push(Math.round(currentValue));
  }
  
  return returns;
};

// Generate comparison data across countries
export const generateComparisonData = (
  equityValue: number,
  years: number,
  countryGrowthRates: CountryGrowthRates,
  globalGrowthRate: number
) => {
  // Compare ROI across countries
  const comparisonData = Object.entries(countryGrowthRates).map(([country, rate]) => {
    const countryReturns = calculateROI(equityValue, years, rate);
    return {
      country,
      finalReturn: countryReturns[years - 1],
      growthPercentage: Math.round((countryReturns[years - 1] / equityValue - 1) * 100),
    };
  });
  
  // Add global data to comparison
  const globalReturns = calculateGlobalROI(equityValue, years, globalGrowthRate);
  comparisonData.unshift({
    country: 'Global (All Countries)',
    finalReturn: globalReturns[years - 1],
    growthPercentage: Math.round((globalReturns[years - 1] / equityValue - 1) * 100),
  });
  
  // Sort comparison data by final return
  return comparisonData.sort((a, b) => b.finalReturn - a.finalReturn);
};

// Create chart data for all growth projections
export const createChartData = (
  potentialReturns: number[],
  comparisonData: any[],
  countryGrowthRates: CountryGrowthRates
) => {
  // Line chart data
  const lineChartData = potentialReturns.map((value, index) => ({
    year: `Year ${index + 1}`,
    value: value,
  }));
  
  // Bar chart data
  const barChartData = comparisonData.map(item => ({
    country: item.country,
    value: item.finalReturn,
    growthPercentage: item.growthPercentage,
  }));
  
  // Pie chart data for market distribution
  const pieChartData = Object.entries(countryGrowthRates).map(([country, rate]) => ({
    name: country,
    value: Math.round(rate * 100), // Convert to percentage for better visualization
  }));
  
  return { lineChartData, barChartData, pieChartData };
};

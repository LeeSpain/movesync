
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateEquity, generateComparisonData } from './InvestmentUtils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

const CountryComparison = () => {
  const { 
    investmentAmount, 
    years, 
    viewMode, 
    selectedCountry,
    countryGrowthRates,
    globalGrowthRate,
    financialParams
  } = useInvestment();
  
  const { equityValue } = calculateEquity(investmentAmount, financialParams);
  
  // Generate comparison data
  const comparisonData = generateComparisonData(
    equityValue, 
    years, 
    countryGrowthRates, 
    globalGrowthRate
  );
  
  // Create bar chart data
  const barChartData = comparisonData.map(item => ({
    country: item.country,
    value: item.finalReturn,
    growthPercentage: item.growthPercentage,
  }));

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
      <h2 className="heading-md mb-6 text-center">
        Investment Growth Comparison
      </h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        See how your ${investmentAmount.toLocaleString()} investment in our global company would grow over {years} years, with a breakdown by country.
      </p>
      
      <div className="h-[300px] w-full mb-8">
        <ChartContainer
          config={{
            value: { theme: { light: "#E67E22", dark: "#E67E22" }, label: "Value" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="country" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                        <p className="text-sm font-medium">{payload[0].payload.country}</p>
                        <p className="text-sm text-movesync-blue">
                          ${Number(payload[0].value).toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600">
                          +{payload[0].payload.growthPercentage}% growth
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" fill="#E67E22" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {comparisonData.map((item, index) => (
          <div key={index} className={`p-4 rounded-xl ${
            (item.country === selectedCountry && viewMode === 'country') || 
            (item.country === 'Global (All Countries)' && viewMode === 'global')
              ? 'bg-movesync-blue/10 border border-movesync-blue/20' 
              : item.country === 'Global (All Countries)'
                ? 'bg-movesync-aussie-green/10 border border-movesync-aussie-green/20'
                : 'bg-gray-50'
          }`}>
            <h3 className="font-semibold text-center mb-2">{item.country}</h3>
            <p className="text-center text-lg font-bold">${item.finalReturn.toLocaleString()}</p>
            <p className="text-center text-green-600 text-sm">+{item.growthPercentage}% growth</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryComparison;

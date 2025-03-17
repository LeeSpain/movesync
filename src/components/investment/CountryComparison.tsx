
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateEquity, generateComparisonData } from './InvestmentUtils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card } from '@/components/ui/card';
import { Globe } from 'lucide-react';

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
    <Card className="bg-white p-8 rounded-xl shadow-lg mb-16 border-0">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-movesync-outback-red" />
        <h2 className="text-3xl font-bold text-movesync-blue">
          Investment Growth Comparison
        </h2>
      </div>
      
      <p className="text-lg mb-8 text-gray-700 max-w-3xl">
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
                      <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
                        <p className="text-base font-semibold">{payload[0].payload.country}</p>
                        <p className="text-base text-movesync-blue font-bold">
                          ${Number(payload[0].value).toLocaleString()}
                        </p>
                        <p className="text-sm text-movesync-aussie-green font-medium">
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
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {comparisonData.map((item, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-xl shadow-sm transition-all ${
              (item.country === selectedCountry && viewMode === 'country') || 
              (item.country === 'Global (All Countries)' && viewMode === 'global')
                ? 'bg-gradient-to-br from-movesync-blue-light to-movesync-blue border border-movesync-blue-light shadow-md transform scale-105' 
                : item.country === 'Global (All Countries)'
                  ? 'bg-gradient-to-br from-movesync-aussie-green/20 to-movesync-aussie-green/40 border border-movesync-aussie-green/20'
                  : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <h3 className="font-semibold text-center mb-2 text-gray-800">{item.country}</h3>
            <p className="text-center text-xl font-bold text-movesync-blue">${item.finalReturn.toLocaleString()}</p>
            <p className="text-center text-movesync-aussie-green text-sm font-medium">+{item.growthPercentage}% growth</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CountryComparison;

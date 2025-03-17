
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateEquity, generateComparisonData } from './InvestmentUtils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-center">Investment Growth Comparison</CardTitle>
        <CardDescription className="text-center pt-2 pb-2">
          See how your ${investmentAmount.toLocaleString()} investment in our global company would grow over {years} years, with a breakdown by country.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 pt-4 pb-6 md:px-6">
        <div className="h-[400px] w-full mb-8">
          <ChartContainer
            config={{
              value: { theme: { light: "#E67E22", dark: "#E67E22" }, label: "Value" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barChartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <XAxis 
                  dataKey="country" 
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
                  width={80}
                />
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {comparisonData.map((item, index) => (
            <div key={index} className={`p-3 rounded-xl ${
              (item.country === selectedCountry && viewMode === 'country') || 
              (item.country === 'Global (All Countries)' && viewMode === 'global')
                ? 'bg-movesync-blue/10 border border-movesync-blue/20' 
                : item.country === 'Global (All Countries)'
                  ? 'bg-movesync-aussie-green/10 border border-movesync-aussie-green/20'
                  : 'bg-gray-50 border border-gray-100'
            }`}>
              <h3 className="font-semibold text-center text-sm mb-1">{item.country}</h3>
              <p className="text-center text-base font-bold">${item.finalReturn.toLocaleString()}</p>
              <p className="text-center text-green-600 text-xs">+{item.growthPercentage}% growth</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryComparison;

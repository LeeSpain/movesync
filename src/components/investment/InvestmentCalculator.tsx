
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateEquity, calculateROI, calculateGlobalROI } from './InvestmentUtils';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

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
    value: value,
  }));

  const handleInvestmentChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };

  return (
    <Card className="bg-white rounded-xl p-6 shadow-lg border-0">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        ROI Calculator
      </h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Investment Amount ($)
        </label>
        <Slider
          defaultValue={[investmentAmount]}
          min={10000}
          max={2000000}
          step={10000}
          onValueChange={handleInvestmentChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-600">$10,000</span>
          <span className="font-semibold text-blue-700">${investmentAmount.toLocaleString()}</span>
          <span className="text-gray-600">$2,000,000</span>
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Projection Years
        </label>
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map((year) => (
            <button
              key={year}
              onClick={() => setYears(year)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                years === year
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              {year} Year{year > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Equity Percentage</p>
            <p className="text-2xl font-bold text-blue-700">{equityPercentage.toFixed(2)}%</p>
            <p className="text-xs text-gray-500">of entire global company</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Equity Value</p>
            <p className="text-2xl font-bold text-blue-700">${equityValue.toLocaleString()}</p>
            <p className="text-xs text-gray-500">initial investment</p>
          </div>
        </div>
      </div>
      
      {/* ROI Growth Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          {viewMode === 'global' 
            ? 'Global Growth Projection (All Countries)'
            : `Growth Projection for ${selectedCountry}`
          }
        </h3>
        <div className="h-[200px] w-full">
          <ChartContainer 
            config={{
              value: { theme: { light: "#0ea5e9", dark: "#0ea5e9" }, label: "Value" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                          <p className="text-sm font-medium">{payload[0].payload.year}</p>
                          <p className="text-sm text-blue-600">
                            ${Number(payload[0].value).toLocaleString()}
                          </p>
                          <p className="text-xs text-green-600">
                            +{Math.round((Number(payload[0].value) / equityValue - 1) * 100)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-4">
          {viewMode === 'global' 
            ? `Potential Returns (${(globalGrowthRate * 100).toFixed(0)}% Annual Growth)`
            : `Potential Returns (${(currentGrowthRate * 100).toFixed(0)}% Annual Growth)`
          }
        </h3>
        <div className="space-y-3">
          {potentialReturns.map((value, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
              <span className="font-medium">Year {index + 1}</span>
              <span className="font-bold text-blue-700">${value.toLocaleString()}</span>
              <span className="text-green-600 text-sm font-semibold">
                +{Math.round((value / equityValue - 1) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default InvestmentCalculator;

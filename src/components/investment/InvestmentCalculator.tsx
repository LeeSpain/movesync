
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { calculateEquity, calculateROI, calculateGlobalROI } from './InvestmentUtils';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

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
    <div className="rounded-xl">
      <h2 className="text-xl font-bold mb-6 text-center">
        Global Investment ROI Calculator
      </h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
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
        <div className="flex justify-between mt-2">
          <span className="text-sm">$10,000</span>
          <span className="font-semibold">${investmentAmount.toLocaleString()}</span>
          <span className="text-sm">$2,000,000</span>
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
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-movesync-gray">Equity Percentage</p>
            <p className="text-2xl font-bold">{equityPercentage.toFixed(2)}%</p>
            <p className="text-xs text-movesync-gray">of entire global company</p>
          </div>
          <div>
            <p className="text-sm text-movesync-gray">Equity Value</p>
            <p className="text-2xl font-bold">${equityValue.toLocaleString()}</p>
            <p className="text-xs text-movesync-gray">initial investment</p>
          </div>
        </div>
      </div>
      
      {/* ROI Growth Chart */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">
          {viewMode === 'global' 
            ? 'Global Growth Projection (All Countries)'
            : `Growth Projection for ${selectedCountry}`
          }
        </h3>
        <div className="h-[250px] w-full">
          <ChartContainer 
            config={{
              value: { theme: { light: "#0ea5e9", dark: "#0ea5e9" }, label: "Value" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={lineChartData}
                margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
              >
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  width={60}
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
        <h3 className="font-semibold mb-4">
          {viewMode === 'global' 
            ? `Potential Returns (${(globalGrowthRate * 100).toFixed(0)}% Annual Growth)`
            : `Potential Returns (${(currentGrowthRate * 100).toFixed(0)}% Annual Growth)`
          }
        </h3>
        <div className="space-y-3">
          {potentialReturns.map((value, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>Year {index + 1}</span>
              <span className="font-semibold">${value.toLocaleString()}</span>
              <span className="text-green-600 text-sm">
                +{Math.round((value / equityValue - 1) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;

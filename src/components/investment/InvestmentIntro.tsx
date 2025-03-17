
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';

const InvestmentIntro = () => {
  const { 
    countryGrowthRates, 
    financialParams, 
    viewMode,
    setViewMode, 
    selectedCountry,
    setSelectedCountry,
    globalGrowthRate
  } = useInvestment();
  
  const { premoneyValuation, targetRaise, postmoneyValuation, totalEquityOffered } = financialParams;

  // Pie chart data for market distribution
  const pieChartData = Object.entries(countryGrowthRates).map(([country, rate]) => ({
    name: country,
    value: Math.round(rate * 100), // Convert to percentage for better visualization
  }));
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];
  
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-lg bg-white rounded-xl border-0">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Become Part of Our Global Growth
        </h2>
        <p className="mb-4">
          We're offering an exclusive opportunity to invest in MoveSync - the leading AI-powered relocation platform expanding across multiple countries.
        </p>
        <p className="mb-4 font-medium text-indigo-600">
          Your investment gives you equity in our entire global business across all countries, not just in a single market.
        </p>
        <p className="mb-4">
          Based on a company valuation of ${premoneyValuation.toLocaleString()} pre-money, we're raising ${targetRaise.toLocaleString()} for a post-money valuation of ${postmoneyValuation.toLocaleString()}, with investors receiving {totalEquityOffered.toFixed(0)}% equity.
        </p>
        <p className="mb-6">
          Use our calculator to see how your investment could grow over time as we expand our connections across different countries.
        </p>
      </Card>
      
      <Card className="p-6 bg-amber-50 border-amber-100 shadow-lg rounded-xl border-0">
        <h3 className="text-xl font-bold text-amber-800 mb-4">Why Invest in MoveSync?</h3>
        <ul className="space-y-3">
          {[
            'Growing market for relocation services globally',
            'Proprietary AI technology creates a competitive advantage',
            'Scalable business model with recurring revenue',
            'Expanding to new countries in the next 3 years',
            'Strong team with industry expertise'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <BadgeCheck className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
      
      <Card className="p-6 bg-white shadow-lg rounded-xl border-0">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Our Global Presence</h3>
        <p className="mb-4">Your investment includes our operations in all these countries:</p>
        
        <div className="h-[220px] w-full mb-6">
          <ChartContainer
            config={{
              value: { theme: { light: "#8B5CF6", dark: "#8B5CF6" }, label: "Growth Rate" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${(Number(percent) * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setViewMode('global')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'global'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            Global Investment
          </button>
          <button
            onClick={() => setViewMode('country')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'country'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
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
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCountry === country
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm bg-blue-50 p-3 rounded-lg">
          <div className="font-medium">Selected Growth Rate:</div>
          <div className="font-bold text-green-600 text-base">
            {viewMode === 'global' 
              ? `${(globalGrowthRate * 100).toFixed(0)}% (Average across all countries)`
              : `${(countryGrowthRates[selectedCountry] * 100).toFixed(0)}%`
            }
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvestmentIntro;

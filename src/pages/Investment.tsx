
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Slider } from '@/components/ui/slider';

const Investment = () => {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [years, setYears] = useState(3);
  const [selectedCountry, setSelectedCountry] = useState('Australia');
  const companyValuation = 3000000;
  const percentageForSale = 20;
  
  // Countries and their growth rates
  const countryGrowthRates = {
    'Australia': 0.30, // 30% annual growth
    'New Zealand': 0.28, // 28% annual growth
    'Canada': 0.32, // 32% annual growth
    'United Kingdom': 0.25, // 25% annual growth
    'Singapore': 0.35, // 35% annual growth
  };
  
  // Calculate equity percentage based on investment amount
  const equityPercentage = (investmentAmount / companyValuation) * 100;
  const equityValue = (equityPercentage / 100) * companyValuation;
  
  // Calculate ROI for the selected country
  const calculateROI = (initialInvestment: number, years: number, growthRate: number): number[] => {
    let returns = [];
    let currentValue = initialInvestment;
    
    for (let i = 1; i <= years; i++) {
      currentValue = currentValue * (1 + growthRate);
      returns.push(Math.round(currentValue));
    }
    
    return returns;
  };
  
  const currentGrowthRate = countryGrowthRates[selectedCountry as keyof typeof countryGrowthRates];
  const potentialReturns = calculateROI(equityValue, years, currentGrowthRate);
  
  // Prepare data for charts
  const lineChartData = potentialReturns.map((value, index) => ({
    year: `Year ${index + 1}`,
    value: value,
  }));
  
  // Compare ROI across countries
  const comparisonData = Object.entries(countryGrowthRates).map(([country, rate]) => {
    const countryReturns = calculateROI(equityValue, years, rate);
    return {
      country,
      finalReturn: countryReturns[years - 1],
      growthPercentage: Math.round((countryReturns[years - 1] / equityValue - 1) * 100),
    };
  });
  
  // Sort comparison data by final return
  comparisonData.sort((a, b) => b.finalReturn - a.finalReturn);
  
  // Create bar chart data
  const barChartData = comparisonData.map(item => ({
    country: item.country,
    value: item.finalReturn,
    growthPercentage: item.growthPercentage,
  }));
  
  const handleInvestmentChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container-content section-spacing">
        <h1 className="heading-lg text-center mb-12">
          Investment Opportunity
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="heading-md mb-6">
              Become Part of Our Global Growth
            </h2>
            <p className="mb-4">
              We're offering an exclusive opportunity to invest in MoveSync - the leading AI-powered relocation platform expanding across multiple countries.
            </p>
            <p className="mb-4">
              Based on a company valuation of ${companyValuation.toLocaleString()}, we're offering {percentageForSale}% equity to strategic investors who believe in our vision.
            </p>
            <p className="mb-6">
              Use our calculator to see how your investment could grow over time as we expand our connections across different countries.
            </p>
            
            <div className="bg-movesync-gray-light p-6 rounded-xl mb-8">
              <h3 className="font-semibold mb-3">Why Invest in MoveSync?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Growing market for relocation services globally</li>
                <li>Proprietary AI technology creates a competitive advantage</li>
                <li>Scalable business model with recurring revenue</li>
                <li>Expanding to new countries in the next 3 years</li>
                <li>Strong team with industry expertise</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md mb-8">
              <h3 className="font-semibold mb-4">Our Growth by Country</h3>
              <p className="mb-4">Select a country to see potential returns based on regional growth rates:</p>
              <div className="flex flex-wrap gap-2 mb-6">
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
              <div className="flex justify-between items-center text-sm text-movesync-gray">
                <div>Selected Growth Rate:</div>
                <div className="font-semibold text-movesync-blue">
                  {(countryGrowthRates[selectedCountry as keyof typeof countryGrowthRates] * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="heading-sm mb-6 text-center">
              Investment ROI Calculator
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Investment Amount ($)
              </label>
              <Slider
                defaultValue={[investmentAmount]}
                min={5000}
                max={600000}
                step={5000}
                onValueChange={handleInvestmentChange}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">$5,000</span>
                <span className="font-semibold">${investmentAmount.toLocaleString()}</span>
                <span className="text-sm">$600,000</span>
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
            
            <div className="p-4 bg-movesync-gray-light rounded-xl mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-movesync-gray">Equity Percentage</p>
                  <p className="text-2xl font-bold">{equityPercentage.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-movesync-gray">Equity Value</p>
                  <p className="text-2xl font-bold">${equityValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {/* ROI Growth Chart */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Growth Projection for {selectedCountry}</h3>
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
                                  ${payload[0].value.toLocaleString()}
                                </p>
                                <p className="text-xs text-green-600">
                                  +{((payload[0].value / equityValue - 1) * 100).toFixed(0)}%
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
              <h3 className="font-semibold mb-4">Potential Returns ({(currentGrowthRate * 100).toFixed(0)}% Annual Growth)</h3>
              <div className="space-y-3">
                {potentialReturns.map((value, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>Year {index + 1}</span>
                    <span className="font-semibold">${value.toLocaleString()}</span>
                    <span className="text-green-600 text-sm">
                      +{(((value / equityValue) - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Country Comparison Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-16">
          <h2 className="heading-md mb-6 text-center">
            Investment Growth Comparison Across Countries
          </h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            See how your ${investmentAmount.toLocaleString()} investment would grow over {years} years across different countries where we operate.
          </p>
          
          <div className="h-[300px] w-full mb-8">
            <ChartContainer
              config={{
                value: { theme: { light: "#8B5CF6", dark: "#8B5CF6" }, label: "Value" },
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
                            <p className="text-sm text-purple-600">
                              ${payload[0].value.toLocaleString()}
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
                  <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {comparisonData.map((item, index) => (
              <div key={index} className={`p-4 rounded-xl ${
                item.country === selectedCountry ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}>
                <h3 className="font-semibold text-center mb-2">{item.country}</h3>
                <p className="text-center text-lg font-bold">${item.finalReturn.toLocaleString()}</p>
                <p className="text-center text-green-600 text-sm">+{item.growthPercentage}% growth</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-movesync-blue/10 p-8 rounded-2xl text-center">
          <h2 className="heading-md mb-4">Ready to Invest?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our investment team to discuss your options and learn more about our growth plans and expansion strategy.
          </p>
          <a href="#" className="btn-primary inline-block">
            Schedule a Call
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investment;

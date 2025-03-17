
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Investment = () => {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [years, setYears] = useState(3);
  const companyValuation = 3000000;
  const percentageForSale = 20;
  
  // Calculate equity percentage based on investment amount
  const equityPercentage = (investmentAmount / companyValuation) * 100;
  const equityValue = (equityPercentage / 100) * companyValuation;
  
  // Simple ROI calculation with 30% annual growth
  const calculateROI = (initialInvestment: number, years: number): number[] => {
    const annualGrowth = 0.3; // 30% annual growth
    let returns = [];
    let currentValue = initialInvestment;
    
    for (let i = 1; i <= years; i++) {
      currentValue = currentValue * (1 + annualGrowth);
      returns.push(Math.round(currentValue));
    }
    
    return returns;
  };
  
  const potentialReturns = calculateROI(equityValue, years);
  
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
              Become Part of Our Growth
            </h2>
            <p className="mb-4">
              We're offering an exclusive opportunity to invest in MoveSync - the leading AI-powered relocation platform for Australia.
            </p>
            <p className="mb-4">
              Based on a company valuation of ${companyValuation.toLocaleString()}, we're offering {percentageForSale}% equity to strategic investors who believe in our vision.
            </p>
            <p className="mb-6">
              Use our calculator to see how your investment could grow over time as we expand our connections and country offerings.
            </p>
            
            <div className="bg-movesync-gray-light p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Why Invest in MoveSync?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Growing market for relocation services to Australia</li>
                <li>Proprietary AI technology creates a competitive advantage</li>
                <li>Scalable business model with recurring revenue</li>
                <li>Expanding to new countries in the next 3 years</li>
                <li>Strong team with industry expertise</li>
              </ul>
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
              <input
                type="range"
                min="5000"
                max="600000"
                step="5000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-movesync-gray-light rounded-lg appearance-none cursor-pointer"
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
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold mb-4">Potential Returns (30% Annual Growth)</h3>
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

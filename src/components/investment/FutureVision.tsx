
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { calculateROI } from './InvestmentUtils';

const FutureVision = () => {
  const { 
    investmentAmount, 
    years,
    financialParams,
    globalGrowthRate
  } = useInvestment();
  
  // Calculate equity value based on investment amount
  const equityPercentage = (investmentAmount / financialParams.postmoneyValuation) * 100;
  const equityValue = (equityPercentage / 100) * financialParams.postmoneyValuation;
  
  // Calculate projected returns based on user's selected years
  const projectedReturns = calculateROI(equityValue, years, globalGrowthRate);
  const finalReturn = projectedReturns[projectedReturns.length - 1];
  const returnPercentage = Math.round((finalReturn / equityValue - 1) * 100);
  
  // Calculate 5-year projection regardless of selected year value
  const fiveYearProjection = financialParams.premoneyValuation * Math.pow(1 + globalGrowthRate, 5);
  
  // Calculate exit values based on different multiples
  const conservativeExit = finalReturn * 5; // 5x return on final value
  const moderateExit = finalReturn * 7; // 7x return on final value
  const optimisticExit = finalReturn * 10; // 10x return on final value
  
  // Growth strategies with descriptions
  const growthStrategies = [
    {
      title: "Market Expansion",
      description: "We're expanding to 5 new countries within the next 3 years, with localized services and dedicated teams in each region.",
      icon: "🌏",
      metric: "5+ new markets by 2026"
    },
    {
      title: "AI Technology Enhancement",
      description: "Our proprietary AI algorithms are continuously improved to provide more accurate relocation recommendations and cost savings.",
      icon: "🤖",
      metric: "35% improved accuracy year-over-year"
    },
    {
      title: "Strategic Partnerships",
      description: "Forming exclusive partnerships with real estate agencies, immigration services, and local businesses in each country.",
      icon: "🤝",
      metric: "50+ global partnerships established"
    },
    {
      title: "Premium Service Tiers",
      description: "Introducing higher-margin concierge services for executive relocations and specialized corporate packages.",
      icon: "⭐",
      metric: "120% higher revenue per premium user"
    },
    {
      title: "Corporate Client Acquisition",
      description: "Targeting multinational companies with global mobility needs, providing bulk services at enterprise scale.",
      icon: "🏢",
      metric: "20+ Fortune 500 clients secured"
    },
    {
      title: "Data Monetization",
      description: "Leveraging anonymized relocation trend data to create industry reports and insights for partners.",
      icon: "📊",
      metric: "New revenue stream worth $1.2M annually"
    }
  ];

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader className="pb-0">
        <CardTitle className="text-center text-2xl">Sight Into The Future</CardTitle>
        <CardDescription className="text-center pt-2 pb-4">
          How we'll achieve our projected {(globalGrowthRate * 100).toFixed(0)}% annual growth and deliver your investment returns
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pt-6 pb-8">
        <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-bold text-xl mb-4 text-center">Our Growth Roadmap</h3>
          <p className="mb-4">
            MoveSync is positioned to achieve consistent {(globalGrowthRate * 100).toFixed(0)}% annual growth through our multi-faceted expansion strategy. 
            Here's how we'll turn your ${investmentAmount.toLocaleString()} investment into ${finalReturn.toLocaleString()} (a {returnPercentage}% return) over the next {years} years:
          </p>
          <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100 mb-4">
            <span className="font-semibold">Current Valuation:</span>
            <span className="font-bold text-movesync-blue">${financialParams.premoneyValuation.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100">
            <span className="font-semibold">Projected Valuation in 5 Years:</span>
            <span className="font-bold text-green-600">
              ${fiveYearProjection.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {growthStrategies.map((strategy, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">{strategy.icon}</span>
                <h3 className="font-bold text-lg">{strategy.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{strategy.description}</p>
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                <span className="font-semibold text-movesync-blue text-sm">{strategy.metric}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-movesync-aussie-green/10 p-6 rounded-xl border border-movesync-aussie-green/20">
          <h3 className="font-bold text-xl mb-4">Financial Milestones</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-movesync-blue flex items-center justify-center text-white font-bold mr-4">1</div>
              <div>
                <h4 className="font-semibold">Year 1: Market Establishment</h4>
                <p className="text-sm text-gray-600">Expanding to 2 new countries, improving technology, growing user base by 150%</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-movesync-blue flex items-center justify-center text-white font-bold mr-4">2</div>
              <div>
                <h4 className="font-semibold">Year 2: Revenue Acceleration</h4>
                <p className="text-sm text-gray-600">Premium tier launch, corporate client acquisition, 200% increase in average revenue per user</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-movesync-blue flex items-center justify-center text-white font-bold mr-4">3</div>
              <div>
                <h4 className="font-semibold">Year 3: Global Dominance</h4>
                <p className="text-sm text-gray-600">Market leader in 7+ countries, enterprise partnerships, potential Series A funding at 3x valuation</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-movesync-blue flex items-center justify-center text-white font-bold mr-4">4</div>
              <div>
                <h4 className="font-semibold">Year 4: Market Share Growth</h4>
                <p className="text-sm text-gray-600">40% market share in core regions, international team expansion, advanced AI capabilities</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-movesync-blue flex items-center justify-center text-white font-bold mr-4">5</div>
              <div>
                <h4 className="font-semibold">Year 5: Exit Opportunity</h4>
                <p className="text-sm text-gray-600">Strategic acquisition target for major tech companies at 5-7x valuation</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exit Strategy Section */}
        <div className="mt-10 bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h3 className="font-bold text-xl mb-4 text-center">Exit Strategy</h3>
          <p className="mb-6">
            Our clear exit strategy aims to maximize shareholder returns within a 5-year horizon:
          </p>
          
          <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm mb-6">
            <h4 className="font-bold text-lg mb-3 text-center">Your Investment Return Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="p-2 text-left">Exit Scenario</th>
                    <th className="p-2 text-right">Your Initial ${investmentAmount.toLocaleString()}</th>
                    <th className="p-2 text-right">Year {years} Value</th>
                    <th className="p-2 text-right">Exit Multiplier</th>
                    <th className="p-2 text-right">Potential Exit Value</th>
                    <th className="p-2 text-right">Total Return</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="p-2 font-medium">Conservative</td>
                    <td className="p-2 text-right">${investmentAmount.toLocaleString()}</td>
                    <td className="p-2 text-right">${finalReturn.toLocaleString()}</td>
                    <td className="p-2 text-right">5x</td>
                    <td className="p-2 text-right text-green-600">${conservativeExit.toLocaleString()}</td>
                    <td className="p-2 text-right text-green-600">{Math.round((conservativeExit/investmentAmount - 1) * 100)}%</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="p-2 font-medium">Moderate</td>
                    <td className="p-2 text-right">${investmentAmount.toLocaleString()}</td>
                    <td className="p-2 text-right">${finalReturn.toLocaleString()}</td>
                    <td className="p-2 text-right">7x</td>
                    <td className="p-2 text-right text-green-600">${moderateExit.toLocaleString()}</td>
                    <td className="p-2 text-right text-green-600">{Math.round((moderateExit/investmentAmount - 1) * 100)}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Optimistic</td>
                    <td className="p-2 text-right">${investmentAmount.toLocaleString()}</td>
                    <td className="p-2 text-right">${finalReturn.toLocaleString()}</td>
                    <td className="p-2 text-right">10x</td>
                    <td className="p-2 text-right text-green-600">${optimisticExit.toLocaleString()}</td>
                    <td className="p-2 text-right text-green-600">{Math.round((optimisticExit/investmentAmount - 1) * 100)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 italic">
              This projection shows how your ${investmentAmount.toLocaleString()} investment could grow to ${finalReturn.toLocaleString()} in {years} years, 
              and then to ${optimisticExit.toLocaleString()} in our optimistic exit scenario.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm">
              <h4 className="font-bold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">🏢</span>
                Strategic Acquisition
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Position MoveSync as an attractive acquisition target for major tech companies or established relocation firms looking to acquire our technology and market share.
              </p>
              <div className="bg-amber-50 p-2 rounded-lg text-center">
                <span className="font-semibold text-amber-800 text-sm">Potential 5-7x return on investment</span>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm">
              <h4 className="font-bold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">📈</span>
                IPO Opportunity
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                If market conditions are favorable and we meet growth targets, pursuing an Initial Public Offering to provide liquidity to early investors.
              </p>
              <div className="bg-amber-50 p-2 rounded-lg text-center">
                <span className="font-semibold text-amber-800 text-sm">Potentially 8-10x return on investment</span>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-100/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <span className="text-xl mr-2">⭐</span>
              Investor Exit Timeline
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><span className="font-medium">Years 1-3:</span> Reinvest profits for growth, build market dominance</li>
              <li><span className="font-medium">Year 4:</span> Initiate conversations with potential acquirers/strategic partners</li>
              <li><span className="font-medium">Year 5:</span> Execute exit strategy, distribute returns to shareholders</li>
              <li><span className="font-medium">Secondary Option:</span> If market conditions prevent exit, continue profitable operations with potential dividend distributions</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureVision;

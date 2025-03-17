
import React from 'react';
import { useInvestment } from './InvestmentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const FutureVision = () => {
  const { 
    investmentAmount, 
    years,
    financialParams,
    globalGrowthRate
  } = useInvestment();
  
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
            Here's how we'll turn your ${investmentAmount.toLocaleString()} investment into significant returns over the next {years} years:
          </p>
          <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100 mb-4">
            <span className="font-semibold">Current Valuation:</span>
            <span className="font-bold text-movesync-blue">${financialParams.premoneyValuation.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm bg-white p-3 rounded-lg border border-blue-100">
            <span className="font-semibold">Projected Valuation in {years} Years:</span>
            <span className="font-bold text-green-600">
              ${(financialParams.premoneyValuation * Math.pow(1 + globalGrowthRate, years)).toLocaleString(undefined, {maximumFractionDigits: 0})}
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureVision;

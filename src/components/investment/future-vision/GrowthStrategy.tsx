
import React from 'react';

interface StrategyCardProps {
  icon: string;
  title: string;
  description: string;
  metric: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ icon, title, description, metric }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <div className="bg-gray-50 p-2 rounded-lg text-center">
        <span className="font-semibold text-movesync-blue text-sm">{metric}</span>
      </div>
    </div>
  );
};

const GrowthStrategies: React.FC = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {growthStrategies.map((strategy, index) => (
        <StrategyCard
          key={index}
          icon={strategy.icon}
          title={strategy.title}
          description={strategy.description}
          metric={strategy.metric}
        />
      ))}
    </div>
  );
};

export default GrowthStrategies;

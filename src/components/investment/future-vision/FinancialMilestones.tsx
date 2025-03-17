
import React from 'react';

interface MilestoneProps {
  number: number;
  title: string;
  description: string;
}

const Milestone: React.FC<MilestoneProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-movesync-blue flex items-center justify-center text-white font-bold mr-4">
        {number}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const FinancialMilestones: React.FC = () => {
  const milestones = [
    {
      title: "Year 1: Market Establishment",
      description: "Expanding to 2 new countries, improving technology, growing user base by 150%"
    },
    {
      title: "Year 2: Revenue Acceleration",
      description: "Premium tier launch, corporate client acquisition, 200% increase in average revenue per user"
    },
    {
      title: "Year 3: Global Dominance",
      description: "Market leader in 7+ countries, enterprise partnerships, potential Series A funding at 3x valuation"
    },
    {
      title: "Year 4: Market Share Growth",
      description: "40% market share in core regions, international team expansion, advanced AI capabilities"
    },
    {
      title: "Year 5: Exit Opportunity",
      description: "Strategic acquisition target for major tech companies at 5-7x valuation"
    }
  ];

  return (
    <div className="mt-10 bg-movesync-aussie-green/10 p-6 rounded-xl border border-movesync-aussie-green/20">
      <h3 className="font-bold text-xl mb-4">Financial Milestones</h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Milestone
            key={index}
            number={index + 1}
            title={milestone.title}
            description={milestone.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FinancialMilestones;

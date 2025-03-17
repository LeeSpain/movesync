
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

const CrowdfundingTracker: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const totalRaised = 870000;
  const targetAmount = 2000000;
  const percentRaised = Math.min(100, Math.round((totalRaised / targetAmount) * 100));
  const investorCount = 42;
  const daysLeft = 19;
  
  return (
    <Card className="shadow-md border border-amber-200 bg-gradient-to-br from-amber-50 to-white mb-16">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-2xl">Investment Progress</CardTitle>
      </CardHeader>
      <CardContent className="py-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-lg font-semibold mb-4 text-center">Funding Progress</h3>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-movesync-blue flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Raised
              </span>
              <span className="font-bold">${totalRaised.toLocaleString()}</span>
            </div>
            <div className="mb-4">
              <Progress value={percentRaised} className="h-3" />
            </div>
            <div className="flex justify-between text-sm">
              <span>{percentRaised}% of ${targetAmount.toLocaleString()}</span>
              <span>{daysLeft} days left</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-movesync-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Investors</p>
                <p className="text-xl font-bold">{investorCount}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Investment</p>
                <p className="text-xl font-bold">${Math.round(totalRaised / investorCount).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center max-w-2xl mx-auto">
          Join {investorCount} investors who have already secured their stake in MoveSync's global expansion. 
          We're {percentRaised}% of the way to our ${targetAmount.toLocaleString()} funding goal!
        </p>
      </CardContent>
    </Card>
  );
};

export default CrowdfundingTracker;

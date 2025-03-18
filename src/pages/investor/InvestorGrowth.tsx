
import React from 'react';
import InvestorLayout from '@/components/investor/InvestorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { getGrowthMetricsData } from '@/utils/adminChartData';

const InvestorGrowth = () => {
  const growthData = getGrowthMetricsData();
  
  return (
    <InvestorLayout title="Growth Metrics">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>User and revenue growth trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart data={growthData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.4%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Market Penetration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.7%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Expansion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15.2%</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
};

export default InvestorGrowth;

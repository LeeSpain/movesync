
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { AdminStats } from '@/utils/adminMetrics';

interface GrowthOverviewTabProps {
  stats: AdminStats;
  growthMetricsData: any;
}

const GrowthOverviewTab = ({ stats, growthMetricsData }: GrowthOverviewTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
          <CardDescription>User and revenue growth rates over time</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <LineChart data={growthMetricsData} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Growth Efficiency Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2x</div>
            <p className="text-xs text-muted-foreground">ARR growth ÷ spend</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">LTV:CAC Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.lifetimeValue / stats.customerAcquisitionCost).toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">Target {'>'} 3.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Payback Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 months</div>
            <p className="text-xs text-muted-foreground">Time to recover CAC</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrowthOverviewTab;

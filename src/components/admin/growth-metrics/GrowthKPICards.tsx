
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp, Users, BarChart3, Percent } from 'lucide-react';
import { AdminStats } from '@/utils/adminMetrics';

interface GrowthKPICardsProps {
  stats: AdminStats;
}

const GrowthKPICards = ({ stats }: GrowthKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">User Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.growthRate}%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 inline-flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1.2% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 inline-flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +0.8% from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Acquisition Cost</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.customerAcquisitionCost}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 inline-flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              -$2.50 from last month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentSignups}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 inline-flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% from yesterday
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthKPICards;


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { AdminStats } from '@/utils/adminMetrics';

interface GrowthAnalyticsProps {
  stats: AdminStats;
  growthMetricsData: any;
}

const GrowthAnalytics = ({ stats, growthMetricsData }: GrowthAnalyticsProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Growth Metrics</CardTitle>
        <CardDescription>User and revenue growth rates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <LineChart data={growthMetricsData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">User Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.growthRate}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Revenue Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.8%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Churn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4%</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthAnalytics;


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart } from '@/components/ui/charts';
import { AdminStats } from '@/utils/adminMetrics';

interface SubscriptionMetricsProps {
  stats: AdminStats;
  subscriptionData: any;
}

const SubscriptionMetrics = ({ stats, subscriptionData }: SubscriptionMetricsProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Subscription Distribution</CardTitle>
        <CardDescription>Free vs. Premium user growth</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <BarChart data={subscriptionData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Premium Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.premiumUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.premiumUsers / stats.totalUsers) * 100)}% of total users
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Recurring Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ${Math.round(stats.monthlyRevenue / stats.premiumUsers)} per premium user
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionMetrics;

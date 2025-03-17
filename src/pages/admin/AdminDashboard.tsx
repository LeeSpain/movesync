
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';
import { Users, DollarSign, ArrowUpRight, BadgePercent, TrendingUp, CreditCard, Bot } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  // This would normally come from an API
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    monthlyRevenue: 0,
    annualRevenue: 0,
    growthRate: 0,
    conversionRate: 0,
    customerAcquisitionCost: 0,
    lifetimeValue: 0,
    recentSignups: 0,
    aiMetrics: {
      queriesHandled: 0,
      satisfactionRate: 0,
      avgResponseTime: 0,
    }
  });

  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        totalUsers: 1245,
        premiumUsers: 384,
        monthlyRevenue: 26500,
        annualRevenue: 318000,
        growthRate: 8.4,
        conversionRate: 30.8,
        customerAcquisitionCost: 42,
        lifetimeValue: 850,
        recentSignups: 27,
        aiMetrics: {
          queriesHandled: 8427,
          satisfactionRate: 92,
          avgResponseTime: 1.4,
        }
      });
    }, 1000);
  }, []);

  // Financial data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [18500, 21000, 22500, 24000, 25200, 26500],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const subscriptionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Free Users',
        data: [720, 780, 820, 850, 880, 861],
        backgroundColor: 'rgb(148, 163, 184)',
      },
      {
        label: 'Premium Users',
        data: [180, 210, 240, 270, 310, 384],
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  const costBreakdownData = {
    labels: ['Customer Support', 'Technology', 'Marketing', 'Personnel', 'Operations', 'Other'],
    datasets: [
      {
        data: [15, 28, 22, 25, 8, 2],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(248, 113, 113)',
          'rgb(52, 211, 153)',
          'rgb(251, 191, 36)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };

  const growthMetricsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth (%)',
        data: [5.2, 6.8, 7.4, 7.9, 8.1, 8.4],
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        fill: true,
      },
      {
        label: 'Revenue Growth (%)',
        data: [6.5, 7.8, 8.2, 8.9, 9.4, 9.8],
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <AdminLayout title="Executive Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5.2% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Conversion</CardTitle>
            <BadgePercent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2.1% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.recentSignups} new users this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.growthRate}%</div>
            <p className="text-xs text-muted-foreground">
              Month-over-month user growth
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="financials">
          <TabsList>
            <TabsTrigger value="financials">Financial Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscription Metrics</TabsTrigger>
            <TabsTrigger value="growth">Growth Analytics</TabsTrigger>
            <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="financials" className="space-y-6">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>
                  Monthly revenue over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart data={revenueData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Annual Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.annualRevenue.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Customer LTV</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.lifetimeValue.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Acquisition Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.customerAcquisitionCost.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscriptions" className="space-y-6">
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
          </TabsContent>
          <TabsContent value="growth" className="space-y-6">
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
          </TabsContent>
          <TabsContent value="costs" className="space-y-6">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Operational Cost Breakdown</CardTitle>
                <CardDescription>Distribution of monthly expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={costBreakdownData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Monthly Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$18,200</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Profit Margin</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">31.3%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Break-even Point</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">243 subscribers</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
